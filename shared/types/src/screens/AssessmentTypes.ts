export interface QuestionObj {
  isVisible: true;
  _id: string;
  question: {
    en: string;
    gu: string;
  };
  option1?: {
    en: string;
    gu: string;
  };
  option2?: {
    en: string;
    gu: string;
  };
  option3?: {
    en: string;
    gu: string;
  };
  option4?: {
    en: string;
    gu: string;
  };
  correctAnswer: string;
  nid?: string;
  correct_choice?: string;
  correctly_answered?: string;
  category: string;
  id: number;
}
export interface AssessmentCardComponentProps {
  itm: {
    status: string;
    name: string;
    title: { en?: string; gu?: string; hi?: string } | string;
    _id: string;
    assessmentType: string;
    assessment_id?: string;
    updatedAt?: string;
    createdAt?: string;
    toDate?: string;
    fromDate?: string;
    timeToComplete: number;
    questions: QuestionObj[];
    active: boolean;
  };
  assessmentType: string;
}

interface OptionData {
  en: string;
}

interface QuizData {
  question: string | OptionData;
  option1?: OptionData;
  option2?: OptionData;
  option3?: OptionData;
  option4?: OptionData;
  correctAnswer: string;
  correct_choice?: string;
  explanation?: string;
  _id: string;
}

export interface QuizSelectionCardProps {
  data: QuizData;
  onSelect: (
    text: string,
    option: string,
    SubmittedQuesId?: string,
    isSubmitted?: boolean,
    skip?: boolean
  ) => void;
  selectedOption: { text: string; option: string; isSubmitted?: boolean };
  assessmentId: string;
  isProAssessment?: boolean;
  submittedQuestionId?: string;
}

export interface StoreAssessmentResponsePayload {
  assessmentId: string;
  answer: {
    questionId: string;
    answer: string;
    isSubmit: boolean;
    isCorrect: boolean;
  };
}
type Answer = {
  questionId: string;
  answer: string;
  isCorrect: boolean;
  isSubmit: boolean;
  selectedOption: string;
};

export type AssessmentResultApiResponse = {
  _id: string;
  assessmentId: {
    _id: string;
    title: {
      en: string;
    };
  };
  totalMarks: number;
  totalTime: number;
  obtainedMarks: number;
  attempted: number;
  rightAnswer: number;
  wrongAnswer: number;
  skip: number;
  isCalculated: boolean;
  createdAt: string;
  updatedAt: string;
};
export type AssessmentProgressApiResponse = {
  isAssessmentAttempted: number;
  isAssessmentExpired: number;
  remainingTime: number;
  _id: string;
  answers: Answer[];
};

export type StoreAssessmentResponseApiPayload = {
  assessmentId: string;
  answer: {
    questionId: string;
    answer: string;
    isSubmit: boolean;
    selectedOption: string;
    isCorrect: boolean;
  };
};
