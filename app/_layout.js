import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Platform } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { colors } from "../constants/colors";
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.main,
    onSurfaceVariant: colors.placeholder,
    background: colors.white,
    error: colors.redError,
  },
  roundness: 10,
};

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const topInset = Math.min(insets.top, Platform.OS === 'ios' ? 1 : insets.top);

  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1, paddingTop: topInset}}>
      
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login/index" options={{ headerShown: false }} />
          <Stack.Screen name="home/index" options={{ headerShown: false }} />
          <Stack.Screen name="items/index" options={{ headerShown: false }} />
        </Stack>
      </View>
      <StatusBar style="dark" />
    </PaperProvider>
  );
}
