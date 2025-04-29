import axios from "axios";

const adminCategory = "https://api.csep.dev/api/admin/category/";
const adminInventory = "https://api.csep.dev/api/admin/inventory/";
const adminInvInbound = "https://api.csep.dev/api/admin/inventoryOrderInbound/";
const adminInvOutbound =
  "https://api.csep.dev/api/admin/inventoryOrderOutbound/";
const adminItem = "https://api.csep.dev/api/admin/item/";
const adminOrderInbound = "https://api.csep.dev/api/admin/orderInbound/";
const adminOrderOutbound = "https://api.csep.dev/api/admin/orderOutbound/";

export async function LoginUser(credentials) {
  try {
    const response = await axios.post(
      "https://api.csep.dev/api/auth/login/",
      credentials
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}
