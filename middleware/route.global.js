// import { useDevice } from "@nuxtjs/device";

export default defineNuxtRouteMiddleware((to, from) => {
  const { isMobile } = useDevice();

  if (isMobile) {
    if (!to.fullPath.startsWith("/m")) {
      return navigateTo("/m" + to.fullPath);
    }
  } else {
    if (to.fullPath.startsWith("/m")) {
      return navigateTo(to.fullPath.replace("/m", ""));
    }
  }
});
