import { AppConfigType, fontStyles } from '@nikshay-setu-v3-monorepo/constants';
import { HealthFacility } from '@nikshay-setu-v3-monorepo/types';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DirectionsSvg, LocationSvg } from '../../../../../shared/assets/src';
import Button from '../buttons/primaryButtons';
import { Row } from '../commonComponents/row_column';

// Define constants
const COLORS = {
  white: '#FFFFFF',
  primary: '#394F89',
  green: '#008000',
  lightGray: '#F3F5F6',
  borderGray: '#F3F5F1',
};

interface FacilityProps {
  hospitalName: string;
  appTranslations: AppConfigType;
  locations: string[];
  item: HealthFacility;
  onDirectionPress: () => void;
}

// Reusable FacilityBadge Component
const FacilityBadge: React.FC<{ facility: string }> = ({ facility }) => (
  <Row style={styles.facilityBadge}>
    <Text style={fontStyles.Maison_400_12PX_16LH}>{facility}</Text>
  </Row>
);

// Reusable LocationBadge Component
const LocationBadge: React.FC<{ location: string }> = ({ location }) => (
  <Row style={styles.locationBadge}>
    <LocationSvg
      height={RFValue(12)}
      width={RFValue(12)}
      style={styles.locationIcon}
    />
    <Text style={fontStyles.Maison_500_11PX_13LH}>{location}</Text>
  </Row>
);

const FacilityCard: React.FC<FacilityProps> = ({
  hospitalName,
  locations,
  appTranslations,
  item,
  onDirectionPress,
}) => {
  const facilitiesArray = Object.entries(item)
    .filter(([key, value]) => value && typeof value === 'boolean') // Keep only truthy boolean values
    .map(([key]) => key); // Extract the keys as the facility names

  return (
    <View style={styles.cardContainer}>
      <Text style={[styles.hospitalName, fontStyles.Maison_400_14PX_17LH]}>
        {hospitalName}
      </Text>

      <Row style={styles.rowContainer}>
        {locations.map((location, index) => (
          <LocationBadge key={index} location={location} />
        ))}
      </Row>

      <Text style={[styles.facilitiesHeader, fontStyles.Maison_500_12PX_15LH]}>
        {appTranslations?.REFERRAL_AVAILABLE_FACILITIES}
      </Text>

      <Row style={styles.rowContainer}>
        {facilitiesArray.map((facility, index) => (
          <FacilityBadge key={index} facility={facility} />
        ))}
      </Row>

      <Button
        onPress={onDirectionPress}
        title={appTranslations?.REFERRAL_DIRECTIONS}
        textStyle={fontStyles.Maison_500_13PX_20LH}
        bgColor={COLORS.primary}
        containerStyle={styles.buttonContainer}
        leftIcon={<DirectionsSvg />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: RFValue(15),
    padding: RFValue(10),
    marginBottom: RFValue(10),
  },
  hospitalName: {
    marginVertical: RFValue(5),
    color: COLORS.primary,
  },
  rowContainer: {
    flex: 1,
    flexWrap: 'wrap',
    marginTop: RFValue(5),
  },
  facilitiesHeader: {
    color: COLORS.green,
  },
  locationBadge: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    margin: RFValue(5),
    alignSelf: 'flex-start',
    padding: RFValue(5),
    borderRadius: RFValue(10),
    paddingHorizontal: RFValue(10),
  },
  locationIcon: {
    paddingHorizontal: RFValue(5),
  },
  facilityBadge: {
    alignItems: 'center',
    borderWidth: RFValue(2),
    margin: RFValue(5),
    borderColor: COLORS.borderGray,
    alignSelf: 'flex-start',
    padding: RFValue(5),
    borderRadius: RFValue(10),
  },
  buttonContainer: {
    marginTop: RFValue(10),
    padding: RFValue(10),
  },
});

export default FacilityCard;
