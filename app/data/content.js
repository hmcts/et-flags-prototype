/* ==========================================================================
   Your Support — stage 1 content
   ==========================================================================

   Every string the prototype shows lives in this file. It is transcribed from
   the high-fidelity wireframes via the screen inventory in
   YOUR-SUPPORT-PROTOTYPE-PLAN.md, which is the build specification.

   Three rules govern what is in here:

   1. VERBATIM. Copy is reproduced exactly as drawn, including the
      inconsistencies — three different character limits, "certain type of
      hearing" missing its article, mixed sentence case in the
      special-measures list, "a hearing" / "my hearing" / "the hearing" drift.
      Do not tidy these. They are catalogued in REFERENCE.md and surfacing them
      is part of the point of the prototype.

   2. TRACKED CHANGES ARE APPLIED. Several wireframes carry red-strikethrough /
      green-insert revision marks. The resolved wording is what appears here;
      the marked-up form stays in the plan for traceability.

   3. NOTHING IS INVENTED. Where the wireframes are silent, the value is null
      and stays null — flag codes above all. The one exception is the language
      list, which is explicitly placeholder data and is labelled as such on
      screen, in the release notes, and in REFERENCE.md.

   Tokens like [Party name] and [claim/appeal/application] are transcribed as
   the wireframes draw them, then resolved at render time by CONTENT.service
   below. Any token NOT in that map still renders as literal bracketed text,
   which is the honest signal that it is unresolved.
   ========================================================================== */

var CONTENT = {}

/* ------------------------------------------------------------- service --
   The service this demonstration is configured as.

   The wireframes are tokenised because the microsite is meant to be reusable
   across services — wireframe 1 annotates two of its lists "Customisable
   examples per service", and the citizen microsite HLD describes a
   flagContent resource file with ServiceID variants. Rather than editing the
   transcription, the tokens stay verbatim in the content below and are
   substituted here, so that:

     - the content model stays traceable to the wireframes;
     - re-pointing the demonstration at another service is this one object;
     - per-service customisation is something you can see working, not just
       something the documentation claims.

   Tokens deliberately left OUT of this map, because no value has been
   supplied for them still render literally: [Service contact details]. */

CONTENT.service = {
  '[Service name]': 'Employment Tribunals',
  '[Party name]': 'John Doe',
  /* Stage 2's Your support page writes the party token as [name] rather than
     [Party name]. Both are mapped to the same value so the two agree on
     screen; the divergence itself is logged as inconsistency xxii. */
  '[name]': 'John Doe',
  '[court/tribunal]': 'tribunal',
  '[claim/appeal/application]': 'claim'
}

/* -------------------------------------------------------------- shells --
   Two page shells, matching the journey map's swimlanes. The split is
   presentational — this is still one app, not a launch/return contract. */

CONTENT.shells = {
  service: {
    headerVariant: 'service',
    serviceName: '[Service name]',
    signOut: false,
    cymraeg: true,
    contactDisclosure: false,
    phaseBanner: 'This is a new service – your <a class="govuk-link" href="#" data-inert="feedback">feedback</a> will help us to improve it.',
    footerLinks: null
  },
  microsite: {
    /* 'centred' = service name centred in the bar with Sign out on the right.
       Shared with the stage 2 ET shell; headerTheme picks the colour.

       The wireframes draw this bar BLACK and name it "Your support", because
       the microsite was designed before the 2025 GOV.UK rebrand. Changed at the
       13 August review: the prototype went blue, black, blue as you crossed
       between the service and the microsite, and nobody wanted to explain that
       to a judge. Mitchell: "everything's meant to be blue... it's not a design
       decision to keep things black" — the rebrand is rolling out service by
       service and this one has not had its turn yet. Jones: "if it's not
       difficult, it might just help, so we don't have to explain."

       So both values below are overrides, not transcription. The black bar is
       still in overrides.css and the name is one string: put 'microsite' and
       'Your support' back and the wireframes are what you see again. */
    headerVariant: 'centred',
    headerTheme: 'et',
    serviceName: '[Service name]',
    signOut: true,
    cymraeg: false,
    contactDisclosure: false,
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
}

/* The block that sits above the footer on every microsite screen. */
CONTENT.contactsForHelp = {
  heading: 'Contacts for help'
}

/* Contact details shared by the opening page and the Manage journey. */
CONTENT.etContact = {
  intro: 'Call one of our Employment Tribunal customer contact centres. They cannot give you legal advice.',
  lines: [
    'Monday to Friday, 9am to 5pm',
    'Telephone: 0300 323 0196',
    'Telephone: 0300 303 5176 (Welsh language)',
    'Telephone: 0300 790 6234 (Scotland)'
  ],
  webchat: 'Webchat (Scotland only)',
  link: 'Find out about call charges (opens in new tab)',
  linkUrl: 'https://www.gov.uk/call-charges'
}

/* ------------------------------------------------------------ languages --
   PLACEHOLDER DATA. No sign-language list exists in any source document. This is
   here so the field on screen 7 can be demonstrated at all; it is
   not reference data and must not be read as a shortlist. Flagged on screen,
   in the release notes and in REFERENCE.md. */

CONTENT.placeholderLanguages = {
  sign: [
    'British Sign Language (BSL)', 'Deafblind manual', 'Irish Sign Language (ISL)',
    'Lipspeaker', 'Makaton', 'Sign Supported English (SSE)'
  ]
}

CONTENT.placeholderNote =
  'Prototype note: this list is placeholder data, not a real sign-language list. ' +
  'No sign-language list exists in any of the source documents.'

/* -------------------------------------------------------------- screens --
   `when` is the predicate from the flow table: the engine skips any screen
   whose predicate returns false. Screens with no `when` are always shown. */

CONTENT.screens = [

  /* --------------------------------------------------------------- 1 --- */
  {
    id: 'start',
    shell: 'service',
    caption: 'Your Support',
    title: 'Tell us if you need support',
    heading: 'Tell us if you need support',
    type: 'content',
    showContactUs: true,
    blocks: [
      { p: 'Some people need support to access information and use our services. We call this a reasonable adjustment.' },
      { p: 'Examples of reasonable adjustments are:' },
      /* Annotated in the wireframe as "Customisable examples per service". */
      { ul: [
        'step-free access if your case goes to a hearing and it happens in person',
        'bringing support with you to the hearing, like someone you know or an assistance dog',
        'documents in an alternative format, like large print',
        'regular breaks during a hearing'
      ] },
      { p: "You can ask for a reasonable adjustment now by selecting 'Continue to the questions' or at any time after you submit your [claim/appeal/application]. We will tell you how to do this." },

      { h2: 'Support before a tribunal hearing' },
      { p: 'If you need support before your hearing, for example a reasonable adjustment for alternative formats like large print, you can ask for support at any time during your case.' },

      { h2: 'Support at a hearing' },
      { p: 'Not everyone has to attend a hearing. We will tell you if you need to attend a hearing - you can then tell us what support you need. Consider remote and in-person hearings in case your preferred hearing type is not possible.' },

      { h2: 'Support for someone else' },
      { p: 'If someone you are bringing to the hearing needs support, contact the tribunal after you submit your [claim/appeal/application].' },

      { h2: 'Ask for something else' },
      { p: 'You must contact the tribunal directly to ask for something else for you or someone else who is coming to [court/tribunal] to support you.' },
      { p: 'Examples of other support are:' },
      /* Also annotated "Customisable examples per service". */
      { ul: [
        'communication and documents in Welsh or to speak Welsh at your hearing',
        'a language interpreter',
        'special measures, like giving evidence in private because you are vulnerable'
      ] },
      { p: 'After you submit your [claim/appeal/application], you can contact the tribunal dealing with your case to ask for something else.' }
    ],
    actions: {
      primary: 'Continue to the questions',
      secondary: { label: 'I do not need any support at this time', action: 'restart' }
    }
  },

  /* --------------------------------------------------------------- 2 --- */
  {
    id: 'triage',
    shell: 'microsite',
    caption: 'Reasonable adjustments for [Party name]',
    title: 'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
    heading: 'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
    headingSize: 'l',
    type: 'checkboxes',
    stateKey: 'triage',
    blocks: [
      /* Revision marks applied: "We know" -> "Some people", "often" deleted. */
      { p: 'Some people need support to access information and use our services. We call this a reasonable adjustment. Some reasonable adjustments need to be agreed by the judge or HMCTS. You can discuss with the [court/tribunal] if your needs change.' }
    ],
    hint: 'Select all that apply to you',
    options: [
      { id: 'travel', label: 'I need adjustments to get to, into and around our buildings',
        hint: 'For example, access and mobility support if a hearing takes place in person' },
      { id: 'documents', label: 'I need documents in an alternative format',
        hint: 'For example, braille or different colours and text sizes' },
      { id: 'communication', label: 'I need help communicating and understanding',
        hint: 'For example, hearing, speaking or interpretation' },
      { id: 'forms', label: 'I need help with forms',
        hint: 'For example, help with completing forms on paper or online' },
      { id: 'comfort', label: 'I need something to feel comfortable during a hearing',
        hint: 'For example, breaks or extra space. Think about what you would need if the hearing was in person, by phone or video.' },
      { id: 'support', label: 'I need to bring support with me to a hearing',
        hint: 'For example, someone you know or an assistance dog' },
      { id: 'hearings', label: 'I need to ask for a certain type of hearing',
        hint: 'For example, in person, by video, or by phone' }
    ],
    /* Triage selections gate the category screens but are not themselves
       support requests, so they contribute no rows to Check your answers. */
    excludeFromSummary: true,
    exclusive: { id: 'triage-none', label: 'I do not need any reasonable adjustments at this time' }
  },

  /* --------------------------------------------------------------- 3 --- */
  {
    id: 'travel',
    shell: 'microsite',
    caption: 'Reasonable adjustments for [Party name]',
    heading: 'I need adjustments to get to, into and around our buildings',
    type: 'checkboxes',
    hint: 'Select all that apply to you',
    when: function (s) { return s.triage.indexOf('travel') !== -1 },
    options: [
      { id: 'travel-chair', label: 'A different type of chair', code: null,
        hint: 'For example, a chair with back support',
        comment: { prompt: 'Describe what type of chair you need',
                   input: 'text', maxLength: 200 } },
      { id: 'travel-toilet', label: 'Accessible toilet', code: null },
      { id: 'travel-guiding', label: 'Guiding in the building', code: null,
        comment: { prompt: 'Describe what help you would need being guided in the building',
                   input: 'text', maxLength: 200 } },
      { id: 'travel-lift', label: 'Help using a lift', code: null,
        comment: { prompt: 'Tell us what help you would need to use the lift',
                   input: 'text', maxLength: 200 } },
      { id: 'travel-parking', label: 'Parking space close to the venue', code: null,
        comment: { prompt: 'Tell us why you need a parking space close to the venue',
                   input: 'text', maxLength: 200 } },
      { id: 'travel-stepfree', label: 'Step free / wheelchair access', code: null },
      { id: 'travel-wheelchair', label: 'Use of a venue wheelchair', code: null,
        comment: { prompt: 'Tell us why you need use of a venue wheelchair',
                   input: 'text', maxLength: 200 } },
      { id: 'travel-other', label: 'Other', code: null,
        comment: { prompt: 'Describe what support you need travelling to, or around buildings',
                   input: 'textarea', maxLength: 200 } }
    ],
    exclusive: { id: 'travel-none', label: 'I do not need any help travelling or moving around at this time' }
  },

  /* --------------------------------------------------------------- 4 --- */
  {
    id: 'documents',
    shell: 'microsite',
    caption: 'Reasonable adjustments for [Party name]',
    heading: 'I need documents in an alternative format',
    type: 'checkboxes',
    when: function (s) { return s.triage.indexOf('documents') !== -1 },
    blocks: [
      /* Revision applied here: "as well as" -> "including". Screens 5 and 6
         carry the same sentence in its pre-edit form; see inconsistency viii. */
      { p: 'Think about all communications with the [court/tribunal], including what you might need at a hearing. Consider remote and in-person hearings in case your preferred hearing type is not possible.' }
    ],
    hint: 'Select all that apply to you',
    options: [
      { id: 'documents-audio', label: 'Audio translation of documents', code: null },
      { id: 'documents-braille', label: 'Braille documents', code: null },
      { id: 'documents-colour', label: 'Documents in a specified colour', code: null,
        comment: { prompt: 'Describe what colour or colours you need', input: 'text', maxLength: 200 } },
      { id: 'documents-easyread', label: 'Documents in an easy read format', code: null,
        hint: 'Information written in simple language with pictures' },
      { id: 'documents-largeprint', label: 'Documents in large print', code: null,
        comment: { prompt: 'Describe what print size you need', input: 'text', maxLength: 200 } },
      { id: 'documents-readout', label: 'Documents read out to me', code: null },
      { id: 'documents-email', label: 'Information emailed to me', code: null },
      { id: 'documents-other', label: 'Other', code: null,
        comment: { prompt: 'Describe what document format or formats you need',
                   input: 'textarea', maxLength: 200 } }
    ],
    exclusive: { id: 'documents-none', label: 'I do not need documents in an alternative format at this time' }
  },

  /* --------------------------------------------------------------- 5 --- */
  {
    id: 'communication',
    shell: 'microsite',
    caption: 'Reasonable adjustments for [Party name]',
    heading: 'I need help communicating and understanding',
    type: 'checkboxes',
    when: function (s) { return s.triage.indexOf('communication') !== -1 },
    blocks: [
      { p: 'Think about all communications with the [court/tribunal], as well as what you might need at a hearing. Consider remote and in-person hearings in case your preferred hearing type is not possible.' }
    ],
    hint: 'Select all that apply to you',
    options: [
      { id: 'comm-explanation', label: "Explanation of the court or tribunal and who's in the room at the hearing", code: null },
      { id: 'comm-extratime', label: 'Extra time to think and explain myself', code: null,
        comment: { prompt: 'Tell us why you would need extra time to think and explain yourself',
                   input: 'text', maxLength: 200 } },
      { id: 'comm-enhancement', label: 'Hearing enhancement system (Hearing/Induction Loop, Infrared Receiver)', code: null,
        hint: 'You can tell us which type of hearing enhancement in the next step',
        routesTo: 'hearing-enhancement' },
      { id: 'comm-intermediary', label: 'Intermediary', code: null,
        hint: 'A person to help you if you have communication needs by providing professional support to participate in a hearing' },
      { id: 'comm-close', label: 'Need to be close to who is speaking', code: null,
        comment: { prompt: 'Tell us why you would need to be close to who is speaking',
                   input: 'text', maxLength: 200 } },
      { id: 'comm-signlanguage', label: 'Sign Language Interpreter', code: null,
        hint: 'You can tell us which type of interpreter in the next step',
        routesTo: 'sign-language' },
      { id: 'comm-visit', label: 'Visit to court or tribunal before the hearing', code: null,
        comment: { prompt: 'Tell us why you would need a visit to the venue before the hearing',
                   input: 'text', maxLength: 200 } },
      { id: 'comm-other', label: 'Other', code: null,
        comment: { prompt: 'Describe what help you need with communicating and understanding',
                   input: 'textarea', maxLength: 200 } }
    ],
    exclusive: { id: 'comm-none', label: 'I do not need help with communicating and understanding at this time' }
  },

  /* --------------------------------------------------------------- 6 --- */
  {
    id: 'hearing-enhancement',
    shell: 'microsite',
    /* The frame does not show Sign out. Reproduced per the fidelity rule and
       logged as inconsistency ii — it is a finding, not a bug in this build. */
    shellOverrides: { signOut: false },
    caption: 'Reasonable adjustments for [Party name]',
    heading: 'Hearing Enhancement System (Hearing/Induction Loop, Infrared Receiver)',
    type: 'checkboxes',
    when: function (s) { return !!s.selections['comm-enhancement'] },
    blocks: [
      { p: 'Think about all communications with the [court/tribunal], as well as what you might need at a hearing. Consider remote and in-person hearings in case your preferred hearing type is not possible.' }
    ],
    hint: 'Select all that apply to you',
    options: [
      { id: 'he-hearingloop', label: 'Hearing loop (hearing enhancement system)', code: null },
      { id: 'he-infrared', label: 'Infrared receiver (hearing enhancement system)', code: null },
      { id: 'he-inductionloop', label: 'Induction loop (hearing enhancement system)', code: null },
      { id: 'he-other', label: 'Other', code: null,
        comment: { prompt: 'Describe what type of hearing enhancement you need',
                   input: 'textarea', maxLength: 200 } }
    ],
    exclusive: { id: 'he-none', label: 'I do not need any hearing enhancements at this time' }
  },

  /* --------------------------------------------------------------- 7 --- */
  {
    id: 'sign-language',
    shell: 'microsite',
    caption: 'Reasonable adjustments for [Party name]',
    heading: 'Which sign language interpreter support do you need to ask for?',
    type: 'language',
    stateKey: 'signLanguage',
    languages: 'sign',
    when: function (s) { return !!s.selections['comm-signlanguage'] },
    blocks: [
      { p: "If you need to ask for an interpreter of your chosen gender, select 'Enter my language requirements manually'." }
    ],
    selectLabel: 'Start typing to choose the language',
    manual: {
      label: 'Enter my language requirements manually',
      hint: 'Include your chosen language and gender if required',
      revealLabel: 'Enter the type of sign language support you need to ask for',
      maxLength: 80
    },
    /* Neither language screen has an "I do not need ... at this time" option
       — inconsistency iv. Reproduced. */
    exclusive: null,
    summaryLabel: 'Sign Language Interpreter'
  },

  /* --------------------------------------------------------------- 8 --- */
  {
    id: 'forms',
    shell: 'microsite',
    caption: 'Reasonable adjustments for [Party name]',
    heading: 'I need help with forms',
    type: 'checkboxes',
    when: function (s) { return s.triage.indexOf('forms') !== -1 },
    hint: 'Select all that apply to you',
    options: [
      /* RA0018 "Support filling in forms" is the only flag code attested in any
         source document, but nothing states which of these options it maps to,
         so it is not assigned here. Recorded in REFERENCE.md. */
      { id: 'forms-guidance', label: 'Guidance on how to complete forms online or on paper', code: null,
        comment: { prompt: 'Describe what guidance you need to complete forms', input: 'text', maxLength: 200 } },
      { id: 'forms-someone', label: 'Someone to help you complete forms online or on paper', code: null,
        comment: { prompt: 'Describe what support you need with filling in forms', input: 'text', maxLength: 200 } },
      { id: 'forms-other', label: 'Other', code: null,
        comment: { prompt: 'Describe what help you need with forms', input: 'textarea', maxLength: 200 } }
    ],
    exclusive: { id: 'forms-none', label: 'I do not need any help with forms at this time' }
  },

  /* --------------------------------------------------------------- 9 --- */
  {
    id: 'comfort',
    shell: 'microsite',
    caption: 'Reasonable adjustments for [Party name]',
    /* "during my hearing" here; the triage checkbox says "during a hearing"
       — inconsistency v. */
    heading: 'I need something to feel comfortable during my hearing',
    type: 'checkboxes',
    when: function (s) { return s.triage.indexOf('comfort') !== -1 },
    blocks: [
      { p: 'Think about what you would need if the hearing was in person, by phone or video.' }
    ],
    hint: 'Select all that apply to you',
    options: [
      { id: 'comfort-lighting', label: 'Appropriate lighting', code: null,
        comment: { prompt: 'Describe what type of lighting you need', input: 'text', maxLength: 200 } },
      { id: 'comfort-waiting', label: 'Private waiting area', code: null,
        comment: { prompt: 'Tell us why you would need a private waiting area',
                   input: 'text', maxLength: 200 } },
      { id: 'comfort-breaks', label: 'Regular breaks', code: null },
      { id: 'comfort-space', label: 'Space to be able to get up and move around', code: null },
      { id: 'comfort-other', label: 'Other', code: null,
        comment: { prompt: 'Describe what you need to ask for to make you feel comfortable',
                   input: 'textarea', maxLength: 200 } }
    ],
    exclusive: { id: 'comfort-none', label: 'I do not need something else to feel comfortable at this time' }
  },

  /* -------------------------------------------------------------- 10 --- */
  {
    id: 'support',
    shell: 'microsite',
    caption: 'Reasonable adjustments for [Party name]',
    heading: 'I need to bring support with me to a hearing',
    type: 'checkboxes',
    when: function (s) { return s.triage.indexOf('support') !== -1 },
    blocks: [
      /* "if a hearing was" here, "if the hearing was" on screen 9
         — inconsistency vi. */
      { p: 'Think about what you would need if a hearing was in person, by phone or video.' }
    ],
    hint: 'Select all that apply to you',
    options: [
      { id: 'support-dog', label: 'Assistance / guide dog', code: null },
      /* These two prompts invite naming a third party, against the microsite
         HLD's "No PII for any person is persisted, displayed or processed".
         Reproduced as drawn; raised as open question 4. */
      { id: 'support-friend', label: 'Friend or family member', code: null,
        comment: { prompt: 'Tell us which friend or family member you want to bring and why',
                   input: 'text', maxLength: 200 } },
      { id: 'support-carer', label: 'Support worker or carer', code: null,
        comment: { prompt: 'Tell us which support worker or carer you want to bring and why',
                   input: 'text', maxLength: 200 } },
      { id: 'support-therapy', label: 'Therapy animal', code: null,
        comment: { prompt: 'Tell us what type of therapy animal you want to bring and why',
                   input: 'text', maxLength: 200 } },
      { id: 'support-other', label: 'Other', code: null,
        comment: { prompt: 'Describe what support you want to bring and why',
                   input: 'textarea', maxLength: 200 } }
    ],
    exclusive: { id: 'support-none', label: 'I do not need to bring support with me at this time' }
  },

  /* -------------------------------------------------------------- 11 --- */
  {
    id: 'hearings',
    shell: 'microsite',
    caption: 'Reasonable adjustments for [Party name]',
    heading: 'I need to ask for a certain type of hearing',
    type: 'checkboxes',
    when: function (s) { return s.triage.indexOf('hearings') !== -1 },
    blocks: [
      /* Revision applied: the struck sentence replaced by the green one. */
      { p: 'The [court/tribunal] will consider your request for a hearing type and tell you if they can support it. The [court/tribunal] may need to decide on the hearing type. We will send you instructions on how to attend before the hearing.' }
    ],
    hint: 'Select all that apply to you',
    /* The only screen where every option carries a mandatory comment. All three
       stay selectable together, as drawn — no validation was designed. See
       open question 7. */
    options: [
      { id: 'hearings-inperson', label: 'In-person hearing', code: null,
        hint: 'Where you attend the court or tribunal',
        comment: { prompt: 'Tell us why you need to have an in person hearing', input: 'text', maxLength: 200 } },
      { id: 'hearings-phone', label: 'Phone hearing', code: null,
        hint: 'Where you can attend by phone from a place suitable to you',
        comment: { prompt: 'Tell us why you need to have a phone hearing', input: 'text', maxLength: 200 } },
      { id: 'hearings-video', label: 'Video hearing', code: null,
        hint: 'Where you can attend by video from a place suitable to you',
        comment: { prompt: 'Tell us why you need to have a video hearing', input: 'text', maxLength: 200 } }
    ],
    /* Missing article in the source — inconsistency xv. Reproduced. */
    exclusive: { id: 'hearings-none', label: 'I do not need to ask for certain type of hearing at this time' }
  },

  /* -------------------------------------------------------------- 17 --- */
  {
    id: 'cya',
    shell: 'microsite',
    /* The only microsite screen with no caption. */
    heading: "Review the support you've asked for",
    type: 'cya',
    partyRowKey: 'Name of party',
    partyRowValue: '[Party name]',
    /* Revision applied: "now" struck from the heading. */
    listHeading: 'New support you want to ask for',
    emptyMessage: 'You have not asked for any support.',
    actions: {
      addAnother: 'Add a new support request',
      primary: 'Submit'
    }
  },

  /* -------------------------------------------------------------- 18 --- */
  {
    id: 'confirmation',
    /* Service shell, and it drops the phase banner and Back link. */
    shell: 'service',
    /* The CSS export has the phase banner and Back link hidden, Sign out
       present, and a six-link footer — unlike wireframe 1, which has neither
       Sign out nor footer links. The six are not enumerated in the export, so
       they are taken from the microsite shell. */
    shellOverrides: {
      phaseBanner: null,
      backLink: false,
      signOut: true,
      cymraeg: false,
      contactDisclosure: false,
      footerLinks: [
        'Cookies',
        'Privacy Policy',
        'Terms and Conditions',
        'Help using GOV.UK',
        'Contact us',
        'Accessibility statement'
      ]
    },
    title: 'You have added your support request',
    type: 'confirmation',
    panel: 'You have added your support request to your [claim/appeal/application]',
    blocks: [
      { h2: 'What happens next' },
      { p: 'Once you submit your [claim/appeal/application], the tribunal will review your support request. Some reasonable adjustments may need to be approved by a judge. The tribunal may contact you if more information is needed.' },
      { p: 'You can tell us if your support needs change after you submit your [claim/appeal/application].' }
    ],
    /* The wireframe draws a "Save as draft" secondary button beside this one.
       Taken out at the 13 August review — Anders: "I'd take this Save as draft
       out as well, because that was included in the Figma but it's not part of
       the screens", agreed by Mitchell. */
    actions: {
      primary: { label: 'Continue your [claim/appeal/application]', action: 'restart' }
    },
    /* Wording differs from every other screen's contact block
       — inconsistency xviii. Reproduced. */
    contact: { heading: 'Contact', body: '[Service contact details]' }
  }
]

/* ----------------------------------------------------- out of scope --
   Special measures are NOT in this iteration. Taken out at the review on
   13 August 2026 — Anders: "we're not including special measures on this
   iteration... we'll take those out", Jones: "I just take them out".

   The transcription is kept here verbatim rather than deleted, because the
   decision is a phasing one and nothing about the designs changed. Screens
   held here are invisible to everything: the flow, the Back and Continue
   walk, Check your answers, and the demo bar's jump list, which is built
   from the screen list rather than from what is reachable.

   To put them back, one line, anywhere after this block:

     CONTENT.screens = CONTENT.screens.concat(CONTENT.outOfScope.specialMeasures)

   What goes with them: the third character limit (1000, on the reasons
   field — inconsistency iii), the only screen that says some requests need
   judicial approval, and the "me or someone else" third-party question.
   All three are recorded in REFERENCE.md. */

CONTENT.outOfScope = {
  specialMeasures: [

    /* -------------------------------------------------------------- 15 --- */
    {
      id: 'special-measures-triage',
      shell: 'microsite',
      caption: 'Special measures for [Party name]',
      heading: 'Special measures for your case',
      type: 'radios',
      stateKey: 'specialMeasures',
      blocks: [
        /* All seven paragraphs are annotated "Standard copy for all services" —
           fixed, not service-overridable. */
        { p: 'Some people can get extra arrangements if they are vulnerable and do not feel safe attending a hearing, or giving evidence.' },
        { p: "These are called 'special measures'. They could be for you, or someone with you, such as a witness." },
        { p: 'You can tell us what support you want to ask for and give more details if you want to. The [court/tribunal] might not know the details of your case yet.' },
        { p: "Some special measures might have been arranged for you already. You can ask for them here if you're not sure." },
        { p: 'The [court/tribunal] will review your request based on the facilities available. Some requests need to be approved by a judge.' },
        { p: 'Even if we cannot provide everything you ask for, we will try to make sure you feel as safe as possible.' },
        { p: 'Asking for special measures will not delay, or affect the decision on your case.' },
        /* The wireframe has a "[Service configurable content - see guidance]"
           paragraph here, annotated "Copy you can customise". Removed for this
           build: no copy has been written for it, and an unfilled placeholder
           in the middle of otherwise finished prose reads as a defect. The
           requirement it stands for is recorded in REFERENCE.md. */
        { h2: 'Special measures you can ask for:' },
        /* Annotated "Full list as of October 2025" — fixed and dated, not
           per-service. Sentence case is inconsistent in the source (five
           lowercase, three uppercase) — inconsistency xiv. Reproduced. */
        { ul: [
          'pre-record your evidence on video before the hearing',
          'join the hearing and give evidence by video',
          'Separate entrance and exit to the court or tribunal',
          'Separate waiting area in the court or tribunal',
          'Screens so you and the other people in the case cannot see each other',
          'give evidence in private to the [court/tribunal] without someone else present',
          'single-sex judging panel and [court/tribunal] staff',
          'judges or barristers do not wear wigs or gowns'
        ] }
      ],
      legend: 'Do you need to ask for special measures?',
      options: [
        { id: 'yes', label: 'Yes, I need to ask for special measures for me or someone else' },
        { id: 'no', label: 'No, I do not need to ask for special measures at this time' }
      ]
    },

    /* -------------------------------------------------------------- 16 --- */
    {
      id: 'special-measures',
      shell: 'microsite',
      caption: 'Special measures for [Party name]',
      heading: 'Asking for special measures',
      type: 'checkboxes',
      when: function (s) { return s.specialMeasures === 'yes' },
      blocks: [
        { p: 'The [court/tribunal] will review your request to see if it can support it.' }
      ],
      legend: 'Select the special measures you want to ask for',
      /* Order and wording differ from the informational list on screen 15, and
         the [court/tribunal] token is expanded to literal words on the last item
         — inconsistencies xii and xiii. Both reproduced. */
      options: [
        { id: 'sm-entrance', label: 'Separate entrance and exit to the court or tribunal', code: null },
        { id: 'sm-waiting', label: 'Separate waiting area in the court or tribunal', code: null },
        { id: 'sm-screens', label: 'Screens so you and the other people in the case cannot see each other', code: null },
        /* Two options carry service-configurable placeholder hints in the
           wireframe — "[service configurable content]" here and "[configurable
           hint text to describe service-specific rules]" on Give evidence in
           private. Both removed for this build, for the same reason as the
           placeholder paragraph on screen 15. */
        { id: 'sm-video', label: 'Join the hearing and give evidence by video', code: null },
        { id: 'sm-prerecord', label: 'Pre-record your evidence on video before the hearing', code: null,
          hint: 'The court or tribunal will send you instructions on how to do this' },
        { id: 'sm-private', label: 'Give evidence in private', code: null },
        { id: 'sm-wigs', label: 'Judges or barristers do not wear wigs or gowns', code: null },
        { id: 'sm-panel', label: 'Single-sex judging panel and court or tribunal staff', code: null,
          hint: 'This does not include representation for individual parties' }
      ],
      /* No "or / I do not need..." option — screen 15 carries that decision. */
      exclusive: null,
      /* One free-text reason for the whole request, not a comment per item
         — inconsistency xx. Third distinct character limit — inconsistency iii. */
      after: {
        blocks: [
          { h2: 'Give us more details if you can' },
          { p: 'We need to ask for your reasons as the [court/tribunal] may not have all of the details of your case yet.' }
          /* The wireframe follows this with a "[Service configurable content -
             see guidance]:" line and two placeholder bullets. All three removed
             for this build; the section now runs straight into the field. */
        ],
        field: {
          id: 'sm-reason',
          label: 'Enter your reasons why you need to ask for this support',
          input: 'textarea',
          maxLength: 1000
        }
      }
    }

  ]
}

/* Everything above is the Request support journey. Tagged in bulk rather than
   screen by screen, so the transcription stays exactly as it was reviewed.
   Stage 2's screens declare journey: 'manage' individually in
   content-manage.js, which loads after this file. */
CONTENT.screens.forEach(function (screen) { screen.journey = 'request' })

/* The out-of-scope screens are tagged too, even though nothing walks them.
   The bulk line above only sees CONTENT.screens, so without this the restore
   would put back two screens with no journey — which the flow reads as
   belonging to neither, and silently skips. */
CONTENT.outOfScope.specialMeasures.forEach(function (screen) { screen.journey = 'request' })

module.exports = CONTENT
