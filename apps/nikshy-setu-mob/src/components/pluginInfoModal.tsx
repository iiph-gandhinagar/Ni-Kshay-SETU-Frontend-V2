import { CloseSvg } from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import React from 'react';
import { Animated, Modal, StyleSheet, Text, View } from 'react-native';
import { Row } from './commonComponents/row_column';

interface PluginInfoModalProps {
  closeModal: () => void;
  isOpen: boolean;
  yPosition: number;
  text: string;
  header: string;
  Children?: React.ReactNode;
}

const PluginInfoModal: React.FC<PluginInfoModalProps> = ({
  closeModal,
  isOpen,
  text,
  Children,
  header = 'Information about plugin',
  yPosition,
}) => {
  return (
    <Modal
      transparent
      visible={isOpen}
      animationType='none'
      onDismiss={closeModal}
      onRequestClose={closeModal}
    >
      <View style={styles.overlay} onTouchEnd={closeModal}>
        <Animated.View
          style={[
            styles.modal,
            {
              top: yPosition - 20,
              marginHorizontal: 20,
            },
          ]}
        >
          <Row
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: RFValue(10),
            }}
          >
            <Text style={[fontStyles.Maison_500_15PX_21LH, { color: 'white' }]}>
              {header}
            </Text>
            <CloseSvg fill={'white'} />
          </Row>
          <Text style={[fontStyles.Maison_400_13PX_20LH, { color: 'white' }]}>
            {text || '--'}
          </Text>
          {Children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Black glass background
  },
  modal: {
    position: 'absolute',
    padding: 20,
    backgroundColor: 'black',
    borderRadius: RFValue(10),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default PluginInfoModal;
