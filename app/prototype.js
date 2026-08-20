const CONTENT = require('./data/content-manage')

const SCREENS = CONTENT.screens
const SCREEN_INDEX = Object.fromEntries(SCREENS.map((screen) => [screen.id, screen]))

const JOURNEYS = ['request', 'manage']
const JOURNEY_LABELS = {
  request: 'Request support',
  manage: 'Manage support'
}

function emptyState () {
  return {
    selections: {},
    signLanguage: { language: null, manual: null },
    specialMeasures: { needed: null, reason: '' },
    pendingChange: null
  }
}

function stateFor (request) {
  request.session.data = request.session.data || {}
  request.session.data.yourSupport = request.session.data.yourSupport || emptyState()
  return request.session.data.yourSupport
}

function resetState (request) {
  request.session.data.yourSupport = emptyState()
  return request.session.data.yourSupport
}

function screenById (id) {
  return SCREEN_INDEX[id]
}

function journeyOf (screenOrId) {
  const screen = typeof screenOrId === 'string' ? screenById(screenOrId) : screenOrId
  return screen ? screen.journey : 'request'
}

function selected (state, id) {
  return Boolean(state.selections[id] && state.selections[id].selected)
}

function selectedIds (state, screenId) {
  const screen = screenById(screenId)
  if (!screen || !screen.options) return []
  return screen.options.filter((option) => selected(state, option.id)).map((option) => option.id)
}

function facade (state) {
  return {
    triage: selectedIds(state, 'triage'),
    selections: state.selections,
    specialMeasures: state.specialMeasures.needed,
    pendingChange: state.pendingChange
  }
}

function isVisible (screen, state) {
  return !screen.when || screen.when(facade(state))
}

function visibleScreens (journey, state) {
  return SCREENS.filter((screen) => screen.journey === journey && isVisible(screen, state))
}

function firstScreenOf (journey) {
  const screen = SCREENS.find((candidate) => candidate.journey === journey)
  return screen ? screen.id : 'start'
}

function adjacentScreenId (screenId, state, direction) {
  const list = visibleScreens(journeyOf(screenId), state)
  const index = list.findIndex((screen) => screen.id === screenId)
  if (index === -1) return null
  const adjacent = list[index + direction]
  return adjacent ? adjacent.id : null
}

function nextScreenId (screenId, state) {
  return adjacentScreenId(screenId, state, 1)
}

function previousScreenId (screenId, state) {
  return adjacentScreenId(screenId, state, -1)
}

function pathFor (screenOrId) {
  const screen = typeof screenOrId === 'string' ? screenById(screenOrId) : screenOrId
  if (!screen) return '/request-support/start'
  const prefix = screen.journey === 'manage' ? 'manage-support' : 'request-support'
  return `/${prefix}/${screen.id}`
}

function pick (state, optionId) {
  state.selections[optionId] = state.selections[optionId] || { selected: true, comment: '' }
  state.selections[optionId].selected = true
}

const SEEDS = {
  travel: (state) => pick(state, 'travel'),
  documents: (state) => pick(state, 'documents'),
  communication: (state) => pick(state, 'communication'),
  'hearing-enhancement': (state) => {
    pick(state, 'communication')
    pick(state, 'comm-enhancement')
  },
  'sign-language': (state) => {
    pick(state, 'communication')
    pick(state, 'comm-signlanguage')
  },
  forms: (state) => pick(state, 'forms'),
  comfort: (state) => pick(state, 'comfort'),
  support: (state) => pick(state, 'support'),
  hearings: (state) => pick(state, 'hearings'),
  'confirm-change': (state) => {
    state.pendingChange = { change: 'no-longer-need', item: 'Mobility support' }
  }
}

function seedFor (screenId, state) {
  const screen = screenById(screenId)
  if (!screen || isVisible(screen, state)) return
  if (SEEDS[screenId]) SEEDS[screenId](state)
}

function asArray (value) {
  if (Array.isArray(value)) return value.filter((item) => item !== '_unchecked')
  if (!value || value === '_unchecked') return []
  return [value]
}

function collect (screen, body, state) {
  if (screen.type === 'checkboxes') {
    let answers = asArray(body.answer)
    if (screen.exclusive && answers.includes(screen.exclusive.id)) {
      answers = [screen.exclusive.id]
    }

    const options = screen.options.concat(screen.exclusive ? [screen.exclusive] : [])
    options.forEach((option) => {
      if (!answers.includes(option.id)) {
        delete state.selections[option.id]
        return
      }

      state.selections[option.id] = {
        selected: true,
        comment: String(body[`comment-${option.id}`] || '').trim()
      }
    })

    if (screen.after) {
      state.specialMeasures.reason = String(body[screen.after.field.id] || '').trim()
    }
  }

  if (screen.type === 'radios') {
    const value = body.answer || null
    state.specialMeasures.needed = value
    if (value === 'no') state.specialMeasures.reason = ''
  }

  if (screen.type === 'language') {
    state.signLanguage.language = String(body.language || '').trim() || null
    state.signLanguage.manual = asArray(body.manual).includes('yes')
      ? String(body['manual-text'] || '').trim()
      : null
  }
}

function resolve (value) {
  let output = String(value == null ? '' : value)
  Object.entries(CONTENT.service).forEach(([token, replacement]) => {
    output = output.split(token).join(replacement)
  })
  return output
}

function deepResolve (value) {
  if (typeof value === 'string') return resolve(value)
  if (Array.isArray(value)) return value.map(deepResolve)
  if (!value || typeof value !== 'object') return value

  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [key, deepResolve(child)])
  )
}

function escapeHtml (value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character])
}

function blockHtml (blocks) {
  return (blocks || []).map((block) => {
    if (block.p) return `<p class="govuk-body">${escapeHtml(resolve(block.p))}</p>`
    if (block.h2) return `<h2 class="govuk-heading-m">${escapeHtml(resolve(block.h2))}</h2>`
    if (block.inset) return `<div class="govuk-inset-text">${escapeHtml(resolve(block.inset))}</div>`
    if (block.ul) {
      const items = block.ul.map((item) => `<li>${escapeHtml(resolve(item))}</li>`).join('')
      return `<ul class="govuk-list govuk-list--bullet">${items}</ul>`
    }
    return ''
  }).join('')
}

function commentFieldHtml (option, state) {
  if (!option.comment) return null
  const id = `comment-${option.id}`
  const describedBy = `${option.comment.hint ? `${id}-hint ` : ''}${id}-info`
  const comment = state.selections[option.id] ? state.selections[option.id].comment : ''
  const field = option.comment.input === 'textarea'
    ? `<textarea class="govuk-textarea govuk-js-character-count" id="${id}" name="${id}" rows="3" data-maxlength="${option.comment.maxLength}" aria-describedby="${describedBy}">${escapeHtml(comment)}</textarea>`
    : `<input class="govuk-input govuk-js-character-count" id="${id}" name="${id}" type="text" data-maxlength="${option.comment.maxLength}" aria-describedby="${describedBy}" value="${escapeHtml(comment)}">`

  return `<div class="govuk-form-group govuk-character-count">` +
    `<label class="govuk-label" for="${id}">${escapeHtml(resolve(option.comment.prompt))}</label>` +
    (option.comment.hint
      ? `<div class="govuk-hint" id="${id}-hint">${escapeHtml(resolve(option.comment.hint))}</div>`
      : '') +
    field +
    `<div id="${id}-info" class="govuk-hint govuk-character-count__message" aria-hidden="true"></div>` +
    `<div class="govuk-visually-hidden" aria-live="polite" id="${id}-live"></div>` +
    `</div>`
}

function checkboxItems (screen, state) {
  const items = screen.options.map((option) => ({
    id: option.id,
    value: option.id,
    text: resolve(option.label),
    hint: option.hint ? { text: resolve(option.hint) } : undefined,
    checked: selected(state, option.id),
    conditional: option.comment ? { html: commentFieldHtml(option, state) } : undefined
  }))

  if (screen.exclusive) {
    items.push({ divider: 'or' })
    items.push({
      id: screen.exclusive.id,
      value: screen.exclusive.id,
      text: resolve(screen.exclusive.label),
      checked: selected(state, screen.exclusive.id),
      behaviour: 'exclusive'
    })
  }

  return items
}

function radioItems (screen, state) {
  return screen.options.map((option) => ({
    id: `${screen.id}-${option.id}`,
    value: option.id,
    text: resolve(option.label),
    hint: option.hint ? { text: resolve(option.hint) } : undefined,
    checked: state.specialMeasures.needed === option.id
  }))
}

function summaryRows (state) {
  const rows = []

  SCREENS.forEach((screen) => {
    if (screen.excludeFromSummary || !isVisible(screen, state)) return

    if (screen.type === 'checkboxes') {
      screen.options.forEach((option) => {
        if (option.routesTo || !selected(state, option.id)) return
        rows.push({
          label: resolve(option.label),
          value: state.selections[option.id].comment || '',
          screenId: screen.id,
          focus: option.id
        })
      })

      if (screen.after && state.specialMeasures.reason) {
        rows.push({
          label: resolve(screen.after.field.label),
          value: state.specialMeasures.reason,
          screenId: screen.id,
          focus: screen.after.field.id
        })
      }
    }

    if (screen.type === 'language') {
      if (selected(state, 'comm-signlanguage')) {
        rows.push({
          label: resolve(screen.summaryLabel),
          value: state.signLanguage.manual || state.signLanguage.language || '',
          screenId: screen.id,
          focus: `${screen.id}-language`
        })
      }
    }
  })

  return rows
}

function shellFor (screen, state, query = {}) {
  const shell = {
    ...CONTENT.shells[screen.shell],
    backLink: true,
    backLinkInert: screen.id === firstScreenOf(screen.journey),
    ...(screen.shellOverrides || {})
  }

  if (!shell.backLinkInert) {
    const previous = query.returnTo === 'cya'
      ? 'cya'
      : previousScreenId(screen.id, state)
    shell.backUrl = pathFor(previous || firstScreenOf(screen.journey))
  }

  return deepResolve(shell)
}

function demoBar (currentScreenId) {
  return {
    journeys: JOURNEYS.map((journey) => ({
      id: journey,
      label: JOURNEY_LABELS[journey],
      current: journeyOf(currentScreenId) === journey
    })),
    groups: JOURNEYS.map((journey) => ({
      label: JOURNEY_LABELS[journey],
      screens: SCREENS.filter((screen) => screen.journey === journey).map((screen, index) => {
        let label = `${index + 1}. ${resolve(screen.heading || screen.title || screen.id)}`
        if (label.length > 62) label = `${label.slice(0, 60)}…`
        return { id: screen.id, label, current: screen.id === currentScreenId }
      })
    }))
  }
}

function viewModel (screen, state, query = {}) {
  const resolvedScreen = deepResolve(screen)
  const model = {
    screen: resolvedScreen,
    shell: shellFor(screen, state, query),
    currentPath: pathFor(screen),
    formAction: pathFor(screen) + (query.returnTo === 'cya' ? '?returnTo=cya' : ''),
    blocksHtml: blockHtml(screen.blocks),
    questionIntroHtml: blockHtml(screen.blocks) + (screen.hint
      ? `<div class="govuk-hint" id="${escapeHtml(screen.id)}-hint">${escapeHtml(resolve(screen.hint))}</div>`
      : ''),
    state,
    demoBar: demoBar(screen.id),
    content: deepResolve({
      contactsForHelp: CONTENT.contactsForHelp,
      placeholderLanguages: CONTENT.placeholderLanguages,
      placeholderNote: CONTENT.placeholderNote,
      etContact: CONTENT.etContact
    })
  }

  if (screen.type === 'checkboxes') model.checkboxItems = checkboxItems(screen, state)
  if (screen.type === 'radios') model.radioItems = radioItems(screen, state)
  if (screen.type === 'language') {
    model.languageStore = state.signLanguage
    model.manualSelected = model.languageStore.manual !== null && model.languageStore.manual !== undefined
  }
  if (screen.type === 'cya') {
    model.summaryRows = summaryRows(state)
    model.summaryListRows = model.summaryRows.map((row) => ({
      key: { text: row.label },
      value: { text: row.value },
      actions: {
        items: [{
          href: `${pathFor(row.screenId)}?returnTo=cya&focus=${encodeURIComponent(row.focus)}`,
          text: 'Change',
          visuallyHiddenText: row.label
        }]
      }
    }))
  }
  if (screen.type === 'dashboard') {
    model.taskListItems = screen.tasks.map((task) => ({
      title: { text: resolve(task.label) },
      href: task.goTo ? pathFor(task.goTo) : undefined,
      status: {
        tag: {
          text: resolve(task.status),
          classes: 'govuk-tag--green'
        }
      }
    }))
  }
  if (screen.type === 'support-list') {
    model.supportSections = screen.sections.map((section) => ({
      heading: resolve(section.heading),
      rows: section.rows.map((row) => {
        const label = row.detail ? `${row.label} ${row.detail}` : row.label
        return {
          key: {
            html: `${escapeHtml(resolve(row.label))}${row.detail ? `<br>${escapeHtml(resolve(row.detail))}` : ''}`,
            classes: 'govuk-!-font-weight-regular'
          },
          value: { text: '' },
          actions: {
            items: [{
              href: `/manage-support/confirm-change?change=${encodeURIComponent(section.change)}&item=${encodeURIComponent(resolve(label))}`,
              text: resolve(section.actionLabel),
              visuallyHiddenText: resolve(label)
            }]
          }
        }
      })
    }))
  }
  if (screen.type === 'confirm-change') {
    const pending = state.pendingChange
    const variant = (pending && screen.variants[pending.change]) || screen.fallback
    model.confirmHeading = resolve(variant.heading).replace('[item]', pending ? pending.item : '')
    model.confirmLabel = resolve(variant.confirm)
  }

  return model
}

module.exports = {
  CONTENT,
  SCREENS,
  collect,
  demoBar,
  firstScreenOf,
  isVisible,
  journeyOf,
  nextScreenId,
  pathFor,
  resetState,
  screenById,
  seedFor,
  stateFor,
  viewModel
}
