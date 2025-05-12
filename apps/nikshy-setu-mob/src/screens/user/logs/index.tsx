import { ScreenProps } from '@nikshay-setu-v3-monorepo/types';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const LogsScreen: React.FC<ScreenProps<'logsScreen'>> = ({
  navigation,
  route,
}) => {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const info = {
          // Basic Device Info
          uniqueId: await DeviceInfo.getUniqueId(),
          baseUrl: process.env.NX_PUBLIC_BASE_URL,
          deviceId: await DeviceInfo.getDeviceId(),
          systemName: await DeviceInfo.getSystemName(),
          systemVersion: await DeviceInfo.getSystemVersion(),
          brand: await DeviceInfo.getBrand(),
          model: await DeviceInfo.getModel(),
          appVersion: await DeviceInfo.getVersion(),
          buildNumber: await DeviceInfo.getBuildNumber(),
          bundleId: await DeviceInfo.getBundleId(),
          isEmulator: await DeviceInfo.isEmulator(),
          isTablet: await DeviceInfo.isTablet(),
          manufacturer: await DeviceInfo.getManufacturer(),
          userAgent: await DeviceInfo.getUserAgent(),
          ipAddress: await DeviceInfo.getIpAddress(),
          macAddress: await DeviceInfo.getMacAddress(),

          // Battery Info
          batteryLevel: await DeviceInfo.getBatteryLevel(),
          isBatteryCharging: await DeviceInfo.isBatteryCharging(),

          // Storage Info
          totalMemory: await DeviceInfo.getTotalMemory(),
          maxMemory: await DeviceInfo.getMaxMemory(),
          usedMemory: await DeviceInfo.getUsedMemory(),

          // Network Info
          carrier: await DeviceInfo.getCarrier(),
          isLocationEnabled: await DeviceInfo.isLocationEnabled(),
        };
        setDeviceInfo(info);
      } catch (error) {
        console.error('Error fetching device info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeviceInfo();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#0000ff' />
        <Text style={styles.loadingText}>Loading device information...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Device & Debug Information</Text>
      {deviceInfo &&
        Object.entries(deviceInfo).map(([key, value]) => (
          <View key={key} style={styles.infoRow}>
            <Text style={styles.infoKey}>{key}:</Text>
            <Text style={styles.infoValue}>{JSON.stringify(value)}</Text>
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoKey: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    flex: 1,
    color: '#777',
  },
});
