import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useFocusEffect } from "expo-router";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, TextInput, Snackbar, Checkbox } from "react-native-paper";
import { CurvedTop } from "../../components/curvedTop";
import { UseUser } from "../../hooks/userContext";

import style from "./style";
import LogoWhite from "../../assets/images/logo-white.svg";
import { wp } from "../../constants/device";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = UseUser();
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const [errors, setErrors] = useState({
    rut: "",
    password: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      const loadSavedRut = async () => {
        try {
          const savedRut = await AsyncStorage.getItem("rememberedRut");
          const rememberMeStatus = await AsyncStorage.getItem("rememberMe");

          if (savedRut && rememberMeStatus === "true") {
            setRut(savedRut);
            setRememberMe(true);
          }
        } catch (error) {
          console.error("Error loading saved RUT:", error);
        }
      };

      loadSavedRut();
    }, [])
  );

  const formatRutInput = (input) => {
    const cleanRut = input.replace(/[^0-9kK]/g, "").toUpperCase();
    if (cleanRut.length <= 1) return cleanRut;

    const body = cleanRut.slice(0, -1);
    const verifier = cleanRut.slice(-1);

    const formattedBody = body
      .split("")
      .reverse()
      .join("")
      .replace(/(\d{3})/g, "$1.")
      .split("")
      .reverse()
      .join("")
      .replace(/^\./, "");

    return `${formattedBody}-${verifier}`;
  };
  const validateRut = (formattedRut) => {
    const cleanRut = formattedRut.replace(/[^0-9kK]/g, "").toUpperCase();
    if (!cleanRut) return "RUT es requerido";
    if (!/^[0-9]+[0-9K]{1}$/.test(cleanRut)) return "RUT inválido";

    const rutBody = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);

    let sum = 0;
    let multiple = 2;
    for (let i = rutBody.length - 1; i >= 0; i--) {
      sum += parseInt(rutBody.charAt(i)) * multiple;
      multiple = multiple === 7 ? 2 : multiple + 1;
    }

    const result = 11 - (sum % 11);
    const dvExpected =
      result === 11 ? "0" : result === 10 ? "K" : result.toString();

    if (dvExpected !== dv) return "RUT inválido";
    return "";
  };
  const handleRutChange = (text) => {
    const formattedRut = formatRutInput(text);
    setRut(formattedRut);

    if (submitted) {
      setErrors({ ...errors, rut: validateRut(formattedRut) });
    }
  };

  const validatePassword = (password) => {
    if (!password) return "Contraseña es requerida";
    if (password.length < 4) return "Mínimo 4 caracteres";
    return "";
  };

  const handleLogin = async () => {
    setLoading(true);
    Keyboard.dismiss();
    setSubmitted(true);

    const rutError = validateRut(rut);
    const passwordError = validatePassword(password);

    setErrors({
      rut: rutError,
      password: passwordError,
    });

    if (rutError || passwordError) {
      setLoading(false);
      setSnackbarMessage("Por favor corrige los errores");
      setSnackbarType("error");
      setSnackbarVisible(true);
      return;
    }

    try {
      await login({ rut, password });

      if (rememberMe) {
        await AsyncStorage.setItem("rememberedRut", rut);
        await AsyncStorage.setItem("rememberMe", "true");
      } else {
        await AsyncStorage.removeItem("rememberedRut");
        await AsyncStorage.removeItem("rememberMe");
      }

      setSnackbarMessage("Inicio de sesión exitoso");
      setSnackbarType("success");
      setSnackbarVisible(true);

      setTimeout(() => {
        setLoading(false);
        router.replace("home");
      }, 1000);
    } catch (error) {
      setLoading(false);
      if (error.status == 400) {
        setSnackbarMessage("Los datos proporcionados no son válidos");
      } else {
        setSnackbarMessage("Error en el inicio de sesión");
      }
      setSnackbarType("error");
      setSnackbarVisible(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/background.webp")}
        blurRadius={4}
        style={style.loginBackground}
      >
        <View style={style.loginCurvedBackground}>
          <CurvedTop color={"#F5F5F8"} width={100} height={65} depth={0.3} />
        </View>
      </ImageBackground>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={style.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={style.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={style.loginContainer}>
              <View style={style.loginLogo}>
                <LogoWhite width="100%" height="100%" />
              </View>

              <View style={style.loginForm}>
                <Text style={style.formTitle}>ACCESO</Text>

                <TextInput
                  mode="outlined"
                  keyboardType="visible-password"
                  label="Ingresar RUT"
                  style={style.formInput}
                  contentStyle={{ marginLeft: wp(4) }}
                  value={rut}
                  onChangeText={handleRutChange}
                  error={!!errors.rut}
                  left={<TextInput.Icon icon="account" size={wp(7)} />}
                  maxLength={12}
                />
                {errors.rut ? (
                  <Text style={style.formError}>{errors.rut}</Text>
                ) : null}

                <TextInput
                  mode="outlined"
                  label="Ingresar Contraseña"
                  secureTextEntry={!passwordVisible}
                  style={style.formInput}
                  contentStyle={{ marginLeft: wp(4) }}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (submitted) {
                      setErrors({
                        ...errors,
                        password: validatePassword(text),
                      });
                    }
                  }}
                  error={!!errors.password}
                  left={<TextInput.Icon icon="lock" size={wp(6)} />}
                  right={
                    <TextInput.Icon
                      icon={passwordVisible ? "eye" : "eye-off"}
                      size={wp(6)}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                      forceTextInputFocus={false}
                    />
                  }
                />
                {errors.password ? (
                  <Text style={style.formError}>{errors.password}</Text>
                ) : null}

                <View style={style.formCheckContainer}>
                  <Checkbox.Android
                    status={rememberMe ? "checked" : "unchecked"}
                    onPress={() => setRememberMe(!rememberMe)}
                  />
                  <Text style={style.formCheckText}>Recuérdame</Text>
                </View>

                <Button
                  mode="contained"
                  loading={loading}
                  onPress={handleLogin}
                  style={style.formButton}
                  contentStyle={style.formButtonContent}
                  labelStyle={style.formButtonText}
                >
                  INICIAR SESIÓN
                </Button>

                <Text style={style.formText}>
                  ¿Olvidaste tu contraseña?{" "}
                  <TouchableOpacity>
                    <Text style={style.formRefText}>Recupérala</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
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
  );
}
