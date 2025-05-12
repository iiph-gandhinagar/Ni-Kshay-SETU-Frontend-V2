import { EditSvg } from '@nikshay-setu-v3-monorepo/assets';
import {
  homePage4Gradient,
  uiStyles,
} from '@nikshay-setu-v3-monorepo/constants';
import { CustomRFValue as RFValue } from '@nikshay-setu-v3-monorepo/utils';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Column, Row } from '../commonComponents/row_column';
import { Card } from './MainCard';
import SkeletonLoader from './skeletonLoader';

// Define types for the props
interface AlgorithmSkeletonCardProps {
  containerStyle?: StyleProp<ViewStyle>;
  firstContainerStyle?: StyleProp<ViewStyle>;
}

export const AlgorithmSkeletonCard: React.FC<AlgorithmSkeletonCardProps> = ({
  containerStyle,
  firstContainerStyle = {
    height: RFValue(40),
    width: RFValue(40),
  },
}) => {
  return (
    <View
      style={[
        {
          marginVertical: RFValue(10),
          borderRadius: RFValue(10),
          elevation: RFValue(5),
          padding: RFValue(5),
          borderStartWidth: 0,
          backgroundColor: 'white',
          flexDirection: 'row',
          ...uiStyles.iosShadow,
        },
        containerStyle,
      ]}
    >
      <SkeletonLoader containerStyles={firstContainerStyle} />
      <View style={{ flex: 6 }}>
        <SkeletonLoader
          containerStyles={{
            height: RFValue(20),
          }}
        />
        <SkeletonLoader
          containerStyles={{
            height: RFValue(20),
            marginEnd: RFValue(50),
          }}
        />
      </View>
    </View>
  );
};
export const KnowledgeConnectSkeletonCard: React.FC<{
  colors: { WHITE_FFFF: string };
}> = ({ colors }) => {
  return (
    <Card.UniversalCard
      styleName='bgFFFMargin10PaddingV12paddingH24'
      style={{ backgroundColor: '#E9F1FF', ...uiStyles.iosShadow }}
    >
      <View>
        <View style={{ marginHorizontal: RFValue(50) }}>
          <SkeletonLoader
            containerStyles={{ flex: 2, height: RFValue(40) }}
            colors={['#E9F1FF', colors.WHITE_FFFF, '#E9F1FF']}
          />
        </View>
        {[1, 2, 9, 86, 9]?.map((v) => {
          return (
            <React.Fragment key={v + 'knowledgeConnectFragment'}>
              <SkeletonLoader
                key={v + 'SkeletonLoader1'}
                containerStyles={{ height: RFValue(30) }}
                colors={['#E9F1FF', colors.WHITE_FFFF, colors.WHITE_FFFF]}
              />
              <SkeletonLoader
                key={v + 'SkeletonLoader2'}
                containerStyles={{ height: RFValue(30) }}
                colors={[colors.WHITE_FFFF, '#E9F1FF', colors.WHITE_FFFF]}
              />
              <SkeletonLoader
                key={v + 'SkeletonLoader3'}
                containerStyles={{ height: RFValue(30) }}
                colors={[colors.WHITE_FFFF, colors.WHITE_FFFF, '#E9F1FF']}
              />
            </React.Fragment>
          );
        })}
      </View>
    </Card.UniversalCard>
  );
};
export const AssessmentSkeletonCard = () => {
  return (
    <Card.UniversalCard
      styleName='bgFFFMargin10PaddingV12paddingH24'
      style={uiStyles.iosShadow}
    >
      <View>
        <SkeletonLoader containerStyles={{ height: RFValue(30) }} />
        <SkeletonLoader containerStyles={{ height: RFValue(40) }} />
        <Row style={{ alignItems: 'center', height: RFValue(50), flex: 1 }}>
          <SkeletonLoader containerStyles={{ flex: 2, height: RFValue(40) }} />
          <SkeletonLoader containerStyles={{ flex: 2, height: RFValue(40) }} />
          <View style={{ flex: 1 }} />
        </Row>
        <SkeletonLoader
          containerStyles={{ borderRadius: RFValue(50), height: RFValue(50) }}
        />
      </View>
    </Card.UniversalCard>
  );
};

export const PluginSkeletonCard = ({ index }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: homePage4Gradient[index]?.[0] + '95',
        ...uiStyles.homeLinGradBox,
      }}
    >
      <EditSvg style={{ ...uiStyles.self_end, marginBottom: -RFValue(10) }} />
      <SkeletonLoader
        containerStyles={{ height: RFValue(40), width: '30%' }}
        colors={homePage4Gradient[index]}
      />
      <SkeletonLoader
        containerStyles={{ height: RFValue(20), width: '80%' }}
        colors={homePage4Gradient[index]}
      />
      <SkeletonLoader
        containerStyles={{ height: RFValue(15), width: '40%' }}
        colors={homePage4Gradient[index]}
      />
    </View>
  );
};
export const NewsSkeletonCard = () => {
  return (
    <Row
      style={{
        flex: 1,
        padding: RFValue(5),
        alignContent: 'center',
        margin: RFValue(5),
        elevation: RFValue(3),
        borderWidth: 1,
        borderColor: '#ffffff98',
        backgroundColor: 'white',
        borderRadius: RFValue(10),
        alignItems: 'center',
        ...uiStyles.iosShadow,
      }}
    >
      <View style={{ flex: 0.5 }}>
        <SkeletonLoader />
      </View>
      <View style={{ flex: 1 }}>
        <SkeletonLoader containerStyles={{ flex: 2 }} />
        <SkeletonLoader containerStyles={{ flex: 1 }} />
      </View>
    </Row>
  );
};
export const AccountSkeletonCard = () => {
  return (
    <Column
      style={[
        {
          borderColor: '#D9DBDB',
          borderWidth: 1,
          borderRadius: RFValue(10),
          paddingVertical: RFValue(10),
          flex: 1,
        },
      ]}
    >
      <Row style={{ marginHorizontal: RFValue(10), flex: 1 }}>
        <Column style={{ flex: 1 }}>
          <SkeletonLoader
            containerStyles={{
              flex: 1,
              height: RFValue(25),
              marginVertical: 0,
            }}
          />
          <SkeletonLoader containerStyles={{ flex: 1, height: RFValue(50) }} />
        </Column>
        <Column style={{ flex: 1 }}>
          <SkeletonLoader
            containerStyles={{
              flex: 1,
              height: RFValue(25),
              marginVertical: 0,
            }}
          />
          <SkeletonLoader containerStyles={{ flex: 1, height: RFValue(50) }} />
        </Column>
      </Row>
      <Column style={{ flex: 1, marginHorizontal: RFValue(10) }}>
        <SkeletonLoader containerStyles={{ height: RFValue(50) }} />
        <SkeletonLoader containerStyles={{ height: RFValue(50) }} />
      </Column>
    </Column>
  );
};
export const AccountScreenSkeletonCard = () => {
  return (
    <Column
      style={[
        {
          padding: RFValue(10),
          flex: 1,
        },
      ]}
    >
      <Column style={{ flex: 0.3, marginHorizontal: RFValue(10) }}>
        <SkeletonLoader containerStyles={{ height: RFValue(20) }} />
      </Column>

      <Row style={{ flex: 0.15, margin: RFValue(5) }}>
        <SkeletonLoader containerStyles={{ height: RFValue(30), flex: 3 }} />
        <SkeletonLoader containerStyles={{ height: RFValue(30) }} />
      </Row>

      <Column style={uiStyles?.flex1Margin10}>
        <AccountSkeletonCard />
      </Column>

      <Row style={{ flex: 0.15, margin: RFValue(5) }}>
        <SkeletonLoader containerStyles={{ height: RFValue(30), flex: 3 }} />
        <SkeletonLoader containerStyles={{ height: RFValue(30) }} />
      </Row>

      <Column style={{ flex: 1, marginHorizontal: RFValue(10) }}>
        <AccountSkeletonCard />
      </Column>
    </Column>
  );
};

export const MoreToolsSkeleton = () => {
  const MoreToolsCard = () => {
    return (
      <View
        style={{
          maxWidth: '32%',
          minWidth: '27%',
          height: RFValue(100),
          borderRadius: RFValue(10),
          margin: RFValue(5),
          opacity: 1,
          paddingTop: RFValue(10),
          elevation: 2,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          ...uiStyles.iosShadow,
        }}
      >
        <SkeletonLoader
          containerStyles={{
            height: RFValue(10),
            marginHorizontal: RFValue(10),
          }}
        />
        <SkeletonLoader containerStyles={{ height: RFValue(10), flex: 0.6 }} />
      </View>
    );
  };
  return [3, 2].map((v) => {
    return (
      <View
        key={'moreToolSkeleton-' + v}
        style={{ paddingHorizontal: RFValue(15), elevation: 4 }}
      >
        <View style={{ flex: 1, paddingHorizontal: RFValue(10) }}>
          <SkeletonLoader containerStyles={{ height: RFValue(25) }} />
        </View>
        <Row
          style={{
            flexWrap: 'wrap',
            backgroundColor: 'White',
            borderRadius: RFValue(10),
            padding: 7,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {Array.from({ length: v + 2 }).map((subItem, subKey) => {
            return <MoreToolsCard key={'MoreToolsCard-' + subKey} />;
          })}
        </Row>
      </View>
    );
  });
};

export const DelayedSkeletonLoaders = () => {
  return (
    <View style={{ width: '100%', flex: 1 }}>
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonLoader key={index} />
      ))}
    </View>
  );
};

export default DelayedSkeletonLoaders;

const styles = StyleSheet.create({});
