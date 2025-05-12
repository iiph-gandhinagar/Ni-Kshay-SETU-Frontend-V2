import {
  AdvancedBronzeSvg,
  AdvancedGoldSvg,
  AdvancedSilverSvg,
  BeginnerBronzeSvg,
  BeginnerGoldSvg,
  BeginnerSilverSvg,
  celebrationAnimation,
  clapAudio,
  CompetentBronzeSvg,
  CompetentGoldSvg,
  CompetentSilverSvg,
  ExpertBronzeSvg,
  ExpertGoldSvg,
  ExpertSilverSvg,
  ProficientBronzeSvg,
  ProficientGoldSvg,
  ProficientSilverSvg,
  tadaAudio,
} from '@nikshay-setu-v3-monorepo/assets';
import { fontStyles, uiStyles } from '@nikshay-setu-v3-monorepo/constants';
import { ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import SoundPlayer from 'react-native-sound-player';

const hw = { height: RFValue(90), width: RFValue(90) };

const taskData = {
  Beginner: {
    Bronze: <BeginnerBronzeSvg {...hw} />,
    Silver: <BeginnerSilverSvg {...hw} />,
    Gold: <BeginnerGoldSvg {...hw} />,
  },
  'Advanced Beginner': {
    Bronze: <AdvancedBronzeSvg {...hw} />,
    Silver: <AdvancedSilverSvg {...hw} />,
    Gold: <AdvancedGoldSvg {...hw} />,
  },
  Competent: {
    Bronze: <CompetentBronzeSvg {...hw} />,
    Silver: <CompetentSilverSvg {...hw} />,
    Gold: <CompetentGoldSvg {...hw} />,
  },
  Proficient: {
    Bronze: <ProficientBronzeSvg {...hw} />,
    Silver: <ProficientSilverSvg {...hw} />,
    Gold: <ProficientGoldSvg {...hw} />,
  },
  Expert: {
    Bronze: <ExpertBronzeSvg {...hw} />,
    Silver: <ExpertSilverSvg {...hw} />,
    Gold: <ExpertGoldSvg {...hw} />,
  },
};
interface AchievementModalProps {
  onClose: () => void;
  open: boolean;
  info: { currentBadge: string; message: string; currentLevel: string };
}
const AchievementModal: React.FC<AchievementModalProps> = ({
  onClose,
  open,
  info,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const playSoundsSequentially = async () => {
    const audioQueue = [tadaAudio, clapAudio]; // Add your asset names here
    let currentIndex = 0;

    const playNextSound = () => {
      if (currentIndex < audioQueue.length) {
        try {
          SoundPlayer.playAsset(audioQueue[currentIndex]);
          currentIndex++;
        } catch (e) {
          console.log('Error playing sound file:', e);
        }
      } else {
        onClose();
      }
    };
    SoundPlayer.addEventListener('FinishedPlaying', () => {
      playNextSound();
    });

    playNextSound();
  };
  playSoundsSequentially();

  return (
    <Modal
      animationType='slide'
      visible={open}
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.centeredView} onTouchStart={onClose}>
        <View
          style={[
            styles.modalView,
            { shadowColor: colors.BLACK_000000, alignItems: 'center' },
          ]}
        >
          <LottieView
            autoPlay
            source={celebrationAnimation}
            loop={true}
            style={{
              height: '130%',
              width: '130%',
              position: 'absolute',
            }}
          />
          {taskData?.[info?.currentLevel]?.[info?.currentBadge]}
          <Text
            style={[
              fontStyles.Maison_500_20PX_25LH,
              { marginTop: RFValue(20), fontWeight: 'bold' },
            ]}
          >
            {'New Achievement!'}
          </Text>
          <Text
            style={[fontStyles.Maison_500_18PX_24LH, uiStyles?.marginTop10]}
          >
            {info?.message || 'You got new Badge'}
          </Text>
          <Text
            style={[fontStyles.Maison_500_18PX_26LH, { marginTop: RFValue(5) }]}
          >
            {info?.currentBadge || ''}
          </Text>
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
    margin: RFValue(30),
    backgroundColor: 'white',
    borderRadius: RFValue(30),
    padding: RFValue(20),
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: RFValue(10),
    borderColor: '#D9DBDB',
    borderWidth: 1,
    marginVertical: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
});

export default AchievementModal;
