const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const prototype = require('./prototype')

const VIEW_BY_TYPE = {
  content: 'screens/content',
  checkboxes: 'screens/checkboxes',
  radios: 'screens/radios',
  language: 'screens/language',
  cya: 'screens/check-your-answers',
  confirmation: 'screens/confirmation',
  dashboard: 'screens/dashboard',
  'support-list': 'screens/support-list',
  'confirm-change': 'screens/confirm-change'
}

function redirectWithSessionSave (request, response, next, location) {
  return request.session.save(function (error) {
    if (error) {
      return next(error)
    }

    return response.redirect(location)
  })
}

router.get('/', function (request, response) {
  response.redirect('/request-support/start')
})

router.get('/dashboard', function (request, response) {
  response.redirect('/manage-support/dashboard')
})

router.get('/prototype/start/:journey', function (request, response, next) {
  const journey = request.params.journey === 'manage' ? 'manage' : 'request'
  prototype.resetState(request)
  return redirectWithSessionSave(
    request,
    response,
    next,
    prototype.pathFor(prototype.firstScreenOf(journey))
  )
})

router.get('/prototype/reset', function (request, response, next) {
  const journey = request.query.journey === 'manage' ? 'manage' : 'request'
  prototype.resetState(request)
  return redirectWithSessionSave(
    request,
    response,
    next,
    prototype.pathFor(prototype.firstScreenOf(journey))
  )
})

router.get('/prototype/jump', function (request, response, next) {
  const screen = prototype.screenById(request.query.screen)
  if (!screen) {
    response.redirect('/request-support/start')
    return
  }

  const state = prototype.stateFor(request)
  prototype.seedFor(screen.id, state)
  return redirectWithSessionSave(request, response, next, prototype.pathFor(screen))
})

function screenForRequest (request) {
  const screen = prototype.screenById(request.params.screenId)
  if (!screen) return null

  const expectedJourney = request.params.journey === 'manage-support' ? 'manage' : 'request'
  return prototype.journeyOf(screen) === expectedJourney ? screen : null
}

router.get('/:journey(request-support|manage-support)/:screenId', function (request, response) {
  const screen = screenForRequest(request)
  if (!screen) {
    response.redirect('/request-support/start')
    return
  }

  const state = prototype.stateFor(request)

  if (screen.id === 'confirm-change' && request.query.change && request.query.item) {
    state.pendingChange = {
      change: request.query.change,
      item: request.query.item
    }
  }

  if (!prototype.isVisible(screen, state)) {
    response.redirect(prototype.pathFor(prototype.firstScreenOf(screen.journey)))
    return
  }

  const view = VIEW_BY_TYPE[screen.type]
  if (!view) {
    response.status(404).send('This screen type is not available in this iteration.')
    return
  }

  response.render(view, prototype.viewModel(screen, state, request.query))
})

router.post('/:journey(request-support|manage-support)/:screenId', function (request, response, next) {
  const screen = screenForRequest(request)
  if (!screen) {
    response.redirect('/request-support/start')
    return
  }

  const state = prototype.stateFor(request)
  prototype.collect(screen, request.body, state)

  const action = request.body.action || 'continue'

  if (action === 'cancel' || action === 'restart') {
    prototype.resetState(request)
    return redirectWithSessionSave(
      request,
      response,
      next,
      prototype.pathFor(prototype.firstScreenOf(screen.journey))
    )
  }

  if (action === 'add-another') {
    return redirectWithSessionSave(request, response, next, '/request-support/triage')
  }

  if (action === 'submit') {
    return redirectWithSessionSave(request, response, next, '/request-support/confirmation')
  }

  if (request.query.returnTo === 'cya') {
    return redirectWithSessionSave(request, response, next, '/request-support/cya')
  }

  if (screen.actions && screen.actions.primaryGoTo) {
    return redirectWithSessionSave(
      request,
      response,
      next,
      prototype.pathFor(screen.actions.primaryGoTo)
    )
  }

  const nextScreenId = prototype.nextScreenId(screen.id, state)
  return redirectWithSessionSave(
    request,
    response,
    next,
    prototype.pathFor(nextScreenId || prototype.firstScreenOf(screen.journey))
  )
})

module.exports = router
