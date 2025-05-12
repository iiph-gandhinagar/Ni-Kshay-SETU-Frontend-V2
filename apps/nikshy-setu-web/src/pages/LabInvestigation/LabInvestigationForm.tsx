import {
  Png000,
  Png01,
  Png02,
  Png03,
  Png04,
  Png05,
  Png06,
  Png07,
  Png08,
  Png09,
  Png10,
  Png11,
  Png12,
  Png13,
  Png14,
  Png15,
} from '@nikshay-setu-v3-monorepo/assets';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BorderedInput } from '../../components/Inputs/FormInput';
import { FormSelect } from '../../components/Inputs/FormSelect';
import { useLanguageObject } from '../../utils/HelperHooks';

type option = { label: string; value: string; score: number };
type field = {
  name: string;
  title: string;
  subtitle: string;
  type: 'select' | 'number';
  image: any;
  options: option[];
  langKey: string;
};

export const LabInvestigationForm = () => {
  const navigate = useNavigate();
  const [langKey, getText, objectToValue] = useLanguageObject();

  const [formState, setFormSate] = useState({});
  const [scoreValues, setScoreValues] = useState({});

  const onChangeHandler = (
    value: string,
    name: string,
    type: field['type']
  ) => {
    if (type == 'select') {
      const newScoreValue: option | undefined =
        LabInvestigationFormObject.formField[name].options.find(
          (option: option) => option.value == value
        );
      if (newScoreValue) {
        setScoreValues({ ...scoreValues, [name]: newScoreValue.score });
      } else {
        console.log(`${name} score value not found`);
      }
      setFormSate({ ...formState, [name]: value });
    } else if (type == 'number') {
      const newValue = value.trim() ? Number(value) : undefined;
      const newScore =
        newValue !== undefined
          ? LabInvestigationFormObject.formField[name].getScore(newValue)
          : undefined;

      setScoreValues({ ...scoreValues, [name]: newScore });
      setFormSate({ ...formState, [name]: value });
    }
  };

  const CalculateButtonSate: boolean = useMemo(() => {
    const newScoreValues = Object.values(scoreValues);
    if (newScoreValues.length == 0) return true;
    if (newScoreValues.includes(undefined)) return true;
    return false;
  }, [scoreValues]);

  return (
    <div className='p-3 space-y-5'>
      {Object.entries(LabInvestigationFormObject.formField).map(
        ([key, fieldObject]: [string, field]) => {
          const label = getText(
            fieldObject.langKey as Parameters<typeof getText>[0]
          );
          return (
            <div key={key} className='flex gap-3'>
              <div className='mt-3'>
                <img src={fieldObject.image} alt={fieldObject.title} />
              </div>
              <div className='flex-grow'>
                {fieldObject.type == 'select' && (
                  <FormSelect
                    value={formState[key]}
                    label={label}
                    placeholder={`${getText('APP_SELECT')} ${label}`}
                    onChange={(event) =>
                      onChangeHandler(event.value, key, fieldObject.type)
                    }
                    options={fieldObject.options}
                  />
                )}

                {fieldObject.type == 'number' && (
                  <BorderedInput
                    type='number'
                    value={formState[key]}
                    label={label}
                    placeholder={`${getText('APP_ENTER')} ${label}`}
                    onChange={(event) =>
                      onChangeHandler(event.target.value, key, fieldObject.type)
                    }
                  />
                )}

                <p className='ms-3 mt-1 text-gray-500'>
                  {fieldObject.subtitle
                    ? `${getText('LAB_NORMAL_RANGE')} : ${fieldObject.subtitle}`
                    : ''}
                </p>
              </div>
            </div>
          );
        }
      )}

      <div className='mt-4'>
        <button
          onClick={() => {
            navigate(`/labInvestigation-result`, {
              state: {
                formState,
                scoreValues,
              },
            });
          }}
          disabled={CalculateButtonSate}
          className='btn btn-blue w-full'
        >
          {getText('APP_CALCULATE')}
        </button>
      </div>
    </div>
  );
};

export const LabInvestigationFormObject = {
  formField: {
    GENERAL_CONDITION: {
      name: 'GENERAL_CONDITION',
      title: 'General Condition',
      subtitle: ' Conscious & well oriented',
      langKey: 'LAB_GENERAL_CONDITION',
      type: 'select',
      image: Png000,
      options: [
        {
          label: 'Conscious and normal',
          value: 'Conscious and normal',
          score: 0,
        },
        {
          label: 'Inability walk but conscious and oriented',
          value: 'Inability walk but conscious and oriented',
          score: 1,
        },
        {
          label: 'Conscious and not oriented',
          value: 'Conscious and not oriented',
          score: 2,
        },
        {
          label: 'Drowsy/Unconscious/Comatose',
          value: 'Drowsy/Unconscious/Comatose',
          score: 3,
        },
      ],
    },
    TEXT_ICTERUS: {
      name: 'TEXT_ICTERUS',
      title: 'Icterus',
      langKey: 'LAB_TEXT_ICTERUS',
      type: 'select',
      image: Png09,
      options: [
        { label: 'Yes', value: 'Yes', score: 1 },
        { label: 'No', value: 'No', score: 0 },
      ],
    },
    PEDAL_OEDEMA: {
      name: 'PEDAL_OEDEMA',
      title: 'Pedal Oedema',
      langKey: 'LAB_PEDAL_OEDEMA',
      type: 'select',
      image: Png08,
      options: [
        { label: 'Yes', value: 'Yes', score: 1 },
        { label: 'No', value: 'No', score: 0 },
      ],
    },
    PULSE_RATE: {
      name: 'PULSE_RATE',
      title: 'Pulse Rate',
      langKey: 'LAB_PULSE_RATE',
      type: 'number',
      subtitle: ' 60 - 100/min',
      image: Png01,
      getScore: (value: number) => {
        if (value < 60 || value > 100) return 2;
        return 0;
      },
    },
    TEMPERATURE: {
      name: 'TEMPERATURE',
      title: 'Temperature',
      langKey: 'LAB_TEMPERATURE',
      type: 'number',
      image: Png02,
      subtitle: ' 35 – 38.6 ‘C',
      getScore: (value: number) => {
        if (value < 35 || value > 41) return 2;
        if (value > 38.6 || value <= 41) return 1;
        return 0;
      },
    },
    BLOOD_PRESSURE: {
      name: 'BLOOD_PRESSURE',
      title: 'Blood Pressure',
      langKey: 'LAB_BLOOD_PRESSURE',
      image: Png03,
      subtitle: ' 90/60 – 120/80',
      type: 'select',
      options: [
        {
          label: 'Normal (120/80mmHg)',
          value: 'Normal (120/80mmHg)',
          score: 0,
        },
        {
          label: 'Higher Normal (< 140/90mmHg)',
          value: 'Higher Normal (< 140/90mmHg)',
          score: 1,
        },
        {
          label: 'Hypertension (> 140/90 mmHg)',
          value: 'Hypertension (> 140/90 mmHg)',
          score: 2,
        },
        {
          label: 'Hypotension (Diastolic < 60 mmHg)',
          value: 'Hypotension (Diastolic < 60 mmHg)',
          score: 3,
        },
        {
          label: 'Hypertension (>200/100 mm Hg)',
          value: 'Hypertension (>200/100 mm Hg)',
          score: 3,
        },
      ],
    },
    RESPIRATORY_RATE: {
      name: 'RESPIRATORY_RATE',
      title: 'Respiratory Rate',
      langKey: 'LAB_RESPIRATORY_RATE',
      image: Png04,
      subtitle: ' 12 – 18/min',
      type: 'number',
      getScore: (value: number) => {
        if (value < 12) return 2;
        if (value >= 12 && value <= 18) return 0;
        if (value <= 24) return 1;
        if (value < 30) return 2;
        if (value >= 30) return 3;
      },
    },
    OXYGEN_SATURATION: {
      name: 'OXYGEN_SATURATION',
      title: 'Oxygen Saturation',
      langKey: 'LAB_OXYGEN_SATURATION',
      image: Png05,
      subtitle: ' 95 – 100%',
      type: 'number',
      getScore: (value: number) => {
        if (value >= 94 && value <= 100) return 0;
        if (value >= 90) return 1;
        if (value >= 85) return 2;
        if (value < 85) return 3;
      },
    },
    TEXT_BMI: {
      name: 'TEXT_BMI',
      title: 'BMI',
      langKey: 'LAB_TEXT_BMI',
      image: Png15,
      subtitle: ' 18.5 – 24.9',
      type: 'number',
      getScore: (value: number) => {
        if (value < 14) return 3;
        if (value >= 14 && value < 16) return 2;
        if (value >= 16 && value < 18.5) return 1;
        if (value >= 18.5 && value < 25) return 0;
        if (value >= 25 && value < 30) return 1;
        if (value >= 30 && value < 33) return 2;
        if (value >= 33) return 3;
      },
    },
    TEXT_MUAC: {
      name: 'TEXT_MUAC',
      title: 'MUAC',
      langKey: 'LAB_TEXT_MUAC',
      image: Png07,
      subtitle: ' >= 19 cm',
      type: 'number',
      getScore: (value: number) => {
        if (value < 19) return 1;
        if (value >= 19) return 0;
      },
    },
    TEXT_HEMOGLOBIN: {
      name: 'TEXT_HEMOGLOBIN',
      title: 'Hemoglobin (HB)',
      langKey: 'LAB_TEXT_HEMOGLOBIN',
      image: Png10,
      subtitle: ' Female = 9.9 – 14.3 g/dl, Male = 12.3 – 17 g/dl',
      type: 'number',
      getScore: (value: number) => {
        if (value < 4) return 3;
        if (value >= 4 && value < 7) return 2;
        if (value >= 7 && value < 10) return 1;
        if (value >= 10 && value <= 18) return 0;
        if (value > 18) return 2;
      },
    },
    COUNT_WBC: {
      name: 'COUNT_WBC',
      title: 'Total Count of White Blood Cells',
      langKey: 'LAB_COUNT_WBC',
      image: Png11,
      subtitle: ' 4000-11000',
      type: 'number',
      getScore: (value: number) => {
        if (value <= 2000) return 3;
        if (value > 2000 && value < 3000) return 2;
        if (value >= 3000 && value < 4000) return 1;
        if (value >= 4000 && value < 11000) return 0;
        if (value >= 11000 && value < 14000) return 1;
        if (value >= 14000 && value < 16000) return 2;
        if (value >= 16000) return 3;
      },
    },
    TEXT_RBS: {
      name: 'TEXT_RBS',
      title: 'Random Blood Sugar (RBS)',
      langKey: 'LAB_TEXT_RBS',
      image: Png12,
      subtitle: ' 79 – 140 mg/dl',
      type: 'number',
      getScore: (value: number) => {
        if (value < 50) return 3;
        if (value < 70) return 2;
        if (value < 80) return 1;
        if (value <= 128) return 0;
        if (value <= 140) return 1;
        if (value < 250) return 2;
        if (value >= 250) return 3;
      },
    },
    TEXT_HIV: {
      name: 'TEXT_HIV',
      title: 'HIV',
      langKey: 'LAB_TEXT_HIV',
      image: Png13,
      type: 'select',
      options: [
        { label: '-Ve', value: '-Ve', score: 0 },
        { label: '+Ve and on ART', value: '+Ve and on ART', score: 1 },
        { label: '+Ve and not on ART', value: '+Ve and not on ART', score: 2 },
      ],
    },
    TEXT_XRAY: {
      name: 'TEXT_XRAY',
      title: 'Chest X-ray',
      langKey: 'LAB_TEXT_XRAY',
      image: Png14,
      subtitle: ' No abnormality',
      type: 'select',
      options: [
        { label: 'No abnormality', value: 'No abnormality', score: 0 },
        { label: 'Consolidation', value: 'Consolidation', score: 2 },
        { label: 'Hydro Pneumothorax', value: 'Hydro Pneumothorax', score: 3 },
      ],
    },
    TEXT_HEMOPTYSIS: {
      name: 'TEXT_HEMOPTYSIS',
      title: 'Hemoptysis',
      langKey: 'LAB_TEXT_HEMOPTYSIS',
      image: Png06,
      type: 'select',
      options: [
        { label: 'Yes', value: 'Yes', score: 3 },
        { label: 'No', value: 'No', score: 0 },
      ],
    },
  },
};
