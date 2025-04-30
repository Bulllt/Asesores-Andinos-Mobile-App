import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://api.csep.dev/api/",
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

let routerRef = null;
export function HttpInterceptor(router) {
  routerRef = router;
}
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.multiRemove(["token", "user"]);

      if (routerRef) {
        routerRef.push("/");
      }
    }
    return Promise.reject(error);
  }
);

export async function LoginUser(credentials) {
  const response = await api.post("auth/login/", credentials);
  return response.data;
}

export async function GetUser() {
  const response = await api.get("auth/user/");
  return response.data;
}

export async function LogoutUser() {
  const response = await api.post("auth/logout/");
  return response.data;
}

export async function GetItems() {
  try {
    const response = await api.get("admin/item/");
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}
