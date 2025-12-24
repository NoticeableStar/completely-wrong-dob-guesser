export interface Question {
  id: string;
  question: string;
  type: 'choice' | 'font' | 'slider' | 'month';
  options?: QuestionOption[];
  sliderConfig?: {
    min: number;
    max: number;
    microcopy?: string;
  };
  showProcessing?: boolean;
  microcopy?: string;
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
