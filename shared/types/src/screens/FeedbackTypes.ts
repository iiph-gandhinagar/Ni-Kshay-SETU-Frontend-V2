interface Question {
  en: string | null;
  mr: string | null;
}

interface Description {
  en: string | null;
  mr: string | null;
}

export interface FeedbackTypes {
  _id: string;
  id: number;
  feedbackValue: number;
  feedbackType: string;
  feedbackDays: number;
  active: boolean;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
  feedbackTime: string | number;
  question: Question;
  description: Description;
  feedbackIcon: string;
}
