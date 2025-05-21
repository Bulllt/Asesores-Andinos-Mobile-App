import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { IconButton, Dialog, Portal, Button } from "react-native-paper";
import { useCameraPermissions, CameraView } from "expo-camera";

import style from "./style";
import { wp, hp } from "../../constants/device";
import { colors } from "../../constants/colors";

export default function BarcodeScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  useEffect(() => {
    (async () => {
      await requestPermission();
    })();
  }, []);

  const handleRequestPermission = async () => {
    await requestPermission();
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    try {
      const parsedData = JSON.parse(data);
      if (parsedData && parsedData.id) {
        setAlertMessage(`Se ha validado la orden con ID: ${parsedData.id}`);
        setAlertType("success");
      } else {
        setAlertMessage("QR inválido - No contiene ID");
        setAlertType("error");
      }
    } catch (e) {
      setAlertMessage("QR inválido - Formato incorrecto");
      setAlertType("error");
    }

    setAlertVisible(true);
  };

  const Alert = () => (
    <Portal>
      <Dialog
        visible={alertVisible}
        onDismiss={() => setAlertVisible(false)}
        style={[
          style.alertContainer,
          alertType === "success"
            ? style.alertContainerSuccess
            : style.alertContainerError,
        ]}
      >
        <Dialog.Title style={style.alertTitle}>
          {alertType === "success"
            ? "Validación exitosa"
            : "Error de validación"}
        </Dialog.Title>
        <Dialog.Content>
          <Text style={style.alertText}>{alertMessage}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            mode="contained"
            onPress={() => setAlertVisible(false)}
            style={style.alertButton}
            contentStyle={style.alertButtonContent}
            labelStyle={[
              style.alertButtonText,
              alertType === "success"
                ? style.alertButtonTextSuccess
                : style.alertButtonTextError,
            ]}
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
      </View>

      <CameraView
        style={style.cameraContainer}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={style.scannerOverlay}>
          <View style={style.scannerFrame} />
          <Text style={style.scannerHelpText}>Apunta al código QR</Text>
        </View>
      </CameraView>

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
