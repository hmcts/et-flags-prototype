var CONTENT = require('./content')

/* ==========================================================================
   Your Support — stage 2 content: Manage and change support
   ==========================================================================

   Loads after content.js and appends to the same screen list. Stage 1 is not
   touched by anything in here.

   The same three rules apply as in content.js: copy is VERBATIM including the
   inconsistencies, TRACKED CHANGES ARE APPLIED, and NOTHING IS INVENTED.

   Two departures worth knowing about before reading:

   1. The data on the Your support page is STATIC DEMO DATA. It shows approvals
      and staff comments that no freshly-submitted request could carry, so it
      cannot be derived from what the user did in stage 1 — and pretending
      otherwise would misrepresent how the real page works.

   2. Two screens are PLACEHOLDERS. Their wireframes have not been supplied.
      They are styled so they cannot be mistaken for a design, and they say
      what is outstanding. Delete them when the real screens arrive.
   ========================================================================== */

/* ------------------------------------------------------------ ET shell --
   The case overview dashboard sits in the Employment Tribunals service, not
   in the microsite. Its header is the same centred-service-name bar in
   govuk-frontend's default brand blue — which is what the wireframe shows,
   and since the 13 August review is what every other screen shows too.

   The wireframe tags this screen ALPHA where every other screen is BETA, a
   consequence of the two designs coming from different artefacts. Aligned to
   Beta at the same review: the point of that change was that a judge should
   have nothing to ask about, and a phase tag that changes as you click is
   exactly the kind of thing that gets asked about. The divergence is logged
   in REFERENCE.md instead of being shown. */

CONTENT.shells.et = {
  headerVariant: 'centred',
  serviceName: '[Service name]',
  headerTheme: 'et',
  signOut: true,
  cymraeg: false,
  contactDisclosure: false,
  phaseTag: 'Beta',
  phaseBanner: 'This is a new service. Help us improve it and <a class="govuk-link" href="#" data-inert="feedback">give your feedback (opens in new tab)</a>.',
  footerLinks: [
    'Cookies',
    'Privacy Policy',
    'Terms and Conditions',
    'Help using GOV.UK',
    'Contact us',
    'Accessibility statement'
  ]
}

CONTENT.screens = CONTENT.screens.concat([

  /* -------------------------------------------------------------- M1 --- */
  {
    id: 'dashboard',
    journey: 'manage',
    shell: 'et',
    type: 'dashboard',
    title: 'Case overview',
    /* Reuses the party token, so the claimant tracks CONTENT.service rather
       than hard-coding a second name. The wireframe reads "Citizen One";
       aligned to the configured party so that clicking through to the support
       pages does not silently change who the user is. */
    heading: 'Case overview - [Party name] vs David Butcher',
    caseNumber: 'Case number 6000888/2023',

    /* No GOV.UK component matches this; hand-built. */
    progress: [
      { label: 'Claim accepted', state: 'done' },
      { label: 'Response received', state: 'done' },
      { label: 'Your hearing details', state: 'current' },
      { label: 'Your claim decision', state: 'todo' }
    ],

    taskHeading: 'Your claim',
    tasks: [
      { label: 'Your ET1 claim form', status: 'Submitted', goTo: null },
      { label: 'Your support', status: 'Submitted', goTo: 'your-support' }
    ],

    aside: {
      heading: 'I want to...',
      links: [
        'View my ET1 claims',
        'Contact the tribunal about my case',
        'Find legal advice (opens in new tab)',
        'Appoint a legal representative'
      ],
      detailsSummary: 'Contact'
    }
  },

  /* -------------------------------------------------------------- M2 --- *
     Supplied at the 13 August review, and it REPLACES the four-group status
     page that stood here before — see CONTENT.outOfScope.manage below, which
     keeps that transcription.

     Why it was swapped: the flow drawn on the earlier screens sent someone
     wanting to change one thing back to the triage question to walk the whole
     journey again. Mitchell, 11:16: "from an accessibility point of view, I
     don't think we'd be able to send them back to the triage page and have
     them go through the flow again... the user would have to tab through
     everything". This page changes one item where it stands instead.

     The screen id is unchanged, because the dashboard task links to it and
     #/dashboard boots through it.                                           */
  {
    id: 'your-support',
    journey: 'manage',
    shell: 'microsite',
    /* No shellOverrides. The superseded wireframe drew a Cymraeg toggle here
       that no other microsite screen has — inconsistency xxiii — but the new
       design was supplied as a cropped content shot with no header or footer
       in it, so there is no evidence either way. Inheriting the microsite
       shell is the choice that invents nothing. */
    type: 'support-list',
    title: 'Reasonable adjustments',
    heading: 'Reasonable adjustments',
    partyRowKey: 'Name of party',
    /* Drawn as lowercase "john doe". Rendered through the party token like
       every other screen, so the demonstration does not show one person's name
       two different ways; the divergence is logged in REFERENCE.md. */
    partyRowValue: '[Party name]',

    /* Three sections, each with its own action. Transcribed exactly as drawn,
       including the fact that the requested items offer only "I no longer need
       this" — there is no "I want to change this" on them, though Mitchell
       described one in the meeting. That gap is a question for the team, not
       something to fill in here.

       The row labels are category names — "Additional support", "Hearing
       provision", "Reasonable adjustment" — not the option labels journey 1
       asks in. They read like RefData or OPTIC flag categories. Transcribed
       verbatim; also a question for the team. */
    sections: [
      {
        heading: 'Support you’ve already requested',
        actionLabel: 'I no longer need this',
        change: 'no-longer-need',
        rows: [
          { label: 'Additional support' },
          { label: 'Alternative formats' },
          { label: 'Hearing enhancement' },
          { label: 'Hearing provision' },
          { label: 'Induction loop' },
          { label: 'Mobility support' },
          /* Drawn as two lines in one cell: the category, then its detail. */
          { label: 'Other', detail: 'Language support' },
          { label: 'Reasonable adjustment' },
          { label: 'Sign language interpreter' }
        ]
      },
      {
        heading: 'New support you want to request now',
        actionLabel: 'Change',
        change: 'change',
        rows: [
          { label: 'Accessible toilet' }
        ]
      },
      {
        heading: 'Support you no longer need',
        actionLabel: 'I still need this',
        change: 'still-need',
        rows: [
          { label: 'Wheelchair access' }
        ]
      }
    ],

    /* Renders because the design draws it; inert because where it goes is
       undecided. Sending it into the triage question would reintroduce exactly
       the accessibility problem this screen was brought in to solve, and
       nothing else has been designed. */
    addButton: 'Add a new support request',
    confirmGoTo: 'confirm-change'
  },

  /* -------------------------------------------------------------- M3 --- *
     NOT A TRANSCRIPTION. No wireframe exists for this screen; it is built
     from Mitchell's description at 12:45: "once you hit I no longer need
     this, you'd expect that to be like a modal saying, if you remove this,
     this happens. So it goes to a screen and say, like, are you sure? Kind of
     like an are you sure screen. And same thing for this, if it's changed."

     Kept to the minimum that can be said without inventing policy: it names
     the item, it asks, and both answers return to the list. What actually
     happens on confirm — soft delete, whether a reason is needed, whether
     staff have to approve it — is unresolved, so the screen says none of it.
     Flagged in the release notes as an invented behaviour.                  */
  {
    id: 'confirm-change',
    journey: 'manage',
    shell: 'microsite',
    type: 'confirm-change',
    title: 'Are you sure?',
    /* The screen has no meaning without a row to ask about, so it is gated
       like any other conditional screen. That also makes the demo bar seed one
       before jumping here, rather than landing on the bare fallback. */
    when: function (s) { return !!s.pendingChange },
    /* One screen serves all three links. The heading and the confirm button
       are chosen by which link was used; the item name comes from the row.
       Deep-linked or jumped to with nothing pending, it falls back to the
       neutral wording in `fallback`. */
    variants: {
      'no-longer-need': {
        heading: 'Are you sure you no longer need [item]?',
        confirm: 'Yes, I no longer need this'
      },
      change: {
        heading: 'Are you sure you want to change [item]?',
        confirm: 'Yes, I want to change this'
      },
      'still-need': {
        heading: 'Are you sure you still need [item]?',
        confirm: 'Yes, I still need this'
      }
    },
    fallback: { heading: 'Are you sure?', confirm: 'Yes' },
    cancel: 'Cancel',
    backTo: 'your-support'
  }

])

/* --------------------------------------------------- out of scope --
   Superseded at the 13 August 2026 review, kept verbatim for the same reason
   as the special measures screens in content.js: these are transcribed
   designs, and what replaced them is newer, not necessarily final.

   Restoring them takes two lines — the screens, then repointing the dashboard
   task at the status page:

     CONTENT.screens = CONTENT.screens.concat(CONTENT.outOfScope.manage)

   What goes out with the status page is worth knowing, because the screen
   that replaced it does not carry any of it:

   - The four groups ARE the Case Flags HLD v2.1 lifecycle rendered for
     citizens — Active, Not Approved, Requested, Inactive. Wireframe 3 was
     the first design in the whole set to confirm the HLD rather than diverge
     from it. The new screen has three sections and none of them is
     "not approved".
   - It is the only screen anywhere that shows a REFUSED request, and the only
     one that shows staff comments back to a citizen.
   - Nothing is ever deleted, which is why "Support no longer needed" existed
     as a group. The new screen keeps that section, so the soft-delete rule
     does survive the swap.

   All three are in REFERENCE.md as questions for the next design
   conversation. */

CONTENT.outOfScope.manage = [

  /* The status page, reached from the dashboard until 13 August 2026. */
  {
    id: 'your-support-status',
    journey: 'manage',
    shell: 'microsite',
    /* The wireframe shows a Cymraeg toggle, which no stage 1 microsite screen
       has — inconsistency xxiii. Reproduced. */
    shellOverrides: { cymraeg: true },
    type: 'support-status',
    /* [name], not [Party name] — inconsistency xxii. Transcribed as drawn. */
    heading: 'Support for [name]',
    blocks: [
      { p: 'View your requests and what status they are in. You can add or remove your support by selecting ‘Change my support options’.' },
      { p: 'If the [court/tribunal] reject any of your requests, you may be able to ask for that support again.' }
    ],
    primaryLink: { label: 'Change my support options', goTo: 'change-support-start' },

    /* The four groups are the Case Flags HLD v2.1 lifecycle rendered for
       citizens: Active, Not Approved, Requested, Inactive. Nothing is ever
       deleted, which is why the last group exists. */
    groups: [
      {
        heading: 'Support we’ve approved',
        flagStatus: 'Active',
        columns: ['Support', 'Details'],
        rows: [
          ['Separate entrance and exit to the court or tribunal to the other party',
            'Due to previous violence I cannot see the other party and feel unsafe in their presence.  I can add comments here up to the length of 200 characters.  I can add comments here up to the length of 200..'],
          ['Language interpreter', 'Spanish']
        ],
        removeLink: 'Tell us you no longer need something'
      },
      {
        heading: 'Support not approved',
        flagStatus: 'Not Approved',
        /* The only group with a third column. */
        columns: ['Support', 'Details', 'Staff comments'],
        rows: [
          ['Parking space close to the venue',
            'I cannot walk further than 200 yards due to my chronic health conditions and need access to a disabled bay I can add comments here up to the length of 200 characters. I can add comments here up to....',
            'There is no parking near the venue.']
        ],
        /* No withdraw link — you cannot withdraw something already refused. */
        removeLink: null
      },
      {
        heading: 'Support waiting for a decision',
        flagStatus: 'Requested',
        columns: ['Support', 'Details'],
        rows: [
          ['Documents in a specific colour', 'Yellow paper'],
          ['Extra time to think and explain myself', 'No reason needed']
        ],
        removeLink: 'Tell us you no longer need something'
      },
      {
        heading: 'Support no longer needed',
        flagStatus: 'Inactive',
        columns: ['Support', 'Details'],
        rows: [
          ['Intermediary', 'No reason needed'],
          ['Sign language interpreter', 'British Sign Language (BSL)']
        ],
        /* Already withdrawn, so nothing to withdraw. */
        removeLink: null
      }
    ],
    /* Both destinations were placeholder screens standing in for wireframes
       that never arrived. They have been deleted; the design that replaced
       this page does the job they were holding open. */
    removeGoTo: 'your-support'
  },

  /* The interstitial behind "Change my support options". Nothing links to it
     any more — the new screen has no equivalent link. */
  {
    id: 'change-support-start',
    journey: 'manage',
    shell: 'microsite',
    shellOverrides: { cymraeg: true },
    type: 'content',
    heading: 'I want to tell you that my support needs have changed',
    blocks: [
      { p: 'Use this form to tell us if your support needs have changed.  You might not need something any more, or you can ask for something new.' },
      /* Tracked change applied: "will be able to" struck, "can" inserted. */
      { inset: 'You can review your application before you submit it.' }
    ],
    actions: {
      primary: 'Start now',
      primaryIsStart: true,
      primaryGoTo: 'your-support',
      secondary: { label: 'Cancel', action: 'cancel' }
    }
  }
]

module.exports = CONTENT
