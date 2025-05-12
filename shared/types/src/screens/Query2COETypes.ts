export interface QueryType {
  _id: string;
  age: string;
  queryId: string;
  sex: string;
  diagnosis: string;
  dateOfAdmission: string;
  chiefComplaint: string;
  illness: string;
  pastHistory: string;
  preTreatmentEvaluation: string;
  assessmentAndDiffDiagnosis: string;
  currentTreatmentPlan: string;
  query: string;
  response?: string;
  raisedBy?: {
    _id: string;
    name: string;
  };
  respondedBy?: string;
  queryRaisedRole?: string;
  queryRespondedRole?: string;
  queryRaisedInstitute: string;
  queryRespondedInstitute?: unknown;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  payload?: [string];
}
export interface QueryListType {
  list: QueryType[];
  totalItems: 0;
  currentPage: 0;
  totalPages: 0;
}
export interface InstitutesType {
  _id: string;
  title: string;
  role: string;
  typeDetails: {
    _id: string;
    name: string;
    description: string;
    permission: [];
    createdAt: string;
    updatedAt: string;
  };
}

export interface InstitutesDataApiRes {
  data: InstitutesType[];
}
export interface UpdateQueryPayload {
  response: string;
  respondedBy: string;
  queryRespondedRole: string;
  queryRespondedInstitute: string;
}
export interface RaiseQueryPayload {
  age: string;
  sex: string;
  diagnosis: string;
  dateOfAdmission: string;
  chiefComplaint: string;
  illness: string;
  pastHistory: string;
  preTreatmentEvaluation: string;
  assessmentAndDiffDiagnosis: string;
  currentTreatmentPlan: string;
  query: string;
  response: string;
  raisedBy: unknown;
  respondedBy: unknown;
  queryRaisedRole: unknown;
  queryRespondedRole?: unknown;
  queryRaisedInstitute: string;
  queryRespondedInstitute?: unknown;
  status: string;
  payload?: [string];
}

export interface TransferQueryBYSubApiRequest {
  instituteId: string;
  questions: string[];
}
export interface Query2COEDataType {
  query_list: QueryListType | undefined;
  institute_list: InstitutesType[] | undefined;
}
