import { PixelRatio, Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const scaleFactor = 1.3;
export const CustomRFValue = (size: number, standardScreenHeight = 1000) => {
  const adjustedSize = RFValue(size, standardScreenHeight);
  return (adjustedSize * scaleFactor) / PixelRatio.getFontScale(); // Normalize font scaling
};
export const fontName = {
  MAISON_BOLD: 'Maison-Bold',
  MAISON_DEMI: 'Maison-Demi',
  MAISON_LIGHT: 'Maison-Light',
  MAISON_MEDIUM: 'Maison-Medium',
  MAISONMONO_BOLD: 'MaisonMono-Bold',
  MAISONMONO_LIGHT: 'MaisonMono-Light',
  MAISON_REGULAR: 'Maison-Regular',
  MAISON_REG_OBLI: 'Maison-RegularOblique',
};
export const fontStyles = StyleSheet.create({
  InputTextErrorText: {
    color: '#C62828',
    paddingHorizontal: CustomRFValue(5),
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(12),
    lineHeight: CustomRFValue(18),
    fontWeight: '500',
  },
  typingText: {
    fontSize: CustomRFValue(15),
    fontWeight: '500',
    marginEnd: CustomRFValue(10),
  },
  resendOTPText: {
    // color: appTheme.lightColors.colors.maisonGray,
    color: 'gray',
  },
  Maison_400_12PX_16LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(12),
    lineHeight: CustomRFValue(16),
    fontWeight: '400',
  },
  Maison_400_14PX_17LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(14),
    lineHeight: CustomRFValue(19),
    fontWeight: '400',
  },
  Maison_300_13PX_15LH: {
    fontFamily: fontName.MAISON_MEDIUM,
    fontSize: CustomRFValue(13),
    lineHeight: CustomRFValue(16),
    fontWeight: '300',
  },
  Maison_500_18PX_26LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(18),
    lineHeight: CustomRFValue(26),
    fontWeight: '500',
  },
  Maison_500_18PX_24LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(18),
    lineHeight: Platform.OS === 'ios' ? CustomRFValue(26) : CustomRFValue(24),
    fontWeight: '500',
  },
  Maison_500_17PX_20LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(17),
    lineHeight: CustomRFValue(22),
    fontWeight: '500',
  },
  Maison_500_13PX_20LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(13),
    lineHeight: CustomRFValue(20),
    fontWeight: '500',
  },
  Maison_500_50PX_20LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(50),
    lineHeight: CustomRFValue(20),
    fontWeight: '500',
  },
  Maison_500_15PX_21LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(15),
    lineHeight: CustomRFValue(21),
    fontWeight: '500',
  },
  Maison_400_17PX_27LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(17),
    lineHeight: CustomRFValue(27),
    fontWeight: '400',
  },
  Maison_400_16PX_25LH: {
    fontFamily: fontName.MAISON_MEDIUM,
    fontSize: CustomRFValue(16),
    lineHeight: CustomRFValue(25),
    fontWeight: '400',
  },
  Maison_400_13PX_20LH: {
    fontFamily: fontName.MAISON_MEDIUM,
    fontSize: CustomRFValue(13),
    lineHeight: CustomRFValue(20),
    fontWeight: '400',
  },
  Maison_500_16PX_16LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(16),
    lineHeight: CustomRFValue(20),
    fontWeight: '500',
  },
  Maison_500_16PX_21LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(16),
    lineHeight: CustomRFValue(21),
    fontWeight: '500',
  },
  Maison_400_10PX_12LH: {
    fontFamily: fontName.MAISON_MEDIUM,
    fontSize: CustomRFValue(10),
    lineHeight: CustomRFValue(15),
    fontWeight: '400',
  },
  Maison_500_11PX_13LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(11),
    lineHeight: CustomRFValue(15),
    fontWeight: '500',
  },
  Maison_500_14PX_18LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(14),
    lineHeight: CustomRFValue(20),
    fontWeight: '500',
  },
  Maison_500_22PX_29LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(22),
    lineHeight: CustomRFValue(29),
    fontWeight: '500',
  },
  Maison_500_20PX_25LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(20),
    lineHeight: Platform.OS === 'ios' ? CustomRFValue(27) : CustomRFValue(27),
    fontWeight: '500',
  },
  Maison_500_19PX_22LH: {
    fontFamily: fontName.MAISON_MEDIUM,
    fontSize: CustomRFValue(20),
    lineHeight: CustomRFValue(22),
    fontWeight: '600',
  },
  Maison_500_24PX_28LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(24),
    lineHeight: CustomRFValue(28),
    fontWeight: '500',
  },
  Maison_500_12PX_15LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(12),
    lineHeight: Platform.OS === 'ios' ? CustomRFValue(17) : CustomRFValue(15),
    fontWeight: '500',
  },
  Maison_500_13PX_15LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(14),
    lineHeight: CustomRFValue(20),
    fontWeight: '500',
    textAlign: 'center',
  },
  Maison_700_28PX_33LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(25),
    lineHeight: CustomRFValue(40),
    fontWeight: '700',
  },
  Maison_600_20PX_23LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(20),
    lineHeight: CustomRFValue(25),
    fontWeight: '600',
  },
  Maison_600_24PX_31LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(24),
    lineHeight: CustomRFValue(31),
    fontWeight: '600',
  },
  Maison_600_18PX_20LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(18),
    lineHeight: CustomRFValue(25),
    fontWeight: '600',
  },
  Maison_600_16PX_21LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(16),
    lineHeight: CustomRFValue(21),
    fontWeight: '600',
  },
  Maison_600_28PX_42LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(28),
    lineHeight: CustomRFValue(42),
    fontWeight: '600',
  },
  Maison_600_32PX_35LH: {
    fontFamily: fontName.MAISON_DEMI,
    fontSize: CustomRFValue(32),
    lineHeight: CustomRFValue(38),
    fontWeight: '600',
  },
});
export const cardStyles = StyleSheet.create({
  bgGrayRadius20padding20flex1: {
    flex: 1,
    padding: CustomRFValue(8),
    borderRadius: CustomRFValue(20),
    backgroundColor: '#F3F5F6',
    margin: CustomRFValue(10),
  },
  bgGrayRadius20padding4flex1: {
    flex: 1,
    padding: CustomRFValue(4),
    borderRadius: CustomRFValue(20),
    backgroundColor: '#F3F5F6',
    margin: CustomRFValue(5),
  },
  bgFFFMargin10PaddingV12paddingH24: {
    flex: 1,
    paddingVertical: CustomRFValue(12),
    paddingHorizontal: CustomRFValue(15),
    borderRadius: CustomRFValue(20),
    backgroundColor: '#fff',
    margin: CustomRFValue(10),
  },
  bgFFFMargin10PaddingV8paddingH8: {
    flex: 1,
    paddingVertical: CustomRFValue(8),
    paddingHorizontal: CustomRFValue(8),
    borderRadius: CustomRFValue(20),
    backgroundColor: '#fff',
    margin: CustomRFValue(10),
  },
  bgFFFMargin10PaddingV8paddingH24: {
    paddingVertical: CustomRFValue(12),
    paddingHorizontal: CustomRFValue(24),
    borderRadius: CustomRFValue(20),
    backgroundColor: '#fff',
    margin: CustomRFValue(10),
  },
  bgFFFMargin10PaddingV8paddingH12: {
    paddingVertical: CustomRFValue(12),
    paddingHorizontal: CustomRFValue(12),
    borderRadius: CustomRFValue(20),
    backgroundColor: '#fff',
    margin: CustomRFValue(10),
  },
  bgFFFPadding10borderRadius20: {
    padding: CustomRFValue(10),
    // borderWidth: 0.2,
    elevation: CustomRFValue(5),
    borderRadius: CustomRFValue(20),
    margin: CustomRFValue(5),
    borderColor: 'gray',
    backgroundColor: '#FFFFFF',
  },
});

export const componentStyles = StyleSheet.create({
  dropDownRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: CustomRFValue(12),
    paddingHorizontal: CustomRFValue(5),
  },
  dropDownOptionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingHorizontal: CustomRFValue(5), // Added padding for better visualization
    width: '100%',
  },
  inputText: {
    flex: 1,
    fontSize: CustomRFValue(16),
    paddingHorizontal: CustomRFValue(10),
    // maxHeight: CustomRFValue(100),
    color: 'black',
  },
  chatInputTextOpenKeyBoard: {
    // flex: 1,
    fontSize: CustomRFValue(16),
    paddingHorizontal: CustomRFValue(10),
    minHeight: CustomRFValue(20),
  },
  inputTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: CustomRFValue(5),
    backgroundColor: 'white',
    borderRadius: CustomRFValue(60),
    // marginVertical: CustomRFValue(10),
    elevation: CustomRFValue(5),
    flex: 1,
    margin: CustomRFValue(5),
  },
  chatInputTextContainerOpenKeyBoard: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: CustomRFValue(5),
    backgroundColor: 'white',
    borderRadius: CustomRFValue(20),
    marginVertical: CustomRFValue(10),
    flex: 1,
    elevation: CustomRFValue(5),
    margin: CustomRFValue(5),
  },
  TextInputInputComponent: {
    fontSize: CustomRFValue(15),
  },
  chatIcon: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-end',
    elevation: CustomRFValue(9),
    shadowColor: '#0B4E67',
    alignItems: 'center',
    borderRadius: CustomRFValue(100),
  },
  dropdownAnimatedText: {
    padding: CustomRFValue(7),
    borderRadius: CustomRFValue(5),
    borderColor: 'gray',
    borderWidth: CustomRFValue(0.5),
    margin: CustomRFValue(5),
  },
  InputTextContainer: {
    borderWidth: CustomRFValue(1),
    // borderColor: appTheme.lightColors.colors.maisonGray,
    borderRadius: CustomRFValue(10),
    paddingHorizontal: CustomRFValue(10),
    paddingTop: CustomRFValue(5),
    paddingBottom: CustomRFValue(10),
    marginTop: CustomRFValue(15),
  },

  editInputTextImage: {
    height: CustomRFValue(14),
    width: CustomRFValue(14),
    marginHorizontal: CustomRFValue(10),
    marginTop: CustomRFValue(5),
  },
  InputTextLabel: {
    // color: appTheme.lightColors.colors.maisonGray,
    ...fontStyles.Maison_500_12PX_15LH,
  },
});

export const uiStyles = StyleSheet.create({
  homePageAnimationContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: CustomRFValue(20),
  },
  rotate90deg: { transform: [{ rotate: '90deg' }] },
  botHeyAnimation: {
    height: CustomRFValue(120),
    width: CustomRFValue(130),
    marginRight: CustomRFValue(-15),
  },
  homePageContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: CustomRFValue(20),
    borderTopRightRadius: CustomRFValue(20),
  },
  iosShadow: {
    shadowOffset: { width: 0, height: CustomRFValue(2) },
    shadowOpacity: 0.2,
    shadowRadius: CustomRFValue(4),
    shadowColor: '#000',
  },
  SearchContainer: {
    marginHorizontal: CustomRFValue(20),
    backgroundColor: 'white',
    borderRadius: CustomRFValue(10),
    marginTop: CustomRFValue(-20),
    elevation: CustomRFValue(40),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyIc: {
    marginStart: CustomRFValue(5),
  },
  flex1Margin10: { flex: 1, margin: RFValue(10) },
  flex1Margin5: {
    flex: 1,
    margin: CustomRFValue(5),
  },
  marginHorizontal10: {
    marginHorizontal: CustomRFValue(10),
  },
  screeingToolNutritionsOutText: {
    textAlign: 'center',
    ...fontStyles.Maison_500_14PX_18LH,
    color: '#394F89',
    flex: 1,
    marginTop: CustomRFValue(10),
  },
  flex1marginVertical10: {
    flex: 1,
    marginVertical: CustomRFValue(10),
  },
  textCenter50016PX16LH: {
    textAlign: 'center',
    ...fontStyles.Maison_500_16PX_16LH,
    lineHeight: RFValue(20),
    flex: 1,
  },
  flex1marginHorizontal10: {
    flex: 1,
    marginHorizontal: CustomRFValue(10),
  },
  alignItems_FlexStart_MarginVertical10: {
    alignItems: 'flex-start',
    marginVertical: CustomRFValue(10),
  },
  homeLinGradBox: {
    flex: 1,
    margin: CustomRFValue(5),
    borderRadius: CustomRFValue(5),
    padding: CustomRFValue(6),
  },
  homeLinGradBox_IC: {
    marginBottom: CustomRFValue(5),
  },
  justifyC_center_paddingH20: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  marginHorizontal2: {
    marginHorizontal: CustomRFValue(2),
  },
  flex03justifyContent_center: {
    flex: 0.3,
    justifyContent: 'center',
  },
  topAnimationContainer: {
    paddingHorizontal: CustomRFValue(10),
    paddingStart: CustomRFValue(15),
    marginBottom: 0,
  },
  topBotAnimation: {
    height: CustomRFValue(105),
    width: CustomRFValue(105),
    margin: CustomRFValue(-15),
    overflow: 'hidden',
  },
  loaderAnimation: {
    height: CustomRFValue(120),
    width: CustomRFValue(120),
  },
  typingAnimation: {
    height: CustomRFValue(60),
    width: CustomRFValue(60),
  },
  jusContentAlignItem_center_flex1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jus_center_flex1: { justifyContent: 'center', flex: 1 },
  self_end: {
    alignSelf: 'flex-end',
  },
  alignItemFlexStart: {
    alignItems: 'flex-start',
  },
  relatedAppContainer: {
    backgroundColor: '#F8FAFF',
    borderRadius: CustomRFValue(5),
    margin: CustomRFValue(10),
    elevation: CustomRFValue(3),
    shadowColor: 'black',
    marginVertical: CustomRFValue(30),
  },
  spaceBetweenPadding10AlignItmCenter: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: CustomRFValue(10),
  },
  justifyContentSB: {
    justifyContent: 'space-between',
  },
  chatTextSelfCard: {
    padding: CustomRFValue(10),
    backgroundColor: '#EBFAFF',
    borderRadius: CustomRFValue(10),
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    marginTop: CustomRFValue(10),
    alignSelf: 'flex-end',
    marginStart: CustomRFValue(70),
  },
  chatTextDrCard: {
    justifyContent: 'space-between',
    padding: CustomRFValue(10),
    flex: 1,
    width: '85%',
    backgroundColor: '#F2F2F2',
    borderRadius: CustomRFValue(10),
    marginEnd: CustomRFValue(70),
  },
  flex1: {
    flex: 1,
  },
  padding10: { padding: RFValue(10) },
  margin10: { margin: RFValue(10) },
  marginTop10: { marginTop: CustomRFValue(10) },
  flex1Padding10: {
    flex: 1,
    padding: CustomRFValue(10),
  },
  flex1BgWhite: {
    flex: 1,
    backgroundColor: 'white',
  },
  space20Percentage: {
    height: '20%',
  },
  paddingHorizontal0: {
    paddingHorizontal: 0,
  },
  paddingHorizontal10: {
    paddingHorizontal: CustomRFValue(10),
  },
  padding15: {
    padding: CustomRFValue(15),
  },
  paddingVertical10: {
    paddingVertical: CustomRFValue(10),
  },
  onboardingBackIcon: {
    alignSelf: 'center',
    padding: CustomRFValue(5),
    marginRight: -CustomRFValue(15),
    zIndex: 12000,
  },
  gradientContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: CustomRFValue(-5),
  },
  homeLinGradBoxTitle: {
    ...fontStyles.Maison_500_14PX_18LH,
    color: 'white',
  },
  homeLinGradBoxDec: {
    ...fontStyles.Maison_400_10PX_12LH,
    color: 'white',
    marginTop: CustomRFValue(5),
  },
  relatedAppTxt: {
    color: '#394F89',
    ...fontStyles.Maison_500_22PX_29LH,
  },
  SubItemTitle: {
    color: '#4D4D4D',
    ...fontStyles.Maison_500_17PX_20LH,
  },
  howMayHelpYou: {
    ...fontStyles.Maison_500_16PX_21LH,
    color: '#4D4D4D',
    // marginStart: CustomRFValue(10)
  },
  onBoardingCenterView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: CustomRFValue(20),
  },
  justifyContentSb_Mv15: {
    justifyContent: 'space-between',
    marginVertical: CustomRFValue(15),
  },
  fillBoxOnboarding: {
    borderColor: '#D9DBDB',
    borderWidth: 1,
    borderRadius: CustomRFValue(10),
    paddingVertical: CustomRFValue(10),
  },
  fillInputTextBW0P0MT0: {
    borderWidth: 0,
    padding: 0,
    marginTop: 0,
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: 'center',
    paddingHorizontal: CustomRFValue(20),
  },
  inputTextWithBorderEnd: {
    borderStartColor: '#D9DBDB',
    borderStartWidth: 1,
    borderWidth: 0,
    flex: 1,
    borderRadius: 0,
    padding: 0,
    marginTop: 0,
  },
  withoutBorderInputText: {
    borderWidth: 0,
    flex: 1,
    borderRadius: 0,
    padding: 0,
    marginTop: 0,
  },
  SearchWithSortingContainer: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    elevation: CustomRFValue(40),
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: CustomRFValue(15),
    paddingHorizontal: CustomRFValue(20),
  },
});
