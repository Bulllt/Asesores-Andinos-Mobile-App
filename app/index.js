import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, ImageBackground } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import { UseUser } from "../hooks/userContext";

import style from "./style";
import LogoWhite from "../assets/images/logo-white.svg";
import { wp } from "../constants/device";
import { colors } from "../constants/colors";

export default function WelcomeScreen() {
  const router = useRouter();
  const { user, loadUser, isLoading } = UseUser();

  useEffect(() => {
    loadUser();
  }, []);

  if (isLoading) {
    return (
      <ImageBackground
        source={require("../assets/images/background.png")}
        blurRadius={2}
        style={style.welcomeBackground}
      >
        <View style={style.welcomeContainer}>
          <View style={style.welcomeLogo}>
            <LogoWhite width="100%" height="100%" />
          </View>

          <Text style={style.welcomeTitle}>
            Cargando{" "}
            <ActivityIndicator
              animating={true}
              color={colors.white}
              size={wp(8)}
            />
          </Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={style.welcomeBackground}
    >
      <View style={style.welcomeContainer}>
        <View style={style.welcomeLogo}>
          <LogoWhite width="100%" height="100%" />
        </View>

        <Text style={style.welcomeTitle}>¡BIENVENIDO!</Text>

        <Button
          mode="contained"
          onPress={() => router.push(user ? "home" : "login")}
          style={style.welcomeButton}
          contentStyle={style.welcomeButtonContent}
          labelStyle={style.welcomeButtonText}
          icon={user ? "home" : "login"}
        >
          {user ? "INICIO" : "ACCEDER"}
        </Button>
      </View>
    </ImageBackground>
  );
}
