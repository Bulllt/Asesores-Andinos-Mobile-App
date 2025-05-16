import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import { useCameraPermissions, CameraView } from "expo-camera";

import style from "./style";
import { wp, hp } from "../../constants/device";
import { colors } from "../../constants/colors";

export default function BarcodeScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      await requestPermission();
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    alert(`Código escaneado: ${data}`);
  };
  const handleRequestPermission = async () => {
    await requestPermission();
  };

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
    </View>
  );
}
