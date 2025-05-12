import {
  fontStyles,
  STORE_URL,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  DiagnosisDependentApiResponse,
  RootReducerStates,
  ScreenProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { useTheme } from '@react-navigation/native';
import { AlgorithmSkeletonCard } from 'apps/nikshy-setu-mob/src/components/cards/skeletonCards';
import { Breadcrumb } from 'apps/nikshy-setu-mob/src/components/commonComponents/breadcrumb';
import HeaderComponent from 'apps/nikshy-setu-mob/src/components/commonComponents/header';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import ScreenContainer from 'apps/nikshy-setu-mob/src/components/defaultPage';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import ContentViewModal from './contentViewModal';
const modalEmptyVal = {
  isModal: false,
  description: '',
  title: '',
  id: '',
  timeSpent: null,
};

export const DynamicAlgorithm: React.FC<ScreenProps<'dynamicAlgorithm'>> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch();
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  const { colors } = useTheme() as ThemeProps;
  const [showModal, setShowModal] = useState(modalEmptyVal);
  const loadingApis = useSelector(
    (state: RootReducerStates) => state.appContext?.loadingApis
  );
  const data = useSelector(
    (state: RootReducerStates) => state.appContext?.data
  );
  const closeModal = () => {
    setShowModal(modalEmptyVal);
  };
  const appLang = route?.params?.appLang;
  const nameOfAlgorithm = route?.params?.nameOfAlgorithm;
  const breadcrumb = [
    { name: appTranslations?.APP_HOME, navigateTo: 'homeScreen' },
    { name: appTranslations?.APP_ALL_MODULE, navigateTo: 'moreTools' },
    { name: route?.params?.nameOfAlgorithm || '', navigateTo: 'goBack' },
  ];

  useEffect(() => {
    dispatch(
      createAction<null, DiagnosisDependentApiResponse>({
        method: 'GET',
        url: 'GET_DYNAMIC_MASTER_NODES',
        query: route?.params?.id,
      })
    );
  }, []);

  const styles = StyleSheet.create({
    row: {
      justifyContent: 'space-between',
      borderRadius: RFValue(10),
      elevation: RFValue(8),
      backgroundColor: 'white',
      paddingVertical: RFValue(0),
      // paddingHorizontal: RFValue(20),
      marginTop: RFValue(10),
      width: 'auto',
    },
    topRow: {
      marginVertical: RFValue(10),
      alignItems: 'center',
      alignContent: 'center',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#00000090',
    },
    modalView: {
      flex: 1,
      margin: RFValue(10),
      marginVertical: RFValue(90),
      backgroundColor: '#f4f6f8',
      borderRadius: RFValue(10),
      padding: RFValue(10),
      shadowOffset: {
        width: RFValue(0),
        height: RFValue(2),
      },
      shadowOpacity: RFValue(0.25),
      shadowRadius: RFValue(4),
      elevation: RFValue(5),
    },
    closeButton: {
      position: 'absolute',
      top: 0,
      right: 0,
      padding: RFValue(10),
      zIndex: 1,
    },
    text: {
      ...fontStyles.Maison_500_15PX_21LH,
      width: '80%',
      alignSelf: 'center',
    },
    img: {
      height: RFValue(40),
      width: RFValue(40),
      margin: RFValue(10),
      borderRadius: RFValue(5),
    },
    padding5: { padding: RFValue(5) },
  });
  return (
    <ScreenContainer>
      <HeaderComponent
        navigation={navigation}
        isExternal={true}
        backTitle={nameOfAlgorithm || ''}
        route={route}
      />
      <View style={uiStyles?.marginTop10}>
        <Breadcrumb breadcrumb={breadcrumb} />
      </View>
      <ScrollView
        contentContainerStyle={styles?.padding5}
        showsVerticalScrollIndicator={false}
      >
        {loadingApis.includes('GET_DYNAMIC_MASTER_NODES')
          ? Array.from({ length: 10 }).map((_, index) => (
              <AlgorithmSkeletonCard key={index} />
            ))
          : data?.algorithms?.get_dynamic_master_nodes
              ?.sort((a, b) => {
                return a?.index - b?.index;
              })
              .map((item, index) => {
                return (
                  <Pressable
                    key={index + 'DiagnosticCare' + index}
                    onPress={() => {
                      const isCMSOrLinkingNode = ['Linking Node'].includes(
                        item.nodeType
                      );
                      delete item.cadreIds;
                      delete item.stateIds;
                      const newBreadcrumb = [
                        ...breadcrumb,
                        {
                          name:
                            (item?.title[appLang] && item?.title[appLang]) ||
                            item?.title?.en,
                          navigateTo: 'goBack',
                        },
                      ];
                      if (item.nodeType === 'App Screen Node') {
                        navigation.navigate('labInvestigation', {
                          name: nameOfAlgorithm,
                        });
                      } else if (
                        !item?.redirectAlgoType &&
                        item?.redirectNodeId === 0 &&
                        item?.description &&
                        !['CMS Node(New Page)', 'Linking Node'].includes(
                          item.nodeType
                        )
                      ) {
                        setShowModal({
                          isModal: true,
                          description:
                            (item?.description[appLang] &&
                              item?.description[appLang]) ||
                            item?.description?.en,
                          title:
                            (item?.title[appLang] && item?.title[appLang]) ||
                            item?.title?.en,
                          id: item?._id,
                          timeSpent:
                            (Boolean(item?.timeSpent) && item?.timeSpent) ||
                            null,
                        });
                      } else if (isCMSOrLinkingNode) {
                        navigation.navigate('algorithmView', {
                          nameOfAlgorithm: 'Dynamic Algorithm',
                          activeTab:
                            (item?.title[appLang] && item?.title[appLang]) ||
                            item?.title?.en,
                          nodeType: item?.nodeType,
                          description:
                            (item?.description[appLang] &&
                              item?.description[appLang]) ||
                            item?.description?.en,
                          dependentNodeUrl: 'GET_DYNAMIC_DEPENDENT_NODES',
                          parentNodeId: item?._id,
                          timeSpent: item?.timeSpent,
                          mainModuleId: item?._id,
                          breadcrumb: newBreadcrumb,
                        });
                      } else if (item.nodeType === 'CMS Node(New Page)') {
                        navigation.navigate('CmsNewPage', {
                          breadcrumb: newBreadcrumb,
                          description:
                            (item?.description[appLang] &&
                              item?.description[appLang]) ||
                            item?.description?.en,
                          header:
                            (item?.title[appLang] && item?.title[appLang]) ||
                            item?.title?.en,
                        });
                      } else if (
                        !item?.hasOptions &&
                        item?.description &&
                        !isCMSOrLinkingNode
                      ) {
                        setShowModal({
                          isModal: true,
                          description:
                            (item?.description[appLang] &&
                              item?.description[appLang]) ||
                            item?.description?.en,
                          title:
                            (item?.title[appLang] && item?.title[appLang]) ||
                            item?.title?.en,
                          id: item?._id,
                          timeSpent:
                            (Boolean(item?.timeSpent) && item?.timeSpent) ||
                            null,
                        });
                      }
                    }}
                  >
                    <Row style={styles.row}>
                      <Image
                        source={{
                          uri:
                            (Boolean(item.icon) && STORE_URL + item.icon) ||
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrzJgfMp3Gtff1rhJJxF7kagZuNNwgIkkXUg&s',
                        }}
                        style={styles?.img}
                        loadingIndicatorSource={{
                          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrzJgfMp3Gtff1rhJJxF7kagZuNNwgIkkXUg&s',
                        }}
                      />
                      <Text style={styles.text}>
                        {(item?.title[appLang] && item?.title[appLang]) ||
                          item?.title?.en}
                      </Text>
                    </Row>
                  </Pressable>
                );
              })}
        {showModal?.isModal && (
          <ContentViewModal
            closeModal={closeModal}
            colors={colors}
            showModal={showModal}
            key={showModal?.title}
          />
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

export default DynamicAlgorithm;
