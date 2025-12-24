export interface Question {
  id: string;
  question: string;
  type: 'choice' | 'font' | 'slider';
  options?: QuestionOption[];
  sliderConfig?: {
    min: number;
    max: number;
    labels: [string, string];
  };
}

export interface QuestionOption {
  id: string;
  label: string;
  subtext?: string;
  fontFamily?: string;
}

export interface Answer {
  questionId: string;
  value: string | number;
}

export interface DOBResult {
  date: Date;
  accuracy: number;
  marginOfError: number;
  birthTime?: string;
  personalityTrait: string;
}
