import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { RootReducerStates } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { Row } from 'apps/nikshy-setu-mob/src/components/commonComponents/row_column';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

type Task = {
  levelName: string;
  level: string;
  desc: string;
  backgroundColor: [string, string];
  icon1: JSX.Element;
  icon2: JSX.Element;
  icon3: JSX.Element;
};
type LevelInfoCarComponent = {
  colors: any;
  task: Task;
};
const LevelInfoCarComponent: React.FC<LevelInfoCarComponent> = React.memo(
  ({ colors, task }) => {
    const [openLevelName, setOpenLevelName] = useState<String>('');

    const onTaskClick = (task) => {
      if (task.levelName == openLevelName) setOpenLevelName('');
      else setOpenLevelName(task.levelName);
    };
    const appTranslations = useSelector(
      (state: RootReducerStates) => state.appContext?.data?.appTranslations
    );
    return (
      <TouchableHighlight
        onPress={() => onTaskClick(task)}
        underlayColor={null}
      >
        <View
          style={{
            elevation: 2,
            backgroundColor: 'white',
            margin: RFValue(10),
            padding: RFValue(10),
            borderRadius: RFValue(10),
            borderWidth: 2,
            borderColor: task.backgroundColor[0],
          }}
        >
          <LinearGradient
            end={{ x: 1, y: 0 }}
            start={{ x: 0, y: 1 }}
            colors={task.backgroundColor}
            style={{
              borderRadius: RFValue(10),
              padding: RFValue(10),
            }}
          >
            <Row style={{ justifyContent: 'space-between' }}>
              <Text
                style={[
                  fontStyles.Maison_600_16PX_21LH,
                  { color: colors.WHITE_FFFF },
                ]}
              >
                {task.level}
              </Text>
              <Text
                style={[
                  fontStyles.Maison_600_16PX_21LH,
                  { color: colors.WHITE_FFFF },
                ]}
              >
                {task.levelName}
              </Text>
            </Row>
            <Text
              style={[
                fontStyles.Maison_500_12PX_15LH,
                { color: colors.WHITE_FFFF, marginVertical: RFValue(10) },
              ]}
            >
              {appTranslations[task.desc]}
            </Text>
          </LinearGradient>
          <Row
            style={{
              justifyContent: 'space-between',
              marginTop: RFValue(10),
              paddingHorizontal: RFValue(10),
            }}
          >
            <View style={{ alignItems: 'center' }}>
              {task.icon1}
              <Text style={fontStyles.Maison_500_12PX_15LH}>Bronze</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              {task.icon2}
              <Text style={fontStyles.Maison_500_12PX_15LH}>Silver</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              {task.icon3}
              <Text style={fontStyles.Maison_500_12PX_15LH}>Gold</Text>
            </View>
          </Row>
        </View>
      </TouchableHighlight>
    );
  }
);

export default LevelInfoCarComponent;
