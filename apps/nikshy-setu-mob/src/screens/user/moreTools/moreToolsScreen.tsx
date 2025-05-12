import {
  AdherenceManagementSvg,
  AdrSvg,
  ContactUsSvg,
  CurrentAssessmentSvg,
  DiagnosticCareCascadeSvg,
  DocumentsSvg,
  GuidelinesSvg,
  KnowledgeBaseBlackSvg,
  KnowledgeQuizSvg,
  ManageTbSvg,
  MoreSvg,
  PastAssessmentSvg,
  PDFSvg,
  QueryResSvg,
  RatingSvg,
  RefHealthFacilitiesSvg,
  ScreeningToolSvg,
  SurveyFormSvg,
  TreatmentCareCascadeSvg,
  VideoFileIconSvg,
  VideoSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import {
  fontStyles,
  langKeyForPlugin,
  STORE_URL,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  ScreenProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import {
  getDataFromAsyncStorage,
  CustomRFValue as RFValue,
} from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import { MoreToolsSkeleton } from 'apps/nikshy-setu-mob/src/components/cards/skeletonCards';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from '../../../components/commonComponents/row_column';
import ScreenContainer from '../../../components/defaultPage';

const DATA = [
  {
    title: 'DRAWER_PATIENT_MANAGE',
    data: [
      {
        title: 'Screening Tool',
        icon: ScreeningToolSvg,
        navigateTo: 'screeningScreen',
      },
      {
        title: 'Diagnostic Cascade',
        nameOfAlgo: 'Diagnosis Algorithm',
        icon: DiagnosticCareCascadeSvg,
        navigateTo: 'algorithmScreen',
      },
      {
        title: 'Guidance on ADR',
        nameOfAlgo: 'Guidance on ADR',
        icon: AdrSvg,
        navigateTo: 'algorithmScreen',
      },
      {
        title: 'Treatment Cascade',
        icon: TreatmentCareCascadeSvg,
        nameOfAlgo: 'Treatment Algorithm',
        navigateTo: 'algorithmScreen',
      },
      // {
      //   title: 'TB Preventive Treatment',
      //   nameOfAlgo: 'TB Preventive Treatment',
      //   icon: TbPreventiveTreatmentSvg,
      //   navigateTo: 'algorithmScreen',
      // },
      {
        title: 'Differentiated Care',
        nameOfAlgo: 'Differentiated Care',
        icon: AdherenceManagementSvg,
        navigateTo: 'algorithmScreen',
      },
      {
        title: 'Referral Health Facilities',
        icon: RefHealthFacilitiesSvg,
        navigateTo: 'referralHealth',
      },
    ],
  },
  {
    title: 'DRAWER_RESOURCE_MATERIAL',
    data: [
      {
        title: 'Guidelines',
        icon: GuidelinesSvg,
        navigateTo: 'resourceMaterial',
      },
      { title: 'Office Orders', icon: PDFSvg },
      { title: 'Videos', icon: VideoSvg },
      { title: 'Documents', icon: DocumentsSvg },
    ],
  },
  {
    title: 'APP_ASSESSMENTS',
    data: [
      {
        title: 'Current Assessments',
        icon: PastAssessmentSvg,
        navigateTo: 'currentAssessmentScreen',
        nameOfAlgo: 'APP_PENDING',
      },
      {
        title: 'Completed Assessments',
        icon: CurrentAssessmentSvg,
        navigateTo: 'currentAssessmentScreen',
        nameOfAlgo: 'APP_COMPLETED',
      },
    ],
  },
  {
    title: 'DRAWER_APPLICATION_INTERACTION',
    data: [
      {
        title: 'Survey Form',
        icon: SurveyFormSvg,
        navigateTo: 'surveyFormScreen',
      },
      { title: 'Contact Us', icon: ContactUsSvg, navigateTo: 'contactUs' },
      { title: 'Rating', icon: RatingSvg, navigateTo: 'feedback' },
    ],
  },
];

interface CardItemProps {
  Icon: unknown;
  draggable?: boolean;
  title: string;
  style?: ViewStyle;
  colors: ThemeProps;
  onPress?: () => void;
}

export const CardItem = ({
  Icon,
  style,
  title,
  onPress,
  draggable = false,
  colors,
}: CardItemProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.cardItem,
        {
          backgroundColor: colors?.colors.WHITE_FFFF,
          ...style,
          justifyContent: 'space-evenly',
        },
        uiStyles.iosShadow,
      ]}
    >
      {typeof Icon === 'function' && (
        <Icon height={RFValue(40)} width={RFValue(40)} />
      )}
      {typeof Icon === 'string' && (
        <Image
          source={{ uri: STORE_URL + '/' + Icon }}
          height={RFValue(40)}
          width={RFValue(40)}
        />
      )}
      <Text
        style={[
          fontStyles.Maison_500_12PX_15LH,
          {
            textAlign: 'center',
            color: colors?.colors?.GREY_808080,
            marginHorizontal: RFValue(2),
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};
const TopModules = [
  {
    title: 'Knowledge Connect',
    icon: KnowledgeBaseBlackSvg,
    linkTo: 'courseInfo',
  },
  { title: 'ManageTB India', icon: ManageTbSvg, linkTo: 'manageTBScreen' },
  { title: 'Query2COE', icon: QueryResSvg, linkTo: 'QRMScreen' },
  {
    title: 'Knowledge Quiz',
    icon: KnowledgeQuizSvg,
    linkTo: 'knowledgeAssessmentScreen',
  },
];

export const MoreTools: React.FC<ScreenProps<'moreTools'>> = ({
  navigation,
  route,
}) => {
  const colors = useTheme() as ThemeProps;
  const dispatch = useDispatch();
  const [state, SetState] = useState([]);
  const [PluginFromBe, SetPluginFromBe] = useState([]);
  const { loadingApis, data } = useSelector(
    (state: RootReducerStates) => state.appContext
  );
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );

  useEffect(() => {
    const mapData = {
      folder: { icon: GuidelinesSvg, navigateTo: 'resourceMaterial' },
      pdf: { icon: PDFSvg, navigateTo: 'resourceMaterial' },
      video: { icon: VideoSvg, navigateTo: 'resourceMaterial' },
      ppt: { icon: VideoFileIconSvg, navigateTo: 'resourceMaterial' },
      document: { icon: DocumentsSvg, navigateTo: 'resourceMaterial' },
      image: { icon: MoreSvg, navigateTo: 'resourceMaterial' },
    };
    getDataFromAsyncStorage('pluginOrder')?.then((e) => {
      SetPluginFromBe(e.split(','));
    });
    dispatch(
      createAction(
        {
          method: 'GET',
          url: 'RESOURCE_MATERIAL',
        },
        (status, res) => {
          if (status == 200) {
            const resourceData = res?.map((v) => {
              return {
                _id: v?._id,
                title: v?.title[route?.params?.appLang] || v?.title?.en,
                nameOfAlgo: v?.title[route?.params?.appLang],
                icon: mapData[v?.iconType || 'document'].icon,
                navigateTo: mapData[v?.iconType || 'document'].navigateTo,
              };
            });
            dispatch(
              createAction(
                {
                  method: 'GET',
                  url: 'GET_DYNAMIC_ALGORITHMS',
                },
                (status, res) => {
                  const masterNodes = res?.map((v) => {
                    return {
                      title: v?.title[route?.params?.appLang] || v?.title?.en,
                      nameOfAlgo:
                        v?.title[route?.params?.appLang] || v?.title?.en,
                      icon: v?.icon,
                      _id: v?._id,
                      navigateTo: 'dynamicAlgorithm',
                    };
                  });
                  if (status === 200) {
                    SetState((prev) => {
                      let newItem = DATA;
                      newItem[0].data = [
                        ...(newItem[0].data || []),
                        ...(masterNodes || []),
                      ].filter(
                        (item, index, self) =>
                          index ===
                          self.findIndex((t) => t.title === item.title)
                      );
                      newItem[1].data = resourceData;
                      return newItem;
                    });
                  }
                }
              )
            );
          }
        }
      )
    );
  }, []);

  return (
    <ScreenContainer style={{ ...uiStyles.paddingHorizontal0 }}>
      <View style={styles.container}>
        <ScrollView>
          <Row
            style={{
              backgroundColor: colors?.colors?.LIGHT_GREY_F3F5F6,
              borderTopLeftRadius: RFValue(10),
              borderBottomLeftRadius: RFValue(10),
              padding: RFValue(5),
              alignItems: 'center',
              flex: 1,
              marginTop: RFValue(10),
              marginLeft: RFValue(10),
            }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}
            >
              {TopModules.filter((v) => PluginFromBe.includes(v.title))?.map(
                (subItem, subKey) => {
                  return (
                    <CardItem
                      colors={colors}
                      key={subKey + subItem.title}
                      Icon={subItem.icon}
                      style={{
                        width: RFValue(100),
                        marginHorizontal: RFValue(10),
                      }}
                      onPress={() => {
                        navigation?.navigate(subItem?.linkTo);
                      }}
                      title={
                        appTranslations[
                          langKeyForPlugin[subItem?.title || 'APP_LOADING']
                        ]
                      }
                    />
                  );
                }
              )}
            </ScrollView>
          </Row>
          {loadingApis.includes('RESOURCE_MATERIAL') ||
          loadingApis.includes('GET_DYNAMIC_ALGORITHMS') ? (
            <MoreToolsSkeleton />
          ) : (
            state.map((v, i) => {
              return (
                <View
                  style={{
                    paddingHorizontal: RFValue(10),
                    elevation: 4,
                  }}
                  key={i + v.title}
                >
                  <Text
                    style={{
                      margin: RFValue(10),
                      ...fontStyles.Maison_500_14PX_18LH,
                      color: colors?.colors?.DARK_GREY_4D4D4D,
                    }}
                  >
                    {appTranslations[v.title]}
                  </Text>
                  <Row
                    style={[
                      {
                        backgroundColor: colors?.colors?.WHITE_FFFF,
                        borderRadius: RFValue(20),
                        gap: RFValue(10),
                        flexWrap: 'wrap', // Wrap to the next line if needed
                        // alignItems: 'flex-start',
                      },
                      // (v?.data?.length || []) > 2 && {
                      //   justifyContent: 'space-between',
                      // },
                    ]}
                  >
                    {v.data.map((subItem, subKey) => {
                      const cardTitle =
                        subItem.navigateTo === 'dynamicAlgorithm'
                          ? subItem?.title
                          : (Object.keys(langKeyForPlugin).includes(
                              subItem?.title
                            ) &&
                              appTranslations[
                                langKeyForPlugin[
                                  subItem?.title || 'APP_LOADING'
                                ]
                              ]) ||
                            subItem?.title;
                      return (
                        <React.Fragment
                          key={subKey + subItem.title + subKey + '-Fragment'}
                        >
                          <CardItem
                            colors={colors}
                            key={subKey + subItem.title + subKey}
                            Icon={subItem.icon}
                            title={cardTitle}
                            style={
                              !((v?.data?.length || []) > 2) && {
                                marginEnd: RFValue(15),
                              }
                            }
                            onPress={() =>
                              navigation.navigate(
                                subItem.navigateTo || 'notificationScreen',
                                {
                                  id: subItem._id,
                                  nameOfAlgorithm: subItem.nameOfAlgo,
                                  nameOfMaterial: subItem.nameOfAlgo,
                                  ActiveTab: subItem.nameOfAlgo,
                                }
                              )
                            }
                          />
                        </React.Fragment>
                      );
                    })}
                  </Row>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "transparent"
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardItem: {
    maxWidth: RFValue(100),
    minWidth: RFValue(85),
    flex: 1,
    maxHeight: RFValue(100),
    minHeight: RFValue(90),
    borderRadius: RFValue(10),
    margin: RFValue(5),
    opacity: 1,
    elevation: RFValue(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    // alignSelf: 'center',
  },
  iconContainer: {
    width: RFValue(40),
    height: RFValue(40),
    flex: 1,
    borderRadius: RFValue(20),
    // backgroundColor: colors.LIGHT_GREY_F0F0F0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: RFValue(10),
  },
  dragging: {
    opacity: 0.4,
  },
  dragReleasedStyle: {
    opacity: 0.4,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 2,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14,
    flex: 1,
    marginHorizontal: 5,
    textAlign: 'center',
  },

  container2: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    height: 100, // Example item height
    justifyContent: 'center',
    alignItems: 'center',
  },
});
