import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { Keyboard, PixelRatio, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export function filterObject<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  // Initialize an empty object to store the filtered results.
  const result: Partial<T> = {};

  // Iterate over each key in the provided object.
  for (const key in obj) {
    // Ensure the key's value is neither null, undefined, nor an empty string.
    if (obj[key] !== null && obj[key] !== '' && obj[key] !== undefined) {
      result[key] = obj[key]; // Include this key-value pair in the result object.
    }
  }

  return result; // Return the filtered object.
}

export function isEmpty(
  value: string | number | boolean | null | undefined | object | unknown[]
): boolean {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }
  if (typeof value === 'number' && isNaN(value)) {
    return true;
  }
  if (typeof value === 'boolean' && value === false) {
    return true;
  }
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  if (
    typeof value === 'object' &&
    value !== null &&
    Object.keys(value).length === 0
  ) {
    return true;
  }
  return false;
}
export const storeDataToAsyncStorage = async (key: string, value: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('storeDataToAsyncStorage error', e);
  }
};

export const getDataFromAsyncStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('getDataFromAsyncStorage error', e);
  }
};

export const removeItemFromAsyncStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('removeItemFromAsyncStorage error', e);
  }
};

type KeyboardListeners = {
  showListener: ReturnType<typeof Keyboard.addListener>;
  hideListener: ReturnType<typeof Keyboard.addListener>;
};

export function useKeyboardVisibility() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleKeyboardShow = useCallback(() => {
    setKeyboardVisible(true);
  }, []);

  const handleKeyboardHide = useCallback(() => {
    setKeyboardVisible(false);
  }, []);

  useEffect(() => {
    const keyboardListener: KeyboardListeners = Platform.select({
      ios: () => {
        const showListener = Keyboard.addListener(
          'keyboardWillShow',
          handleKeyboardShow
        );
        const hideListener = Keyboard.addListener(
          'keyboardWillHide',
          handleKeyboardHide
        );
        return { showListener, hideListener };
      },
      android: () => {
        const showListener = Keyboard.addListener(
          'keyboardDidShow',
          handleKeyboardShow
        );
        const hideListener = Keyboard.addListener(
          'keyboardDidHide',
          handleKeyboardHide
        );
        return { showListener, hideListener };
      },
      default: () => {
        const showListener = Keyboard.addListener(
          'keyboardDidShow',
          handleKeyboardShow
        );
        const hideListener = Keyboard.addListener(
          'keyboardDidHide',
          handleKeyboardHide
        );
        return { showListener, hideListener };
      },
    })();

    return () => {
      if (keyboardListener) {
        keyboardListener.showListener.remove();
        keyboardListener.hideListener.remove();
      }
    };
  }, [handleKeyboardShow, handleKeyboardHide]);

  return isKeyboardVisible;
}

export const generateSessionId = () => {
  const randomPart = () => Math.random().toString(36).substring(2, 15);
  const timePart = Date.now().toString(36);
  const extraRandomPart = () => Math.random().toString(36).substring(2, 15);

  return randomPart() + timePart + extraRandomPart();
};

export default useKeyboardVisibility;

type TransformationType =
  | 'capitalizeEachWord'
  | 'toUpperCase'
  | 'toLowerCase'
  | 'capitalizeFirstLetter'
  | 'toCamelCase'
  | 'toSnakeCase';

export const transformText = (
  text: string,
  transformationType: TransformationType
): string => {
  switch (transformationType) {
    case 'capitalizeEachWord':
      return text.replace(/\b\w/g, (char: string) => char.toUpperCase());
    case 'toUpperCase':
      return text.toUpperCase();
    case 'toLowerCase':
      return text.toLowerCase();
    case 'capitalizeFirstLetter':
      return text.charAt(0).toUpperCase() + text.slice(1);
    case 'toCamelCase':
      return text
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match: string, index: number) =>
          index === 0 ? match.toLowerCase() : match.toUpperCase()
        )
        .replace(/\s+/g, '');
    case 'toSnakeCase':
      return text
        .replace(/\W+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .map((word: string) => word.toLowerCase())
        .join('_');
    default:
      return text;
  }
};

function parseDate(dateString: string): Date {
  return new Date(dateString);
}
export function timeAgo(date: string): string {
  const now = new Date();
  const seconds = Math.floor(
    (now.getTime() - parseDate(date).getTime()) / 1000
  );
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} sec ago`;
  } else if (minutes < 60) {
    return `${minutes} min ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (days < 365) {
    const months = Math.floor(days / 30);
    return `${months} months ago`;
  } else {
    const years = Math.floor(days / 365);
    return `${years} years ago`;
  }
}

export const convertTo12HourFormat = (dateString: string): string => {
  const date = new Date(dateString);

  let hours = date.getHours();
  const minutes = date.getMinutes();

  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12 for 12 AM/PM

  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutesStr} ${amPm}`;
};

export function logInfo(api: string, body: object, req: string, res: object) {
  // Define ANSI escape codes for colors
  const reset = '\x1b[0m';
  const blue = '\x1b[34m';
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const red = '\x1b[31m';
  const unknown = '\x1b[1m\x1b[1;36m';
  const whiteBackground = '\x1b[1m\x1b[1;36m\x1b'; // White background

  // Define a border and padding for visual separation
  const border = `${blue}${'-'.repeat(50)}${reset}`;
  const header = `${whiteBackground}${green}API:${reset} ${green}${api}${reset}`;
  const bodyContent = `${whiteBackground}${yellow}Body:${reset} ${yellow}${JSON.stringify(
    body,
    null,
    2
  )}${reset}`;
  const resContent = `${whiteBackground}${unknown}Response:${reset} ${unknown}${JSON.stringify(
    res,
    null,
    2
  )}${reset}`;
  const request = `${whiteBackground}${red}Request:${reset} ${red}${req}${reset}`;

  const logMessage = `
  ${border}
  ${header}
  ${border}
  ${bodyContent}
  ${border}
  ${request}
  ${border}
  ${resContent}
  ${border}
  `;

  if (Platform.OS === 'android') {
    console.log(logMessage);
  }
}

export function useCountdown(timeInMinutes: number) {
  const [formattedTime, setFormattedTime] = useState<string>(''); // State to hold the formatted time

  useEffect(() => {
    const endTime = Date.now() + timeInMinutes * 60 * 1000; // Calculate end time

    function updateCountdown() {
      const remainingTimeInSeconds = Math.max(
        0,
        Math.floor((endTime - Date.now()) / 1000)
      ); // Calculate remaining time

      const hours = Math.floor(remainingTimeInSeconds / 3600);
      const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
      const seconds = remainingTimeInSeconds % 60;

      const formatted = `${hours}h ${minutes}m ${seconds}s`;
      setFormattedTime(formatted); // Update the state with the formatted time

      if (remainingTimeInSeconds > 0) {
        // Call the function again after 1 second
        setTimeout(updateCountdown, 1000);
      }
    }

    updateCountdown(); // Start the countdown when the component mounts

    return () => {
      setFormattedTime(''); // Clean up when the component unmounts (optional)
    };
  }, [timeInMinutes]);

  return formattedTime; // Return the current formatted time
}
type KeyValuePair = [string, string | number | boolean | null | undefined];

export const generateQueryString = (
  ...keyValuePairs: KeyValuePair[]
): string => {
  const queryParams: Record<string, string | number | boolean> = {};

  keyValuePairs.forEach(([key, value]) => {
    if (
      key !== '' &&
      key !== null &&
      key !== undefined &&
      value !== '' &&
      value !== null &&
      value !== undefined &&
      value !== false
    ) {
      queryParams[key] = value;
    }
  });

  const queryString = Object.keys(queryParams)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
    )
    .join('&');

  return queryString ? '?' + queryString : '';
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function ToastMessage(message: string) {
  const ToastAndroid = require('react-native').ToastAndroid;

  if (Platform?.OS === 'android')
    ToastAndroid.showWithGravityAndOffset(
      message || '--',
      ToastAndroid.TOP,
      ToastAndroid.TOP,
      30,
      60
    );
}

export const handleLogout = async (callback: (status: number) => void) => {
  try {
    await removeItemFromAsyncStorage('token');
    await removeItemFromAsyncStorage('userId');
    await removeItemFromAsyncStorage('lang');
    await removeItemFromAsyncStorage('goal');
    await removeItemFromAsyncStorage('pluginOrder');
    await removeItemFromAsyncStorage('notification_token');
    callback(200);
  } catch (error) {
    callback(400);
    console.error('Error during logout:', error);
  }
};
export function updateValueInState<T>(obj: T, key: string, value: unknown): T {
  const updatedObj = JSON.parse(JSON.stringify(obj));
  function recursiveUpdate(o: Record<string, unknown>): boolean {
    for (const k in o) {
      if (k === key) {
        o[k] = value;
        return true; // Key found and value updated
      } else if (typeof o[k] === 'object' && o[k] !== null) {
        const found = recursiveUpdate(o[k] as Record<string, unknown>);
        if (found) return true; // Key found in nested object
      }
    }
    return false; // Key not found
  }

  recursiveUpdate(updatedObj); // Perform the update
  return updatedObj; // Return the updated state
}

export function getFileExtension(url: string) {
  const parts = url.split('.');
  return parts[parts.length - 1];
}

export function numberRange(no: number) {
  if (no > 0 && no < 10000) {
    return no;
  } else if (no > 9999 && no < 100000) {
    return (no / 1000).toFixed(1) + 'K+';
  } else if (no > 99999 && no < 10000000) {
    return (no / 100000).toFixed(1) + 'L+';
  } else if (no > 9999999 && no < 1000000000) {
    return (no / 10000000).toFixed(0) + 'Cr+';
  }
  return '0';
}

const scaleFactor = 1.3;
export const CustomRFValue = (size: number, standardScreenHeight = 1000) => {
  const adjustedSize = RFValue(size, standardScreenHeight);
  return (adjustedSize * scaleFactor) / PixelRatio.getFontScale(); // Normalize font scaling
};

export const useCallRestriction = () => {
  const [callTimestamps, setCallTimestamps] = useState<number[]>([]);

  const makeCall = (callback: () => void) => {
    const now = Date.now();
    const fiveMinutesAgo = now - 1 * 60 * 1000;

    // Filter out timestamps older than 5 minutes
    const recentCalls = callTimestamps.filter((time) => time > fiveMinutesAgo);

    if (recentCalls.length >= 4) {
      console.warn(
        'Call limit reached! Please wait before making another call.'
      );
      ToastMessage('Too Many Requests\nPlease try again later');
      return;
    }

    // Add the new call timestamp
    setCallTimestamps([...recentCalls, now]);

    // Execute the call function
    callback();
  };

  return { makeCall };
};
