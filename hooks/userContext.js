import { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GetUser,
  LoginUser,
  LogoutUser,
  HttpInterceptor,
} from "../constants/api";
import { useRouter } from "expo-router";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        if (!token) {
          await AsyncStorage.removeItem("user");
          setUser(null);
          setIsLoading(false);
          return;
        }

        const userData = await GetUser();
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      } catch (error) {
        await AsyncStorage.multiRemove(["token", "user"]);
        console.error(error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await LoginUser(credentials);
      await AsyncStorage.multiSet([
        ["token", response.token],
        ["user", JSON.stringify(response.user)],
      ]);

      setUser(response.user);
      return response.user;
    } catch (error) {
      await AsyncStorage.multiRemove(["token", "user"]);
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await LogoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      await AsyncStorage.multiRemove(["token", "user"]);
      setUser(null);
    }
  };
  useEffect(() => {
    HttpInterceptor(router);
  }, [router]);

  const value = {
    user,
    isLoading,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function UseUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UseUser must be used within a UserProvider");
  }
  return context;
}
