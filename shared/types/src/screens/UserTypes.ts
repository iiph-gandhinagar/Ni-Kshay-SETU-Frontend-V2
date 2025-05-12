export interface UserActivityApiPayload {
  module: string; // module name (LeaderBoard , Assessment,kbase)
  subModule?: string; // aa optional che (for algorithm)
  action: string; // action je b kari hoi read
  totalTime?: number; // optional (for algorithms only)
  timeSpent?: number; // optional (for algorithms only)
  completedFlag?: boolean; // optional
  ipAddress?: string; // optional
  platform?: string; // optional
  payload?: unknown;
}
export interface UserProfileApiResponse {
  _id?: string;
  blockId?: string | null;
  cadreId?: string | null;
  cadreType?: string | null;
  countryId?: string | null;
  countryCode?: string | null;
  districtId?: string | null;
  email?: string | null;
  expiredDate?: string;
  healthFacilityId?: string | null;
  isOldUser?: boolean;
  name: string;
  phoneNo: string;
  role?: string;
  stateId?: string;
  profileImage?: string;
  totalTasks?: number;
  completedTasks?: number;
  pendingTasks?: number;
  currentLevel?: string;
  currentBadge?: 'Silver' | 'Gold' | 'Bronze' | undefined;
  userContext?: {
    queryDetails: {
      instituteId: string;
      isActive: boolean;
      type?: { _id: string; name: string };
      querySolved?: number;
    };
    chatHotQuestionOffset?: number;
    _id?: string;
    weeklyAssessmentCount?: number;
    feedbackHistory: unknown | [];
    createdAt?: string;
    updatedAt?: string;
  };
}
