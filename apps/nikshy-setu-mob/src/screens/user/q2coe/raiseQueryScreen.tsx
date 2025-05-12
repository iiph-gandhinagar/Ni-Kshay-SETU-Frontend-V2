import { raisedQueryFormSchema } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  ScreenProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import { useToast } from 'apps/nikshy-setu-mob/src/components/commonComponents/toastProvider';
import { storeSubscriberActivity } from 'apps/nikshy-setu-mob/src/utils/functions';
import { Formik } from 'formik';
import { ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/buttons/primaryButtons';
import ScreenContainer from '../../../components/defaultPage';
import { InputField } from '../../../components/inputComponents';

export const RaiseQuery: React.FC<ScreenProps<'raiseQuery'>> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const { error, data, loadingApis } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  const { showToast } = useToast();

  const question = {
    age: { title: 'Age', type: 'decimal-pad', numberOfLines: 1 },
    sex: {
      title: 'Gender',
      numberOfLines: 1,
      option: ['Male', 'Female', 'Transgender'],
      type: 'singleSelect',
    },
    diagnosis: { title: 'Current Diagnosis', numberOfLines: 1 },
    dateOfAdmission: {
      title: 'Date of Admission',
      placeholder: 'DD/MM/YYYY',
      type: 'datePicker',
      numberOfLines: 1,
    },
    chiefComplaint: { title: 'Chief Complain', numberOfLines: 1 },
    query: { title: 'Concerns and Issue', numberOfLines: 1 },
    currentTreatmentPlan: {
      title: 'Current treatment plan (Regimen)',
      numberOfLines: 1,
    },
    illness: {
      title:
        'History Of Present Illness And Duration (In Case Of ADR Or CDST, Comorbidities Please Mention Here)',
      numberOfLines: 1,
    },
    pastHistory: {
      title: ' Past History / Follow- up History (If Any)',
      numberOfLines: 1,
    },
    preTreatmentEvaluation: {
      title: 'Pre-Treatment Evaluation Findings (Current Episode)',
      numberOfLines: 1,
    },
    assessmentAndDiffDiagnosis: {
      title: 'Assessment and differential diagnosis',
      numberOfLines: 1,
    },
  };
  const dispatch = useDispatch();
  return (
    <ScreenContainer>
      <View style={{ justifyContent: 'space-between', flex: 1 }}>
        <Formik
          initialValues={{
            age: '',
            sex: '',
            diagnosis: '',
            dateOfAdmission: '',
            chiefComplaint: '',
            query: '',
            currentTreatmentPlan: '',
            illness: '',
            pastHistory: '',
            preTreatmentEvaluation: '',
            assessmentAndDiffDiagnosis: '',
          }}
          validationSchema={raisedQueryFormSchema}
          onSubmit={(value, {}) => {
            const data = new Date(value?.dateOfAdmission);
            dispatch(
              createAction(
                {
                  data: {
                    ...value,
                    status: 'In Progress',
                    dateOfAdmission: `${data.toISOString()}`,
                    raisedBy: route.params.subscriberId,
                    queryRaisedRole: route.params.queryRaisedRole,
                    queryRaisedInstitute: route.params.queryRaisedInstitute,
                  },
                  method: 'POST',
                  url: 'QUERY',
                },
                (code, res) => {
                  if (code === 200) {
                    storeSubscriberActivity({
                      module: 'Query2COE',
                      action: 'query Raised',
                      dispatch: dispatch,
                    });
                    showToast('Your query has been successfully submitted.');
                    setTimeout(() => {
                      navigation.goBack();
                    }, 1000);
                  } else if (code === 400) {
                    showToast(
                      'The query has been raised to the appropriate institute.'
                    );
                  }
                }
              )
            );
          }}
        >
          {({
            handleChange,
            handleBlur,
            setValues,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
            isSubmitting,
          }) => {
            return (
              <ScrollView showsVerticalScrollIndicator={false}>
                {Object.keys(values).map((key, i) => {
                  return question?.[key].type === 'datePicker' ? (
                    <InputField.DatePicker
                      key={i + key}
                      value={values?.[key]}
                      type={question?.[key].type as string}
                      labelStyles={{ color: '#409BBB' }}
                      label={question?.[key].title}
                      placeholder={question?.[key].placeholder}
                      onChange={(v) => {
                        setFieldValue(key, v, true);
                      }}
                      error={errors?.[key]}
                      touched={touched?.[key]}
                    />
                  ) : question?.[key].type === 'singleSelect' ? (
                    <InputField.DropDown
                      key={i + key}
                      options={question?.[key]?.option?.map((v) => ({
                        label: v,
                        value: v,
                      }))}
                      label={question?.[key].title}
                      value={{ label: values?.[key], value: values?.[key] }}
                      labelStyles={{ color: '#409BBB' }}
                      placeholder={question?.[key].placeholder}
                      error={errors?.[key]}
                      touched={touched?.[key]}
                      onTouched={() => setFieldTouched(key, true)}
                      onBlur={() => setFieldTouched(key, true)}
                      containerStyle={{ flex: 1, flexDirection: 'column' }}
                      onChange={(v) => {
                        setFieldValue(key, v?.value, true);
                      }}
                    />
                  ) : (
                    <InputField.Input
                      key={i + key}
                      value={values?.[key]}
                      type={question?.[key].type}
                      labelStyles={{ color: '#409BBB' }}
                      label={question?.[key].title}
                      keyboardType={question?.[key].type}
                      placeholder={question?.[key].placeholder}
                      onChange={(v) => {
                        setFieldValue(key, v, true);
                      }}
                      onTouched={() => setFieldTouched(key, true)}
                      onBlur={() => setFieldTouched(key, true)}
                      numberOfLines={question?.[key].numberOfLines}
                      error={errors?.[key]}
                      touched={touched?.[key]}
                    />
                  );
                })}
                <LinearGradient
                  colors={['#0B4E67', '#61C9EF']}
                  style={{
                    margin: RFValue(20),
                    flex: 1,
                    borderRadius: RFValue(100),
                  }}
                >
                  <Button
                    title='Submit'
                    loaderEnable={loadingApis.includes('QUERY')}
                    disabled={loadingApis.includes('QUERY')}
                    onPress={() => handleSubmit()}
                    containerStyle={{ padding: RFValue(10) }}
                  />
                </LinearGradient>
              </ScrollView>
            );
          }}
        </Formik>
      </View>
    </ScreenContainer>
  );
};
