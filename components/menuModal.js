import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import {
  Modal,
  Portal,
  Text,
  List,
  Divider,
  TouchableRipple,
} from "react-native-paper";
import { wp, hp } from "../constants/device";
import { colors } from "../constants/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export function MenuModal({ visible, onDismiss, activeRoute }) {
  const router = useRouter();

  const [expandedItems, setExpandedItems] = useState({
    productos: false,
    inventario: false,
  });

  const toggleItem = (item) => {
    setExpandedItems((prev) => {
      const newState = { productos: false, inventario: false };
      newState[item] = !prev[item];
      return newState;
    });
  };

  const menuItems = [
    {
      title: "Inicio",
      icon: "home",
      route: "home",
      children: null,
    },
    {
      title: "Productos",
      icon: "package-variant",
      route: null,
      children: [
        { title: "Lista de productos", route: "items" },
        { title: "Lista de categorías", route: "categories" },
        { title: "Lista de marcas", route: "1" },
        { title: "Imprimir QR", route: "2" },
      ],
    },
    {
      title: "Inventario",
      icon: "package-variant-closed",
      route: null,
      children: [
        { title: "Ingeniería eléctrica", route: "engElectrical" },
        { title: "Mantenimiento industrial", route: "indMaintenance" },
        { title: "Trabajos en altura", route: "workAtHeight" },
        { title: "Obras civiles", route: "5" },
        { title: "Capacitaciones", route: "6" },
      ],
    },
    {
      title: "Órdenes de salida",
      icon: "cart",
      route: "outboundOrder",
      children: null,
    },
    {
      title: "Escanear",
      icon: "qrcode-scan",
      route: "barcodeScan",
      children: null,
    },
  ];

  const isActive = (route) => {
    if (activeRoute === route) return true;
    if (route === "engElectrical" && activeRoute.startsWith("engElectrical")) {
      return true;
    }

    return false;
  };
  const hasActiveChild = (children) =>
    children?.some(
      (child) =>
        isActive(child.route) ||
        (child.children && hasActiveChild(child.children))
    );

  const handleNavigation = (route) => {
    if (route) {
      router.push(route);
      onDismiss();
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
        theme={{ colors: { backdrop: "transparent" } }}
      >
        <View style={styles.modal}>
          <View style={styles.container}>
            <Text style={styles.title}>MENÚ</Text>

            <Divider style={styles.divider} />

            <View style={styles.scrollContainer}>
              <List.Section style={styles.listSection}>
                {menuItems.map((item) => {
                  const itemKey = item.title.toLowerCase();
                  const isItemActive = isActive(item.route);
                  const itemHasActiveChild = hasActiveChild(item.children);
                  const isExpanded = expandedItems[itemKey];

                  return (
                    <React.Fragment key={item.title}>
                      <TouchableRipple
                        onPress={() =>
                          item.children
                            ? toggleItem(itemKey)
                            : handleNavigation(item.route)
                        }
                        style={[
                          styles.item,
                          (isItemActive || itemHasActiveChild) &&
                            styles.activeItem,
                        ]}
                        rippleColor={colors.main}
                        borderless={true}
                      >
                        <View style={styles.itemContent}>
                          <MaterialCommunityIcons
                            name={item.icon}
                            color={
                              isItemActive || itemHasActiveChild
                                ? colors.white
                                : colors.gray
                            }
                            size={wp(6)}
                          />

                          <Text
                            style={[
                              styles.itemText,
                              (isItemActive || itemHasActiveChild) &&
                                styles.activeText,
                            ]}
                          >
                            {item.title}
                          </Text>

                          {item.children && (
                            <MaterialCommunityIcons
                              name={isExpanded ? "chevron-up" : "chevron-down"}
                              color={
                                isItemActive || itemHasActiveChild
                                  ? colors.white
                                  : colors.black
                              }
                              size={wp(5)}
                            />
                          )}
                        </View>
                      </TouchableRipple>

                      {item.children && (
                        <View style={styles.subItems}>
                          {isExpanded &&
                            item.children.map((child) => (
                              <TouchableRipple
                                key={child.title}
                                onPress={() => handleNavigation(child.route)}
                                style={styles.subItem}
                                rippleColor={colors.main}
                                borderless={true}
                              >
                                <View style={styles.subItemContent}>
                                  <View
                                    style={[
                                      styles.circleIcon,
                                      isActive(child.route) &&
                                        styles.activeCircleIcon,
                                    ]}
                                  >
                                    {isActive(child.route) && (
                                      <View style={styles.circleFill} />
                                    )}
                                  </View>

                                  <Text
                                    style={[
                                      styles.subItemText,
                                      isActive(child.route) &&
                                        styles.activeSubText,
                                    ]}
                                  >
                                    {child.title}
                                  </Text>
                                </View>
                              </TouchableRipple>
                            ))}
                        </View>
                      )}
                    </React.Fragment>
                  );
                })}
              </List.Section>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

const IOS = Platform.OS === "ios";
const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    backgroundColor: "transparent",
    bottom: IOS ? hp(0) : hp(3),
    left: 0,
    right: 0,
    alignItems: "center",
  },
  modal: {
    backgroundColor: colors.white,
    width: wp(92),
    height: IOS ? hp(70) : hp(72),
    borderRadius: wp(3),
  },
  container: {
    padding: wp(4),
  },

  title: {
    fontSize: wp(6),
    fontFamily: "Nunito-Bold",
    color: colors.black,
    textAlign: "center",
  },

  divider: {
    marginVertical: hp(1),
    backgroundColor: colors.main,
  },

  item: {
    marginBottom: hp(2),
    paddingHorizontal: wp(3),
    borderRadius: wp(2),
  },
  activeItem: {
    backgroundColor: colors.main,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    height: hp(5),
  },
  itemText: {
    fontSize: wp(4.5),
    flex: 1,
    marginLeft: wp(5),
    color: colors.gray,
  },
  activeText: {
    color: colors.white,
  },

  subItems: {
    marginLeft: wp(10),
    marginBottom: hp(1),
  },
  subItem: {
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(3),
    borderRadius: wp(2),
    marginBottom: hp(0.5),
  },
  subItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  circleIcon: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  activeCircleIcon: {
    borderColor: colors.main,
  },
  circleFill: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: colors.main,
  },
  subItemText: {
    fontSize: wp(4),
    marginLeft: wp(6),
    color: colors.black,
  },
  activeSubText: {
    color: colors.main,
    fontFamily: "Nunito-Bold",
  },
});
