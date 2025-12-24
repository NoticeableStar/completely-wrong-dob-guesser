import { Question } from '@/types/quiz';

export const questions: Question[] = [
  // 1. Behavioral Micro-Judgments
  {
    id: 'alarms',
    question: 'How many alarms do you set for one wake-up?',
    type: 'choice',
    options: [
      { id: '1', label: '1', subtext: 'Confidence or denial' },
      { id: '2-3', label: '2–3', subtext: 'Cautiously optimistic' },
      { id: '4+', label: '4+', subtext: 'You know yourself' },
      { id: 'natural', label: 'I wake up naturally', subtext: '(liar)' },
    ],
  },
  {
    id: 'no-rush',
    question: 'When someone says "no rush," what do you do?',
    type: 'choice',
    showProcessing: true,
    options: [
      { id: 'immediately', label: 'Respond immediately', subtext: 'Urgency is internal' },
      { id: 'reasonable', label: 'Wait a reasonable amount', subtext: 'Measured restraint' },
      { id: 'overthink', label: 'Overthink it', subtext: 'What did they mean?' },
      { id: 'never', label: 'Never respond', subtext: 'Eventually they forget' },
    ],
  },
  // 2. Vibe Detection
  {
    id: 'safe-word',
    question: 'Pick the word that feels safest to you.',
    type: 'choice',
    microcopy: 'This is relevant.',
    options: [
      { id: 'okay', label: 'Okay' },
      { id: 'fine', label: 'Fine' },
      { id: 'sure', label: 'Sure' },
      { id: 'no-worries', label: 'No worries' },
    ],
  },
  {
    id: 'time-of-day',
    question: 'Which time of day feels most like you?',
    type: 'choice',
    options: [
      { id: 'early-morning', label: 'Early morning', subtext: 'Before others wake' },
      { id: 'late-morning', label: 'Late morning', subtext: 'The civilized hours' },
      { id: 'evening', label: 'Evening', subtext: 'When the day exhales' },
      { id: 'late-night', label: 'Very late at night', subtext: 'The truth hours' },
    ],
  },
  {
    id: 'font-trust',
    question: 'Pick a font you would trust with a secret.',
    type: 'font',
    showProcessing: true,
    options: [
      { id: 'serif', label: 'Times New Roman', fontFamily: 'Times New Roman, serif' },
      { id: 'sans', label: 'Helvetica', fontFamily: 'Helvetica, Arial, sans-serif' },
      { id: 'mono', label: 'Courier', fontFamily: 'Courier New, monospace' },
      { id: 'rounded', label: 'Verdana', fontFamily: 'Verdana, sans-serif' },
    ],
  },
  // 3. Existential Light Trauma
  {
    id: 'message-reread',
    question: 'Do you reread messages before sending?',
    type: 'choice',
    microcopy: 'Noted.',
    options: [
      { id: 'never', label: 'Never', subtext: 'Chaos is freedom' },
      { id: 'sometimes', label: 'Sometimes', subtext: 'When stakes exist' },
      { id: 'usually', label: 'Usually', subtext: 'Words are permanent' },
      { id: 'always', label: 'Always', subtext: 'Until certainty dissolves' },
    ],
  },
  {
    id: 'birthdays',
    question: 'How do you feel about birthdays?',
    type: 'choice',
    options: [
      { id: 'enjoy', label: 'I enjoy them', subtext: 'Celebration is good' },
      { id: 'tolerate', label: 'I tolerate them', subtext: 'Social necessity' },
      { id: 'ignore', label: 'I ignore them', subtext: 'Time is arbitrary' },
      { id: 'dread', label: 'I dread them', subtext: 'The system understands' },
    ],
  },
  // 4. False Authority Inputs
  {
    id: 'decisiveness',
    question: 'Rate your decisiveness today.',
    type: 'slider',
    sliderConfig: {
      min: 1,
      max: 100,
      microcopy: 'This helps calibrate.',
    },
  },
  {
    id: 'sleep-schedule',
    question: 'How stable is your sleep schedule?',
    type: 'choice',
    showProcessing: true,
    options: [
      { id: 'very-stable', label: 'Very stable', subtext: 'Rhythmic existence' },
      { id: 'somewhat', label: 'Somewhat stable', subtext: 'Aspirational' },
      { id: 'chaotic', label: 'Chaotic', subtext: 'Sleep finds me' },
      { id: 'nonexistent', label: 'Conceptually nonexistent', subtext: 'Time is a construct' },
    ],
  },
  // 5. Slightly Uncomfortable
  {
    id: 'age-feeling',
    question: 'Do you feel younger or older than you are?',
    type: 'choice',
    microcopy: "We've seen this before.",
    options: [
      { id: 'younger', label: 'Younger', subtext: 'Time moves faster outside' },
      { id: 'about-right', label: 'About right', subtext: 'Rare alignment' },
      { id: 'older', label: 'Older', subtext: 'Experience accumulates' },
      { id: 'fluctuates', label: 'It fluctuates', subtext: 'Temporal instability' },
    ],
  },
  {
    id: 'truly-rested',
    question: 'When was the last time you felt truly rested?',
    type: 'choice',
    options: [
      { id: 'recently', label: 'Recently', subtext: 'The fortunate few' },
      { id: 'weeks', label: 'A few weeks ago', subtext: 'Fading memory' },
      { id: 'months', label: 'Months ago', subtext: 'Noted' },
      { id: 'dont-remember', label: "I don't remember", subtext: 'This is common' },
    ],
  },
  // 6. Dumb but Specific
  {
    id: 'heavy-month',
    question: 'Pick a calendar month that feels "heavy."',
    type: 'month',
    microcopy: 'The system requires this.',
  },
];

export const personalityTraits = [
  "People born on this date tend to overthink messages.",
  "Your temporal signature suggests a fondness for unfinished playlists.",
  "Those with this birthdate often feel judged by their browser history.",
  "You were likely born during a Mercury retrograde. The system cannot confirm this.",
  "People with this DOB frequently apologize for things that aren't their fault.",
  "Your birthday energy indicates you've restarted a show instead of finishing one.",
  "The data suggests you've typed a message, deleted it, then typed the same thing.",
  "Those born on this date often have strong opinions about fonts.",
  "Your temporal residue implies a complicated relationship with alarm clocks.",
  "People with this DOB tend to preview emails more than necessary.",
  "Those born on this date often feel like impostors in their own expertise.",
  "Your data suggests you've apologized to an inanimate object at least once.",
];

export const loadingMessages = [
  "Consulting the timeline…",
  "Analyzing hesitation patterns…",
  "Cross-referencing behavioral markers…",
  "This may feel personal.",
  "Calibrating confidence levels…",
  "Measuring existential uncertainty…",
  "Processing sleep data…",
  "Detecting alarm clock energy…",
  "Evaluating font karma…",
  "Correlating month heaviness…",
  "Almost certain now…",
];

export const retryMessages = [
  "Interesting. Your answers changed.",
  "The system has noted your reconsideration.",
  "We're getting closer.",
  "Your hesitation has been recorded.",
  "The timeline adjusts accordingly.",
];

export const processingMessages = [
  "Processing response…",
  "Noted.",
  "Calibrating…",
  "Interesting.",
];

export const months = [
  { id: 'january', label: 'January' },
  { id: 'february', label: 'February' },
  { id: 'march', label: 'March' },
  { id: 'april', label: 'April' },
  { id: 'may', label: 'May' },
  { id: 'june', label: 'June' },
  { id: 'july', label: 'July' },
  { id: 'august', label: 'August' },
  { id: 'september', label: 'September' },
  { id: 'october', label: 'October' },
  { id: 'november', label: 'November' },
  { id: 'december', label: 'December' },
];
