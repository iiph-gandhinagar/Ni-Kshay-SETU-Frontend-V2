import {
  DocumentsSvg,
  FolderIconSvg,
  MoreSvg,
  PDFSvg,
  VideoFileIconSvg,
  VideoSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import {
  CustomRFValue,
  fontStyles,
  STORE_URL,
} from '@nikshay-setu-v3-monorepo/constants';
import { createAction } from '@nikshay-setu-v3-monorepo/store';
import {
  RootReducerStates,
  ScreenProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import NoDataCard from 'apps/nikshy-setu-mob/src/components/cards/noDataCard';
import { NewsSkeletonCard } from 'apps/nikshy-setu-mob/src/components/cards/skeletonCards';
import { Breadcrumb } from 'apps/nikshy-setu-mob/src/components/commonComponents/breadcrumb';
import HeaderComponent from 'apps/nikshy-setu-mob/src/components/commonComponents/header';
import { storeSubscriberActivity } from 'apps/nikshy-setu-mob/src/utils/functions';
import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from '../../../components/commonComponents/row_column';
const getIconForFileType = (fileType) => {
  switch (fileType) {
    case 'folder':
      return <FolderIconSvg />;
    case 'ppt':
      return <VideoFileIconSvg />;
    case 'pdfs':
      return <PDFSvg />;
    case 'pdf_office_orders':
      return (
        <View style={{ alignItems: 'center', gap: RFValue(5) }}>
          <PDFSvg />
          <Text style={[fontStyles.Maison_400_10PX_12LH, { color: '#DD2025' }]}>
            Orders
          </Text>
        </View>
      );
    case 'document':
      return <DocumentsSvg />;
    case 'videos':
      return <VideoSvg />;
    default:
      return <MoreSvg />;
  }
};
export const ResourceMaterial: React.FC<ScreenProps<'resourceMaterial'>> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch();
  const { colors } = useTheme() as ThemeProps;
  const [idStack, setIdStack] = useState([]);
  const resource_material_by_parent = useSelector(
    (state: RootReducerStates) =>
      state.appContext?.data?.resource_material?.resource_material_by_parent
  );
  const appTranslations = useSelector(
    (state: RootReducerStates) => state.appContext?.data?.appTranslations
  );
  const loadingApis = useSelector(
    (state: RootReducerStates) => state.appContext?.loadingApis
  );
  const getResourceMaterialData = useCallback(
    (resourceId: string) => {
      dispatch(
        createAction({
          method: 'GET',
          url: 'RESOURCE_MATERIAL_BY_PARENT',
          query: resourceId,
        })
      );
    },
    [dispatch]
  );

  const onCardClick = useCallback(
    (guidelines) => {
      if (guidelines?.typeOfMaterials === 'folder') {
        setIdStack((prev) => [
          ...prev,
          { name: guidelines?.title?.en, id: guidelines._id },
        ]);
        getResourceMaterialData(guidelines._id);
        console.log('Check two');
      } else if (
        guidelines?.relatedMaterials &&
        guidelines.relatedMaterials.length > 0
      ) {
        const [_, fileType] = guidelines.relatedMaterials[0]
          .split('/')
          .pop()
          ?.split('.');
        if (
          guidelines?.typeOfMaterials === 'pdfs' ||
          guidelines?.typeOfMaterials === 'ppt' ||
          guidelines?.typeOfMaterials === 'document' ||
          guidelines?.typeOfMaterials === 'pdf_office_orders'
        ) {
          navigation.navigate('contentScreen', {
            contentType: guidelines?.typeOfMaterials,
            url: guidelines.relatedMaterials[0],
            notSupportedFile: false,
            fileType: fileType,
            header: guidelines?.title?.en,
          });
        } else if (guidelines?.typeOfMaterials === 'images') {
          navigation.navigate('contentView', {
            contentType: 'WebPage',
            url: STORE_URL + guidelines.relatedMaterials[0],
          });
        } else if (guidelines?.typeOfMaterials === 'videos') {
          navigation.navigate('videoView', {
            // contentType: guidelines?.typeOfMaterials,
            url: STORE_URL + guidelines.relatedMaterials[0],
            header: guidelines?.title?.en,
            // fileType: fileType,
          });
        }
      }
    },
    [navigation, getResourceMaterialData]
  );

  const backAction = useCallback(() => {
    if ([0, 1]?.includes(idStack.length)) {
      navigation.navigate('moreTools');
    } else {
      const lastElement = idStack[idStack?.length - 2];
      getResourceMaterialData(lastElement?.id);
      setIdStack((prev) => prev.slice(0, -1)); // Use slice instead of pop
    }
    return true;
  }, [idStack, navigation, getResourceMaterialData]);

  const breadcrumb = idStack?.map((v) => {
    return { name: v?.name, navigateTo: 'goBack' };
  });
  const truncateArray = (
    arr: { name: string; id: string }[],
    value: { name: string; id: string }
  ): { name: string; id: string }[] => {
    const index = arr.findIndex((item) => item.name === value.name); // Find the index of the specified value by properties
    return index !== -1 ? arr.slice(0, index + 1) : arr; // Slice the array up to that index
  };

  useEffect(() => {
    navigation.setOptions({ orientation: 'portrait' });
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove(); // Clean up the event listener on unmount
  }, [idStack]);
  useEffect(() => {
    console.log('Check One');
    getResourceMaterialData(route.params.id);
    setIdStack([{ name: route.params.nameOfMaterial, id: route.params.id }]);
    storeSubscriberActivity({
      module: 'Resource Material',
      action: route.params.nameOfMaterial,
      dispatch,
    });
  }, [route.params.id, route.params.nameOfMaterial, getResourceMaterialData]);
  const isLoading =
    idStack.length === 0 ||
    loadingApis?.includes('RESOURCE_MATERIAL_BY_PARENT');
  const nodata =
    !loadingApis?.includes('RESOURCE_MATERIAL_BY_PARENT') &&
    resource_material_by_parent?.length === 0;
  return (
    <View style={{ backgroundColor: colors.WHITE_FFFF, flex: 1 }}>
      <HeaderComponent
        navigation={navigation}
        isExternal={true}
        backTitle={route.params.nameOfMaterial}
        route={route}
      />
      <Breadcrumb
        breadcrumb={[
          { name: appTranslations?.APP_HOME, navigateTo: 'homeScreen' },
          { name: appTranslations?.APP_ALL_MODULE, navigateTo: 'moreTools' },
          ...breadcrumb,
        ]}
        onPress={(v) => {
          if (['moreTools', 'homeScreen']?.includes(v?.navigateTo)) {
            navigation?.navigate(v?.navigateTo);
          } else {
            const navigatePath = truncateArray(idStack, v);
            const lastElement = navigatePath[navigatePath.length - 1];
            getResourceMaterialData(lastElement.id);
            setIdStack(navigatePath);
          }
        }}
      />
      <View
        style={{
          margin: RFValue(10),
          flex: 1,
          padding: CustomRFValue(4),
          borderRadius: CustomRFValue(20),
          backgroundColor: '#F3F5F6',
          // margin: CustomRFValue(5),
        }}
        // styleName='bgGrayRadius20padding4flex1'
      >
        <View
          style={{
            marginTop: RFValue(10),
            flex: 1,
            paddingVertical: CustomRFValue(8),
            paddingHorizontal: CustomRFValue(8),
            borderRadius: CustomRFValue(20),
            backgroundColor: '#fff',
            margin: CustomRFValue(10),
          }}
          // styleName='bgFFFMargin10PaddingV8paddingH8'
        >
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {isLoading ? (
              Array.from({ length: 9 })?.map((guidelines, i) => {
                return (
                  <View
                    style={{ padding: RFValue(8), flexDirection: 'row' }}
                    key={i}
                  >
                    <NewsSkeletonCard />
                  </View>
                );
              })
            ) : resource_material_by_parent?.length > 0 ? (
              resource_material_by_parent
                ?.sort((a, b) => {
                  return a?.index - b?.index;
                })
                ?.map((guidelines, i) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      key={i + '-ContentCard'}
                      style={{ flex: 1 }}
                      onPress={() => {
                        onCardClick(guidelines);
                      }}
                    >
                      <View
                        style={{
                          padding: RFValue(10),
                          borderBottomWidth: 0.5,
                          borderBottomColor: colors.LIGHT_GREY_B0B0B0,
                        }}
                        key={i + 'guidelinesData'}
                      >
                        <Row style={{ alignItems: 'center' }}>
                          {getIconForFileType(guidelines?.typeOfMaterials)}
                          <Text
                            style={{
                              ...fontStyles.Maison_600_16PX_21LH,
                              color: colors.DARK_BLUE_394F89,
                              marginHorizontal: RFValue(10),
                              flex: 1,
                              marginTop: RFValue(5),
                            }}
                            ellipsizeMode='tail'
                          >
                            {(guidelines?.title[route?.params?.appLang] &&
                              guidelines?.title[route?.params?.appLang]) ||
                              guidelines?.title?.en}
                          </Text>
                        </Row>
                      </View>
                    </TouchableOpacity>
                  );
                })
            ) : nodata ? (
              <NoDataCard />
            ) : null}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: RFValue(10),
  },
  scrollContainer: {
    flex: 1,
  },
  modalView: {
    margin: RFValue(20),
    backgroundColor: 'white',
    borderRadius: RFValue(10),
    shadowOffset: {
      width: 0,
      height: RFValue(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(4),
    elevation: RFValue(5),
    width: RFValue(200),
  },
});
