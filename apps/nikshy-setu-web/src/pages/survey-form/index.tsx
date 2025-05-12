import { useState } from 'react';
import { SurveyForm } from '../../components/SurveyForm/SurveyForm';
import SurveyFormList from '../../components/SurveyForm/SurveyFormList';
import { SurveyFormRules } from '../../components/SurveyForm/SurveyFormRules';

export const Survey = () => {
  const [view, setView] = useState('rules');
  const [question, setQuestion] = useState<any>();
  const [surveyId, setSurveyId] = useState<any>();

  return (
    <>
      {view == 'rules' && (
        <SurveyFormRules
          onClick={() => {
            setView('formList');
          }}
        ></SurveyFormRules>
      )}
      {view == 'formList' && (
        <SurveyFormList
          setQuestion={setQuestion}
          setSurveyId={setSurveyId}
          onClick={() => {
            setView('form');
          }}
        ></SurveyFormList>
      )}
      {view == 'form' && (
        <SurveyForm question={question} surveyId={surveyId}></SurveyForm>
      )}
    </>
  );
};
