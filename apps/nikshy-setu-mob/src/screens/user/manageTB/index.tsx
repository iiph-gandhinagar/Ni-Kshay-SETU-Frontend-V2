import {
  DropdownArrowSvg,
  InfoSvg,
  ManageTbSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, STORE_URL } from '@nikshay-setu-v3-monorepo/constants';
import {
  RootReducerStates,
  ScreenProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import ModalComponent from 'apps/nikshy-setu-mob/src/components/commonComponents/modal';
import PluginInfoModal from 'apps/nikshy-setu-mob/src/components/pluginInfoModal';
import { GradientText2 } from 'apps/nikshy-setu-mob/src/components/textComponent/gradientText';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import Button from '../../../components/buttons/primaryButtons';
import { Row } from '../../../components/commonComponents/row_column';
const { width } = Dimensions.get('window');

const ManageTBScreen: React.FC<ScreenProps<'manageTBScreen'>> = ({
  navigation,
  route,
}) => {
  const [isExitModal, setExitModal] = useState(false);
  const { colors } = useTheme() as ThemeProps;
  const [isModalVisible, setIsModalVisible] = useState({
    x: 0,
    y: 0,
    isOpen: false,
  });
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  return (
    <View style={{ flex: 1 }}>
      <PluginInfoModal
        isOpen={isModalVisible.isOpen}
        yPosition={isModalVisible?.y}
        header={appTranslations?.APP_INFO_ABOUT_PLUGIN}
        text={appTranslations?.MANAGE_TB_INFO}
        closeModal={() => {
          setIsModalVisible({ isOpen: false, x: 0, y: 0 });
        }}
      />
      <ModalComponent
        closeModal={() => {
          setExitModal(false);
        }}
        isOpen={isExitModal}
        containerStyle={{
          backgroundColor: 'white',
          padding: RFValue(15),
          margin: RFValue(10),
        }}
      >
        <Text
          style={[
            fontStyles.Maison_500_14PX_18LH,
            { marginBottom: RFValue(10) },
          ]}
        >
          {appTranslations?.MANAGE_TB_RECOMMEND}
        </Text>
        <Row
          style={{
            justifyContent: 'flex-end',
          }}
        >
          <Button
            title={appTranslations?.APP_OK}
            containerStyle={{ paddingHorizontal: RFValue(20) }}
            bgColor={colors.DARK_BLUE_0C3896}
            onPress={() => {
              setExitModal(false);
              navigation.navigate('manageTBForm');
            }}
          />
        </Row>
      </ModalComponent>
      <ScrollView>
        <Row
          style={{
            justifyContent: 'space-between',
            paddingBottom: RFValue(30),
            paddingTop: RFValue(10),
          }}
        >
          <View style={{ height: RFValue(20), width: RFValue(20) }} />
          <InfoSvg
            fill={'black'}
            stroke={'black'}
            color={'black'}
            height={RFValue(20)}
            width={RFValue(20)}
            style={{ marginEnd: RFValue(20) }}
            onPress={(e) =>
              setIsModalVisible({
                y: e?.nativeEvent?.pageY,
                isOpen: true,
                x: 0,
              })
            }
          />
        </Row>
        <Row
          style={{
            flex: 1,
            justifyContent: 'center',
            padding: RFValue(10),
          }}
        >
          <ManageTbSvg
            height={RFValue(Platform.OS === 'ios' ? 90 : 130)}
            width={RFValue(Platform.OS === 'ios' ? 90 : 130)}
          />
        </Row>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <GradientText2
              text={appTranslations?.APP_MANAGE_TB_INDIA}
              fontSize={RFValue(Platform.OS === 'ios' ? 26 : 30)}
              fontWeight={RFValue(700)}
              locations={{
                x: width / 2, // Centering x based on screen width
                y: width / 10, // Centering y based on screen height
              }}
              height={RFValue(60)}
              width={'100%'}
              isGradientFill
              gradientColors={[
                colors.BLUE_4681FF,
                colors.RED_DB3611,
                colors.RED_DB3611,
              ]}
            />
          </View>
          <Text
            style={[
              fontStyles.Maison_500_16PX_16LH,
              { color: '#0C3896', textAlign: 'center', marginTop: RFValue(10) },
            ]}
          >
            {appTranslations?.MANAGE_TB_UNION_IIPHG_NITRD}
          </Text>
          <Text
            style={[
              fontStyles.Maison_400_13PX_20LH,
              {
                color: '#0C3896',
                textAlign: 'center',
                margin: Platform.OS === 'ios' ? 0 : RFValue(30),
              },
            ]}
          >
            {appTranslations?.MANAGE_TB_DEC}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Button
            onPress={() => {
              setExitModal(true);
            }}
            title={appTranslations?.MANAGE_TB_CREATE_PRESCRIPTION}
            textStyle={{
              ...fontStyles.Maison_500_15PX_21LH,
              color: colors.DARK_BLUE_0C3896,
              textAlign: 'center',
            }}
            bgColor='white'
            containerStyle={{
              alignContent: 'center',
              padding: RFValue(15),
              marginHorizontal: RFValue(40),
              borderWidth: 1,
              paddingLeft: RFValue(40),
              borderColor: colors.DARK_BLUE_0C3896,
            }}
            rightIcon={
              <DropdownArrowSvg
                width={RFValue(25)}
                height={RFValue(25)}
                stroke={'#0C3896'}
                style={{ transform: [{ rotate: '270deg' }] }}
              />
            }
          />
        </View>

        <View
          style={{
            paddingTop: RFValue(10),
            alignItems: 'center',
          }}
        >
          {!(appTranslations?.MANAGE_TB_LOGO === 'null') && (
            <Image
              source={{ uri: STORE_URL + appTranslations?.MANAGE_TB_LOGO }}
              style={{
                height: RFValue(240),
                width: RFValue(240),
                padding: RFValue(10),
              }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ManageTBScreen;
