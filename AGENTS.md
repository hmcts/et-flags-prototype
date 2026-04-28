# AGENTS.md

## Project context
- This repository is a prototype built with the GOV.UK Prototype Kit.
- It uses the GOV.UK Design System, GOV.UK Prototype Components, and the MOJ Design System / MOJ Frontend.
- Treat this as a prototype, not a production service. Prioritise speed of iteration, clarity, and faithful use of the design systems over production-grade architecture.

## Core rules
- Use components and patterns from the GOV.UK Design System, GOV.UK Prototype Components, and MOJ Design System wherever possible.
- Prefer Nunjucks macros over handwritten HTML for components.
- Do not invent custom UI patterns if an equivalent GOV.UK, GOV.UK Prototype Components, or MOJ component already exists.
- Keep styling changes minimal. Only add custom CSS when the design systems do not already provide what is needed.
- Preserve accessibility expectations that come with the design systems. Do not strip required classes, attributes, labels, legends, or hint/error patterns.

## Default implementation approach
- Build pages in Nunjucks templates under `app/views/`.
- Use the existing layout in `app/views/layouts/`.
- Add request and navigation logic in `app/routes.js`.
- Store prototype state defaults in `app/data/session-data-defaults.js` when needed.
- Put custom filters in `app/filters.js` only when template logic would otherwise become hard to read.
- Put any lightweight front-end behaviour in `app/assets/javascripts/application.js`.
- Put any small styling adjustments in `app/assets/sass/application.scss`.

## Templating guidance
- Prefer importing and calling macros from GOV.UK Frontend, GOV.UK Prototype Components, or MOJ Frontend instead of writing component markup manually.
- Keep templates mostly declarative: page structure, copy, and macro calls belong in Nunjucks.
- If conditional logic is required, simple branching in Nunjucks is acceptable, but non-trivial logic should move to the JavaScript layer.
- When composing pages, favour standard page sections such as back links, phase banners, service navigation, page headings, inset text, summaries, details, buttons, and form components from the design systems.

## Logic and data rules
- Any conditional logic can be handled in JavaScript for the prototype. Put flow and branching logic in `app/routes.js` or small helpers; keep `app/assets/javascripts/application.js` for lightweight browser behaviour.
- Do not add a backend, database, ORM, API layer, or persistent storage unless the user explicitly asks for it.
- Use session data and route-level logic only as far as needed to demonstrate the prototype flow.
- Keep data handling simple and easy to delete or reshape as the prototype evolves.

## Testing and validation
- Automated testing is not required for this repository.
- Validate work by running the prototype locally when needed and checking the affected journey or page manually.
- You may use the existing Playwright installation for lightweight agent verification of prototype flows, screenshots, or page behaviour, but do not add or configure a formal automated test suite unless the user explicitly asks for one.

## Running the prototype
- Start the prototype locally from the repository root with `npm run dev`.
- Do not default to `npm start` for local work unless the user explicitly asks for it; the Prototype Kit warns that `npm run dev` is the correct local development command.
- When the server starts successfully, expect the prototype at `http://localhost:3000` and the manage page at `http://localhost:3000/manage-prototype`.
- After starting the server, confirm it is responding before proceeding with further manual checks.

## Design system references
- GOV.UK Design System: https://design-system.service.gov.uk/
- GOV.UK Prototype Components: https://govuk-prototype-components.x-govuk.org/
- MOJ Design System / design patterns: https://design-patterns.service.justice.gov.uk/

## Change guidance for agents
- Before adding custom markup, check whether the same outcome can be achieved with an existing GOV.UK, GOV.UK Prototype Components, or MOJ macro.
- Before adding custom styles, check whether spacing, typography, width, or layout utilities from the design systems already solve it.
- Keep copy and flows prototype-friendly: clear enough to test with users, but easy to change.
- Avoid over-engineering. Prefer the simplest change that accurately represents the intended service behaviour.
