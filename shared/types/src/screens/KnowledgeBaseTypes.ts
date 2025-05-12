export interface ContentPage {
  contentTitle: string;
  contentId: string;
  isRead?: boolean;
  isReadContent?: boolean;
  h5pIds: string;
}
export interface Chapter {
  chapterTitle: string;
  chapterId: string;
  moduleId: string;
  courseId: string;
  contentPage?: ContentPage[];
  isChapterRead: boolean;
}
export interface ModuleType {
  moduleTitle: string;
  moduleId: string;
  chapter: Chapter[];
  isModuleRead: boolean;
}
export interface KnowledgeBaseCourseApiResponse {
  _id?: string;
  module?: ModuleType[];
  totalModule: number;
  totalReadModule: number;
}

export interface CoursesType {
  _id?: string;
  courseTitle?: string;
  module?: ModuleType[];
}

export type CourseApiResponse = CoursesType[];

export interface KnowledgeConnectType {
  kbase_course: CourseApiResponse | undefined;
  kbase_chapter_with_content: KnowledgeBaseCourseApiResponse | undefined;
}
