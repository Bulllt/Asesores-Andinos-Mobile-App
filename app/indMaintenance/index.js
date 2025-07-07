import React from "react";
import { View, Text, ImageBackground, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Card, IconButton } from "react-native-paper";
import { CurvedTop } from "../../components/curvedTop";
import { Navbar } from "../../components/navbar";

import style from "./style";
import { FontAwesome6 } from "@expo/vector-icons";
import { wp } from "../../constants/device";
import { colors } from "../../constants/colors";

export default function IndMaintenaceScreen() {
  const router = useRouter();
  const IOS = Platform.OS === "ios";
  const height = IOS ? 86 : 90;

  const cards = [
    {
      title: "Herramientas",
      icon: "toolbox",
      route: "indMaintenanceTools",
    },
    {
      title: "Materiales",
      icon: "trowel-bricks",
      route: "asd",
    },
    {
      title: "Equipo EPP",
      icon: "helmet-safety",
      route: "asd",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={style.hubBackground}
      >
        <View style={style.hubCurvedBackground}>
          <CurvedTop
            color={"#F5F5F8"}
            width={100}
            height={height}
            depth={0.1}
          />
        </View>
      </ImageBackground>

      <Navbar activeRoute={"indMaintenance"} />

      <View style={style.titleContainer}>
        <IconButton
          icon="arrow-left"
          iconColor={colors.black}
          size={wp(8)}
          onPress={() => router.back()}
          style={style.titleIcon}
        />
        <View style={style.titleCenterContainer}>
          <Text style={style.titleText}>Mantenimiento Industrial</Text>
        </View>
        <View style={{ width: wp(8) }} />
      </View>

      <View style={style.hubContainer}>
        {cards.map((card, index) => (
          <Card
            key={index}
            style={style.card}
            onPress={() => router.push(card.route)}
            mode="elevated"
          >
            <Card.Content style={style.cardContent}>
              <FontAwesome6
                name={card.icon}
                size={wp(10)}
                color={colors.gray}
              />

              <Text style={style.cardTitle}>{card.title}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
}
