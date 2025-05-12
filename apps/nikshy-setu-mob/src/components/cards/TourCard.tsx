import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import { Text, View } from 'react-native';
import { TooltipProps } from 'rn-tourguide';
import Button from '../buttons/primaryButtons';

export const TooltipComponent: React.FC<TooltipProps> = ({
  currentStep,
  handleNext,
  handlePrev,
  handleStop,
  isFirstStep,
  isLastStep,
  labels,
}) => {
  return (
    <View
      style={{
        borderRadius: RFValue(10),
        paddingTop: RFValue(25),
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: RFValue(16),
        backgroundColor: '#ffff',
        width: '85%',
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '90%',
        }}
      >
        <Text
          testID='stepDescription'
          style={[
            fontStyles.Maison_400_14PX_17LH,
            {
              textAlign: 'center',
              color: '#000000', // White text for contrast
            },
          ]}
        >
          {currentStep && currentStep.text}
        </Text>
      </View>
      <View
        style={{
          marginTop: RFValue(15),
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        {!isLastStep ? (
          <Button
            bgColor={'transparent'} // White background for buttons
            title={labels?.skip || 'Skip'}
            textStyle={[
              ,
              fontStyles.Maison_500_15PX_21LH,
              { color: '#394F89' },
            ]} // Gradient start color for text
            containerStyle={{
              margin: 0,
              marginHorizontal: RFValue(5),
              flex: 1,
              padding: RFValue(5),
            }}
            onPress={handleStop}
          />
        ) : null}
        {!isFirstStep ? (
          <Button
            bgColor={'transparent'}
            title={labels?.previous || 'Previous'}
            textStyle={[fontStyles.Maison_500_15PX_21LH, { color: '#394F89' }]} // Gradient start color for text
            containerStyle={{
              marginHorizontal: RFValue(5),
              flex: 1,
              padding: RFValue(5),
            }}
            onPress={handlePrev}
          />
        ) : null}
        {!isLastStep ? (
          <Button
            bgColor={'transparent'}
            title={labels?.next || 'Next'}
            textStyle={[fontStyles.Maison_500_15PX_21LH, { color: '#394F89' }]} // Gradient start color for text
            containerStyle={{
              marginHorizontal: RFValue(5),
              flex: 1,
              padding: RFValue(5),
            }}
            onPress={handleNext}
          />
        ) : (
          <Button
            bgColor={'transparent'}
            title={labels?.finish || 'Finish'}
            textStyle={[fontStyles.Maison_500_15PX_21LH, { color: '#394F89' }]} // Gradient start color for text
            containerStyle={{
              marginHorizontal: RFValue(5),
              padding: RFValue(5),
              flex: 1,
            }}
            onPress={handleStop}
          />
        )}
      </View>
    </View>
  );
};
