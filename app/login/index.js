import React from "react";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";

export default function welcomeScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>This is the login page</Text>
    </View>
  );
}
