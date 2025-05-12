import { fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import {
  DropDownPropsNew,
  MultiSelectProps,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import {
  CustomRFValue as RFValue,
  transformText,
} from '@nikshay-setu-v3-monorepo/utils';
import { useTheme } from '@react-navigation/native';
import { useRef } from 'react';
import { Platform, Text, View } from 'react-native';
import {
  Dropdown,
  IDropdownRef,
  IMultiSelectRef,
  MultiSelect,
} from 'react-native-element-dropdown';
import { InputContainer } from './inputContainer';

export const _DropDown: React.FC<DropDownPropsNew> = ({
  placeholder,
  search = false,
  value = '',
  options,
  onChange,
  onBlur,
  onTouched,
  error,
  touched,
  disable,
  labelStyles,
  isRequired = false,
  containerStyle,
  placeholderStyle,
  label,
  dropdownPosition = 'auto',
}) => {
  const ref = useRef<null | IDropdownRef>(null);
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
  const { colors } = useTheme() as ThemeProps;
  return (
    <InputContainer
      error={error}
      touched={touched}
      isRequired={isRequired}
      label={label}
      onPressContainer={() => {
        if (ref.current) {
          ref.current.open();
        }
      }}
      labelStyles={labelStyles}
      containerStyle={containerStyle}
    >
      <Dropdown
        ref={ref}
        onFocus={onTouched}
        key={label}
        style={[
          {
            paddingVertical: RFValue(4),
          },
          Platform.OS === 'android' && { height: RFValue(45) },
        ]}
        disable={disable}
        placeholderStyle={
          (placeholderStyle && placeholderStyle) || {
            fontSize: RFValue(15),
            color: '#808080',
            // opacity: 0.7,
          }
        }
        search={search}
        searchPlaceholder={'Search ' + label + '...'}
        dropdownPosition={dropdownPosition}
        selectedTextStyle={{ fontSize: RFValue(15) }}
        data={options}
        onBlur={onBlur}
        maxHeight={RFValue(300)}
        containerStyle={{
          // bottom: RFValue(40),
          elevation: 10,
          shadowColor: colors.BLACK_000000,
          borderBottomLeftRadius: RFValue(10),
          borderBottomRightRadius: RFValue(10),
        }}
        labelField='label'
        valueField='value'
        value={value}
        placeholder={transformText(
          (placeholder && placeholder) || `Select ${label}`,
          'capitalizeEachWord'
        )}
        onChange={onChange}
        renderItem={renderItem}
      />
    </InputContainer>
  );
};

export const _MultiSelectDropDown: React.FC<MultiSelectProps> = ({
  placeholder,
  value = [],
  options,
  onChange,
  onBlur,
  onTouched,
  error,
  touched,
  disable,
  labelStyles,
  containerStyle,
  label,
}) => {
  const ref = useRef<null | IMultiSelectRef>(null);
  const { colors } = useTheme() as ThemeProps;
  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };
  return (
    <InputContainer
      error={error}
      touched={touched}
      label={label}
      onPressContainer={() => {
        if (ref.current) {
          ref.current.open();
        }
      }}
      labelStyles={labelStyles}
      containerStyle={containerStyle}
    >
      <MultiSelect
        ref={ref}
        style={{
          // height: RFValue(45),
          paddingVertical: RFValue(4),
        }}
        disable={disable}
        onFocus={onTouched}
        placeholderStyle={{
          fontSize: RFValue(15),
          color: '#808080',
          opacity: 0.4,
        }}
        dropdownPosition='auto'
        selectedTextStyle={{
          fontSize: RFValue(15),
        }}
        data={options}
        onBlur={handleBlur}
        maxHeight={300}
        containerStyle={{
          elevation: 10,
          shadowColor: colors.BLACK_000000,
          borderBottomLeftRadius: RFValue(10),
          borderBottomRightRadius: RFValue(10),
        }}
        labelField='label'
        valueField='value'
        value={value}
        placeholder={transformText(
          (placeholder && placeholder) || `Select ${label}`,
          'capitalizeEachWord'
        )}
        onChange={onChange}
        // renderItem={renderItem}
      />
    </InputContainer>
  );
};
