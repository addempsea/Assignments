import { useAuthStore } from "~~/store/authStore";
import Cookies from "js-cookie";

const authStore = useAuthStore();

export const clearUserSession = () => {
  authStore.logoutAction();
  Cookies.remove("userAuthCookie");
  window.location.href = `${window.location.origin}/login`;
};
