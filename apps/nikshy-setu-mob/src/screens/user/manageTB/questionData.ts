import rawData from './rawDataOfManageTb.json';
type Question = {
  title: string;
  patientInfoKey: string;
  type: 'text' | 'singleSelect' | 'multiSelect' | 'decimal-pad';
  options?: string[];
  subQuestion?: Record<string, Question[]>;
  placeholder?: string;
  isDisabled?: boolean;
};

type Form = {
  title: string;
  isDisable?: boolean;
  questions: Question[];
};
export const optionValue: Record<string, string> = rawData.optionValue;
export const ManageTBQuestions: Record<string, Form> = {
  form1: {
    title: 'Patient Details',
    questions: [
      {
        title: 'Name',
        patientInfoKey: 'name',
        type: 'text',
      },
      {
        title: 'Ni-kshay ID(Optional)',
        patientInfoKey: 'nikshayId',
        type: 'decimal-pad',
      },
      {
        title: 'Age (in completed Years)',
        patientInfoKey: 'age',
        type: 'decimal-pad',
      },
      {
        title: 'Gender',
        patientInfoKey: 'sex',
        options: [
          optionValue.MALE,
          optionValue.FEMALE,
          optionValue.TRANSGENDER,
        ],
        type: 'singleSelect',
      },
      {
        title: 'Weight (in Kg)',
        patientInfoKey: 'weight',
        type: 'decimal-pad',
        placeholder: 'Enter Weight (in kg)',
      },
      {
        title: 'Height (in Cms)',
        patientInfoKey: 'height',
        type: 'decimal-pad',
        placeholder: 'Enter Height (in CM)',
      },
      {
        title: 'BMI  (kg/m²)',
        patientInfoKey: 'bmi',
        type: 'decimal-pad',
        placeholder: 'Enter Above Field',
        isDisabled: true,
      },
    ],
    isDisable: false,
  },
  form2: {
    title: 'Clinical Profile',
    questions: [
      {
        title: `(Does any of the Parameters require hospitalization/Indicating Mortality?)
          \n◉ Patient confined to bed and unable to stand unassisted
          \n◉ Respiratory rate > 24 breaths per minute
          \n◉ SpO₂ < 94% at room air
          \n◉ Systolic BP < 90 mm Hg
          \n◉ Pulse Rate > 120/min
          \n◉ BMI < 14 kg/m² or BMI < 16 kg/m² with oedema`,
        patientInfoKey: 'respiratory_rate',
        options: [optionValue.YES, optionValue.NO],
        type: 'singleSelect',
      },
      {
        title: 'Site of Disease and severity of Disease',
        patientInfoKey: 'site_of_disease',
        options: [
          optionValue.BOTH_PULMONARY_EXTRA_PULMONARY,
          optionValue.PULMONARY_NON_EXTENSIVE,
          optionValue.PULMONARY_EXTENSIVE,
          optionValue.EXTRAPULMONARY_PLEURAL,
          optionValue.EXTRAPULMONARY_BONE_JOINT_SPINE,
          optionValue.EXTRAPULMONARY_INTESTINE,
          optionValue.EXTRAPULMONARY_DISSEMINATED_LYMPHADENOPATHY,
          optionValue.EXTRAPULMONARY_ONLY_CERVICAL,
          optionValue.DISSEMINATED_CNS,
          optionValue.EXTRAPULMONARY_MEDIASTINAL_COMPRESSION,
          optionValue.EXTRAPULMONARY_MEDIASTINAL_NO_COMPRESSION,
          optionValue.EXTRAPULMONARY_OTHERS,
          optionValue.MILIARY,
        ],
        type: 'singleSelect',
      },
      {
        title: 'HIV Status',
        patientInfoKey: 'hiv',
        options: [
          optionValue.POSITIVE,
          optionValue.NEGATIVE,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'singleSelect',
      },
      {
        title: 'Past History of Anti Tubercular Treatment',
        patientInfoKey: 'past_history_att',
        options: [optionValue.PRESENT, optionValue.ABSENT],
        type: 'singleSelect',
        subQuestion: {
          Present: [
            {
              patientInfoKey: 'is_levo_moxi_more_than_a_month',
              title:
                'Is Levofloxacin / Moxifloxacin taken for more than 1 month? ',
              options: [
                optionValue.TAKEN,
                optionValue.NOT_TAKEN,
                optionValue.NOT_KNOWN,
              ],
              type: 'singleSelect',
            },
            {
              patientInfoKey: 'is_clofazimine_more_than_a_month',
              title: 'Is Clofazimine taken for more than 1 month? ',
              options: [
                optionValue.TAKEN,
                optionValue.NOT_TAKEN,
                optionValue.NOT_KNOWN,
              ],
              type: 'singleSelect',
            },
            {
              patientInfoKey: 'is_bdq_more_than_a_month',
              title: 'Is Bedaquiline taken for more than 1 month? ',
              options: [
                optionValue.TAKEN,
                optionValue.NOT_TAKEN,
                optionValue.NOT_KNOWN,
              ],
              type: 'singleSelect',
            },
            {
              patientInfoKey: 'is_lzd_more_than_a_month',
              title: 'Is Linezolid (LZD) taken more than one month?',
              options: [
                optionValue.TAKEN,
                optionValue.NOT_TAKEN,
                optionValue.NOT_KNOWN,
              ],
              type: 'singleSelect',
            },
            {
              patientInfoKey: 'is_pretomanid_more_than_a_month',
              title: 'Is Pretomanid taken more than one month?',
              options: [
                optionValue.TAKEN,
                optionValue.NOT_TAKEN,
                optionValue.NOT_KNOWN,
              ],
              type: 'singleSelect',
            },
            {
              patientInfoKey: 'is_ethionamide_more_than_a_month',
              title: 'Is Ethionamide taken for more than 1 month? ',
              options: [
                optionValue.TAKEN,
                optionValue.NOT_TAKEN,
                optionValue.NOT_KNOWN,
              ],
              type: 'singleSelect',
            },
          ],
        },
      },
      {
        title: 'Suffering from any chronic illness',
        patientInfoKey: 'suffering_from_any_chronic_illness',
        options: [optionValue.YES, optionValue.NO],
        type: 'singleSelect',
        subQuestion: {
          Yes: [
            {
              title: 'Seizure Disorder: ',
              patientInfoKey: 'seizure_disorder',
              options: ['Yes', 'No'],
              type: 'singleSelect',
            },
            {
              title: 'Chronic Kidney Disease: ',
              patientInfoKey: 'chronic_kidney_disease',
              options: ['Yes', 'No'],
              type: 'singleSelect',
            },
            {
              title: 'Chronic Liver Disease: ',
              patientInfoKey: 'chronic_liver_disease',
              options: ['Yes', 'No'],
              type: 'singleSelect',
            },
            {
              title: 'Depression',
              patientInfoKey: 'depression',
              options: ['Yes', 'No'],
              type: 'singleSelect',
            },
            {
              title: 'Cardiac Disease ',
              patientInfoKey: 'cardiac_disease',
              options: ['Yes', 'No'],
              type: 'singleSelect',
            },
            {
              title: 'Diabetes',
              patientInfoKey: 'diabetes',
              options: ['Yes', 'No'],
              type: 'singleSelect',
            },
            {
              title: 'Vision Loss/ Fundus Abnormality',
              patientInfoKey: 'vision_loss_fundus_abnormality',
              options: ['Yes', 'No'],
              type: 'singleSelect',
            },
          ],
        },
      },
      {
        title: 'Pregnancy',
        patientInfoKey: 'pregnancy',
        options: [optionValue.YES, optionValue.NO],
        type: 'singleSelect',
        subQuestion: {
          Yes: [
            {
              title: 'pregnancy Status',
              patientInfoKey: 'duration_of_pregnancy',
              options: [
                optionValue.LESS_WEEK_MTP,
                optionValue.LESS_WEEK_NOT_MTP,
                optionValue._20_24_LESS_THEN_32_WEEK_MTP,
                optionValue._32_WEEK_ABOVE,
              ],
              type: 'singleSelect',
            },
          ],
        },
      },
    ],
    isDisable: false,
  },
  form3: {
    title: 'Diagnostic Test Details',
    questions: [
      {
        title: 'Sputum/ Extra Pulmonary Site AFB  Smear',
        patientInfoKey: 'sputum_afb',
        options: [
          optionValue.POSITIVE,
          optionValue.NEGATIVE,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'singleSelect',
      },
      {
        title: 'CBNAAT (GeneXpert/GeneXpert Ultra) ',
        patientInfoKey: 'cbnaat_trunat',
        options: [optionValue.AVAILABLE, optionValue.NOT_AVAILABLE],
        subQuestion: {
          Available: [
            {
              title: 'M.TB: ',
              patientInfoKey: 'mtb_1',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INVALID,
              ],
              type: 'singleSelect',
              subQuestion: {
                Detected: [
                  {
                    title: 'If MTB Present',
                    patientInfoKey: 'if_mtb_present_1',
                    options: ['High', 'Medium', 'Low', 'Very Low', 'Traces'],
                    type: 'singleSelect',
                  },
                  {
                    title: 'Rifampicin Resistance',
                    patientInfoKey: 'rifampicin_resistance_1',
                    options: [
                      optionValue.DETECTED,
                      optionValue.NOT_DETECTED,
                      optionValue.INDETERMINATE,
                    ],
                    type: 'singleSelect',
                  },
                ],
              },
            },
          ],
        },
        type: 'singleSelect',
      },
      {
        title: 'Truenat',
        patientInfoKey: 'truenat',
        options: [optionValue.AVAILABLE, optionValue.NOT_AVAILABLE],
        type: 'singleSelect',
        subQuestion: {
          Available: [
            {
              title: 'M.TB: ',
              patientInfoKey: 'mtb_2',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INVALID,
              ],
              type: 'singleSelect',
              subQuestion: {
                Detected: [
                  {
                    title: 'Rifampicin Resistance',
                    patientInfoKey: 'rifampicin_resistance_2',
                    options: [
                      optionValue.DETECTED,
                      optionValue.NOT_DETECTED,
                      optionValue.INDETERMINATE,
                    ],
                    type: 'singleSelect',
                  },
                ],
              },
            },
          ],
        },
      },
      {
        title: 'FL-LPA Result ',
        patientInfoKey: 'fl_lpa_result',
        options: [optionValue.AVAILABLE, optionValue.NOT_AVAILABLE],
        type: 'singleSelect',
        subQuestion: {
          Available: [
            {
              title: 'MTB ',
              patientInfoKey: 'mtb_3',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INVALID,
              ],
              type: 'singleSelect',
              subQuestion: {
                Detected: [
                  {
                    title: 'Rifampicin Resistance: ',
                    patientInfoKey: 'rifampicin_resistance_3',
                    options: [
                      optionValue.DETECTED,
                      optionValue.NOT_DETECTED,
                      optionValue.INDETERMINATE,
                    ],
                    type: 'singleSelect',
                  },
                  {
                    title: 'inhA (Low H Resistance): ',
                    patientInfoKey: 'inha',
                    options: [
                      optionValue.DETECTED,
                      optionValue.NOT_DETECTED,
                      optionValue.INDETERMINATE,
                    ],
                    type: 'singleSelect',
                  },
                  {
                    title: 'katG (High H Resistance): ',
                    patientInfoKey: 'katg',
                    options: [
                      optionValue.DETECTED,
                      optionValue.NOT_DETECTED,
                      optionValue.INDETERMINATE,
                    ],
                    type: 'singleSelect',
                  },
                ],
              },
            },
          ],
        },
      },
      {
        title:
          'Is there any other investiagtion available suggestive of TB /Clinical Sign/symptom suggestive of TB',
        patientInfoKey:
          'other_investigation_available_suggestive_tb_clinical_sign',
        options: [optionValue.YES, optionValue.NO],
        type: 'singleSelect',
      },
      {
        title: 'Is Repeat CBNAAT Result Available',
        patientInfoKey: 'repeat_cbnaat_result_available',
        options: [optionValue.YES, optionValue.NO],
        type: 'singleSelect',
        subQuestion: {
          Yes: [
            {
              title: 'MTB ',
              patientInfoKey: 'mtb_4',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INVALID,
              ],
              type: 'singleSelect',
              subQuestion: {
                Detected: [
                  {
                    title: 'If MTB Present',
                    patientInfoKey: 'if_mtb_present_2',
                    options: ['High', 'Medium', 'Low', 'Very Low', 'Traces'],
                    type: 'singleSelect',
                  },
                ],
              },
            },
            {
              title: 'Rifampicin Resistance: ',
              patientInfoKey: 'rifampicin_resistance_4',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INDETERMINATE,
              ],
              type: 'singleSelect',
            },
          ],
        },
      },
      {
        title: 'SL-LPA Result ',
        patientInfoKey: 'sl_lpa_result',
        options: [optionValue.AVAILABLE, optionValue.NOT_AVAILABLE],
        type: 'singleSelect',
        subQuestion: {
          Available: [
            {
              title: 'MTB ',
              patientInfoKey: 'mtb_5',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INVALID_ERROR,
              ],
              type: 'singleSelect',
            },
            {
              title: 'Levofloxacin Resistance',
              patientInfoKey: 'lfx_resistance',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INDETERMINATE,
              ],
              type: 'singleSelect',
            },
            {
              title: 'Moxifloxacin High dose Resistance',
              patientInfoKey: 'mfx_resistance',
              options: [
                optionValue.DETECTED_HIGH,
                optionValue.DETECTED_LOW,
                optionValue.NOT_DETECTED,
                optionValue.INDETERMINATE,
              ],
              type: 'singleSelect',
            },
            {
              title: 'Kanamycin Resistance',
              patientInfoKey: 'km_1',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INDETERMINATE,
              ],
              type: 'singleSelect',
            },
            {
              title: 'Amikacin/Capreomycin Resistance',
              patientInfoKey: 'amikacin_capreomycin',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INDETERMINATE,
              ],
              type: 'singleSelect',
            },
          ],
        },
      },
      {
        title: 'NAAT XDR',
        patientInfoKey: 'naat_xdr',
        options: [optionValue.AVAILABLE, optionValue.NOT_AVAILABLE],
        type: 'singleSelect',
        subQuestion: {
          Available: [
            {
              title: 'MTB ',
              patientInfoKey: 'mtb_6',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INVALID_ERROR_NO_RESULT,
              ],
              type: 'singleSelect',
            },
            {
              title: 'INH ',
              patientInfoKey: 'inh',
              options: [
                optionValue.LOW_INH_RESISTANCE_DETECTED,
                optionValue.INH_RESISTANCE_DETECTED,
                optionValue.INH_RESISTANCE_NOT_DETECTED,
                optionValue.INH_RESISTANCE_INDETERMINATE,
              ],
              type: 'singleSelect',
            },
            {
              title: 'FQ Resistance ',
              patientInfoKey: 'fq_resistance',
              options: [
                optionValue.LOW_FQ_RESISTANCE_DETECTED,
                optionValue.FQ_RESISTANCE_DETECTED,
                optionValue.FQ_RESISTANCE_NOT_DETECTED,
                optionValue.FQ_RESISTANCE_INDETERMINATE,
              ],
              type: 'singleSelect',
            },
            {
              title: 'Amikacin',
              patientInfoKey: 'amikacin',
              options: [
                optionValue.AMK_RESISTANCE_DETECTED,
                optionValue.AMK_RESISTANCE_NOT_DETECTED,
                optionValue.AMK_RESISTANCE_INDETERMINATE,
              ],
              type: 'singleSelect',
            },
            {
              title: 'Kanamycin',
              patientInfoKey: 'kanamycin',
              options: [
                optionValue.KAN_RESISTANCE_DETECTED,
                optionValue.KAN_RESISTANCE_NOT_DETECTED,
                optionValue.KAN_RESISTANCE_INDETERMINATE,
              ],
              type: 'singleSelect',
            },
            {
              title: 'Capreomycin',
              patientInfoKey: 'capreomycin',
              options: [
                optionValue.CAP_RESISTANCE_DETECTED,
                optionValue.CAP_RESISTANCE_NOT_DETECTED,
                optionValue.CAP_RESISTANCE_INDETERMINATE,
              ],
              type: 'singleSelect',
            },
            {
              title: 'Ethionamide Resistance',
              patientInfoKey: 'ethonamide',
              options: [optionValue.DETECTED, optionValue.NOT_DETECTED],
              type: 'singleSelect',
            },
          ],
        },
      },
    ],
    isDisable: false,
  },
  form4: {
    title: 'Culture Report',
    questions: [
      {
        title: 'MGIT & DST Result ',
        patientInfoKey: 'mgit_dst_result',
        options: [optionValue.AVAILABLE, optionValue.NOT_AVAILABLE],
        type: 'singleSelect',
      },
      {
        title: 'Bedaquiline',
        patientInfoKey: 'bdq',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'singleSelect',
      },
      {
        title: 'Levofloxacin',
        patientInfoKey: 'lfx',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'singleSelect',
      },
      {
        title: 'Moxifloxacin High dose',
        patientInfoKey: 'mfxh',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'singleSelect',
      },
      {
        title: 'Linezolid',
        patientInfoKey: 'lzd',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'singleSelect',
      },
      {
        title: 'Clofazimine',
        patientInfoKey: 'cfz',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'singleSelect',
      },
      {
        title: 'Pretomanid',
        patientInfoKey: 'pretomaind',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'singleSelect',
      },
      {
        title: 'Delamanid',
        patientInfoKey: 'dlm',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'singleSelect',
      },
      {
        title: 'Kanamycin',
        patientInfoKey: 'km_2',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'singleSelect',
      },
      {
        title: 'Amikacin',
        patientInfoKey: 'am',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'singleSelect',
      },
      {
        title: 'Pyrazinamide',
        patientInfoKey: 'pyrazinamide',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'singleSelect',
      },
      {
        title: 'Ethionamide',
        patientInfoKey: 'eto',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'singleSelect',
      },
      {
        title: 'p-aminosalicyclic Acid',
        patientInfoKey: 'pas',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'singleSelect',
      },
    ],
    isDisable: false,
  },
  form5: {
    title: 'Pre-Treatment Evaluation',
    questions: [
      {
        title: 'Haemoglobin (Hb) level > 8.0 g/dL',
        patientInfoKey: 'hb_level',
        options: ['Yes', 'No'],
        type: 'singleSelect',
      },
      {
        title: 'Kidney Function Test\n(Serum creatinine < 3.0 × ULN)',
        patientInfoKey: 'kidney_func_test',
        options: [optionValue.NORMAL, optionValue.ABNORMAL],
        type: 'singleSelect',
      },
      {
        title: 'Thyroid Function Tests',
        patientInfoKey: 'thyroid_func_tests',
        options: [optionValue.NORMAL, optionValue.ABNORMAL],
        type: 'singleSelect',
      },
      {
        title:
          'Liver Function Test\n(AST/ALT < 3.0 × ULN, irrespective of symptoms of liver disease) and (Total bilirubin < 2.0 × ULN)',
        patientInfoKey: 'liver_func_test',
        options: ['Yes', 'No'],
        type: 'singleSelect',
      },
      {
        title: 'Serum Electrolytes',
        patientInfoKey: 'serum_electrolytes',
        options: [optionValue.NORMAL, optionValue.ABNORMAL],
        type: 'singleSelect',
      },
      {
        title: 'Heart Rate (Per min)',
        patientInfoKey: 'heartrate',
        type: 'decimal-pad',
      },
      {
        title: 'QT Interval (ms)',
        patientInfoKey: 'qt_interval',
        type: 'decimal-pad',
      },
      {
        title: 'QtcF',
        patientInfoKey: 'qtcf',
        type: 'text',
        placeholder: 'auto calculated',
        isDisabled: true,
      },

      {
        title: 'Audiometry',
        patientInfoKey: 'audiometry',
        options: [optionValue.NORMAL, optionValue.ABNORMAL],
        type: 'singleSelect',
      },
      {
        title: 'Eye Examination:',
        patientInfoKey: 'eye_exam_fundus',
        options: [optionValue.NORMAL, optionValue.ABNORMAL],
        type: 'singleSelect',
      },
      {
        title: 'Peripheral Neuropathy',
        patientInfoKey: 'peripheral_neuropathy',
        options: ['Yes', 'No'],
        type: 'singleSelect',
        subQuestion: {
          Yes: [
            {
              title: 'Peripheral Neuropathy (Grade)',
              patientInfoKey: 'peripheral_neuropathy_grade',
              options: [
                optionValue.MILD_GRADE_1_2,
                optionValue.MODERATE_SEVERE_GRADE_3_4,
              ],
              type: 'singleSelect',
            },
          ],
        },
      },
    ],
    isDisable: false,
  },
};

export const emptyDependedQuestion: Record<string, object> = {
  site_of_disease: {
    siteOfDiseaseExtrapulmonary: '',
  },
  hiv: {
    hiv_sub_selection: '',
  },
  past_history_att: {
    is_levo_moxi_more_than_a_month: '',
    is_clofazimine_more_than_a_month: '',
    is_bdq_more_than_a_month: '',
    is_lzd_more_than_a_month: '',
    is_pretomanid_more_than_a_month: '',
    is_ethionamide_more_than_a_month: '',
  },
  suffering_from_any_chronic_illness: {
    seizure_disorder: '',
    chronic_kidney_disease: '',
    chronic_liver_disease: '',
    depression: '',
    cardiac_disease: '',
    diabetes: '',
    vision_loss_fundus_abnormality: '',
  },
  sex: {
    pregnancy: '',
  },
  pregnancy: {
    duration_of_pregnancy: '',
  },
  cbnaat_trunat: {
    mtb_1: '',
    investigation_X_ray_fnac_ct_suggestove: '',
    if_mtb_present_1: '',
    rifampicin_resistance_1: '',
  },
  mtb_1: {
    if_mtb_present_1: '',
    rifampicin_resistance_1: '',
  },
  other_investigation_available_suggestive_tb_clinical_sign: {
    mtb_4: '',
    if_mtb_present_2: '',
    rifampicin_resistance_4: '',
  },
  mtb_4: {
    if_mtb_present_2: '',
  },
  truenat: {
    mtb_2: '',
    rifampicin_resistance_2: '',
  },
  naat_xdr: {
    mtb_6: '',
    inh: '',
    fq_resistance: '',
    amikacin: '',
    kanamycin: '',
    capreomycin: '',
    ethonamide: '',
  },
  sl_lpa_result: {
    mtb_5: '',
    lfx_resistance: '',
    mfx_resistance: '',
    km_1: '',
    amikacin_capreomycin: '',
  },
  fl_lpa_result: {
    mtb_3: '',
    rifampicin_resistance_3: '',
    inha: '',
    katg: '',
  },
  mtb_3: {
    rifampicin_resistance_3: '',
    inha: '',
    katg: '',
  },
  mgit_dst_result: {
    bdq: optionValue.NOT_AVAILABLE,
    lfx: optionValue.NOT_AVAILABLE,
    mfxh: optionValue.NOT_AVAILABLE,
    lzd: optionValue.NOT_AVAILABLE,
    cfz: optionValue.NOT_AVAILABLE,
    dlm: optionValue.NOT_AVAILABLE,
    km_2: optionValue.NOT_AVAILABLE,
    am: optionValue.NOT_AVAILABLE,
    pretomaind: optionValue.NOT_AVAILABLE,
    pyrazinamide: optionValue.NOT_AVAILABLE,
    eto: optionValue.NOT_AVAILABLE,
    pas: optionValue.NOT_AVAILABLE,
  },
};

export const ManageTBInitialValues: Record<string, string> =
  rawData.initialValues;
export const checkDiscordanceCondition: Record<string, object> =
  rawData.checkDiscordanceCondition;
export const discordanceMessages: Record<string, string> = {
  condition1: rawData.discordanceMessage.message18,
  condition2: rawData.discordanceMessage.message18,
  condition5: rawData.discordanceMessage.message3,
  condition11: rawData.discordanceMessage.message6,
  condition15: rawData.discordanceMessage.message9,
  condition16: rawData.discordanceMessage.message17,
  condition18: rawData.discordanceMessage.message12,
  condition24: rawData.discordanceMessage.message16,
  condition25: rawData.discordanceMessage.message17,
  condition15_1: rawData.discordanceMessage.message9,
};

export const AttentionHeaderText = [
  'condition4',
  'condition5',
  'condition6',
  'condition7',
  'condition8',
  'condition9',
  'condition12',
  'condition13',
  'condition13_1',
  'condition15_1',
  'condition15',
  'condition16',
  'condition17',
  'condition19',
  'condition18',
  'condition21',
  'condition22',
  'condition23',
  'condition24',
  'condition25',
];

export const disableFieldIfMgitNotAvail = [
  'pas',
  'eto',
  'pyrazinamide',
  'am',
  'km_2',
  'dlm',
  'pretomaind',
  'cfz',
  'lzd',
  'mfxh',
  'lfx',
  'bdq',
];
