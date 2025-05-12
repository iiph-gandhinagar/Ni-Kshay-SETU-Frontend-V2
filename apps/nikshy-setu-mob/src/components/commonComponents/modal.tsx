import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import React from 'react';
import { Modal, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface ModalProps {
  closeModal: () => void;
  isOpen: boolean;
  closeable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({
  closeModal,
  isOpen,
  closeable = true,
  children,
  containerStyle,
  overlayStyle,
}) => {
  return (
    <Modal
      transparent
      visible={isOpen}
      animationType='none'
      onDismiss={closeModal}
      onRequestClose={closeModal}
    >
      <View
        style={[styles.overlay, overlayStyle]}
        onTouchEnd={() => (closeable ? closeModal() : null)}
      >
        <View style={[styles.modal, containerStyle]}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Black glass background
  },
  modal: {
    position: 'absolute',
    padding: RFValue(20),
    backgroundColor: 'black',
    borderRadius: RFValue(10),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default ModalComponent;
