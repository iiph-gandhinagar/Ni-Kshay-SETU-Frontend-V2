import { ThemeProps } from '../themeAndAppConfig/ColorThemeTypes';

export interface PatientFormData {
  name: string;
  height: string | number;
  age: string | number;
  bmi: string | number;
  sex: string;
  weight: string | number;
  pregnancy: string;
  duration_of_pregnancy: string;
  site_of_disease: string;
  qt_interval: string | number;
  sputum_afb: string;
  cbnaat_trunat: string;
  chest_x_ray: string;
  mtb: string;
  rifampicin_resistance_1: string;
  fl_lpa_result: string;
  rifampicin_resistance_2: string;
  inh_a_low: string;
  katg_high: string;
  hemogram: string;
  sl_lpa_result: string;
  fq: string;
  treatment_status: string;
  can_high_dose_moxifloxacin_mfxh_be_given: string;
  second_line_injectables: string;
  mgit_dst_result: string;
  bedaquiline_bdq: string;
  levofloxacin_lfx: string;
  moxifloxacin_high_dose_mfxh: string;
  linezolid_lzd: string;
  clofazimine_cfz: string;
  delamanid_dlm: string;
  kanamycin_km: string;
  amikacin_am: string;
  pyrazinamide_z: string;
  ethionamide_eto: string;
  p_aminosalycyclic_acid_pas: string;
  hiv: string;
  suffering_from_any_chronic_illness: string;
  seizure_disorder: string;
  chronic_kidney_disease: string;
  chronic_liver_disease: string;
  depression: string;
  cardiac_disease: string;
  diabetes: string;
  serum_electrolytes: string;
  heartrate: string | number;
  qt_interval_secs: string | number;
  qtcf: string | number;
  audiometery: string;
  eye_examination: string;
  thyroid_function_tests: string;
}
export type ManageTBErrors = { [key: string]: string }[]; // Array of objects with string keys and values
interface PatientData {
  diagnosis: string;
  notes: string;
  prescription: string;
  regimen: string;
}

export type ManageTbApiRequest = PatientFormData;
interface WorkbookResponse {
  message: string;
  status: string;
}

export interface PatientResponse {
  data: PatientData;
  name: string;
  theme?: ThemeProps;
  nikshayId?: string;
  workbook?: WorkbookResponse;
  errors?: ManageTBErrors;
}
