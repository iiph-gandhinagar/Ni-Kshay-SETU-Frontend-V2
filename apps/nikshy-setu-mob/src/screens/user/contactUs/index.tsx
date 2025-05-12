import {
  FacebookSvg,
  InstagramSvg,
  TwitterSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  QueryApiRequest,
  RootReducerStates,
  ScreenProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import {
  getDataFromAsyncStorage,
  isEmpty,
  CustomRFValue as RFValue,
} from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import { useToast } from 'apps/nikshy-setu-mob/src/components/commonComponents/toastProvider';
import { storeSubscriberActivity } from 'apps/nikshy-setu-mob/src/utils/functions';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileApiResponse } from 'shared/types/src/screens/UserTypes';
import * as Yup from 'yup';
import Button from '../../../components/buttons/primaryButtons';
import { Card } from '../../../components/cards/MainCard';
import { Row } from '../../../components/commonComponents/row_column';
import ScreenContainer from '../../../components/defaultPage';
import { InputField } from '../../../components/inputComponents';

const validationSchema = Yup.object().shape({
  subject: Yup.string()
    .min(5, 'Please enter a subject with at least 5 characters.')
    .required('Subject is required'),
  message: Yup.string()
    .min(10, 'Message should be at least 10 characters')
    .required('Message is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

const socialMedias = [
  {
    link: 'https://www.facebook.com/profile.php?id=100086461717566',
    icon: FacebookSvg,
  },
  { link: 'https://twitter.com/NikshaySetu', icon: TwitterSvg },
  { link: 'https://www.instagram.com/nikshaysetu/', icon: InstagramSvg },
];
export const ContactUsScreen: React.FC<ScreenProps<'contactUs'>> = ({
  navigation,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const data = useSelector(
    (state: RootReducerStates) => state.appContext?.data
  );
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const formik = useFormik({
    initialValues: {
      subject: '',
      message: '',
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setErrors, resetForm, setSubmitting }) => {
      dispatch(
        createAction<QueryApiRequest, unknown>(
          {
            method: 'POST',
            url: 'INQUIRY',
            data: {
              ...values,
              name: data.user_profile.name,
              phoneNo: data.user_profile.phoneNo,
            },
          },
          (status, res: any) => {
            setSubmitting(false);
            if (status === 400) {
              setErrors(res.errors);
            } else if (status === 200) {
              storeSubscriberActivity({
                module: 'Contact Us',
                action: 'Contact Us Submitted Fetched',
                dispatch: dispatch,
              });
              showToast('Submitted Successfully');
              resetForm();
              navigation?.goBack();
            }
          }
        )
      );
    },
  });
  useEffect(() => {
    getDataFromAsyncStorage('userId').then((v) => {
      if (v) {
        dispatch(
          createAction<null, UserProfileApiResponse>(
            {
              method: 'GET',
              url: 'USER_PROFILE',
              query: v,
            },
            (status, res) => {
              if (status === 200) {
                formik.setFieldValue('email', (res?.email && res?.email) || '');
              }
            }
          )
        );
      }
    });
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '98%',
    },
    buttonContainer: { marginVertical: RFValue(20), padding: RFValue(10) },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: '#D9DBDB',
    },
    PPText: {
      ...fontStyles.Maison_400_10PX_12LH,
      fontWeight: '600',
      marginHorizontal: RFValue(10),
      color: '#8F9797',
    },
    text: {
      marginHorizontal: 10,
      color: '#8F9797',
    },
    mediaContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mediaCard: {
      borderWidth: RFValue(2),
      borderColor: '#D9DBDB',
      padding: RFValue(15),
      borderRadius: RFValue(10),
      margin: RFValue(10), // Adjust margin as needed
    },
  });

  return (
    <ScreenContainer defaultProfile languageICHide>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InputField.Input
          label={'Subject'}
          placeholder={'Enter subject'}
          error={(formik.touched.subject && formik.errors.subject) || ''}
          touched={formik.touched.subject}
          value={formik.values.subject}
          multiline={true}
          onBlur={() => formik.setFieldTouched('subject', true)}
          onChange={(value) => formik.setFieldValue('subject', value)}
        />
        <InputField.Input
          numberOfLines={10}
          label={'Message'}
          placeholder={'Write message'}
          error={(formik.touched.message && formik.errors.message) || ''}
          touched={formik.touched.message}
          multiline={true}
          value={formik.values.message}
          onBlur={() => formik.setFieldTouched('message', true)}
          onChange={(value) => formik.setFieldValue('message', value)}
        />
        <InputField.Input
          error={formik.errors?.email as string}
          touched={formik.touched.email}
          name={'email'}
          label={'Email Address'}
          keyboardType='email-address'
          value={formik.values.email}
          editable={isEmpty(data?.user_profile?.email)}
          onChange={(v) =>
            formik.setFieldValue(
              'email',
              typeof v === 'string' && v?.toLowerCase(),
              true
            )
          }
          placeholder='Enter your Email'
        />
        <Button
          onPress={formik.handleSubmit}
          title='Submit'
          loaderEnable
          disabled={formik.isSubmitting}
          textStyle={fontStyles.Maison_500_15PX_21LH}
          bgColor={colors.DARK_BLUE_394F89}
          containerStyle={styles.buttonContainer}
        />
        <View style={styles.container}>
          <View style={styles.dividerContainer}></View>
          <View style={styles.mediaContainer}>
            <Row>
              {socialMedias.map((item, index) => (
                <Pressable
                  key={index + 'social'}
                  onPress={() => {
                    navigation.navigate('contentView', {
                      contentType: 'WebPage',
                      url: item?.link,
                    });
                  }}
                >
                  <Card key={index} style={styles.mediaCard}>
                    <item.icon height={RFValue(24)} width={RFValue(24)} />
                  </Card>
                </Pressable>
              ))}
            </Row>
            <Text style={styles.PPText}>
              {appTranslations?.CONTACT_FOLLOW_SOCIAL_MEDIA}
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};
