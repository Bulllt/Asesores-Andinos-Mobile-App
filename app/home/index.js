import React, { useState } from "react";
import { View, Text, ImageBackground, Platform } from "react-native";
import { Card } from "react-native-paper";
import { CurvedTop } from "../../components/curvedTop";
import { Navbar } from "../../components/navbar";
import { HomeModal } from "../../components/homeModal";

import style from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { wp } from "../../constants/device";
import { colors } from "../../constants/colors";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const IOS = Platform.OS === "ios";
  const height = IOS ? 86 : 90;

  const cards = [
    {
      title: "INGENIERIA ELECTRICA",
      icon: "lightning-bolt-circle",
      modalTitle: "Ingeniería Eléctrica",
    },
    {
      title: "MANTENIMIENTO INDUSTRIAL",
      icon: "tools",
      modalTitle: "Mantenimiento Industrial",
    },
    {
      title: "TRABAJOS EN ALTURA",
      icon: "account-hard-hat",
      modalTitle: "Trabajos en Altura",
    },
    {
      title: "OBRAS CIVILES",
      icon: "home-city",
      modalTitle: "Obras Civiles",
    },
    {
      title: "CAPACITACIONES",
      icon: "school",
      modalTitle: "Capacitaciones",
    },
  ];

  const handleCardPress = (card) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={style.homeBackground}
      >
        <View style={style.homeCurvedBackground}>
          <CurvedTop
            color={"#F5F5F8"}
            width={100}
            height={height}
            depth={0.1}
          />
        </View>
      </ImageBackground>

      <Navbar activeRoute={"home"} />

      <View style={style.titleContainer}>
        <Text style={style.titleText}>Inicio</Text>
      </View>

      <View style={style.homeContainer}>
        {cards.map((card, index) => (
          <Card
            key={index}
            style={style.homeCard}
            onPress={() => handleCardPress(card)}
          >
            <Card.Content style={style.homeCardContent}>
              <MaterialCommunityIcons
                name={card.icon}
                size={wp(10)}
                color={colors.main}
              />
              <Text style={style.homeCardText}>{card.title}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      <HomeModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        modalTitle={selectedCard?.modalTitle}
        icon={selectedCard?.icon}
      />
    </View>
  );
}
