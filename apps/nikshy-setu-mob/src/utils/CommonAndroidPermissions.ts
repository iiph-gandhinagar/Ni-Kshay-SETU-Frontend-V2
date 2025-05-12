import {
  Alert,
  Linking,
  Permission,
  PermissionsAndroid,
  Platform,
} from 'react-native';

// Enum for permission status
export enum PermissionStatus {
  GRANTED = 'granted',
  DENIED = 'denied',
  ERROR = 'error',
}

// Enum for permission types
export enum PermissionType {
  NOTIFICATION = 'Notification',
  STORAGE = 'Storage',
  CAMERA = 'Camera',
  WRITE_STORAGE = 'Write Storage',
  READ_STORAGE = 'Read Storage',
  MICROPHONE = 'Microphone',
}

// Function to show permission denied alert with the option to go to settings
const showPermissionDeniedAlert = (permissionName: PermissionType): void => {
  Alert.alert(
    `${permissionName} Permission Denied`,
    `This app requires ${permissionName} permission to function properly. You can enable it in the app settings.`,
    [
      {
        text: 'Go to Settings',
        onPress: () => Linking.openSettings(),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
    { cancelable: false },
  );
};

const requestPermission = async (
  permission: Permission,
  permissionName: PermissionType,
): Promise<PermissionStatus> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(permission);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return PermissionStatus.GRANTED;
      } else if (granted === 'never_ask_again') {
        return PermissionStatus.DENIED;
      } else {
        showPermissionDeniedAlert(permissionName);
        return PermissionStatus.DENIED;
      }
    } catch (err) {
      console.warn(`Failed to request ${permissionName} permission`, err);
      showPermissionDeniedAlert(permissionName);
      return PermissionStatus.ERROR;
    }
  }
  return PermissionStatus.GRANTED; // Default to granted on non-Android platforms
};

// Request notification permission (for Android 13 and above)
export const requestNotificationPermission =
  async (): Promise<PermissionStatus> => {
    if (Platform.OS === 'android') {
      return requestPermission(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        PermissionType.NOTIFICATION,
      );
    }
    return PermissionStatus.GRANTED;
  };

// Request storage permission (read + write) for image downloads/uploads
export const requestStoragePermission = async (): Promise<PermissionStatus> => {
  if (Platform.OS === 'android') {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ];
    const granted = await PermissionsAndroid.requestMultiple(permissions);
    const isGranted =
      granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
        PermissionsAndroid.RESULTS.GRANTED;
    if (isGranted) {
      return PermissionStatus.GRANTED;
    } else {
      showPermissionDeniedAlert(PermissionType.STORAGE);
      return PermissionStatus.DENIED;
    }
  }
  return PermissionStatus.GRANTED;
};

// Request camera permission for image upload or taking pictures
export const requestCameraPermission = async (): Promise<PermissionStatus> => {
  if (Platform.OS === 'android') {
    return requestPermission(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionType.CAMERA,
    );
  }
  return PermissionStatus.GRANTED;
};

// Request write storage permission specifically
export const requestWriteStoragePermission =
  async (): Promise<PermissionStatus> => {
    if (Platform.OS === 'android') {
      return requestPermission(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionType.WRITE_STORAGE,
      );
    }
    return PermissionStatus.GRANTED;
  };

// Request read storage permission specifically
export const requestReadStoragePermission =
  async (): Promise<PermissionStatus> => {
    if (Platform.OS === 'android') {
      return requestPermission(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionType.READ_STORAGE,
      );
    }
    return PermissionStatus.GRANTED;
  };

// Request microphone permission for speech recognition
export const requestMicrophonePermission =
  async (): Promise<PermissionStatus> => {
    if (Platform.OS === 'android') {
      return requestPermission(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionType.MICROPHONE, // Add Microphone to PermissionType
      );
    }
    return PermissionStatus.GRANTED;
  };
