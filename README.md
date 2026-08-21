# Employment Tribunals — Your Support prototype

A GOV.UK Prototype Kit version of the Employment Tribunals citizen-facing Your Support journeys.

## Run locally

Use Node.js 24, which is the version supported by this Prototype Kit release:

```bash
nvm use
npm ci
npm run dev
```

Open <http://localhost:3000>.

The Prototype Kit management page is available at <http://localhost:3000/manage-prototype>.

## Journeys

### Request support

Thirteen screens from the service start page through to confirmation. The flow includes conditional reasonable-adjustment categories, a sign-language question, a dynamic check-your-answers page and change links.

Start at <http://localhost:3000/request-support/start>.

### Manage support

Three screens showing the Employment Tribunals case overview, fixed example reasonable-adjustment requests and the provisional are-you-sure step.

Start at <http://localhost:3000/manage-support/dashboard>. The shorter `/dashboard` URL also redirects there.

## Implementation

- GOV.UK Prototype Kit 13
- GOV.UK Frontend 6.4
- Nunjucks views and GOV.UK component macros
- Express routes in `app/routes.js`
- Session-backed journey data managed by `app/prototype.js`
- Reviewed screen content in `app/data/content.js` and `app/data/content-manage.js`
- Prototype-only presentation and controls in `app/assets/` and `app/views/partials/prototype-bar.html`

Each screen has a normal server URL. Form posts update the Prototype Kit session and routes select the next visible screen from the reviewed flow rules. Resetting or selecting either Start control clears the journey data.

The black and yellow bar at the bottom is demonstration furniture, not part of the service. It can start either journey, jump to any screen, reset session answers and show the prototype notes.

## Deliberate limitations

- This remains a prototype, with no API, database or persistent service storage.
- Manage support uses fixed example data and confirming a change deliberately changes nothing.
- Special measures remain outside this iteration.
- The sign-language list is placeholder data.
- Some contact values remain unresolved tokens because no approved content was supplied.
- The demonstrated build did not include form validation, so this migration also allows unanswered questions.
- Unlike the archived prototype, this version requires a running Node.js server and is not a portable single HTML file.

The source wording includes deliberate inconsistencies inherited from the reviewed wireframes. Do not tidy them without checking the original prototype handover and design decisions.
