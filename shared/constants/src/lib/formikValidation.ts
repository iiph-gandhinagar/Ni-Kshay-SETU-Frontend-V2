import * as Yup from 'yup';

const PHONE_NO_REGEX = /^\d{10}$/;

export const validationSchema = {
  phoneNo: Yup.string()
    .required('Mobile Number is required')
    .matches(PHONE_NO_REGEX, 'Mobile Number is invalid'),
  email: Yup.string().email('Email is invalid'),
  otp: Yup.string()
    .matches(/^\d{4}$/, 'OTP must be exactly 4 digits')
    .required('OTP is required'),
};

export const ValidationForPhoneSchema = Yup.object().shape({
  phoneNo: validationSchema?.phoneNo,
});
export const ValidationForEmailSchema = Yup.object().shape({
  email: validationSchema?.email.required('email is required'),
});
export const step1ValidationSchema = Yup.object().shape({
  phoneNo: validationSchema?.phoneNo,
});

export const step2ValidationSchema = Yup.object().shape({
  otp: validationSchema?.otp,
  phoneNo: validationSchema?.phoneNo,
});
export const step2EmailValidationSchema = Yup.object().shape({
  otp: validationSchema?.otp,
  email: validationSchema?.email,
});

export const step4ValidationSchema = Yup.object().shape({
  name: Yup.string().required('name is required').min(3, 'Enter Valid Name'),
  email: validationSchema?.email,
  phoneNo: validationSchema?.phoneNo,
  cadreType: Yup.string().required('cadre Type is required'),
  cadreId: Yup.string().required('Cadre is required'),
});
export const step1RegistrationWithEmailValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('name is required')
    .min(3, 'Enter Valid Name')
    .test('no-spaces', 'Spaces are not allowed', (value) => {
      return !/\s{2,}/.test(value);
    }),
  email: validationSchema?.email?.required(),
  phoneNo: validationSchema?.phoneNo,
  cadreType: Yup.string().required('cadre Type is required'),
  cadreId: Yup.string().required('Cadre is required'),
});
export const step1RegistrationWithPhoneNumValidationSchema = Yup.object().shape(
  {
    name: Yup.string()
      .required('name is required')
      .min(3, 'Enter Valid Name')
      .test('no-spaces', 'Spaces are not allowed', (value) => {
        return !/\s{2,}/.test(value);
      }),
    email: validationSchema?.email,
    phoneNo: validationSchema?.phoneNo,
    cadreType: Yup.string().required('cadre Type is required'),
    cadreId: Yup.string().required('Cadre is required'),
  }
);
export const step5ValidationSchema = Yup.object().shape({
  stateId: Yup.string().required('State is required'),
  // blockId: Yup.string().required('TU is required'),
  // healthFacilityId: Yup.string().required('health Facility is required'),
});

export const CadreStateError = {
  State_Level: {
    stateId: Yup.string().required('State is required'),
  },
  Block_Level: {
    blockId: Yup.string().required('TU is required'),
    stateId: Yup.string().required('State is required'),
    districtId: Yup.string().required('District is required'),
  },
  'Health-facility_Level': {
    blockId: Yup.string().required('TU is required'),
    stateId: Yup.string().required('State is required'),
    districtId: Yup.string().required('District is required'),
    healthFacilityId: Yup.string().required('Health-Facility is required'),
  },
  District_Level: {
    stateId: Yup.string().required('State is required'),
    districtId: Yup.string().required('District is required'),
  },
};
export const step7ValidationSchema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  phoneNo: validationSchema?.phoneNo,
  email: validationSchema?.email,
  cadreType: Yup.string().required('cadre Type is required'),
  cadreId: Yup.string().required('State is required'),
});
export const step8ValidationSchema = Yup.object().shape({
  email: validationSchema?.email,
});
export const step9ValidationSchema = Yup.object().shape({
  phoneNo: validationSchema?.phoneNo,
  otp: validationSchema?.otp,
});

export const raisedQueryFormSchema = Yup.object().shape({
  age: Yup.string().required('required'),
  sex: Yup.string().required('required'),
  diagnosis: Yup.string().required('required'),
  dateOfAdmission: Yup.string().required('required'),
  chiefComplaint: Yup.string().required('required'),
  query: Yup.string().required('required'),
  illness: Yup.string().required('required'),
  pastHistory: Yup.string(),
  preTreatmentEvaluation: Yup.string(),
  assessmentAndDiffDiagnosis: Yup.string(),
  currentTreatmentPlan: Yup.string().required('required'),
});

const conditions = [
  {
    sputum_afb: 'Negative',
    cbnaat_trunat: 'Not Available',
    mtb_1: undefined,
    truenat: 'Not Available',
    mtb_2: undefined,
    fl_lpa_result: 'Not Available',
    mtb_3: undefined,
  },
  {
    sputum_afb: 'Negative',
    cbnaat_trunat: 'Available',
    mtb_1: 'Not Detected',
    truenat: 'Not Available',
    mtb_2: undefined,
    fl_lpa_result: 'Not Available',
    mtb_3: undefined,
  },
  {
    sputum_afb: 'Negative',
    cbnaat_trunat: 'Available',
    mtb_1: 'Not Detected',
    truenat: 'Available',
    mtb_2: 'Not Detected',
    fl_lpa_result: 'Not Available',
    mtb_3: undefined,
  },
  {
    sputum_afb: 'Negative',
    cbnaat_trunat: 'Available',
    mtb_1: 'Not Detected',
    truenat: 'Available',
    mtb_2: 'Detected',
    fl_lpa_result: 'Not Available',
    mtb_3: undefined,
  },
  {
    sputum_afb: 'Negative',
    cbnaat_trunat: 'Available',
    mtb_1: 'Not Detected',
    truenat: 'Not Available',
    mtb_2: undefined,
    fl_lpa_result: 'Available',
    mtb_3: 'Not Detected',
  },
  {
    sputum_afb: 'Negative',
    cbnaat_trunat: 'Available',
    mtb_1: 'Invalid',
    truenat: 'Not Available',
    mtb_2: undefined,
    fl_lpa_result: 'Not Available',
    mtb_3: undefined,
  },
  {
    sputum_afb: 'Negative',
    cbnaat_trunat: 'Available',
    mtb_1: 'Not Detected',
    truenat: 'Available',
    mtb_2: 'Invalid',
    fl_lpa_result: 'Not Available',
    mtb_3: undefined,
  },
  {
    sputum_afb: 'Negative',
    cbnaat_trunat: 'Available',
    mtb_1: 'Not Detected',
    truenat: 'Available',
    mtb_2: 'Not Detected',
    fl_lpa_result: 'Available',
    mtb_3: 'Invalid',
  },
  {
    sputum_afb: 'Not Available',
    cbnaat_trunat: 'Not Available',
    mtb_1: undefined,
    truenat: 'Not Available',
    mtb_2: undefined,
    fl_lpa_result: 'Not Available',
    mtb_3: undefined,
  },
  {
    sputum_afb: 'Not Available',
    cbnaat_trunat: 'Available',
    mtb_1: 'Not Detected',
    truenat: 'Not Available',
    mtb_2: undefined,
    fl_lpa_result: 'Not Available',
    mtb_3: undefined,
  },
  {
    sputum_afb: 'Not Available',
    cbnaat_trunat: 'Available',
    mtb_1: 'Not Detected',
    truenat: 'Available',
    mtb_2: 'Not Detected',
    fl_lpa_result: 'Not Available',
    mtb_3: undefined,
  },
  {
    sputum_afb: 'Not Available',
    cbnaat_trunat: 'Available',
    mtb_1: 'Not Detected',
    truenat: 'Available',
    mtb_2: 'Detected',
    fl_lpa_result: 'Not Available',
    mtb_3: undefined,
  },
  {
    sputum_afb: 'Not Available',
    cbnaat_trunat: 'Available',
    mtb_1: 'Not Detected',
    truenat: 'Not Available',
    mtb_2: undefined,
    fl_lpa_result: 'Available',
    mtb_3: 'Not Detected',
  },
  {
    sputum_afb: 'Not Available',
    cbnaat_trunat: 'Available',
    mtb_1: 'Invalid',
    truenat: 'Not Available',
    mtb_2: undefined,
    fl_lpa_result: 'Not Available',
    mtb_3: undefined,
  },
  {
    sputum_afb: 'Not Available',
    cbnaat_trunat: 'Available',
    mtb_1: 'Not Detected',
    truenat: 'Available',
    mtb_2: 'Invalid',
    fl_lpa_result: 'Not Available',
    mtb_3: undefined,
  },
  {
    sputum_afb: 'Not Available',
    cbnaat_trunat: 'Available',
    mtb_1: 'Not Detected',
    truenat: 'Available',
    mtb_2: 'Not Detected',
    fl_lpa_result: 'Available',
    mtb_3: 'Invalid',
  },
  {
    sputum_afb: 'Negative',
    cbnaat_trunat: 'Not Available',
    mtb_1: undefined,
    truenat: 'Available',
    mtb_2: 'Not Detected',
    fl_lpa_result: 'Not Available',
    mtb_3: undefined,
  },
  {
    sputum_afb: 'Negative',
    cbnaat_trunat: 'Not Available',
    mtb_1: undefined,
    truenat: 'Available',
    mtb_2: 'Invalid',
    fl_lpa_result: 'Not Available',
    mtb_3: undefined,
  },
  {
    sputum_afb: 'Negative',
    cbnaat_trunat: 'Not Available',
    mtb_1: undefined,
    truenat: 'Not Available',
    mtb_2: undefined,
    fl_lpa_result: 'Available',
    mtb_3: 'Invalid',
  },
  {
    sputum_afb: 'Negative',
    cbnaat_trunat: 'Not Available',
    mtb_1: undefined,
    truenat: 'Not Available',
    mtb_2: undefined,
    fl_lpa_result: 'Available',
    mtb_3: 'Not Detected',
  },
];

// Function to check if any condition matches
const checkMatchingCondition = (values: Record<string, string>) => {
  return conditions.some((condition) =>
    Object.entries(condition).every(([key, value]) => values[key] === value)
  );
};

export const manageTBvalidationSchema = Yup.object().shape({
  // Form 1: Patient Details
  name: Yup.string()
    .required('Name is required')
    .min(4, 'name must be exactly 4 characters')
    .max(4, 'name must be exactly 4 characters'),
  nikshayId: Yup.string()
    .max(8, 'Nikshay ID must be exactly 8 characters')
    .min(8, 'Nikshay ID must be exactly 8 characters'),
  age: Yup.number()
    .required('Age is required')
    .lessThan(120, 'Age must be less than 120 years')
    .min(1, 'Age must be at least 1 year'),
  sex: Yup.string().required('Gender is required'),
  weight: Yup.number()
    .required('Weight is required')
    .lessThan(200, 'Weight must be less than 200 kg')
    .min(4, 'Weight must be at least 4 kg'),
  height: Yup.number()
    .required('Height is required')
    .lessThan(200, 'Height must be less than 200 cm')
    .min(30, 'Height must be at least 30 cm'),
  bmi: Yup.number()
    .required('BMI is required')
    .lessThan(40, 'BMI must be less than 40 (enter valid weight and height)')
    .min(10, 'BMI must be at least 10 (enter valid weight and height)'),

  // Form 2: Clinical Profile
  respiratory_rate: Yup.string().required('Respiratory rate is required'),
  site_of_disease: Yup.string().required('Site of disease is required'),
  hiv: Yup.string().required('HIV status is required'),
  past_history_att: Yup.string().required('Past history of ATT is required'),
  suffering_from_any_chronic_illness: Yup.string().required(
    'Chronic illness status is required'
  ),
  pregnancy: Yup.string().when('sex', {
    is: (value: string) => value === 'Female',
    then: (schema) => schema.required('Pregnancy status is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  duration_of_pregnancy: Yup.string().when('pregnancy', {
    is: (value: string) => value === 'Yes',
    then: (schema) => schema.required('Pregnancy status details are required'),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Sub-questions for Past History of ATT
  is_levo_moxi_more_than_a_month: Yup.string().when('past_history_att', {
    is: (value: string) => value === 'Present',
    then: (schema) =>
      schema.required(
        'Levofloxacin/Moxifloxacin usage for more than 1 month is required'
      ),
    otherwise: (schema) => schema.notRequired(),
  }),
  is_clofazimine_more_than_a_month: Yup.string().when('past_history_att', {
    is: (value: string) => value === 'Present',
    then: (schema) =>
      schema.required('Clofazimine usage for more than 1 month is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  is_bdq_more_than_a_month: Yup.string().when('past_history_att', {
    is: (value: string) => value === 'Present',
    then: (schema) =>
      schema.required('Bedaquiline usage for more than 1 month is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  is_lzd_more_than_a_month: Yup.string().when('past_history_att', {
    is: (value: string) => value === 'Present',
    then: (schema) =>
      schema.required('Linezolid usage for more than 1 month is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  is_pretomanid_more_than_a_month: Yup.string().when('past_history_att', {
    is: (value: string) => value === 'Present',
    then: (schema) =>
      schema.required('Pretomanid usage for more than 1 month is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  is_ethionamide_more_than_a_month: Yup.string().when('past_history_att', {
    is: (value: string) => value === 'Present',
    then: (schema) =>
      schema.required('Ethionamide usage for more than 1 month is required'),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Sub-questions for Chronic Illness
  seizure_disorder: Yup.string().when('suffering_from_any_chronic_illness', {
    is: (value: string) => value === 'Yes',
    then: (schema) => schema.required('Seizure disorder status is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  chronic_kidney_disease: Yup.string().when(
    'suffering_from_any_chronic_illness',
    {
      is: (value: string) => value === 'Yes',
      then: (schema) =>
        schema.required('Chronic kidney disease status is required'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  chronic_liver_disease: Yup.string().when(
    'suffering_from_any_chronic_illness',
    {
      is: (value: string) => value === 'Yes',
      then: (schema) =>
        schema.required('Chronic liver disease status is required'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  depression: Yup.string().when('suffering_from_any_chronic_illness', {
    is: (value: string) => value === 'Yes',
    then: (schema) => schema.required('Depression status is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardiac_disease: Yup.string().when('suffering_from_any_chronic_illness', {
    is: (value: string) => value === 'Yes',
    then: (schema) => schema.required('Cardiac disease status is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  diabetes: Yup.string().when('suffering_from_any_chronic_illness', {
    is: (value: string) => value === 'Yes',
    then: (schema) => schema.required('Diabetes status is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  vision_loss_fundus_abnormality: Yup.string().when(
    'suffering_from_any_chronic_illness',
    {
      is: (value: string) => value === 'Yes',
      then: (schema) =>
        schema.required('Vision loss/Fundus abnormality status is required'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  // Form 3: Diagnostic Details
  sputum_afb: Yup.string().required('Sputum AFB result is required'),
  cbnaat_trunat: Yup.string().required('CBNAAT/TRUENAT result is required'),
  mtb_1: Yup.string().when('cbnaat_trunat', {
    is: (value: string) => value === 'Available',
    then: (schema) => schema.required('MTB result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  rifampicin_resistance_1: Yup.string().when('mtb_1', {
    is: (value: string) => value === 'Detected',
    then: (schema) =>
      schema.required('Rifampicin resistance result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  truenat: Yup.string().required('Truenat result is required'),
  mtb_2: Yup.string().when('truenat', {
    is: (value: string) => value === 'Available',
    then: (schema) => schema.required('MTB result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  rifampicin_resistance_2: Yup.string().when('mtb_2', {
    is: (value: string) => value === 'Detected',
    then: (schema) =>
      schema.required('Rifampicin resistance result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  fl_lpa_result: Yup.string().required('FL-LPA result is required'),
  mtb_3: Yup.string().when('fl_lpa_result', {
    is: (value: string) => value === 'Available',
    then: (schema) => schema.required('MTB result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  rifampicin_resistance_3: Yup.string().when('mtb_3', {
    is: (value: string) => value === 'Detected',
    then: (schema) =>
      schema.required('Rifampicin resistance result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  inha: Yup.string().when('mtb_3', {
    is: (value: string) => value === 'Detected',
    then: (schema) => schema.required('inhA result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  katg: Yup.string().when('mtb_3', {
    is: (value: string) => value === 'Detected',
    then: (schema) => schema.required('katG result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  other_investigation_available_suggestive_tb_clinical_sign: Yup.string().when(
    [
      'cbnaat_trunat',
      'fl_lpa_result',
      'truenat',
      'sputum_afb',
      'mtb_1',
      'mtb_2',
      'mtb_3',
    ],
    {
      is: (
        cbnaat_trunat: string,
        fl_lpa_result: string,
        truenat: string,
        sputum_afb: string,
        mtb_1: string,
        mtb_2: string,
        mtb_3: string
      ) => {
        console.log({
          sputum_afb,
          cbnaat_trunat,
          fl_lpa_result,
          truenat,
          mtb_1,
          mtb_2,
          mtb_3,
        });

        return checkMatchingCondition({
          sputum_afb,
          cbnaat_trunat,
          fl_lpa_result,
          truenat,
          mtb_1,
          mtb_2,
          mtb_3,
        });
      },
      then: (schema) =>
        schema.required('Other investigation suggestive of TB is required'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  sl_lpa_result: Yup.string().required('SL-LPA result is required'),
  mtb_5: Yup.string().when('sl_lpa_result', {
    is: (value: string) => value === 'Available',
    then: (schema) => schema.required('MTB result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  lfx_resistance: Yup.string().when('sl_lpa_result', {
    is: (value: string) => value === 'Available',
    then: (schema) =>
      schema.required('Levofloxacin (LFX) resistance result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  mfx_resistance: Yup.string().when('sl_lpa_result', {
    is: (value: string) => value === 'Available',
    then: (schema) =>
      schema.required(
        'Moxifloxacin High dose (MFXH) resistance result is required'
      ),
    otherwise: (schema) => schema.notRequired(),
  }),
  km_1: Yup.string().when('sl_lpa_result', {
    is: (value: string) => value === 'Available',
    then: (schema) =>
      schema.required('Kanamycin (KM) resistance result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  amikacin_capreomycin: Yup.string().when('sl_lpa_result', {
    is: (value: string) => value === 'Available',
    then: (schema) =>
      schema.required('Amikacin/Capreomycin resistance result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),

  // NAAT XDR
  naat_xdr: Yup.string().required('NAAT XDR result is required'),
  mtb_6: Yup.string().when('naat_xdr', {
    is: (value: string) => value === 'Available',
    then: (schema) => schema.required('MTB result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  inh: Yup.string().when('naat_xdr', {
    is: (value: string) => value === 'Available',
    then: (schema) => schema.required('INH resistance result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  fq_resistance: Yup.string().when('naat_xdr', {
    is: (value: string) => value === 'Available',
    then: (schema) => schema.required('FQ resistance result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  amikacin: Yup.string().when('naat_xdr', {
    is: (value: string) => value === 'Available',
    then: (schema) => schema.required('Amikacin resistance result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  kanamycin: Yup.string().when('naat_xdr', {
    is: (value: string) => value === 'Available',
    then: (schema) =>
      schema.required('Kanamycin resistance result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  capreomycin: Yup.string().when('naat_xdr', {
    is: (value: string) => value === 'Available',
    then: (schema) =>
      schema.required('Capreomycin resistance result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  ethonamide: Yup.string().when('naat_xdr', {
    is: (value: string) => value === 'Available',
    then: (schema) =>
      schema.required('Ethionamide resistance result is required'),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Form 4: Culture Report
  mgit_dst_result: Yup.string().required('MGIT DST result is required'),
  bdq: Yup.string().required('Bedaquiline (BDQ) result is required'),
  lfx: Yup.string().required('Levofloxacin (LFX) result is required'),
  mfxh: Yup.string().required(
    'Moxifloxacin High Dose (MFXH) result is required'
  ),
  lzd: Yup.string().required('Linezolid (LZD) result is required'),
  cfz: Yup.string().required('Clofazimine (CFZ) result is required'),
  pretomaind: Yup.string().required('Pretomanid result is required'),
  dlm: Yup.string().required('Delamanid (DLM) result is required'),
  km_2: Yup.string().required('Kanamycin (KM) result is required'),
  am: Yup.string().required('Amikacin (AM) result is required'),
  pyrazinamide: Yup.string().required('Pyrazinamide (Z) result is required'),
  eto: Yup.string().required('Ethionamide (ETO) result is required'),
  pas: Yup.string().required('p-aminosalicyclic Acid (PAS) result is required'),

  // Form 5: Pre-Treatment Evaluation
  hb_level: Yup.string().when(
    [
      'rifampicin_resistance_1',
      'rifampicin_resistance_2',
      'rifampicin_resistance_3',
      'rifampicin_resistance_4',
    ],
    {
      is: (
        rifampicin_resistance_1: string,
        rifampicin_resistance_2: string,
        rifampicin_resistance_3: string,
        rifampicin_resistance_4: string
      ) =>
        rifampicin_resistance_1 === 'Detected' ||
        rifampicin_resistance_2 === 'Detected' ||
        rifampicin_resistance_3 === 'Detected' ||
        rifampicin_resistance_4 === 'Detected',
      then: (schema) => schema.required('Haemoglobin level is required'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  kidney_func_test: Yup.string().when(
    [
      'rifampicin_resistance_1',
      'rifampicin_resistance_2',
      'rifampicin_resistance_3',
      'rifampicin_resistance_4',
    ],
    {
      is: (
        rifampicin_resistance_1: string,
        rifampicin_resistance_2: string,
        rifampicin_resistance_3: string,
        rifampicin_resistance_4: string
      ) =>
        rifampicin_resistance_1 === 'Detected' ||
        rifampicin_resistance_2 === 'Detected' ||
        rifampicin_resistance_3 === 'Detected' ||
        rifampicin_resistance_4 === 'Detected',
      then: (schema) =>
        schema.required('Kidney function test result is required'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  thyroid_func_tests: Yup.string().when(
    [
      'rifampicin_resistance_1',
      'rifampicin_resistance_2',
      'rifampicin_resistance_3',
      'rifampicin_resistance_4',
    ],
    {
      is: (
        rifampicin_resistance_1: string,
        rifampicin_resistance_2: string,
        rifampicin_resistance_3: string,
        rifampicin_resistance_4: string
      ) =>
        rifampicin_resistance_1 === 'Detected' ||
        rifampicin_resistance_2 === 'Detected' ||
        rifampicin_resistance_3 === 'Detected' ||
        rifampicin_resistance_4 === 'Detected',
      then: (schema) =>
        schema.required('Thyroid function test result is required'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  liver_func_test: Yup.string().when(
    [
      'rifampicin_resistance_1',
      'rifampicin_resistance_2',
      'rifampicin_resistance_3',
      'rifampicin_resistance_4',
    ],
    {
      is: (
        rifampicin_resistance_1: string,
        rifampicin_resistance_2: string,
        rifampicin_resistance_3: string,
        rifampicin_resistance_4: string
      ) =>
        rifampicin_resistance_1 === 'Detected' ||
        rifampicin_resistance_2 === 'Detected' ||
        rifampicin_resistance_3 === 'Detected' ||
        rifampicin_resistance_4 === 'Detected',
      then: (schema) =>
        schema.required('Liver function test result is required'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  serum_electrolytes: Yup.string().when(
    [
      'rifampicin_resistance_1',
      'rifampicin_resistance_2',
      'rifampicin_resistance_3',
      'rifampicin_resistance_4',
    ],
    {
      is: (
        rifampicin_resistance_1: string,
        rifampicin_resistance_2: string,
        rifampicin_resistance_3: string,
        rifampicin_resistance_4: string
      ) =>
        rifampicin_resistance_1 === 'Detected' ||
        rifampicin_resistance_2 === 'Detected' ||
        rifampicin_resistance_3 === 'Detected' ||
        rifampicin_resistance_4 === 'Detected',
      then: (schema) =>
        schema.required('Serum electrolytes result is required'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  heartrate: Yup.string().when(
    [
      'rifampicin_resistance_1',
      'rifampicin_resistance_2',
      'rifampicin_resistance_3',
      'rifampicin_resistance_4',
    ],
    {
      is: (
        rifampicin_resistance_1: string,
        rifampicin_resistance_2: string,
        rifampicin_resistance_3: string,
        rifampicin_resistance_4: string
      ) =>
        rifampicin_resistance_1 === 'Detected' ||
        rifampicin_resistance_2 === 'Detected' ||
        rifampicin_resistance_3 === 'Detected' ||
        rifampicin_resistance_4 === 'Detected',
      then: (schema) => schema.required('Heart rate is required'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  qt_interval: Yup.string().when(
    [
      'rifampicin_resistance_1',
      'rifampicin_resistance_2',
      'rifampicin_resistance_3',
      'rifampicin_resistance_4',
    ],
    {
      is: (
        rifampicin_resistance_1: string,
        rifampicin_resistance_2: string,
        rifampicin_resistance_3: string,
        rifampicin_resistance_4: string
      ) =>
        rifampicin_resistance_1 === 'Detected' ||
        rifampicin_resistance_2 === 'Detected' ||
        rifampicin_resistance_3 === 'Detected' ||
        rifampicin_resistance_4 === 'Detected',
      then: (schema) => schema.required('QT interval is required'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  qtcf: Yup.string().when(
    [
      'rifampicin_resistance_1',
      'rifampicin_resistance_2',
      'rifampicin_resistance_3',
      'rifampicin_resistance_4',
    ],
    {
      is: (
        rifampicin_resistance_1: string,
        rifampicin_resistance_2: string,
        rifampicin_resistance_3: string,
        rifampicin_resistance_4: string
      ) =>
        rifampicin_resistance_1 === 'Detected' ||
        rifampicin_resistance_2 === 'Detected' ||
        rifampicin_resistance_3 === 'Detected' ||
        rifampicin_resistance_4 === 'Detected',
      then: (schema) => schema.required('QtcF is required'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  audiometry: Yup.string().when(
    [
      'rifampicin_resistance_1',
      'rifampicin_resistance_2',
      'rifampicin_resistance_3',
      'rifampicin_resistance_4',
    ],
    {
      is: (
        rifampicin_resistance_1: string,
        rifampicin_resistance_2: string,
        rifampicin_resistance_3: string,
        rifampicin_resistance_4: string
      ) =>
        rifampicin_resistance_1 === 'Detected' ||
        rifampicin_resistance_2 === 'Detected' ||
        rifampicin_resistance_3 === 'Detected' ||
        rifampicin_resistance_4 === 'Detected',
      then: (schema) => schema.required('Audiometry result is required'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  eye_exam_fundus: Yup.string().when(
    [
      'rifampicin_resistance_1',
      'rifampicin_resistance_2',
      'rifampicin_resistance_3',
      'rifampicin_resistance_4',
    ],
    {
      is: (
        rifampicin_resistance_1: string,
        rifampicin_resistance_2: string,
        rifampicin_resistance_3: string,
        rifampicin_resistance_4: string
      ) =>
        rifampicin_resistance_1 === 'Detected' ||
        rifampicin_resistance_2 === 'Detected' ||
        rifampicin_resistance_3 === 'Detected' ||
        rifampicin_resistance_4 === 'Detected',
      then: (schema) => schema.required('Eye examination result is required'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  peripheral_neuropathy: Yup.string().when(
    [
      'rifampicin_resistance_1',
      'rifampicin_resistance_2',
      'rifampicin_resistance_3',
      'rifampicin_resistance_4',
    ],
    {
      is: (
        rifampicin_resistance_1: string,
        rifampicin_resistance_2: string,
        rifampicin_resistance_3: string,
        rifampicin_resistance_4: string
      ) =>
        rifampicin_resistance_1 === 'Detected' ||
        rifampicin_resistance_2 === 'Detected' ||
        rifampicin_resistance_3 === 'Detected' ||
        rifampicin_resistance_4 === 'Detected',
      then: (schema) =>
        schema.required('Peripheral neuropathy status is required'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
  peripheral_neuropathy_grade: Yup.string().when('peripheral_neuropathy', {
    is: (value: string) => value === 'Yes',
    then: (schema) =>
      schema.required('Peripheral neuropathy grade is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
});
