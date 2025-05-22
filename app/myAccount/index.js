import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Platform,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { IconButton, TextInput, Button, Snackbar } from "react-native-paper";
import { CurvedTop } from "../../components/curvedTop";
import { Navbar } from "../../components/navbar";
import { UseUser } from "../../hooks/userContext";
import { UpdateUser } from "../../constants/api";

import style from "./style";
import { wp } from "../../constants/device";
import { colors } from "../../constants/colors";

export default function MyAccountScreen() {
  const router = useRouter();
  const { user, loadUser } = UseUser();
  const IOS = Platform.OS === "ios";
  const height = IOS ? 86 : 90;

  const [formData, setFormData] = useState({
    full_name: "",
    last_name: "",
    other_last_name: "",
  });
  const [originalData, setOriginalData] = useState({
    full_name: user.full_name,
    last_name: user.last_name,
    other_last_name: user.other_last_name,
  });
  const [dirtyFields, setDirtyFields] = useState({
    full_name: false,
    last_name: false,
    other_last_name: false,
  });

  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const handleNameChange = (text) => {
    const correctedText = text
      .replace(/^\s+/, "")
      .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "")
      .replace(/\s+/g, " ");
    setFormData((prev) => ({ ...prev, full_name: correctedText }));
    setDirtyFields((prev) => ({
      ...prev,
      full_name: correctedText !== (originalData.full_name || ""),
    }));
  };

  const handleLastNameChange = (text, fieldName) => {
    const correctedText = text
      .replace(/\s/g, "")
      .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, "");
    setFormData((prev) => ({ ...prev, [fieldName]: correctedText }));
    setDirtyFields((prev) => ({
      ...prev,
      [fieldName]: correctedText !== (originalData[fieldName] || ""),
    }));
  };

  const prepareSubmitData = () => {
    const data = {};

    if (dirtyFields.full_name) {
      data.full_name = formData.full_name.trim();
    }
    if (dirtyFields.last_name) {
      data.last_name = formData.last_name.trim();
    }
    if (dirtyFields.other_last_name) {
      data.other_last_name = formData.other_last_name.trim();
    }

    return data;
  };

  const handleSubmit = async () => {
    const submitData = prepareSubmitData();
    if (Object.keys(submitData).length === 0) {
      setSnackbarMessage("No se detectaron cambios");
      setSnackbarType("success");
      setSnackbarVisible(true);
      return;
    }

    let hasRealChanges = false;
    for (const key in submitData) {
      if (submitData[key] !== (originalData[key] || "").trim()) {
        hasRealChanges = true;
        break;
      }
    }

    if (!hasRealChanges) {
      setSnackbarMessage("No se detectaron cambios");
      setSnackbarType("success");
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);
    try {
      const response = await UpdateUser(submitData);

      if (response === 200) {
        setSnackbarMessage("Datos actualizados correctamente");
        setSnackbarType("success");
        setSnackbarVisible(true);
        await loadUser();
        setLoading(false);
        router.replace("myAccount");
      } else {
        setSnackbarMessage("Error al actualizar");
        setSnackbarType("error");
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.log(error);
      setSnackbarMessage("Error de conexión");
      setSnackbarType("error");
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../assets/images/background.webp")}
          blurRadius={4}
          style={style.accountBackground}
        >
          <View style={style.accountCurvedBackground}>
            <CurvedTop
              color={"#F5F5F8"}
              width={100}
              height={height}
              depth={0.1}
            />
          </View>
        </ImageBackground>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={style.keyboardAvoidingView}
        >
          <Navbar activeRoute={"myAccount"} />

          <View style={style.titleContainer}>
            <IconButton
              icon="arrow-left"
              iconColor={colors.black}
              size={wp(8)}
              onPress={() => router.back()}
              style={style.titleIcon}
            />
            <View style={style.titleCenterContainer}>
              <Text style={style.titleText}>Perfil</Text>
            </View>
            <View style={{ width: wp(8) }} />
          </View>

          <ScrollView
            contentContainerStyle={style.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={style.accountContainer}>
              <View style={style.accountForm}>
                <View style={style.formTitleContainer}>
                  <IconButton
                    icon="account-cog"
                    iconColor={colors.main}
                    size={wp(20)}
                    style={style.formTitleIcon}
                  />
                  <View style={style.formTitleCenterContainer}>
                    <Text style={style.formTitleText}>{user?.full_name}</Text>
                    <Text style={style.formSubTitleText}>
                      Actualiza tus datos
                    </Text>
                  </View>
                </View>

                <TextInput
                  mode="outlined"
                  label="Nombre"
                  style={style.formInput}
                  contentStyle={{ marginLeft: wp(4) }}
                  value={formData.full_name}
                  placeholder={user?.full_name || "Ingrese su nombre"}
                  onChangeText={handleNameChange}
                  left={<TextInput.Icon icon="rename-box" size={wp(7)} />}
                />

                <TextInput
                  mode="outlined"
                  label="Apellido"
                  style={style.formInput}
                  contentStyle={{ marginLeft: wp(4) }}
                  value={formData.last_name}
                  placeholder={user?.last_name || "Ingrese su apellido"}
                  onChangeText={(text) =>
                    handleLastNameChange(text, "last_name")
                  }
                  left={<TextInput.Icon icon="rename-box" size={wp(6)} />}
                />

                <TextInput
                  mode="outlined"
                  label="Segundo apellido"
                  style={style.formInput}
                  contentStyle={{ marginLeft: wp(4) }}
                  value={formData.other_last_name}
                  placeholder={
                    user?.other_last_name || "Ingrese su segundo apellido"
                  }
                  onChangeText={(text) =>
                    handleLastNameChange(text, "other_last_name")
                  }
                  left={<TextInput.Icon icon="rename-box" size={wp(6)} />}
                />

                <Button
                  mode="contained"
                  loading={loading}
                  onPress={handleSubmit}
                  style={style.formButton}
                  contentStyle={style.formButtonContent}
                  labelStyle={style.formButtonText}
                >
                  Actualizar
                </Button>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={[
            style.snackbar,
            snackbarType === "success"
              ? style.snackbarSuccess
              : style.snackbarError,
          ]}
        >
          <Text style={style.snackbarText}>{snackbarMessage}</Text>
        </Snackbar>
      </View>
    </TouchableWithoutFeedback>
  );
}
