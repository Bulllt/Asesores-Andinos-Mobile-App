import { PaperProvider } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <PaperProvider>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login/index" options={{ headerShown: false }} />
          <Stack.Screen name="home/index" options={{ headerShown: false }} />
        </Stack>
      </View>
      <StatusBar style="dark" />
    </PaperProvider>
  );
}
