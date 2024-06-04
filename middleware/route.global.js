// import { useDevice } from "@nuxtjs/device";

export default defineNuxtRouteMiddleware((to, from) => {
  const { isMobile } = useDevice();

  if (isMobile && !to.fullPath.includes("/m")) {
    to.fullPath = `/m${to.fullPath}`;
  }

  if (!isMobile) {
    to.fullPath = to.fullPath.replaceAll("/m", "");
  }
});
