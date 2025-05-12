import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { TourGuideZone } from 'rn-tourguide';

import {
  homePage4BoxData,
  homePage4Gradient,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import {
  getDataFromAsyncStorage,
  CustomRFValue as RFValue,
  storeDataToAsyncStorage,
} from '@nikshay-setu-v3-monorepo/utils';

import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import { useSelector } from 'react-redux';
import { storeSubscriberActivity } from '../../utils/functions';
import PluginCard from '../cards/pluginCard';
import { PluginSkeletonCard } from '../cards/skeletonCards';
import EditPlugin from '../modals/editPlugin';

type BoxGridListProps = {
  isTour: boolean;
  navigation: any;
  appTranslations: Record<string, string>;
  dispatch: any;
};

const editPluginInitial = {
  isOpen: false,
  itemClick: '',
  x: 0,
  y: 0,
  index: 0,
};
const AllPluginOrder = [
  'Knowledge Connect',
  'ManageTB India',
  'Query2COE',
  'Knowledge Quiz',
  'Diagnostic Cascade',
  'Screening Tool',
  'Treatment Cascade',
  'TB Preventive Treatment',
  'Differentiated Care',
  'Referral Health Facilities',
];
const withoutSomePluginOrder = [
  'Knowledge Connect',
  'Screening Tool',
  'Knowledge Quiz',
  'Diagnostic Cascade',
  'Treatment Cascade',
  'TB Preventive Treatment',
  'Differentiated Care',
  'Referral Health Facilities',
];
const withoutManageTBPluginOrder = [
  'Knowledge Connect',
  'Screening Tool',
  'Knowledge Quiz',
  'Query2COE',
  'Diagnostic Cascade',
  'Treatment Cascade',
  'TB Preventive Treatment',
  'Differentiated Care',
  'Referral Health Facilities',
];

const withoutQUERYPluginOrder = [
  'Knowledge Connect',
  'ManageTB India',
  'Screening Tool',
  'Knowledge Quiz',
  'Diagnostic Cascade',
  'Treatment Cascade',
  'TB Preventive Treatment',
  'Differentiated Care',
  'Referral Health Facilities',
];

const BoxGridList: React.FC<BoxGridListProps> = ({
  isTour,
  navigation,
  dispatch,
  appTranslations,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(editPluginInitial);
  const [pluginOrder, setPluginOrder] = useState<string[]>([]);
  const [reorderedBoxData, setReorderedBoxData] = useState<any[]>([]);

  const isLoading = reorderedBoxData.length === 0;
  const placeholderArray = useMemo(() => new Array(4).fill(null), []);

  const plugins = useSelector(
    (state: RootReducerStates) =>
      state.appContext?.data?.homeScreen?.home_page_info?.plugins || []
  );

  const storeOnLocalStorage = useCallback(
    async (sequence: string[]): Promise<void> => {
      console.log('---------------> Updating on Local', sequence);
      const storedOrder = await storeDataToAsyncStorage(
        'pluginOrder',
        sequence?.toString()
      );
      return storedOrder;
    },
    []
  );

  const getOrderMap = (orderList: string[]) =>
    new Map(orderList.map((name, index) => [name, index]));

  const sortPluginsByOrder = (plugins: string[], orderList: string[]) => {
    const orderMap = getOrderMap(orderList);
    return [...plugins].sort(
      (a, b) => (orderMap.get(a) ?? 999) - (orderMap.get(b) ?? 999)
    );
  };

  const reorderBoxDataBySequence = useCallback(
    <T extends { name: string }>(boxData: T[], sequence: string[]): T[] => {
      const dataMap = new Map(boxData.map((item) => [item.name, item]));
      return sequence.map((name) => dataMap.get(name)).filter(Boolean) as T[];
    },
    []
  );

  const helperFunction = useCallback(async (): Promise<string[]> => {
    const storedOrder = await getDataFromAsyncStorage('pluginOrder');
    let storedPlugins = storedOrder?.split(',') || [];
    const backendPluginNames = plugins.map((p) => p.title);

    const missingFromFrontend = backendPluginNames.filter(
      (p) => !storedPlugins.includes(p)
    );
    const missingFromBackend = storedPlugins.filter(
      (p) => !backendPluginNames.includes(p)
    );

    console.log('\n--- Plugin Sync Debug Start ---');
    console.log('Stored Plugins:', storedPlugins);
    console.log('Backend Plugin Names:', backendPluginNames);
    console.log('Missing From Frontend:', missingFromFrontend);
    console.log('Missing From Backend:', missingFromBackend);

    if (storedPlugins.length < 1) {
      console.log(
        'No plugins stored locally. Determining initial plugin order...'
      );
      if (
        backendPluginNames.every((v) =>
          ['ManageTB India', 'Query2COE'].includes(v)
        )
      ) {
        console.log('User has access to both: ManageTB India and Query2COE');
        storedPlugins = sortPluginsByOrder(backendPluginNames, AllPluginOrder);
      } else if (!backendPluginNames.includes('ManageTB India')) {
        console.log('User does NOT have access to ManageTB India');
        storedPlugins = sortPluginsByOrder(
          backendPluginNames,
          withoutManageTBPluginOrder
        );
      } else if (!backendPluginNames.includes('Query2COE')) {
        console.log('User does NOT have access to Query2COE');
        storedPlugins = sortPluginsByOrder(
          backendPluginNames,
          withoutQUERYPluginOrder
        );
      } else {
        console.log('Unexpected case, defaulting to AllPluginOrder');
        storedPlugins = sortPluginsByOrder(
          backendPluginNames,
          withoutSomePluginOrder
        );
      }

      console.log('Saving initial plugin order:', storedPlugins);
      storeOnLocalStorage(storedPlugins);
    } else if (missingFromFrontend.length > 0) {
      console.log(
        'New plugins found in backend that are not in frontend:',
        missingFromFrontend
      );
      console.log('Filtered stored plugins to match backend:', AllPluginOrder);
      storedPlugins = sortPluginsByOrder(backendPluginNames, AllPluginOrder);
      storeOnLocalStorage(storedPlugins);
    } else if (
      missingFromFrontend.length === 0 &&
      missingFromBackend.length === 0
    ) {
      console.log('✅ All plugins are in sync between backend and frontend');
    } else if (missingFromBackend.length > 0) {
      console.log(
        'Some plugins stored locally are no longer in backend:',
        missingFromBackend
      );
      if (
        backendPluginNames.every((v) =>
          ['ManageTB India', 'Query2COE'].includes(v)
        )
      ) {
        console.log('Reordering with AllPluginOrder');
        storedPlugins = sortPluginsByOrder(backendPluginNames, AllPluginOrder);
      } else if (!backendPluginNames.includes('ManageTB India')) {
        console.log('Reordering without ManageTB India');
        storedPlugins = sortPluginsByOrder(
          backendPluginNames,
          withoutManageTBPluginOrder
        );
      } else if (!backendPluginNames.includes('Query2COE')) {
        console.log('Reordering without Query2COE');
        storedPlugins = sortPluginsByOrder(
          backendPluginNames,
          withoutQUERYPluginOrder
        );
      } else {
        console.log('Reordering with default AllPluginOrder');
        storedPlugins = sortPluginsByOrder(
          backendPluginNames,
          withoutSomePluginOrder
        );
      }

      console.log('Updated stored plugin order:', storedPlugins);
      storeOnLocalStorage(storedPlugins);
    }

    console.log('--- Plugin Sync Debug End ---\n');

    return storedPlugins;
  }, [plugins]);

  useEffect(() => {
    (async () => {
      const sequenceAndFiltered = await helperFunction();
      const reordered = await reorderBoxDataBySequence(
        homePage4BoxData,
        sequenceAndFiltered
      );
      setReorderedBoxData(reordered);
      setPluginOrder(sequenceAndFiltered);
    })();
  }, [helperFunction, reorderBoxDataBySequence]);

  const renderItem = useCallback(
    ({ item, index }) =>
      isLoading ? (
        <PluginSkeletonCard key={`skeleton-${index}`} index={index} />
      ) : (
        <TourGuideZone
          key={`plugin-${item.name}`}
          zone={index + 2}
          text={`Check out the ${item.name} Module!`}
          borderRadius={RFValue(10)}
          style={{ flex: 1 }}
        >
          <PluginCard
            key={item.name}
            item={item}
            index={2 + index}
            colors={homePage4Gradient[index]}
            handlePress={() => {
              if (!isTour) {
                storeSubscriberActivity({
                  module: 'Home',
                  action: `${item.name
                    .replace(' ', '-')
                    .toLowerCase()}-plugin-click`,
                  dispatch,
                });
                navigation.navigate(item.linkTo, {
                  nameOfAlgorithm: item.nameOfAlgo,
                });
              }
            }}
            handleEditPress={(e) => {
              if (e?.nativeEvent && !isTour) {
                const { pageY, pageX } = e.nativeEvent;
                setIsModalVisible({
                  y: pageY,
                  x: pageX,
                  isOpen: true,
                  itemClick: item.name,
                  index,
                });
              }
            }}
          />
        </TourGuideZone>
      ),
    [isLoading, isTour, navigation, dispatch]
  );

  return (
    <>
      <EditPlugin
        appTranslations={appTranslations}
        isModalVisible={isModalVisible}
        pluginOrder={pluginOrder}
        setIsModalVisible={setIsModalVisible}
        setPluginOrder={setPluginOrder}
        setReorderedBoxData={setReorderedBoxData}
      />
      <FlatList
        numColumns={2}
        scrollEnabled={false}
        style={[uiStyles.flex1marginVertical10]}
        data={isLoading ? placeholderArray : reorderedBoxData.slice(0, 4)}
        keyExtractor={(item, index) =>
          isLoading
            ? `loading-${index}`
            : item?.name
            ? `item-${item.name}-${index}`
            : `item-null-${index}`
        }
        renderItem={renderItem}
      />
    </>
  );
};

export default React.memo(BoxGridList);
