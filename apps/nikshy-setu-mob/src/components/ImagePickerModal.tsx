import { CloseSvg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNImagePicker from 'react-native-image-crop-picker';
import { requestCameraPermission } from '../utils/CommonAndroidPermissions';

interface ImagePickerProps {
  setPickedImage: (path: string) => void;
  onClose: () => void;
  colors: {
    BLACK_000000: string;
  };
  modalVisible: boolean;
}
export const ImagePicker: React.FC<ImagePickerProps> = ({
  onClose = () => null,
  colors,
  modalVisible = false,
  setPickedImage = () => null,
}) => {
  const pickImageFromLibrary = () => {
    try {
      RNImagePicker?.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        avoidEmptySpaceAroundImage: true,
        compressImageQuality: 0.8,
      })
        .then((image) => {
          onClose();
          if (image?.path) {
            setPickedImage(image?.path);
          }
        })
        .catch((error) => {
          RNImagePicker?.clean()
            .then(() => {
              console.log('removed all tmp images from tmp directory');
            })
            .catch((e) => {
              console.log('e');
            });
        });
    } catch (error) {
      console.log('catch', error);
    }
  };

  const pickImageFromCamera = () => {
    try {
      RNImagePicker?.openCamera({
        width: 400,
        height: 400,
        cropping: true,
        avoidEmptySpaceAroundImage: true,
        useFrontCamera: false,
        compressImageQuality: 0.8,
      })
        .then((image) => {
          onClose();
          setPickedImage(image?.path);
        })
        .catch((error) => {
          console.log('pickImageFromCamera', error);
          RNImagePicker.clean()
            .then(() => {
              console.log('removed all tmp images from tmp directory');
            })
            .catch((e) => {
              console.log('e');
            });
        });
    } catch (error) {
      console.log('catch', error);
    }
  };

  const Camera = () => {
    pickImageFromCamera();
    // onClose();
  };

  const Gallery = () => {
    requestCameraPermission();
    pickImageFromLibrary();
    // onClose();
  };
  if (modalVisible)
    return (
      <Modal animationType='slide' visible={modalVisible} transparent>
        <View style={styles.centeredView}>
          <View
            style={[styles.modalView, { shadowColor: colors.BLACK_000000 }]}
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <CloseSvg />
            </TouchableOpacity>
            <Text style={fontStyles.Maison_400_17PX_27LH}>Choose Photo</Text>
            <Pressable onPress={Gallery} style={[styles.FlexRow]}>
              <Text style={fontStyles.Maison_400_16PX_25LH}>Gallery</Text>
            </Pressable>
            <Pressable onPress={Camera} style={[styles.FlexRow]}>
              <Text style={fontStyles.Maison_400_16PX_25LH}>Camera</Text>
            </Pressable>
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
    borderRadius: RFValue(20),
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
    top: RFValue(15),
    right: RFValue(15),
    zIndex: 1,
  },
  FlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RFValue(10),
    marginTop: RFValue(15),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 8,
    borderColor: '#D9DBDB',
    borderWidth: 1,
    marginVertical: 10,
  },
});
