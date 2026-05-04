/**
 * Wayfinders — Cohort Application Form
 *
 * Run this once in Google Apps Script (script.google.com) to create
 * the full application form. It will log the form URL and the linked
 * Google Sheet URL when done.
 *
 * Steps:
 *   1. Go to https://script.google.com
 *   2. Create a new project
 *   3. Paste this entire file into Code.gs
 *   4. Click Run → createWayfindersForm
 *   5. Authorise when prompted (it needs Forms + Sheets access)
 *   6. Check the Execution log for the URLs
 */

function createWayfindersForm() {
  var form = FormApp.create('Wayfinders — Cohort Application');
  form.setDescription(
    'Apply for a Wayfinders cohort. Five minutes to complete. ' +
    'Honest answers are more useful than impressive ones.\n\n' +
    'Wayfinders is a small, free, mentor-led cohort for UK Christians ' +
    'making real mid-career decisions. Read the principles before applying: ' +
    'https://wayfinders.org.uk/principles'
  );
  form.setConfirmationMessage(
    'Thank you for applying to Wayfinders. Ben reads every application personally ' +
    'and will be in touch within five working days.\n\n' +
    'In the meantime, if you haven\'t already, read the principles at ' +
    'https://wayfinders.org.uk/principles'
  );
  form.setCollectEmail(false); // We collect email in the form itself for control
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(true);

  // ── Section 1: About you ──────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('About you');

  form.addTextItem()
    .setTitle('Your name')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Email')
    .setRequired(true)
    .setValidation(FormApp.createTextValidation()
      .requireTextIsEmail()
      .build());

  form.addTextItem()
    .setTitle('Where in the UK are you based?')
    .setHelpText('Town or city is fine.')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Roughly how old are you?')
    .setChoiceValues(['20s', '30s', '40s', '50s', '60+'])
    .setRequired(true);

  form.addTextItem()
    .setTitle('What do you do for work?')
    .setHelpText('One line is fine.')
    .setRequired(true);

  form.addTextItem()
    .setTitle('What church or tradition shapes your faith?')
    .setHelpText(
      'Anglican / Methodist / Baptist / FIEC / Catholic / non-denom / ' +
      'complicated / not sure — all fine. If "complicated" please add a sentence.'
    )
    .setRequired(true);

  // ── Section 2: The decision ───────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('The decision');

  form.addParagraphTextItem()
    .setTitle('What\'s the decision in front of you?')
    .setHelpText(
      'One paragraph. The actual decision, not the polished version. ' +
      'What you\'re considering, what you\'re avoiding considering, ' +
      'what\'s making it urgent.'
    )
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Why is this decision in front of you now?')
    .setHelpText(
      'What\'s changed? A trigger, a season ending, a question that won\'t go away?'
    )
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('What would "good" look like at the end of eight weeks?')
    .setRequired(true);

  // ── Section 3: Honest checks ──────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Honest checks');

  form.addMultipleChoiceItem()
    .setTitle('Are you currently exploring ordained ministry?')
    .setHelpText(
      'If yes, this isn\'t the right fit — there are better places for that ' +
      'conversation. If "sort of," tell us in the decision question above.'
    )
    .setChoiceValues(['Yes', 'No', 'Sort of'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle(
      'Are you in a personal crisis right now (mental health, relationship ' +
      'breakdown, recent bereavement, addiction)?'
    )
    .setHelpText(
      'This is a discernment cohort, not a crisis support space. If you\'re ' +
      'in crisis, we\'d rather you got the right help first and joined a future cohort.'
    )
    .setChoiceValues(['Yes', 'No', 'Prefer not to say'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle(
      'Can you commit to all five sessions over eight weeks, plus roughly ' +
      'an hour a week of reflection between them?'
    )
    .setChoiceValues(['Yes', 'No', 'Not sure'])
    .setRequired(true);

  // ── Section 4: Closing ────────────────────────────────────────────

  form.addSectionHeaderItem()
    .setTitle('Closing');

  form.addParagraphTextItem()
    .setTitle('Anything else we should know before reading your application?')
    .setRequired(false);

  form.addTextItem()
    .setTitle('How did you hear about Wayfinders?')
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('I\'ve read the principles at wayfinders.org.uk/principles')
    .setChoiceValues(['Yes, I\'ve read them'])
    .setRequired(true);

  // ── Link to a spreadsheet ─────────────────────────────────────────

  form.setDestination(FormApp.DestinationType.SPREADSHEET,
    SpreadsheetApp.create('Wayfinders — Applications').getId());

  // ── Output ────────────────────────────────────────────────────────

  var output = 'Form created!\n\n' +
    'Form URL (live):\n' + form.getPublishedUrl() + '\n\n' +
    'Form URL (edit):\n' + form.getEditUrl() + '\n\n' +
    'Responses sheet:\nhttps://docs.google.com/spreadsheets/d/' + form.getDestinationId();

  Logger.log(output);
  console.log(output);

  // Also write to a doc you can find in Drive
  var doc = DocumentApp.create('Wayfinders — Form URLs');
  doc.getBody().setText(output);
  console.log('URLs also saved to Google Doc: ' + doc.getUrl());
}
