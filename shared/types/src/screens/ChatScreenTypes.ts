export interface ChatTopQuestionTypes {
  id: string;
  question: string;
}
export interface MessageObj {
  _id: string;
  answer: { en: string }[];
  category: string;
  type: string;
  createdAt: string;
  question: { en: string }[];
}
export interface ChatHistoryObj {
  _id: string;
  message: MessageObj[];
  sessionId: string;
  userId: string;
}
export interface SendIdsApiRequest {
  courseId: string;
  moduleId: string;
  chapterId: string;
  contentId: string;
}
export interface ChatTopQuestionApiResponse {
  data?: ChatTopQuestionTypes[];
}
export interface ChatHistoryApiReq {
  currentPage: number;
  list: ChatHistoryObj[];
  totalItems: number;
  totalPages: number;
}
export interface SearchSystemQuestionApiReq {
  sessionId: string;
  id: string;
  NTEPId: string;
}

export interface ChatScreen {
  chat_top_question?: ChatTopQuestionTypes[] | undefined;
  subNodeData?: string[] | object[] | undefined;
  chat_conversion?: ChatHistoryApiReq | undefined;
  sessionId: string | null;
}

export interface ConversationRecord {
  list: {
    message: {
      question: (string | { en: string })[];
    }[];
    sessionId: string;
  }[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}
