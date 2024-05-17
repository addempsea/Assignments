export default defineNuxtRouteMiddleware((to, from) => {
  const { path, query, hash } = to;
  if (path === "/" || !path.endsWith("/")) return;

  const nextPath = path.replace(/\/+$/, "") || "/";
  const nextRoute = { path: nextPath, query, hash };

  // 308 Permanent Redirect
  return navigateTo(nextRoute, { redirectCode: 308 });
});
