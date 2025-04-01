import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function welcomeScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>This is the welcome page</Text>
      <Text>This is the welcome page</Text>
      <Text>This is the welcome page</Text>
      <Text>This is the welcome page</Text>
      <Text>This is the welcome page</Text>
      <Text>This is the welcome page</Text>
      <TouchableOpacity onPress={() => router.push("home")}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
}
