import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://apitest.csep.dev/api/",
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

export async function UpdateUser(credentials) {
  const response = await api.patch("auth/user/", credentials);
  return response.status;
}

export async function LogoutUser() {
  const response = await api.post("auth/logout/");
  return response.data;
}

export async function GetItems() {
  const response = await api.get("admin/item/");
  return response.data;
}

export async function GetCategories() {
  const response = await api.get("admin/category/");
  return response.data;
}

export async function GetBrands() {
  const response = await api.get("admin/brand/");
  return response.data;
}

export async function GetLoans() {
  const response = await api.get("admin/employeeItemLoan/");
  return response.data;
}

export async function GetOutboundOrders() {
  const response = await api.get("admin/orderOutbound/");
  return response.data;
}

export async function ValidateItemOutboundOrder(
  outbound_order,
  inventory_item
) {
  const response = await api.patch(
    `admin/inventoryOrderOutbound/${outbound_order}/${inventory_item}/verify/`
  );
  return response.data;
}
