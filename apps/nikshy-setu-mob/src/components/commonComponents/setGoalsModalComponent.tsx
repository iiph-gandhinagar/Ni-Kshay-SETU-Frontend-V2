import { CloseSvg } from '@nikshay-setu-v3-monorepo/assets';
import { AppConfigType, fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootStackParamList,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import {
  getDataFromAsyncStorage,
  CustomRFValue as RFValue,
  storeDataToAsyncStorage,
} from '@nikshay-setu-v3-monorepo/utils';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import Button from 'apps/nikshy-setu-mob/src/components/buttons/primaryButtons';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { useToast } from './toastProvider';

interface SetGoalsModalProps {
  onClose: () => void;
  open: boolean;
  title?: string;
  appTranslations: AppConfigType;
}
const SetGoalsModalComponent: React.FC<SetGoalsModalProps> = ({
  onClose,
  open,
  title,
  appTranslations,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const [count, setCount] = useState(1);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  // Increment and Decrement logic for count
  const increment = () => {
    setCount((prevCount) => Math.min(prevCount + 1, 7)); // Ensure count doesn't exceed 7
  };

  const decrement = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 1)); // Ensure count doesn't go below 1
  };

  // Handle setting the goal and navigating
  const onSetGoals = async (value: number) => {
    if (title) {
      navigation.navigate('knowledgeQuizScreen');
      onClose();
    } else {
      try {
        const existingGoal = await getDataFromAsyncStorage('goal');
        if (existingGoal) {
          showToast(appTranslations?.APP_MESSAGE_GOAL_EDITED);
        }
        await storeDataToAsyncStorage('goal', value.toString());

        setLoader(true);
        dispatch(
          createAction(
            {
              method: 'POST',
              url: 'STORE_WEEKLY_GOAL',
              data: { goal: value },
            },
            (code, res) => {
              if (code === 200) {
                onClose();
                navigation.navigate('knowledgeQuizScreen');
              }
              setLoader(false);
            }
          )
        );
      } catch (error) {
        console.error('Error setting goal:', error);
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    const fetchGoal = async () => {
      const storedGoal = await getDataFromAsyncStorage('goal');
      if (storedGoal) {
        setCount(storedGoal);
      }
    };

    fetchGoal();
  }, []);

  return (
    <Modal
      animationType='slide'
      visible={open}
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { shadowColor: colors.BLACK_000000 }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <CloseSvg />
          </TouchableOpacity>
          <Row>
            <Text
              style={[
                { paddingHorizontal: RFValue(5) },
                fontStyles.Maison_400_14PX_17LH,
              ]}
            >
              {title || appTranslations?.K_QUIZ_SET_WEEKLY_TARGETS}
            </Text>
          </Row>

          {!title && (
            <>
              <View style={styles.container}>
                <Text
                  style={[
                    fontStyles.Maison_500_16PX_16LH,
                    { color: colors.DARK_GREY_495555 },
                  ]}
                >
                  {appTranslations?.K_QUIZ_ASSESSMENT}
                </Text>
                <View style={styles.counterContainer}>
                  <Button
                    disabled={count <= 1}
                    textStyle={{ color: colors.DARK_GREY_495555 }}
                    title='-'
                    onPress={decrement}
                  />
                  <Text
                    style={[
                      styles.countText,
                      { color: colors.DARK_GREY_495555 },
                    ]}
                  >
                    {count}
                  </Text>
                  <Button
                    disabled={count >= 7}
                    textStyle={{ color: colors.DARK_GREY_495555 }}
                    title='+'
                    onPress={increment}
                  />
                </View>
              </View>
              <Text
                style={{
                  paddingHorizontal: RFValue(5),
                  ...fontStyles.Maison_400_12PX_16LH,
                  color: '#707070',
                  textAlign: 'right',
                  marginRight: RFValue(5),
                }}
              >
                ⚠︎ {appTranslations?.KNOWLEDGE_QUIZ_MAX_ASSESSMENT} - 7
              </Text>
            </>
          )}

          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              marginTop: RFValue(25),
            }}
          >
            <LinearGradient
              colors={[colors.DARK_GREY_4B5F83, colors.LIGHT_GREY_B1BED4]}
              style={{ marginBottom: RFValue(10), borderRadius: RFValue(100) }}
            >
              <Button
                title={appTranslations?.KNOWLEDGE_QUIZ_SET_GOAL}
                textStyle={{
                  ...fontStyles.Maison_500_15PX_21LH,
                  color: colors.WHITE_FFFF,
                }}
                loaderEnable={loader}
                disabled={loader}
                containerStyle={{ alignItems: 'center' }}
                onPress={() => onSetGoals(count)}
              />
            </LinearGradient>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000090',
  },
  modalView: {
    margin: RFValue(20),
    backgroundColor: 'white',
    borderRadius: RFValue(10),
    padding: RFValue(15),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(4),
    elevation: RFValue(5),
  },
  closeButton: {
    position: 'absolute',
    top: -RFValue(10),
    right: -RFValue(5),
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: RFValue(20),
    padding: RFValue(5),
    zIndex: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: RFValue(10),
    borderRadius: RFValue(10),
    borderColor: '#D9DBDB',
    borderWidth: 1,
    marginVertical: RFValue(10),
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    marginHorizontal: RFValue(10),
    fontSize: RFValue(18),
  },
});

export default SetGoalsModalComponent;
