import {
  fontStyles,
  homePage4BoxData,
  homePage4Gradient,
  langKeyForPlugin,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { storeDataToAsyncStorage } from '@nikshay-setu-v3-monorepo/utils';
import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { RFValue } from 'react-native-responsive-fontsize';

export type PluginDataType = {
  name: string;
  desc?: string;
  image: React.FC<{ height: number; width: number; style?: any }>;
};

export type ModalStateType = {
  isOpen: boolean;
  itemClick: string;
  x: number;
  y: number;
  index: number;
};

type EditPluginProps = {
  isModalVisible: ModalStateType;
  setIsModalVisible: (value: ModalStateType) => void;
  pluginOrder: string[];
  setPluginOrder: (order: string[]) => void;
  setReorderedBoxData: (data: PluginDataType[]) => void;
  appTranslations: Record<string, string>;
};

const editPluginInitial: ModalStateType = {
  isOpen: false,
  itemClick: '',
  x: 0,
  y: 0,
  index: 0,
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  animatedView: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: RFValue(10),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginHorizontal: RFValue(5),
  },
  card: {
    flex: 1,
    margin: RFValue(5),
    borderRadius: RFValue(5),
    padding: RFValue(10),
  },
  image: {
    height: RFValue(45),
    width: RFValue(45),
    marginBottom: RFValue(15),
  },
  textWhite: {
    color: 'white',
  },
});

const EditPlugin: React.FC<EditPluginProps> = ({
  isModalVisible,
  setIsModalVisible,
  pluginOrder,
  setPluginOrder,
  setReorderedBoxData,
  appTranslations,
}) => {
  const { width } = useWindowDimensions();

  const closeModal = () => {
    setIsModalVisible(editPluginInitial);
  };

  const filteredItems = homePage4BoxData.filter(
    (item) =>
      pluginOrder.includes(item.name) && item.name !== isModalVisible.itemClick
  );

  return (
    <Modal
      transparent
      visible={isModalVisible.isOpen}
      animationType='none'
      onDismiss={closeModal}
      onRequestClose={closeModal}
    >
      <View style={styles.overlay} onTouchEnd={closeModal}>
        <Animated.View
          style={[
            styles.animatedView,
            { top: RFValue(isModalVisible.y) - RFValue(50) },
          ]}
        >
          <Carousel
            loop
            autoPlay
            mode='horizontal-stack'
            modeConfig={{ showLength: 2 }}
            scrollAnimationDuration={1000}
            width={width - RFValue(15)}
            height={RFValue(110)}
            data={filteredItems}
            renderItem={({ item }) => {
              const Image = item.image;

              return (
                <Pressable
                  key={item.name}
                  onPress={() => {
                    const indexA = pluginOrder.indexOf(
                      isModalVisible.itemClick
                    );
                    const indexB = pluginOrder.indexOf(item.name);

                    if (indexA !== -1 && indexB !== -1) {
                      const updated = [...pluginOrder];
                      [updated[indexA], updated[indexB]] = [
                        updated[indexB],
                        updated[indexA],
                      ];
                      setPluginOrder(updated);
                      storeDataToAsyncStorage(
                        'pluginOrder',
                        updated.toString()
                      );
                      const reordered = updated
                        .map((title) =>
                          homePage4BoxData.find((i) => i.name === title)
                        )
                        .filter(Boolean) as PluginDataType[];

                      setReorderedBoxData(reordered);
                    }
                  }}
                  style={uiStyles.flex1}
                >
                  <LinearGradient
                    colors={homePage4Gradient[isModalVisible.index]}
                    start={{ x: 0.7, y: 0.1 }}
                    end={{ x: 0.3, y: 1 }}
                    style={styles.card}
                  >
                    <View style={uiStyles.marginHorizontal2}>
                      {Image && (
                        <Image
                          height={RFValue(40)}
                          width={RFValue(40)}
                          style={styles.image}
                        />
                      )}
                      <Text
                        style={[
                          fontStyles.Maison_500_16PX_16LH,
                          styles.textWhite,
                        ]}
                      >
                        {appTranslations[
                          langKeyForPlugin[item.name] || 'APP_LOADING'
                        ] || ''}
                      </Text>
                      {item.desc && (
                        <Text style={uiStyles.homeLinGradBoxDec}>
                          {item.desc}
                        </Text>
                      )}
                    </View>
                  </LinearGradient>
                </Pressable>
              );
            }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default EditPlugin;
