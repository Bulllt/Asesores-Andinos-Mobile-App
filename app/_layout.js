import { useCallback } from "react";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Platform, Text } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { UserProvider } from "../hooks/userContext";

import { colors } from "../constants/colors";
const theme = {
  ...MD3LightTheme,
  fonts: {
    ...MD3LightTheme.fonts,
    default: {
      fontFamily: "Nunito-Regular",
    },
    // Labels
    labelSmall: {
      ...MD3LightTheme.fonts.labelSmall,
      fontFamily: "Nunito-Regular",
    },
    labelMedium: {
      ...MD3LightTheme.fonts.labelMedium,
      fontFamily: "Nunito-Regular",
    },
    labelLarge: {
      ...MD3LightTheme.fonts.labelLarge,
      fontFamily: "Nunito-Regular",
    },
    // Body
    bodySmall: {
      ...MD3LightTheme.fonts.bodySmall,
      fontFamily: "Nunito-Regular",
    },
    bodyMedium: {
      ...MD3LightTheme.fonts.bodyMedium,
      fontFamily: "Nunito-Regular",
    },
    bodyLarge: {
      ...MD3LightTheme.fonts.bodyLarge,
      fontFamily: "Nunito-Regular",
    },
  },
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.main,
    onSurfaceVariant: colors.placeholder,
    background: colors.white,
    error: colors.redError,
  },
  roundness: 10,
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const topInset = Math.min(insets.top, Platform.OS === "ios" ? 1 : insets.top);

  const [fontsLoaded] = useFonts({
    "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  } else {
    const oldTextRender = Text.render;
    Text.render = function (props, ref) {
      return oldTextRender.call(
        this,
        {
          ...props,
          style: [{ fontFamily: "Nunito-Regular" }, props.style],
        },
        ref
      );
    };
  }

  return (
    <PaperProvider theme={theme}>
      <UserProvider>
        <View
          style={{ flex: 1, paddingTop: topInset }}
          onLayout={onLayoutRootView}
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login/index" options={{ headerShown: false }} />
            <Stack.Screen name="home/index" options={{ headerShown: false }} />
            <Stack.Screen name="items/index" options={{ headerShown: false }} />
            <Stack.Screen
              name="engElectricalTools/index"
              options={{ headerShown: false }}
            />
          </Stack>
        </View>
        <StatusBar style="dark" />
      </UserProvider>
    </PaperProvider>
  );
}
