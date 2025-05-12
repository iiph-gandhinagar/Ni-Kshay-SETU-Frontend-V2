export interface DiagnosisMasterNode {
  _id: string;
  id: number;
  nodeType: string;
  isExpandable: boolean;
  hasOptions: boolean;
  timeSpent: string;
  masterNodeId: string | null;
  index: number;
  header: {
    en: string | null;
  };
  subHeader: {
    en: string | null;
  };
  redirectAlgoType: string | null;
  redirectNodeId: number;
  stateIds: string[];
  cadreIds: string[];
  title: {
    en: string;
    gu: string;
    hi: string;
    mr: string;
    ta: string;
  };
  description: {
    en: string | null;
  };
  parentId: string | null;
  activated: boolean;
  sendInitialNotification: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  icon?: string;
  __v: number;
}
export interface Option {
  id: string;
  label: string;
  value: string;
  _id: string;
  children?: Option[];
}
export interface Node {
  _id?: string;
  id?: number;
  nodeType?: string;
  isExpandable?: number;
  hasOptions?: number;
  timeSpent?: unknown;
  masterNodeId?: string;
  index?: number;
  header?: Translations;
  subHeader?: Translations;
  redirectAlgoType?: any;
  redirectNodeId?: string;
  stateIds?: string[];
  cadreIds?: string[];
  title?: Translations;
  description?: Translations;
  parentId?: string;
  activated?: boolean;
  sendInitialNotification?: boolean;
  deletedAt?: any;
  createdAt?: string;
  updatedAt?: string;
  icon?: string;
  __v?: number;
  options?: Option[];
  children: Node[] | undefined;
}

interface Translations {
  en: string | null;
  gu: string | null;
  hi: string | null;
  mr: string | null;
  ta: string | null;
}
export interface AlgoResponseData {
  activated: boolean;
  cadreIds: string[];
  createdAt: string;
  deletedAt: string | null;
  description: Record<string, unknown>;
  hasOptions: boolean;
  header: {
    en: string | null;
  };
  icon: string;
  id: number;
  index: number;
  isExpandable: boolean;
  masterNodeId: string | null;
  nodeType: string;
  parentId: string | null;
  redirectAlgoType: string;
  redirectNodeId: string;
  sendInitialNotification: boolean;
  stateIds: string[];
  subHeader: {
    en: string | null;
  };
  timeSpent: string;
  title: {
    en: string;
  };
  updatedAt: string;
  __v: number;
  _id: string;
}

export type DiagnosisMasterNodeApiResponse = DiagnosisMasterNode[];
export type DiagnosisDependentApiResponse = Node | undefined;
export type DiagnosisAlgorithmApiResponse = AlgoResponseData | undefined;
