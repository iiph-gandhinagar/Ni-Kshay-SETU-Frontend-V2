import {
  ArrowSvg,
  DropdownArrowSvg,
  ImagePlaceholderPng,
  RadioCheckedSvg,
  RadioUncheckedSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import {
  fontStyles,
  getAlgorithmDataByName,
  STORE_URL,
} from '@nikshay-setu-v3-monorepo/constants';
import { Node, RootStackParamList } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import {
  CompositeNavigationProp,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
const filterKeys = (data: Record<string, string>, maxKey: number) => {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => Number(key) <= maxKey)
  );
};

interface Props {
  item: Node;
  level: number;
  breadcrumb: { name: string; navigateTo: string }[];
  mainModuleId: string;
  appLang: string | 'en';
  openModule;
  setCardData?: (value: { [key: string]: string; title: string }) => void;
}
const dataNotFoundHtml = '<p>no data</p>';
const AlgorithmList: React.FC<Props> = ({
  item,
  level,
  openModule,
  breadcrumb,
  setCardData,
  mainModuleId,
  appLang,
}) => {
  type AlgorithmViewNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<RootStackParamList, 'algorithmView'>,
    NavigationProp<RootStackParamList>
  >;
  const navigation = useNavigation<AlgorithmViewNavigationProp>();
  const isOpen = openModule[level] === item._id;
  const title =
    (item?.title[appLang] && item?.title[appLang]) || item?.title?.en;
  const description =
    (item?.description &&
      ((item?.description[appLang] && item?.description[appLang]) ||
        (item?.description?.en && item?.description?.en))) ||
    dataNotFoundHtml;
  const isParentOpen = openModule[level - 1] === item.parentId;
  const isExpandable = item?.isExpandable === 1;
  const isRedirectNode =
    !isExpandable && item?.redirectNodeId && item?.redirectAlgoType;
  const expandableOpen = isOpen && isExpandable;
  const isLevelOne = level === 1;
  const isNotes =
    (['CMS Node'].includes(item?.nodeType) && level === 1 && !isExpandable) ||
    item?.redirectAlgoType === null ||
    item?.redirectNodeId == '0';
  const isLinkingNode = !isNotes;
  const isNotes_noChildren_noRedirectNodeId =
    ['CMS Node'].includes(item?.nodeType) &&
    item?.children.length === 0 &&
    item?.description &&
    Object.values(item?.description).length >= 0 &&
    !isRedirectNode;
  const filteredData = filterKeys(openModule, level);
  const isTitle = isLevelOne || isExpandable;
  const endPoint =
    description === dataNotFoundHtml &&
    (isNotes || isNotes_noChildren_noRedirectNodeId);
  const handlePress = () => {
    if (endPoint) {
      console.log(item.nodeType);

      return;
    }
    const news = false ? filteredData : { [level]: item?._id };
    if (Object.values(openModule).includes(item?._id) && !isLinkingNode) {
      for (const key in openModule) {
        if (parseInt(key) >= level) {
          delete openModule[key];
        }
      }
      setCardData({
        ...openModule,
        ...news,
      });
    } else if (
      !(typeof description === 'object') &&
      (isNotes || isNotes_noChildren_noRedirectNodeId)
    ) {
      setCardData({
        title: title,
        'CMS Node': description,
      });
    } else if (isRedirectNode) {
      const metaData = getAlgorithmDataByName?.[item?.redirectAlgoType];
      navigation.replace('algorithmView', {
        nameOfAlgorithm: item?.redirectAlgoType,
        activeTab: null,
        breadcrumb: [...breadcrumb, { name: title, navigateTo: 'goBack' }],
        dependentNodeUrl: metaData?.urls?.dependentNode,
        parentNodeId: item?.redirectNodeId.toString(),
        mainModuleId: mainModuleId,
        appLang: appLang,
      });
    } else if (!isRedirectNode && item?.redirectAlgoType && isLinkingNode) {
      navigation.replace('algorithmScreen', {
        nameOfAlgorithm: item?.redirectAlgoType,
        appLang,
      });
    } else if (item.nodeType === 'CMS Node(New Page)') {
      navigation.navigate('CmsNewPage', {
        description: description,
        breadcrumb: [...breadcrumb, { name: title, navigateTo: 'goBack' }],
        header: title,
        appLang,
      });
    } else {
      setCardData({
        ...openModule,
        ...news,
      });
    }
  };

  return (
    <View
      style={[
        styles.pressable,
        {
          borderStartWidth: level > 1 ? 1 : 0,
          paddingRight: isLevelOne ? RFValue(5) : 0,
          marginRight: level > 1 ? 0 : RFValue(10),
          marginVertical: level > 1 ? 0 : RFValue(10),
          borderRadius: isLevelOne ? RFValue(10) : 0,
          elevation: isLevelOne ? RFValue(5) : 0, // This applies to Android
          // iOS shadow properties
          shadowColor: isLevelOne ? '#000' : 'transparent', // Adjusting color based on condition
          shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
          shadowOpacity: isLevelOne ? 0.1 : 0, // Adjust opacity based on condition
          shadowRadius: isLevelOne ? RFValue(5) : 0, // Adjust radius based on condition
        },
        level === 2 && {
          paddingRight: RFValue(5),
          marginRight: RFValue(10),
          marginVertical: RFValue(10),
          borderRadius: RFValue(10),
          elevation: RFValue(5), // For Android
          borderStartWidth: 0,
          backgroundColor: 'white',
          // iOS shadow properties for level 2
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: RFValue(5),
        },
      ]}
    >
      <Pressable onPress={handlePress}>
        <View
          style={[styles.row, { justifyContent: 'space-between', flex: 1 }]}
        >
          <Row style={{ alignItems: 'center', flex: 1 }}>
            {item.icon ? (
              <Image
                source={{
                  uri: STORE_URL + item.icon,
                }}
                style={{
                  height: RFValue(40),
                  width: RFValue(40),
                  margin: RFValue(10),
                }}
                progressiveRenderingEnabled={true}
                defaultSource={ImagePlaceholderPng}
              />
            ) : isTitle ? (
              <Text style={styles.bulletPoint}>●</Text>
            ) : isNotes || isNotes_noChildren_noRedirectNodeId || endPoint ? (
              <Text style={styles.bulletPoint}>●</Text>
            ) : isRedirectNode ? (
              <Text style={styles.bulletPoint}>
                <DropdownArrowSvg
                  style={{ transform: [{ rotate: '270deg' }] }}
                  stroke={'#394F89'}
                />
              </Text>
            ) : (
              <View style={{ margin: RFValue(10) }}>
                {isOpen ? <RadioCheckedSvg /> : <RadioUncheckedSvg />}
              </View>
            )}

            <Text
              style={[
                isTitle && styles.title,
                isOpen && styles.clickOption,
                !isOpen && styles.uncheckOption,
                (isNotes || isNotes_noChildren_noRedirectNodeId) &&
                  styles.noteText,
                isRedirectNode && styles.redirectNode,
                isLevelOne && styles.levelOne,
                {
                  opacity: (!(isOpen || isExpandable) && level / 10 + 0.7) || 1,
                },
              ]}
            >
              {title}
            </Text>
          </Row>
          {level > 1 && isExpandable && (
            <View style={{ flex: 0.1 }}>
              <ArrowSvg
                style={{ transform: [{ rotate: isOpen ? '270deg' : '90deg' }] }}
              />
            </View>
          )}
        </View>
      </Pressable>
      {(isLevelOne ? isOpen : isOpen || isExpandable) &&
        item?.children
          ?.sort((a, b) => {
            return a?.index - b?.index;
          })
          ?.map((child, index) => {
            return (
              <AlgorithmList
                key={level + index}
                item={child}
                level={level + 1}
                breadcrumb={breadcrumb}
                mainModuleId=''
                openModule={openModule}
                appLang={appLang}
                setCardData={setCardData}
              />
            );
          })}
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    marginHorizontal: RFValue(10),
    flex: 1,
    paddingHorizontal: RFValue(5),
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: RFValue(5),
  },
  bulletPoint: {
    marginHorizontal: RFValue(7),
    color: '#394F89',
    fontSize: RFValue(18),
  },
  title: {
    ...fontStyles.Maison_500_16PX_21LH,
    color: '#394F89',
    flex: 1,
    opacity: 1,
  },
  clickOption: {
    ...fontStyles.Maison_500_14PX_18LH,
    color: '#394F99',
    flex: 1,
  },
  uncheckOption: {
    ...fontStyles.Maison_500_14PX_18LH,
    color: 'gray',
    flex: 1,
  },
  levelOne: {
    ...fontStyles.Maison_600_16PX_21LH,
    color: 'black',
    padding: RFValue(5),
    flex: 1,
  },
  redirectNode: {
    backgroundColor: '#F5F5F5',
    borderRadius: RFValue(10),
    padding: RFValue(5),
    ...fontStyles.Maison_500_13PX_20LH,
    flex: 1,
  },
  noteText: {
    // backgroundColor: '#F5F5F5',
    // borderRadius: RFValue(20),
    padding: RFValue(5),
    ...fontStyles.Maison_500_13PX_20LH,
    flex: 1,
  },
});

export default AlgorithmList;
