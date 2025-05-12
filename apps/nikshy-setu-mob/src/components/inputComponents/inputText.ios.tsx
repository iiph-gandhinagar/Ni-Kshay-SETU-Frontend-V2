import {
  ChatAttachSvg,
  ChatCameraSvg,
  ChatMicSvg,
  InputMassageSendSvg,
} from '@nikshay-setu-v3-monorepo/assets';
import {
  componentStyles,
  CountryCodes,
  CustomRFValue,
  fontStyles,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import {
  InputProps,
  InputWithCountryProps,
  MessageInputProps,
  RootStackParamList,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import {
  CustomRFValue as RFValue,
  transformText,
  useKeyboardVisibility,
} from '@nikshay-setu-v3-monorepo/utils';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { requestMicrophonePermission } from '../../utils/CommonAndroidPermissions';
import { Row } from '../commonComponents/row_column';
import { InputContainer } from './inputContainer';
// import MicModal from './voiceModal';
import MicModal from './voiceModal';

export const _Input: React.FC<InputProps> = ({
  placeholder,
  value,
  keyboardType = 'default',
  onChange,
  onBlur,
  onTouched,
  error,
  onPressEdit,
  touched,
  label,
  edit,
  containerStyle,
  labelStyles,
  numberOfLines,
  multiline = false,
  isRequired = false,
  secureTextEntry = false,
  editable = true,
}) => {
  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
    if (onTouched) {
      onTouched();
    }
  };
  const { colors } = useTheme() as ThemeProps;
  const handleChange = (text: string) => {
    const parsedValue = parseFloat(text);
    onChange(isNaN(parsedValue) ? text : parsedValue);
  };
  return (
    <InputContainer
      edit={edit}
      onPressEdit={onPressEdit}
      error={error}
      touched={touched}
      label={label}
      isRequired={isRequired}
      labelStyles={labelStyles}
      containerStyle={containerStyle}
    >
      <TextInput
        placeholderTextColor={'#808080'}
        style={[
          componentStyles.TextInputInputComponent,
          { paddingVertical: CustomRFValue(5) },
        ]}
        placeholder={transformText(
          (placeholder && placeholder) || `Enter ${label}`,
          'capitalizeFirstLetter'
        )}
        onChangeText={handleChange}
        value={value !== null ? value?.toString() : ''}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        textAlignVertical='top'
        editable={editable}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        onBlur={handleBlur}
        returnKeyType='done'
        autoCapitalize={
          keyboardType === 'email-address' ? 'none' : 'characters'
        }
      />
    </InputContainer>
  );
};

export const _InputWithCountryCode: React.FC<InputWithCountryProps> = ({
  placeholder,
  value,
  keyboardType = 'default',
  onChange,
  onBlur,
  onTouched,
  error,
  onPressEdit,
  onCodeChange,
  touched,
  label,
  edit,
  containerStyle,
  labelStyles,
  numberOfLines,
  countryCode,
  multiline = false,
  isRequired = false,
  countryCodeDisable = false,
  isInternational = false,
  secureTextEntry = false,
  editable = true,
}) => {
  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
    if (onTouched) {
      onTouched();
    }
  };
  const { colors } = useTheme() as ThemeProps;
  const handleChange = (text: string) => {
    const parsedValue = parseFloat(text);
    onChange(isNaN(parsedValue) ? text : parsedValue);
  };
  const renderItem = (item) => {
    return (
      <View
        style={{
          padding: RFValue(10),
          borderWidth: value === item?.value ? RFValue(2) : 0,
          borderRadius: RFValue(10),
          borderColor: colors.BLUE_00739B,
          marginHorizontal: value === item?.value ? RFValue(5) : 0,
        }}
      >
        <Text
          style={[
            fontStyles.Maison_500_13PX_20LH,
            { color: value === item?.value ? colors.BLUE_00739B : 'black' },
          ]}
        >
          {item?.label}
        </Text>
      </View>
    );
  };

  return (
    <InputContainer
      edit={edit}
      onPressEdit={onPressEdit}
      error={error}
      touched={touched}
      label={label}
      isRequired={isRequired}
      labelStyles={labelStyles}
      containerStyle={containerStyle}
    >
      <Row style={{ alignItems: 'center', alignContent: 'center' }}>
        <View
          style={{
            flex: 1,
            padding: 0,
            marginBottom: RFValue(4),
            marginEnd: -RFValue(20),
          }}
        >
          <Dropdown
            onFocus={onTouched}
            key={label}
            value={countryCode}
            disable={countryCodeDisable}
            showsVerticalScrollIndicator={false}
            renderRightIcon={null}
            style={{
              padding: RFValue(3),
              margin: 0,
              ...componentStyles.TextInputInputComponent,
            }}
            selectedTextStyle={[
              componentStyles.TextInputInputComponent,
              countryCodeDisable && { color: colors.GREY_808080 },
            ]}
            searchPlaceholder={'Search ' + label + '...'}
            dropdownPosition='auto'
            data={CountryCodes?.filter((v) =>
              isInternational ? v.dial_code != '+91' : true
            ).map((v) => {
              return { label: v.dial_code, value: v.dial_code };
            })}
            onBlur={onBlur}
            containerStyle={{
              width: '30%',
              alignItems: 'center',
              ...componentStyles.TextInputInputComponent,
            }}
            labelField='label'
            valueField='value'
            placeholder={''}
            iconColor='transparent'
            onChange={(item) => {
              onCodeChange(item?.value);
            }}
            renderItem={renderItem}
          />
        </View>
        <View
          style={{
            flex: 4,
            margin: 0,
          }}
        >
          <TextInput
            placeholderTextColor={'#808080'}
            returnKeyType='done'
            style={[
              componentStyles.TextInputInputComponent,
              { color: colors.BLACK_000000 },
            ]}
            placeholder={transformText(
              (placeholder && placeholder) || `Enter ${label}`,
              'capitalizeFirstLetter'
            )}
            onChangeText={handleChange}
            value={value !== null ? value?.toString() : ''}
            multiline={multiline}
            secureTextEntry={secureTextEntry}
            textAlignVertical='top'
            editable={editable}
            numberOfLines={numberOfLines}
            keyboardType={keyboardType}
            onBlur={handleBlur}
          />
        </View>
      </Row>
    </InputContainer>
  );
};

export const _MessageInput: React.FC<MessageInputProps> = ({
  placeholder = 'Write Your Message',
  onSendClick,
  scrollDown,
  inputTextContainerStyle,
  hideKeyboardUI = false,
  hideCameraIcon = false,
  hideMicIcon = false,
  hideAttachmentsIcon = false,
  hideSendIcon = false,
}) => {
  const { colors } = useTheme() as ThemeProps;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isKeyboardVisible = useKeyboardVisibility();
  const [value, onChangeText] = useState('');
  const [showVoiceRecorder, setVoiceRecorder] = useState(false);
  const [errors, setErrors] = useState(false);

  const keyBoardOpen = hideKeyboardUI
    ? hideKeyboardUI
    : !hideKeyboardUI && !isKeyboardVisible;

  useEffect(() => {
    setErrors(false);
    if (scrollDown) {
      scrollDown();
    }
  }, [keyBoardOpen]);
  return (
    <View style={{ flexDirection: 'row' }}>
      <MicModal
        showMicModal={showVoiceRecorder}
        setShowMicModal={(v) => {
          setVoiceRecorder(v);
        }}
        onRightClick={(v) => {
          if (v) {
            setErrors(false);
            onSendClick(v);
            onChangeText('');
          }
        }}
      />
      <View
        style={[
          componentStyles.inputTextContainer,
          uiStyles.iosShadow,
          {
            flexDirection: 'row',
            borderColor: '#C62828',
            borderWidth: errors ? 1 : 0,
            shadowColor: errors ? 'red' : 'gray',
          },
          inputTextContainerStyle,
        ]}
      >
        <TextInput
          style={[componentStyles.inputText]}
          placeholder={placeholder}
          value={value}
          placeholderTextColor={'#808080'}
          onChangeText={onChangeText}
          multiline
        />
        {keyBoardOpen && !hideAttachmentsIcon && <ChatAttachSvg style={{}} />}
        {!hideMicIcon && (
          <ChatMicSvg
            style={{ marginHorizontal: RFValue(10) }}
            onPress={async () => {
              const req = await requestMicrophonePermission();
              if (req == 'granted') {
                setVoiceRecorder(true);
              }
            }}
          />
        )}
      </View>
      {keyBoardOpen && !hideSendIcon && (
        <TouchableOpacity
          style={{
            backgroundColor: colors.WHITE_FFFF,
            elevation: RFValue(5),
            padding: RFValue(10),
            margin: RFValue(5),
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            ...uiStyles.iosShadow,
          }}
          onPress={() => {
            if (value?.length > 1) {
              setErrors(false);
              onSendClick(value);
              onChangeText('');
            } else {
              setErrors(true);
            }
          }}
        >
          <InputMassageSendSvg height={RFValue(20)} width={RFValue(20)} />
        </TouchableOpacity>
      )}

      {!keyBoardOpen && (
        <View style={{ justifyContent: 'space-evenly' }}>
          {!hideCameraIcon && (
            <TouchableOpacity
              style={componentStyles.chatIcon}
              onPress={() => navigation.navigate('chatSupport')}
            >
              <ChatCameraSvg height={RFValue(20)} width={RFValue(20)} />
            </TouchableOpacity>
          )}

          {!hideAttachmentsIcon && (
            <TouchableOpacity
              style={componentStyles.chatIcon}
              onPress={() => navigation.navigate('chatSupport')}
            >
              <ChatAttachSvg height={RFValue(20)} width={RFValue(20)} />
            </TouchableOpacity>
          )}
          {!hideSendIcon && (
            <TouchableOpacity
              style={{
                backgroundColor: colors.WHITE_FFFF,
                elevation: RFValue(5),
                padding: RFValue(10),
                margin: RFValue(5),
                alignSelf: 'center',
                justifyContent: 'center',
                borderRadius: 100,
                ...uiStyles.iosShadow,
              }}
              onPress={() => {
                if (value?.length > 1) {
                  setErrors(false);
                  onSendClick(value);
                  onChangeText('');
                } else {
                  setErrors(true);
                }
              }}
            >
              <InputMassageSendSvg height={RFValue(20)} width={RFValue(20)} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};
