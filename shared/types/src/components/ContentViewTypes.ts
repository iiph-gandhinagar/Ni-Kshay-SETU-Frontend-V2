import { ContentPage } from '../screens/KnowledgeBaseTypes';
import { ThemeProps } from '../themeAndAppConfig/ColorThemeTypes';

export interface H5pViewParamsTypes {
  contentPage?: ContentPage[];
  activeContent: string;
  theme?: ThemeProps;
  readContentInfo?: {
    courseId: string;
    moduleId: string;
    chapterId: string;
    contentId: string;
  };
  sendDataBack: (data: string[]) => void;
}

export interface ContentScreenParamsTypes {
  contentType: 'videos' | 'pdfs' | 'ppt' | 'document';
  id?: string;
  header?: string;
  url?: string;
  fileType?: string;
  notSupportedFile?: boolean;
  theme?: ThemeProps;
}

export interface ContentViewParamsTypes {
  contentType:
    | 'videos'
    | 'pdfs'
    | 'ppt'
    | 'document'
    | 'WebPage'
    | 'pdfView'
    | 'h5p';
  url?: string;
  id?: string;
  theme?: ThemeProps;
}
