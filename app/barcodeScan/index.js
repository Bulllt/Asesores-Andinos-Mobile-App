import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import {
  IconButton,
  Dialog,
  Portal,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { useCameraPermissions, CameraView } from "expo-camera";
import {
  GetOutboundOrders,
  ValidateItemOutboundOrder,
} from "../../constants/api";

import style from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { wp, hp } from "../../constants/device";
import { colors } from "../../constants/colors";

export default function BarcodeScanScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
          setIsLoading(true);
          const data = await GetOutboundOrders();

          const filteredOrders = data
            .filter((order) => {
              if (order.items.length === 0) return false;

              return order.items.some((item) => item.verified === false);
            })
            .sort((a, b) => a.order_id - b.order_id);

          setOrders(filteredOrders);
        } catch (error) {
          console.error(error.message || "Error loading items");
        } finally {
          setIsLoading(false);
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

  const [page, setPage] = useState(0);
  const itemsPerPage = 20;
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, orders.length);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

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
      showAlert("error", "La orden no posee ítems");
      return;
    }

    const hasUnverifiedItems = selectedOrderItems.some(
      (item) => item.verified === false
    );
    if (!hasUnverifiedItems) {
      showAlert("error", "La orden no tiene ítems para verificar");
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
          `Se ha validado el ítem ${parsedData.inventory_item} de la orden: ${selectedOrderName}`
        );
      }
    } catch (error) {
      if (error.status === 409) {
        showAlert("success", "Este ítem ya se ha validado");
      } else if (error.status === 404) {
        showAlert("error", "Ítem no encontrado en la orden seleccionada");
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
        <Dialog.Title
          style={[
            style.alertTitle,
            alertConfig.type === "success"
              ? style.alertTitleSuccess
              : style.alertTitleError,
          ]}
        >
          {alertConfig.type === "success" ? "Validación exitosa" : "Error"}
        </Dialog.Title>
        <Dialog.Content>
          <Text
            style={[
              style.alertText,
              alertConfig.type === "success"
                ? style.alertTextSuccess
                : style.alertTextError,
            ]}
          >
            {alertConfig.message}
          </Text>
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
    if (isLoading) {
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

          <ActivityIndicator
            animating={true}
            color={colors.main}
            size={wp(20)}
          />
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

        <View style={style.selectOrderContainer}>
          <Text style={style.selectTitle}>
            Seleccionar la orden para verificar los ítems
          </Text>

          {orders.length === 0 ? (
            <View style={style.emptyStateContainer}>
              <MaterialCommunityIcons
                name="clipboard-list-outline"
                size={wp(20)}
                color={colors.main}
              />
              <Text style={style.emptyStateText}>
                No hay órdenes con items para verificar
              </Text>
            </View>
          ) : (
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.ordersScrollContainer}
              >
                {orders.slice(from, to).map((order) => (
                  <TouchableOpacity
                    key={order.order_id}
                    style={[
                      style.orderItemContainer,
                      selectedOrderID === order.order_id &&
                        style.orderItemSelected,
                    ]}
                    onPress={() =>
                      handleOrderSelect(order.order_id, order.name, order.items)
                    }
                  >
                    <View style={style.orderItemContent}>
                      <Text style={style.orderItemTitle}>{order.name}</Text>
                      <View style={style.orderItemDetails}>
                        <Text style={style.orderItemDetail}>
                          ID: {order.order_id}
                        </Text>
                        <Text style={style.orderItemDetail}>
                          Items: {order.items.length}
                        </Text>
                      </View>
                    </View>
                    {selectedOrderID === order.order_id && (
                      <MaterialCommunityIcons
                        name="check-circle"
                        size={wp(6)}
                        color={colors.blue}
                        style={style.orderItemCheck}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {totalPages > 1 && (
                <View style={style.paginationContainer}>
                  <Button
                    mode="text"
                    onPress={() => setPage(Math.max(0, page - 1))}
                    disabled={page === 0}
                    icon="chevron-left"
                  >
                    Anterior
                  </Button>

                  <Button
                    mode={page === 0 ? "contained" : "text"}
                    onPress={() => setPage(0)}
                    style={style.pageButton}
                  >
                    1
                  </Button>

                  {page > 1 && <Text style={style.ellipsis}>...</Text>}
                  {page > 0 && page < totalPages - 1 && (
                    <Button
                      mode="contained"
                      onPress={() => setPage(page)}
                      style={style.pageButton}
                    >
                      {page + 1}
                    </Button>
                  )}
                  {page < totalPages - 2 && (
                    <Text style={style.ellipsis}>...</Text>
                  )}

                  {totalPages > 1 && (
                    <Button
                      mode={page === totalPages - 1 ? "contained" : "text"}
                      onPress={() => setPage(totalPages - 1)}
                      style={style.pageButton}
                    >
                      {totalPages}
                    </Button>
                  )}

                  <Button
                    mode="text"
                    onPress={() => setPage(Math.min(totalPages - 1, page + 1))}
                    disabled={page >= totalPages - 1}
                    icon="chevron-right"
                    contentStyle={{ flexDirection: "row-reverse" }}
                  >
                    Siguiente
                  </Button>
                </View>
              )}

              <Button
                mode="contained"
                onPress={handleConfirmOrder}
                style={style.confirmButton}
                contentStyle={style.confirmButtonContent}
                labelStyle={style.confirmButtonText}
              >
                Confirmar selección
              </Button>
            </>
          )}
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
          <Text style={style.rescanButtonText}>Escanear nuevamente</Text>
        </TouchableOpacity>
      )}

      <Alert />
    </View>
  );
}
