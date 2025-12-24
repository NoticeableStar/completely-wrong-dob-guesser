import { Question } from '@/types/quiz';

export const questions: Question[] = [
  {
    id: 'browser-tabs',
    question: 'How aggressively do you close browser tabs?',
    type: 'choice',
    options: [
      { id: 'never', label: 'Never', subtext: 'They accumulate like memories' },
      { id: 'sometimes', label: 'Occasionally', subtext: 'When the guilt becomes unbearable' },
      { id: 'often', label: 'Frequently', subtext: 'Order brings peace' },
      { id: 'always', label: 'Immediately', subtext: 'One tab. One purpose.' },
    ],
  },
  {
    id: 'font-trust',
    question: 'Pick a font you trust.',
    type: 'font',
    options: [
      { id: 'serif', label: 'Times New Roman', fontFamily: 'Times New Roman, serif' },
      { id: 'sans', label: 'Helvetica', fontFamily: 'Helvetica, Arial, sans-serif' },
      { id: 'mono', label: 'Courier', fontFamily: 'Courier New, monospace' },
      { id: 'display', label: 'Georgia', fontFamily: 'Georgia, serif' },
    ],
  },
  {
    id: 'message-reread',
    question: 'Do you reread messages before sending?',
    type: 'choice',
    options: [
      { id: 'never', label: 'Never', subtext: 'Chaos is a feature' },
      { id: 'once', label: 'Once', subtext: 'Just to be safe' },
      { id: 'multiple', label: 'Multiple times', subtext: 'Words matter' },
      { id: 'obsessive', label: 'Until I doubt everything', subtext: 'Then send anyway' },
    ],
  },
  {
    id: 'weather-introspection',
    question: 'Favorite weather to be introspective in?',
    type: 'choice',
    options: [
      { id: 'rain', label: 'Rain', subtext: 'The classic' },
      { id: 'overcast', label: 'Overcast', subtext: 'Neutral melancholy' },
      { id: 'sunny', label: 'Harsh sunlight', subtext: 'Ironic sadness' },
      { id: 'fog', label: 'Fog', subtext: 'Aesthetic uncertainty' },
    ],
  },
  {
    id: 'button-hesitation',
    question: 'Do you hesitate before clicking buttons?',
    type: 'choice',
    options: [
      { id: 'never', label: 'Never', subtext: 'Consequences are future problems' },
      { id: 'important', label: 'Only important ones', subtext: 'Risk assessment' },
      { id: 'always', label: 'Every single time', subtext: 'What if?' },
      { id: 'hover', label: 'I hover indefinitely', subtext: 'The click may never come' },
    ],
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
];

export const loadingMessages = [
  "Consulting the timeline…",
  "Analyzing temporal residue…",
  "Cross-referencing astrology (optional)…",
  "This may feel personal.",
  "Calibrating confidence levels…",
  "Measuring existential uncertainty…",
  "Processing life decisions…",
  "Detecting browser tab energy…",
  "Evaluating font karma…",
  "Almost certain now…",
];

export const retryMessages = [
  "Interesting. Your answers changed.",
  "The system has noted your reconsideration.",
  "We're getting closer.",
  "Your hesitation has been recorded.",
  "The timeline adjusts accordingly.",
];
