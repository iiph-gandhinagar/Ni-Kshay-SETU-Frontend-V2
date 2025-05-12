import {
  DownloadSvg,
  SendSVGSvg,
  SendWhatsupSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import {
  BASE_URL,
  fontStyles,
  Urls,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import { ScreenProps } from '@nikshay-setu-v3-monorepo/types';
import {
  getDataFromAsyncStorage,
  CustomRFValue as RFValue,
} from '@nikshay-setu-v3-monorepo/utils';
import { useToast } from 'apps/nikshy-setu-mob/src/components/commonComponents/toastProvider';
import { storeSubscriberActivity } from 'apps/nikshy-setu-mob/src/utils/functions';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { useDispatch } from 'react-redux';
import { Row } from '../../../components/commonComponents/row_column';
import { discordanceMessages } from './questionData';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    padding: RFValue(15),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: RFValue(10),
    padding: RFValue(15),
    marginBottom: RFValue(15),
    shadowColor: '#0C3896',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: RFValue(3),
    borderBottomWidth: 1,
    borderLeftWidth: RFValue(3),
    borderRightWidth: 0.5,
    borderColor: '#0C3896',
    borderBottomColor: 'red',
    elevation: RFValue(3),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    paddingBottom: RFValue(10),
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    ...fontStyles.Maison_400_13PX_20LH,
    fontWeight: '600',
    color: '#333',
  },
  patientId: {
    ...fontStyles.Maison_400_13PX_20LH,
    marginTop: RFValue(5),
    color: '#555',
  },
  date: {
    ...fontStyles.Maison_400_13PX_20LH,
    color: '#777',
    marginTop: RFValue(5),
  },
  actionIcons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: RFValue(10),
  },
  sectionTitle: {
    ...fontStyles.Maison_600_18PX_20LH,
    marginBottom: RFValue(10),
    color: '#0C3896',
  },
  sectionContent: {
    ...fontStyles.Maison_400_13PX_20LH,
    color: '#777',
  },
  prescriptionContent: {
    ...fontStyles.Maison_400_13PX_20LH,
    color: '#777',
  },
  notesContent: {
    ...fontStyles.Maison_400_13PX_20LH,
    color: '#777',
  },
});
export const PrescriptionScreen: React.FC<
  ScreenProps<'prescriptionScreen'>
> = ({ navigation, route }) => {
  const date = new Date();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [token, setToken] = useState(null);
  const fileUrl = BASE_URL + Urls.DOWNLOAD_PRESCRIPTION; // Replace with your file URL

  useEffect(() => {
    getDataFromAsyncStorage('token').then((v) => {
      setToken(v);
    });
    storeSubscriberActivity({
      module: 'ManageTB India',
      action: 'get_prescription',
      dispatch,
    });
  }, []);
  const downloadPdf = async () => {
    showToast('Downloading....');
    const { config, fs } = ReactNativeBlobUtil;
    const dirToSave =
      Platform.OS === 'ios'
        ? fs.dirs.DocumentDir
        : '/storage/emulated/0/Download';
    const filePath = `${dirToSave}/prescription_${moment().format(
      'YYYYMMDD'
    )}.pdf`;

    const body = JSON.stringify({ prescription: route?.params?.data });
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body,
      };

      const response = await config({
        fileCache: true,
        appendExt: 'pdf',
        path: filePath, // Specify the path to save the PDF
      }).fetch('POST', fileUrl, fetchOptions.headers, fetchOptions.body);
      storeSubscriberActivity({
        module: 'ManageTB India',
        action: 'download_prescription',
        dispatch,
      });
      Alert.alert('Download Successful', `File saved to: ${response.path()}`, [
        { text: 'OK' },
      ]);
    } catch (error) {
      console.error('Download failed:', error);
      Alert.alert(
        'Download Failed',
        'An error occurred while downloading the file. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      console.log('Download process completed.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Patient Info */}
        <View style={styles.card}>
          <Row style={styles.headerRow}>
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>
                Patient Name: {route?.params?.name || '---'}
              </Text>
              {route?.params?.nikshayId && (
                <Text style={styles.patientId}>
                  ID: {route?.params?.nikshayId || '---'}
                </Text>
              )}
              <Text style={styles.date}>
                Date:{' '}
                {`${date.getDate()}-${
                  date.getMonth() + 1
                }-${date.getFullYear()}`}
              </Text>
            </View>

            <Row style={styles.actionIcons}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  dispatch(
                    createAction(
                      {
                        method: 'POST',
                        url: 'SEND_PRESCRIPTION',
                        data: { prescription: route?.params?.data },
                      },
                      (code, res) => {
                        if (code === 200) {
                          storeSubscriberActivity({
                            module: 'ManageTB India',
                            action: 'whatsapp_prescription',
                            dispatch,
                          });
                          showToast(
                            'We just sent it to your WhatsApp. Check it out when you get a chance!'
                          );
                        }
                      }
                    )
                  );
                }}
              >
                <SendWhatsupSvg />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  dispatch(
                    createAction(
                      {
                        method: 'POST',
                        url: 'EMAIL_PRESCRIPTION',
                        data: { prescription: route?.params?.data },
                      },
                      (code, res) => {
                        if (code === 200) {
                          storeSubscriberActivity({
                            module: 'ManageTB India',
                            action: 'email_prescription',
                            dispatch,
                          });
                          showToast(
                            'We just sent it to your Email. Check it out when you get a chance!'
                          );
                        }
                      }
                    )
                  );
                }}
              >
                <SendSVGSvg />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={downloadPdf}>
                <DownloadSvg />
              </TouchableOpacity>
            </Row>
          </Row>
        </View>

        {/* Diagnosis */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Diagnosis</Text>
          <Text style={styles.sectionContent}>
            {route?.params?.data.diagnosis || '-'}
          </Text>
        </View>

        {/* Regimen */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            The recommended treatment regimen for the patient is:
          </Text>
          <Text style={styles.sectionContent}>
            {route?.params?.data.regimen || '--'}
          </Text>
        </View>

        {/* Prescription */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Prescription</Text>
          <Text style={styles.prescriptionContent}>
            {(route?.params?.data.prescription !== '#N/A' &&
              route?.params?.data.prescription?.replace(/\n/g, '\n\n')) ||
              discordanceMessages.condition23}
          </Text>
        </View>

        {/* Notes */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <Text style={styles.notesContent}>
            {route?.params?.data.notes?.replace(/\n/g, '\n\n') || '--'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};
