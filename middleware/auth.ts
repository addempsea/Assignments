export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("userAuthCookie");
  if (token.value) {
    return navigateTo('/dashboard/competitions');
  }
});
