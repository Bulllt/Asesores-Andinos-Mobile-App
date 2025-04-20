import { Dimensions, Platform, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");

const statusBarHeight =
  Platform.OS === "ios" ? 20 : StatusBar.currentHeight || 24;

export const wp = (percentage) => (percentage * width) / 100;
export const hp = (percentage) => (percentage * height) / 100;

export const getStatusBarHeight = () => statusBarHeight;
