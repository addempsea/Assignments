import { useAuthStore } from "~~/store/authStore";

export const useAuth = () => {
  const router = useRouter();
  const authStore = useAuthStore();
  if (!authStore.$state.authenticated) {
    return router.push("/login");
  }
};
