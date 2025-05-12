// Interface for State
interface State {
  _id: string;
  title: string;
}

// Interface for District
interface District {
  _id: string;
  title: string;
}

// Interface for Block
interface Block {
  _id: string;
  title: string;
}

// Interface for Health Facility
export interface HealthFacility {
  _id: string;
  countryId: string;
  stateId: State;
  districtId: District;
  blockId: Block;
  healthFacilityCode: string;
  DMC: boolean;
  TRUNAT: boolean;
  CBNAAT: boolean;
  XRAY: boolean;
  ICTC: boolean;
  LPALab: boolean;
  CONFIRMATIONCENTER: boolean;
  TobaccoCessationClinic: boolean;
  ANCClinic: boolean;
  NutritionalRehabilitationCentre: boolean;
  DeAddictionCentres: boolean;
  ARTCentre: boolean;
  DistrictDRTBCentre: boolean;
  NODALDRTBCENTER: boolean;
  IRL: boolean;
  PediatricCareFacility: boolean;
  longitude: string;
  latitude: string;
  id: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

// Interface for the list containing HealthFacility objects
export interface HealthFacilityList {
  list: HealthFacility[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}
