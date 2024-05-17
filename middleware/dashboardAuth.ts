export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("userAuthCookie");
  const route = useRoute()
  const router = useRouter()

  if (route.fullPath && !token.value) {
    process.client ? localStorage.setItem("routeBeforeAuth", route.path) : "";
    // hack to make localstorage set item before routing ==> TODO: refactor
    setTimeout(() => {
      router.replace("/login");
    }, 100);
    
  } else if (!token.value) {
    return navigateTo("/login");
  }
});
