import {
  RootStackParamGuestList,
  ThemeProps,
} from '@nikshay-setu-v3-monorepo/types';
import { useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BoardingScreen } from '../screens/guest/onboarding';
import { TourScreen } from '../screens/guest/tourScreen';

const Stack = createNativeStackNavigator<RootStackParamGuestList>();

export const AppNavigationGuest = () => {
  const theme = useTheme() as ThemeProps;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        contentStyle: { backgroundColor: theme.colors.WHITE_FFFF },
      }}
      initialRouteName='tourScreen'
    >
      <Stack.Screen
        name='tourScreen'
        component={TourScreen}
        options={{
          headerShown: false,
        }}
        initialParams={{ theme }}
      />
      <Stack.Screen
        name='logIn'
        component={BoardingScreen}
        options={{
          headerShown: false,
        }}
        initialParams={{ theme }}
      />
    </Stack.Navigator>
  );
};
