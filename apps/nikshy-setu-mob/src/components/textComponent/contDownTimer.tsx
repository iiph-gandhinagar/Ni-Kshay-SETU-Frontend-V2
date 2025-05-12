import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { ThemeProps } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Row } from '../commonComponents/row_column';

interface TimerProps {
  initialMinutes: number;
  onPressSend?: () => void;
}

export const CountdownTimer: React.FC<TimerProps> = ({
  initialMinutes,
  onPressSend,
}) => {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(true);
  const { colors } = useTheme() as ThemeProps;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (seconds == 400) {
      setIsActive(false);
    }
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      clearInterval(interval!);
    }

    return () => clearInterval(interval!);
  }, [isActive, seconds]);

  const reset = () => {
    setSeconds(initialMinutes * 60);
    setIsActive(true);
  };
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  return (
    <Row style={{ justifyContent: 'space-between', margin: RFValue(4) }}>
      <Row>
        <Text style={fontStyles.resendOTPText}>Didn’t receive yet? </Text>
        <Text
          onPress={() => {
            setIsActive(isActive);
            onPressSend();
            reset();
          }}
          disabled={isActive}
          style={[
            fontStyles.resendOTPText,
            {
              color: isActive ? colors?.GREY_D9DBDB : colors?.BLUE_4681FF,
              textDecorationLine: isActive ? 'none' : 'underline',
            },
          ]}
        >
          Resend now
        </Text>
      </Row>
      <Text>{formatTime(seconds)}</Text>
    </Row>
  );
};
