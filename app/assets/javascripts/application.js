window.GOVUKPrototypeKit.documentReady(() => {
  const demoBar = document.getElementById('demo-bar')

  if (demoBar) {
    const controls = demoBar.querySelector('.proto-bar')
    const notesButton = demoBar.querySelector('[data-proto="notes"]')
    const notes = document.getElementById('proto-notes')
    const jump = document.getElementById('proto-jump')

    if (notesButton && notes) {
      notesButton.addEventListener('click', () => {
        const isOpen = notesButton.getAttribute('aria-expanded') === 'true'
        notesButton.setAttribute('aria-expanded', String(!isOpen))
        notes.hidden = isOpen
        if (!isOpen) notes.focus()
      })
    }

    if (jump) {
      jump.addEventListener('change', () => jump.form.submit())
    }

    if (controls) {
      const syncBarHeight = () => {
        document.documentElement.style.setProperty('--proto-bar-height', `${controls.offsetHeight}px`)
      }
      syncBarHeight()
      window.addEventListener('resize', syncBarHeight)
    }
  }

  document.addEventListener('click', (event) => {
    const inert = event.target.closest('[data-inert]')
    if (inert) event.preventDefault()
  })

  const focusTarget = new URLSearchParams(window.location.search).get('focus')
  if (focusTarget) {
    const target = document.getElementById(focusTarget)
    if (target) target.focus()
  }

  document.querySelectorAll('[data-maxlength].govuk-js-character-count').forEach((field) => {
    const visible = document.getElementById(`${field.id}-info`)
    const live = document.getElementById(`${field.id}-live`)
    const maximum = Number.parseInt(field.dataset.maxlength, 10)
    let timer

    if (!visible || !maximum) return

    const update = () => {
      const remaining = maximum - field.value.length
      const amount = Math.abs(remaining)
      const noun = amount === 1 ? 'character' : 'characters'
      const message = remaining < 0
        ? `You have ${amount} ${noun} too many`
        : `You have ${amount} ${noun} remaining`

      visible.textContent = message
      visible.classList.toggle('govuk-error-message', remaining < 0)
      visible.classList.toggle('govuk-hint', remaining >= 0)
      field.classList.toggle('govuk-input--error', remaining < 0 && field.tagName === 'INPUT')
      field.classList.toggle('govuk-textarea--error', remaining < 0 && field.tagName === 'TEXTAREA')

      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        if (live) live.textContent = message
      }, 1000)
    }

    field.addEventListener('input', update)
    update()
  })
})
