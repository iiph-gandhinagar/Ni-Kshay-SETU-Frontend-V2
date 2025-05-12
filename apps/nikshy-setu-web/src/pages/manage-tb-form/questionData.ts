import rawData from './rawDataOfManageTb.json';
export type Question = {
  label: string;
  name: string;
  type: 'text' | 'number' | 'radio' | 'radio';
  options?: string[];
  subQuestion?: Record<string, Question[]>;
  placeholder?: string;
  isDisabled?: boolean;
};

export type Form = {
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
        label: 'Name',
        name: 'name',
        type: 'text',
        placeholder: 'Enter Name',
      },
      {
        label: 'Ni-kshay ID(Optional)',
        name: 'nikshayId',
        type: 'number',
        placeholder: 'Enter Ni-kshay ID',
      },
      {
        label: 'Age (in completed Years)',
        name: 'age',
        type: 'number',
        placeholder: 'Enter age',
      },
      {
        label: 'Gender',
        name: 'sex',
        options: [
          optionValue.MALE,
          optionValue.FEMALE,
          optionValue.TRANSGENDER,
        ],
        type: 'radio',
      },
      {
        label: 'Weight (in Kg)',
        name: 'weight',
        type: 'number',
        placeholder: 'Enter Weight (in kg)',
      },
      {
        label: 'Height (in Cms)',
        name: 'height',
        type: 'number',
        placeholder: 'Enter Height (in CM)',
      },
      {
        label: 'BMI  (kg/m²)',
        name: 'bmi',
        type: 'number',
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
        label: `(Does any of the Parameters require hospitalization/Indicating Mortality?)
          \n◉ Patient confined to bed and unable to stand unassisted
          \n◉ Respiratory rate > 24 breaths per minute
          \n◉ SpO₂ < 94% at room air
          \n◉ Systolic BP < 90 mm Hg
          \n◉ Pulse Rate > 120/min
          \n◉ BMI < 14 kg/m² or BMI < 16 kg/m² with oedema`,
        name: 'respiratory_rate',
        options: [optionValue.YES, optionValue.NO],
        type: 'radio',
      },
      {
        label: 'Site of Disease and severity of Disease',
        name: 'site_of_disease',
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
        type: 'radio',
      },
      {
        label: 'HIV Status',
        name: 'hiv',
        options: [
          optionValue.POSITIVE,
          optionValue.NEGATIVE,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'radio',
      },
      {
        label: 'Past History of Anti Tubercular Treatment',
        name: 'past_history_att',
        options: [optionValue.PRESENT, optionValue.ABSENT],
        type: 'radio',
        subQuestion: {
          Present: [
            {
              name: 'is_levo_moxi_more_than_a_month',
              label:
                'Is Levofloxacin / Moxifloxacin taken for more than 1 month? ',
              options: [
                optionValue.TAKEN,
                optionValue.NOT_TAKEN,
                optionValue.NOT_KNOWN,
              ],
              type: 'radio',
            },
            {
              name: 'is_clofazimine_more_than_a_month',
              label: 'Is Clofazimine taken for more than 1 month? ',
              options: [
                optionValue.TAKEN,
                optionValue.NOT_TAKEN,
                optionValue.NOT_KNOWN,
              ],
              type: 'radio',
            },
            {
              name: 'is_bdq_more_than_a_month',
              label: 'Is Bedaquiline taken for more than 1 month? ',
              options: [
                optionValue.TAKEN,
                optionValue.NOT_TAKEN,
                optionValue.NOT_KNOWN,
              ],
              type: 'radio',
            },
            {
              name: 'is_lzd_more_than_a_month',
              label: 'Is Linezolid (LZD) taken more than one month?',
              options: [
                optionValue.TAKEN,
                optionValue.NOT_TAKEN,
                optionValue.NOT_KNOWN,
              ],
              type: 'radio',
            },
            {
              name: 'is_pretomanid_more_than_a_month',
              label: 'Is Pretomanid taken more than one month?',
              options: [
                optionValue.TAKEN,
                optionValue.NOT_TAKEN,
                optionValue.NOT_KNOWN,
              ],
              type: 'radio',
            },
            {
              name: 'is_ethionamide_more_than_a_month',
              label: 'Is Ethionamide taken for more than 1 month? ',
              options: [
                optionValue.TAKEN,
                optionValue.NOT_TAKEN,
                optionValue.NOT_KNOWN,
              ],
              type: 'radio',
            },
          ],
        },
      },
      {
        label: 'Suffering from any chronic illness',
        name: 'suffering_from_any_chronic_illness',
        options: [optionValue.YES, optionValue.NO],
        type: 'radio',
        subQuestion: {
          Yes: [
            {
              label: 'Seizure Disorder: ',
              name: 'seizure_disorder',
              options: ['Yes', 'No'],
              type: 'radio',
            },
            {
              label: 'Chronic Kidney Disease: ',
              name: 'chronic_kidney_disease',
              options: ['Yes', 'No'],
              type: 'radio',
            },
            {
              label: 'Chronic Liver Disease: ',
              name: 'chronic_liver_disease',
              options: ['Yes', 'No'],
              type: 'radio',
            },
            {
              label: 'Depression',
              name: 'depression',
              options: ['Yes', 'No'],
              type: 'radio',
            },
            {
              label: 'Cardiac Disease ',
              name: 'cardiac_disease',
              options: ['Yes', 'No'],
              type: 'radio',
            },
            {
              label: 'Diabetes',
              name: 'diabetes',
              options: ['Yes', 'No'],
              type: 'radio',
            },
            {
              label: 'Vision Loss/ Fundus Abnormality',
              name: 'vision_loss_fundus_abnormality',
              options: ['Yes', 'No'],
              type: 'radio',
            },
          ],
        },
      },
      {
        label: 'Pregnancy',
        name: 'pregnancy',
        options: [optionValue.YES, optionValue.NO],
        type: 'radio',
        subQuestion: {
          Yes: [
            {
              label: 'pregnancy Status',
              name: 'duration_of_pregnancy',
              options: [
                optionValue.LESS_WEEK_MTP,
                optionValue.LESS_WEEK_NOT_MTP,
                optionValue._20_24_LESS_THEN_32_WEEK_MTP,
                optionValue._32_WEEK_ABOVE,
              ],
              type: 'radio',
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
        label: 'Sputum/ Extra Pulmonary Site AFB  Smear',
        name: 'sputum_afb',
        options: [
          optionValue.POSITIVE,
          optionValue.NEGATIVE,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'radio',
      },
      {
        label: 'CBNAAT (GeneXpert/GeneXpert Ultra) ',
        name: 'cbnaat_trunat',
        options: [optionValue.AVAILABLE, optionValue.NOT_AVAILABLE],
        subQuestion: {
          Available: [
            {
              label: 'M.TB: ',
              name: 'mtb_1',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INVALID,
              ],
              type: 'radio',
              subQuestion: {
                Detected: [
                  {
                    label: 'If MTB Present',
                    name: 'if_mtb_present_1',
                    options: ['High', 'Medium', 'Low', 'Very Low', 'Traces'],
                    type: 'radio',
                  },
                  {
                    label: 'Rifampicin Resistance',
                    name: 'rifampicin_resistance_1',
                    options: [
                      optionValue.DETECTED,
                      optionValue.NOT_DETECTED,
                      optionValue.INDETERMINATE,
                    ],
                    type: 'radio',
                  },
                ],
              },
            },
          ],
        },
        type: 'radio',
      },
      {
        label: 'Truenat',
        name: 'truenat',
        options: [optionValue.AVAILABLE, optionValue.NOT_AVAILABLE],
        type: 'radio',
        subQuestion: {
          Available: [
            {
              label: 'M.TB: ',
              name: 'mtb_2',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INVALID,
              ],
              type: 'radio',
              subQuestion: {
                Detected: [
                  {
                    label: 'Rifampicin Resistance',
                    name: 'rifampicin_resistance_2',
                    options: [
                      optionValue.DETECTED,
                      optionValue.NOT_DETECTED,
                      optionValue.INDETERMINATE,
                    ],
                    type: 'radio',
                  },
                ],
              },
            },
          ],
        },
      },
      {
        label: 'FL-LPA Result ',
        name: 'fl_lpa_result',
        options: [optionValue.AVAILABLE, optionValue.NOT_AVAILABLE],
        type: 'radio',
        subQuestion: {
          Available: [
            {
              label: 'MTB ',
              name: 'mtb_3',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INVALID,
              ],
              type: 'radio',
              subQuestion: {
                Detected: [
                  {
                    label: 'Rifampicin Resistance: ',
                    name: 'rifampicin_resistance_3',
                    options: [
                      optionValue.DETECTED,
                      optionValue.NOT_DETECTED,
                      optionValue.INDETERMINATE,
                    ],
                    type: 'radio',
                  },
                  {
                    label: 'inhA (Low H Resistance): ',
                    name: 'inha',
                    options: [
                      optionValue.DETECTED,
                      optionValue.NOT_DETECTED,
                      optionValue.INDETERMINATE,
                    ],
                    type: 'radio',
                  },
                  {
                    label: 'katG (High H Resistance): ',
                    name: 'katg',
                    options: [
                      optionValue.DETECTED,
                      optionValue.NOT_DETECTED,
                      optionValue.INDETERMINATE,
                    ],
                    type: 'radio',
                  },
                ],
              },
            },
          ],
        },
      },
      {
        label:
          'Is there any other investiagtion available suggestive of TB /Clinical Sign/symptom suggestive of TB',
        name: 'other_investigation_available_suggestive_tb_clinical_sign',
        options: [optionValue.YES, optionValue.NO],
        type: 'radio',
      },
      {
        label: 'Is Repeat CBNAAT Result Available',
        name: 'repeat_cbnaat_result_available',
        options: [optionValue.YES, optionValue.NO],
        type: 'radio',
        subQuestion: {
          Yes: [
            {
              label: 'MTB ',
              name: 'mtb_4',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INVALID,
              ],
              type: 'radio',
              subQuestion: {
                Detected: [
                  {
                    label: 'If MTB Present',
                    name: 'if_mtb_present_2',
                    options: ['High', 'Medium', 'Low', 'Very Low', 'Traces'],
                    type: 'radio',
                  },
                ],
              },
            },
            {
              label: 'Rifampicin Resistance: ',
              name: 'rifampicin_resistance_4',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INDETERMINATE,
              ],
              type: 'radio',
            },
          ],
        },
      },
      {
        label: 'SL-LPA Result ',
        name: 'sl_lpa_result',
        options: [optionValue.AVAILABLE, optionValue.NOT_AVAILABLE],
        type: 'radio',
        subQuestion: {
          Available: [
            {
              label: 'MTB ',
              name: 'mtb_5',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INVALID_ERROR,
              ],
              type: 'radio',
            },
            {
              label: 'Levofloxacin Resistance',
              name: 'lfx_resistance',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INDETERMINATE,
              ],
              type: 'radio',
            },
            {
              label: 'Moxifloxacin High dose Resistance',
              name: 'mfx_resistance',
              options: [
                optionValue.DETECTED_HIGH,
                optionValue.DETECTED_LOW,
                optionValue.NOT_DETECTED,
                optionValue.INDETERMINATE,
              ],
              type: 'radio',
            },
            {
              label: 'Kanamycin Resistance',
              name: 'km_1',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INDETERMINATE,
              ],
              type: 'radio',
            },
            {
              label: 'Amikacin/Capreomycin Resistance',
              name: 'amikacin_capreomycin',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INDETERMINATE,
              ],
              type: 'radio',
            },
          ],
        },
      },
      {
        label: 'NAAT XDR',
        name: 'naat_xdr',
        options: [optionValue.AVAILABLE, optionValue.NOT_AVAILABLE],
        type: 'radio',
        subQuestion: {
          Available: [
            {
              label: 'MTB ',
              name: 'mtb_6',
              options: [
                optionValue.DETECTED,
                optionValue.NOT_DETECTED,
                optionValue.INVALID_ERROR_NO_RESULT,
              ],
              type: 'radio',
            },
            {
              label: 'INH ',
              name: 'inh',
              options: [
                optionValue.LOW_INH_RESISTANCE_DETECTED,
                optionValue.INH_RESISTANCE_DETECTED,
                optionValue.INH_RESISTANCE_NOT_DETECTED,
                optionValue.INH_RESISTANCE_INDETERMINATE,
              ],
              type: 'radio',
            },
            {
              label: 'FQ Resistance ',
              name: 'fq_resistance',
              options: [
                optionValue.LOW_FQ_RESISTANCE_DETECTED,
                optionValue.FQ_RESISTANCE_DETECTED,
                optionValue.FQ_RESISTANCE_NOT_DETECTED,
                optionValue.FQ_RESISTANCE_INDETERMINATE,
              ],
              type: 'radio',
            },
            {
              label: 'Amikacin',
              name: 'amikacin',
              options: [
                optionValue.AMK_RESISTANCE_DETECTED,
                optionValue.AMK_RESISTANCE_NOT_DETECTED,
                optionValue.AMK_RESISTANCE_INDETERMINATE,
              ],
              type: 'radio',
            },
            {
              label: 'Kanamycin',
              name: 'kanamycin',
              options: [
                optionValue.KAN_RESISTANCE_DETECTED,
                optionValue.KAN_RESISTANCE_NOT_DETECTED,
                optionValue.KAN_RESISTANCE_INDETERMINATE,
              ],
              type: 'radio',
            },
            {
              label: 'Capreomycin',
              name: 'capreomycin',
              options: [
                optionValue.CAP_RESISTANCE_DETECTED,
                optionValue.CAP_RESISTANCE_NOT_DETECTED,
                optionValue.CAP_RESISTANCE_INDETERMINATE,
              ],
              type: 'radio',
            },
            {
              label: 'Ethionamide Resistance',
              name: 'ethonamide',
              options: [optionValue.DETECTED, optionValue.NOT_DETECTED],
              type: 'radio',
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
        label: 'MGIT & DST Result ',
        name: 'mgit_dst_result',
        options: [optionValue.AVAILABLE, optionValue.NOT_AVAILABLE],
        type: 'radio',
      },
      {
        label: 'Bedaquiline',
        name: 'bdq',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'radio',
      },
      {
        label: 'Levofloxacin',
        name: 'lfx',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'radio',
      },
      {
        label: 'Moxifloxacin High dose',
        name: 'mfxh',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'radio',
      },
      {
        label: 'Linezolid',
        name: 'lzd',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'radio',
      },
      {
        label: 'Clofazimine',
        name: 'cfz',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'radio',
      },
      {
        label: 'Pretomanid',
        name: 'pretomaind',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'radio',
      },
      {
        label: 'Delamanid',
        name: 'dlm',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'radio',
      },
      {
        label: 'Kanamycin',
        name: 'km_2',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'radio',
      },
      {
        label: 'Amikacin',
        name: 'am',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'radio',
      },
      {
        label: 'Pyrazinamide',
        name: 'pyrazinamide',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'radio',
      },
      {
        label: 'Ethionamide',
        name: 'eto',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'radio',
      },
      {
        label: 'p-aminosalicyclic Acid',
        name: 'pas',
        options: [
          optionValue.SENSITIVE,
          optionValue.RESISTANT,
          optionValue.NOT_AVAILABLE,
        ],
        type: 'radio',
      },
    ],
    isDisable: false,
  },
  form5: {
    title: 'Pre-Treatment Evaluation',
    questions: [
      {
        label: 'Haemoglobin (Hb) level > 8.0 g/dL',
        name: 'hb_level',
        options: ['Yes', 'No'],
        type: 'radio',
      },
      {
        label: 'Kidney Function Test\n(Serum creatinine < 3.0 × ULN)',
        name: 'kidney_func_test',
        options: [optionValue.NORMAL, optionValue.ABNORMAL],
        type: 'radio',
      },
      {
        label: 'Thyroid Function Tests',
        name: 'thyroid_func_tests',
        options: [optionValue.NORMAL, optionValue.ABNORMAL],
        type: 'radio',
      },
      {
        label:
          'Liver Function Test\n(AST/ALT < 3.0 × ULN, irrespective of symptoms of liver disease) and (Total bilirubin < 2.0 × ULN)',
        name: 'liver_func_test',
        options: ['Yes', 'No'],
        type: 'radio',
      },
      {
        label: 'Serum Electrolytes',
        name: 'serum_electrolytes',
        options: [optionValue.NORMAL, optionValue.ABNORMAL],
        type: 'radio',
      },
      {
        label: 'Heart Rate (Per min)',
        name: 'heartrate',
        type: 'number',
      },
      {
        label: 'QT Interval (ms)',
        name: 'qt_interval',
        type: 'number',
      },
      {
        label: 'QtcF',
        name: 'qtcf',
        type: 'text',
        placeholder: 'auto calculated',
        isDisabled: true,
      },

      {
        label: 'Audiometry',
        name: 'audiometry',
        options: [optionValue.NORMAL, optionValue.ABNORMAL],
        type: 'radio',
      },
      {
        label: 'Eye Examination:',
        name: 'eye_exam_fundus',
        options: [optionValue.NORMAL, optionValue.ABNORMAL],
        type: 'radio',
      },
      {
        label: 'Peripheral Neuropathy',
        name: 'peripheral_neuropathy',
        options: ['Yes', 'No'],
        type: 'radio',
        subQuestion: {
          Yes: [
            {
              label: 'Peripheral Neuropathy (Grade)',
              name: 'peripheral_neuropathy_grade',
              options: [
                optionValue.MILD_GRADE_1_2,
                optionValue.MODERATE_SEVERE_GRADE_3_4,
              ],
              type: 'radio',
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
