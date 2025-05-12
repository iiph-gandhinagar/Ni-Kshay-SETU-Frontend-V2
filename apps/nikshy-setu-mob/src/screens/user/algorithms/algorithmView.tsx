import {
  getAlgorithmDataByName,
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
import HeaderComponent from 'apps/nikshy-setu-mob/src/components/commonComponents/header';
import { dBInstance } from 'apps/nikshy-setu-mob/src/utils/SqlStore/Database';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AlgorithmList from '../../../components/cards/AlgorithmListCard';
import { Breadcrumb } from '../../../components/commonComponents/breadcrumb';
import ContentViewModal from './contentViewModal';

const AlgorithmView: React.FC<ScreenProps<'algorithmView'>> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const {
    parentNodeId,
    nameOfAlgorithm,
    activeTab,
    nodeType,
    showActiveNode,
    showNodeById,
    breadcrumb,
    appLang,
    mainModuleId,
  } = route.params;

  const [showModal, setShowModal] = useState({
    isModal: false,
    description: '',
    title: '',
    id: '',
    timeSpent: null,
  });
  const [openModule, setCardData] = useState({});
  const metaData =
    getAlgorithmDataByName?.[nameOfAlgorithm || 'Diagnosis Algorithm'];
  const dependentNodeKey = metaData?.urls?.dependentNode?.toLowerCase();
  const dependentNodeUrl = metaData?.urls?.dependentNode;
  const dispatch = useDispatch();
  const loadingApis = useSelector(
    (state: RootReducerStates) => state.appContext?.loadingApis
  );
  const algorithms = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.algorithms
  );

  useEffect(() => {
    if (!(nodeType === 'CMS Node(New Page)'))
      dispatch(
        createAction<null, DiagnosisDependentApiResponse>({
          method: 'GET',
          url: dependentNodeUrl,
          query: parentNodeId,
        })
      );
  }, []);
  useEffect(() => {
    if (showActiveNode) {
      const FilterModule = algorithms?.[dependentNodeKey]?.children.filter(
        (v) => v?._id === showNodeById
      );
      const Type = FilterModule?.[0]?.nodeType;
      if (Type === 'CMS Node(New Page)') {
        navigation.setParams({
          nodeType: Type,
          description:
            (FilterModule?.[0]?.description[appLang] &&
              FilterModule?.[0]?.description[appLang]) ||
            FilterModule?.[0]?.description?.en,
        });
      }
      setCardData({ 1: showNodeById });
    }
  }, [algorithms]);

  const closeModal = () => {
    setShowModal({
      isModal: false,
      description: '',
      title: '',
      id: '',
      timeSpent: null,
    });
  };

  let screenTimeIntervalSubmoduleId;
  let screenTime = 0;
  const moduleScreenUsage = () => {
    screenTimeIntervalSubmoduleId = setInterval(() => {
      screenTime = screenTime + 1;
    }, 1000);
  };

  useEffect(() => {
    moduleScreenUsage();
    const module = nameOfAlgorithm;
    return function cleanup() {
      if (mainModuleId) {
        clearInterval(screenTimeIntervalSubmoduleId);
        dBInstance()
          ?.transaction((txn) => {
            txn.executeSql(
              'INSERT INTO app_time(module,activity_type,sub_module_id,time)values(?,?,?,?)',
              [module, 'submodule_usage', mainModuleId, screenTime]
            );
          })
          .then(() => {
            screenTime = 0;
          });
      } else {
        console.warn('NO ID FOUND PLEASE CHECK', [
          module,
          'submodule_usage',
          mainModuleId,
          screenTime,
        ]);
      }
    };
  }, []);
  return (
    <View style={uiStyles?.flex1BgWhite}>
      <HeaderComponent
        navigation={navigation}
        isExternal={true}
        backTitle={activeTab || metaData?.topName}
        route={route}
      />
      <View style={uiStyles?.marginTop10}>
        <Breadcrumb breadcrumb={breadcrumb} />
      </View>
      <ScrollView>
        {loadingApis.includes(dependentNodeUrl)
          ? Array.from({ length: 10 }).map((_, index) => (
              <View style={uiStyles?.marginHorizontal10} key={index}>
                <AlgorithmSkeletonCard />
              </View>
            ))
          : algorithms?.[dependentNodeKey]?.children &&
            algorithms?.[dependentNodeKey]?.children
              ?.sort((a, b) => {
                return a?.index - b?.index;
              })
              ?.map((item, k) => {
                const description =
                  (item?.description[appLang] && item?.description[appLang]) ||
                  item?.description?.en;
                const title =
                  (item?.title[appLang] && item?.title[appLang]) ||
                  item?.title?.en;

                return (
                  <AlgorithmList
                    item={item}
                    level={1}
                    appLang={appLang}
                    breadcrumb={breadcrumb}
                    key={k}
                    mainModuleId={mainModuleId}
                    openModule={openModule}
                    setCardData={(v) => {
                      const isCMSOrLinkingNode = [
                        'CMS Node(New Page)',
                      ].includes(item.nodeType);
                      delete item.cadreIds;
                      delete item.stateIds;
                      if (isCMSOrLinkingNode) {
                        navigation.navigate('CmsNewPage', {
                          description: description,
                          breadcrumb: breadcrumb,
                          header: title,
                        });
                      } else if (Object?.keys(v).includes('CMS Node')) {
                        if (v?.['CMS Node']) {
                          setShowModal({
                            isModal: true,
                            id: item?._id,
                            timeSpent:
                              (Boolean(item?.timeSpent) && item?.timeSpent) ||
                              null,
                            description: v?.['CMS Node'],
                            title: v?.title || title,
                          });
                        }
                      } else {
                        console.log({ v });
                        setCardData(v);
                      }
                    }}
                  />
                );
              })}
      </ScrollView>
      {showModal?.isModal && (
        <ContentViewModal
          closeModal={closeModal}
          colors={colors}
          showModal={showModal}
          key={showModal?.title}
        />
      )}
    </View>
  );
};

export default AlgorithmView;
