import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import {
  IconButton,
  Dialog,
  Portal,
  Button,
  List,
  Divider,
} from "react-native-paper";
import { useCameraPermissions, CameraView } from "expo-camera";
import {
  GetOutboundOrders,
  ValidateItemOutboundOrder,
} from "../../constants/api";

import style from "./style";
import { wp, hp } from "../../constants/device";
import { colors } from "../../constants/colors";

export default function BarcodeScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    type: "success",
    message: "",
  });
  const { outbound_order, outbound_orderName } = useLocalSearchParams();
  const [orders, setOrders] = useState([]);
  const [selectedOrderID, setSelectedOrderID] = useState(null);
  const [selectedOrderName, setSelectedOrderName] = useState(null);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    (async () => {
      await requestPermission();

      const fetchOrders = async () => {
        try {
          const data = await GetOutboundOrders();
          setOrders(data);
        } catch (error) {
          console.error(error.message || "Error loading items");
        }
      };

      if (!outbound_order) {
        fetchOrders();
      } else {
        setOrderConfirmed(true);
        setSelectedOrderID(outbound_order);
        setSelectedOrderName(outbound_orderName);
      }
    })();
  }, []);

  const handleRequestPermission = async () => {
    await requestPermission();
  };

  const handleOrderSelect = (orderId, orderName, orderItems) => {
    setExpanded(false);
    setSelectedOrderID(orderId);
    setSelectedOrderName(orderName);
    setSelectedOrderItems(orderItems);
  };
  const handleConfirmOrder = () => {
    if (!selectedOrderID) {
      showAlert("error", "Por favor selecciona una orden");
      return;
    }

    if (selectedOrderItems.length === 0) {
      showAlert("error", "La orden no posee items");
      return;
    }

    const hasUnverifiedItems = selectedOrderItems.some(
      (item) => item.verified === false
    );
    if (!hasUnverifiedItems) {
      showAlert("error", "La orden no tiene items para verificar");
      return;
    }

    setOrderConfirmed(true);
  };

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    try {
      const parsedData = JSON.parse(data);
      if (selectedOrderID && parsedData?.inventory_item) {
        await ValidateItemOutboundOrder(
          selectedOrderID,
          parsedData.inventory_item
        );

        showAlert(
          "success",
          `Se ha validado el item ${parsedData.inventory_item} de la orden: ${selectedOrderName}`
        );
      }
    } catch (error) {
      if (error.status === 409) {
        showAlert("success", "Este item ya se ha validado");
      } else if (error.status === 404) {
        showAlert("error", "Item no encontrado en la orden seleccionada");
      } else {
        showAlert("error", "QR inválido - Formato incorrecto");
      }
    }
  };

  const showAlert = (type, message) => {
    setAlertConfig({
      visible: true,
      type,
      message,
    });
  };
  const Alert = () => (
    <Portal>
      <Dialog
        visible={alertConfig.visible}
        onDismiss={() =>
          setAlertConfig((prev) => ({ ...prev, visible: false }))
        }
        style={style.alertContainer}
      >
        <Dialog.Title style={[style.alertTitle,
          alertConfig.type === "success"
            ? style.alertTitleSuccess
            : style.alertTitleError
        ]}>
          {alertConfig.type === "success" ? "Validación exitosa" : "Error"}
        </Dialog.Title>
        <Dialog.Content>
          <Text style={[style.alertText,
            alertConfig.type === "success"
              ? style.alertTextSuccess
              : style.alertTextError
          ]}>{alertConfig.message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="contained"
            onPress={() =>
              setAlertConfig((prev) => ({ ...prev, visible: false }))
            }
            style={[
              style.alertButton,
              alertConfig.type === "success"
                ? style.alertButtonSuccess
                : style.alertButtonError,
            ]}
            contentStyle={style.alertButtonContent}
            labelStyle={style.alertButtonText}
          >
            Aceptar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );

  if (!permission?.granted) {
    return (
      <View style={style.scanContainer}>
        <View style={[style.titleContainer, { marginBottom: hp(30) }]}>
          <IconButton
            icon="arrow-left"
            iconColor={colors.white}
            size={wp(8)}
            onPress={() => router.back()}
            style={style.titleIcon}
          />
          <View style={style.titleCenterContainer}>
            <Text style={style.titleText}>Cámara QR</Text>
          </View>
          <View style={{ width: wp(8) }} />
        </View>

        <Text style={style.noPermissionText}>
          Sin acceso a la cámara. Puedes dar acceso{" "}
          <TouchableOpacity onPress={handleRequestPermission}>
            <Text style={style.noPermissionTextHighlight}>aquí</Text>
          </TouchableOpacity>
        </Text>
      </View>
    );
  }

  if (!outbound_order && (!selectedOrderID || !orderConfirmed)) {
    return (
      <View style={style.scanContainer}>
        <View style={style.titleContainer}>
          <IconButton
            icon="arrow-left"
            iconColor={colors.white}
            size={wp(8)}
            onPress={() => router.back()}
            style={style.titleIcon}
          />
          <View style={style.titleCenterContainer}>
            <Text style={style.titleText}>Cámara QR</Text>
          </View>
          <View style={{ width: wp(8) }} />
        </View>

        <View style={style.selectOrderContainer}>
          <Text style={style.selectTitle}>
            Seleccionar la orden para verificar los items
          </Text>

          <List.Accordion
            title={
              selectedOrderID
                ? `Orden: ${selectedOrderName}`
                : "Selecciona una orden"
            }
            expanded={expanded}
            onPress={() => setExpanded(!expanded)}
            style={style.accordion}
            titleStyle={style.accordionTitle}
          >
            <ScrollView style={style.accordionScroll}>
              {orders.map((order) => (
                <React.Fragment key={order.order_id}>
                  <List.Item
                    title={`${order.name}`}
                    description={`ID: ${order.order_id} • Items: ${order.items.length}`}
                    onPress={() =>
                      handleOrderSelect(order.order_id, order.name, order.items)
                    }
                    style={style.listItem}
                    titleStyle={style.listItemTitle}
                    descriptionStyle={style.listItemDescription}
                  />
                  <Divider />
                </React.Fragment>
              ))}
            </ScrollView>
          </List.Accordion>

          <Button
            mode="contained"
            onPress={handleConfirmOrder}
            style={style.confirmButton}
            contentStyle={style.confirmButtonContent}
            labelStyle={style.confirmButtonText}
          >
            Confirmar seleccion
          </Button>
        </View>

        <Alert />
      </View>
    );
  }

  return (
    <View style={style.scanContainer}>
      <View style={style.titleContainer}>
        <IconButton
          icon="arrow-left"
          iconColor={colors.white}
          size={wp(8)}
          onPress={() => router.back()}
          style={style.titleIcon}
        />
        <View style={style.titleCenterContainer}>
          <Text style={style.titleText}>Cámara QR</Text>
        </View>
        <View style={{ width: wp(8) }} />
      </View>

      <CameraView
        style={style.cameraContainer}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      <View style={style.scannerOverlay}>
        <View style={style.scannerFrame} />
        <Text style={style.scannerHelpText}>Apunta al código QR</Text>
      </View>

      {scanned && (
        <TouchableOpacity
          style={style.rescanButton}
          onPress={() => setScanned(false)}
        >
          <Text style={style.rescanButtonText}>Escanear Nuevamente</Text>
        </TouchableOpacity>
      )}

      <Alert />
    </View>
  );
}
