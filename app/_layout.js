import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
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
    error: colors.red,
  },
  roundness: 10,
};

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1, paddingTop: insets.top }}>
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
