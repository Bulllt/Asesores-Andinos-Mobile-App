import React from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { Modal, Portal, Card, Button } from "react-native-paper";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { wp, hp } from "../constants/device";
import { colors } from "../constants/colors";

export function HomeModal({ visible, onDismiss, modalTitle, icon }) {
  const router = useRouter();

  const cards = [
    {
      title: "Productos más utilizados",
      icon: "star-circle",
      quantity: "24",
      route: "most-used-products",
      color: colors.yellow,
      background: colors.yellowBackground,
    },
    {
      title: "Productos fuera de servicio",
      icon: "alert-circle",
      quantity: "5",
      route: "out-of-service-products",
      color: colors.green,
      background: colors.greenBackground,
    },
    {
      title: "Productos bajo stock",
      icon: "trending-down",
      quantity: "12",
      route: "low-stock-products",
      color: colors.blue,
      background: colors.blueBackground,
    },
    {
      title: "Productos próximos a caducar",
      icon: "clock-alert",
      quantity: "8",
      route: "expiring-products",
      color: colors.red,
      background: colors.redBackground,
    },
  ];
  const handleCardPress = (route) => {
    router.push(route);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={style.modalContainer}
        theme={{ colors: { backdrop: "transparent" } }}
      >
        <View style={style.homeModalContainer}>
          <Button
            mode="contained"
            onPress={onDismiss}
            rippleColor={colors.gray}
            style={[
              style.homeModalTitleButton,
              modalTitle == "Mantenimiento Industrial"
                ? { width: wp(57) }
                : { width: wp(40) },
            ]}
            contentStyle={style.homeModalTitleButtonContent}
            labelStyle={style.homeModalTitleButtonText}
            icon={icon}
          >
            {modalTitle}
          </Button>

          {cards.map((card, index) => (
            <Card
              key={index}
              style={style.card}
              onPress={() => handleCardPress(card.route)}
              mode="elevated"
            >
              <Card.Content style={style.cardContent}>
                <View
                  style={[
                    style.cardIconContainer,
                    { backgroundColor: card.background },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={card.icon}
                    size={wp(8)}
                    color={card.color}
                  />
                </View>

                <View style={style.cardTextContainer}>
                  <Text style={style.cardQuantity}>{card.quantity}</Text>
                  <Text style={style.cardTitle}>{card.title}</Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </Modal>
    </Portal>
  );
}

const style = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0,
  },
  homeModalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F8",
    width: wp(100),
  },

  homeModalTitleButton: {
    height: hp(6),
    justifyContent: "center",
    borderRadius: wp(2),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.main,
    marginBottom: hp(1),
    marginLeft: wp(5),
    alignSelf: "flex-start",
  },
  homeModalTitleButtonContent: {
    height: "100%",
  },
  homeModalTitleButtonText: {
    color: colors.main,
    fontSize: wp(3.5),
  },

  card: {
    borderRadius: wp(4),
    backgroundColor: colors.white,
    marginBottom: hp(5),
    width: wp(90),
    height: hp(12),
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIconContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp(5),
  },
  cardTextContainer: {
    flex: 1,
  },
  cardQuantity: {
    fontSize: wp(6),
    fontFamily: "Nunito-Bold",
    color: colors.black,
    marginBottom: hp(1),
  },
  cardTitle: {
    fontSize: wp(4),
    color: colors.black,
  },
});
