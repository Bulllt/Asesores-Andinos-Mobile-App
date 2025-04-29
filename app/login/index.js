import React, { useState } from "react";
import { useRouter } from "expo-router";
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
import { useUser } from "../../hooks/userContext";

import style from "./style";
import LogoWhite from "../../assets/images/logo-white.svg";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useUser();
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

  const validateRut = (rut) => {
    if (!rut) return "RUT es requerido";

    const cleanRut = rut.replace(/\./g, "").replace(/-/g, "").toUpperCase();
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
    let dvAwaited =
      result === 11 ? "0" : result === 10 ? "K" : result.toString();

    if (dvAwaited !== dv) return "RUT inválido";

    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Contraseña es requerida";
    if (password.length < 8) return "Mínimo 8 caracteres";
    return "";
  };

  const handleLogin = () => {
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

    setSnackbarMessage("Inicio de sesión exitoso");
    setSnackbarType("success");
    setSnackbarVisible(true);
    login({ name: "John", rut });
    setTimeout(() => {
      setLoading(false);
      router.push("home");
    }, 1000);
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
                  value={rut}
                  onChangeText={(text) => {
                    setRut(text);
                    if (submitted) {
                      setErrors({ ...errors, rut: validateRut(text) });
                    }
                  }}
                  error={!!errors.rut}
                  left={<TextInput.Icon icon="account" />}
                />
                {errors.rut ? (
                  <Text style={style.formError}>{errors.rut}</Text>
                ) : null}

                <TextInput
                  mode="outlined"
                  label="Ingresar Contraseña"
                  secureTextEntry={!passwordVisible}
                  style={style.formInput}
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
                  left={<TextInput.Icon icon="lock" />}
                  right={
                    <TextInput.Icon
                      icon={passwordVisible ? "eye" : "eye-off"}
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

                <Text style={style.formText}>
                  ¿No tienes cuenta?{" "}
                  <TouchableOpacity>
                    <Text style={style.formRefText}>Crear cuenta</Text>
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
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}
