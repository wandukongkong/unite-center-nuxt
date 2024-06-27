<script setup></script>
<template>
  <div class="relative">
    <NuxtLayout name="default">
      <NuxtPage name="default" />
    </NuxtLayout>
  </div>
</template>
<style>
/* transition */
body,
html {
  /* background-color: rgb(247, 247, 247); */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.pattern {
  background-image: url("@/public/svg/square-pattern.svg"),
    linear-gradient(180deg, rgb(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 50%);
  background-size: 120px, auto;
  background-position:
    center,
    left top;
  box-shadow: inset 0px 0px 0px 2px rgba(0, 0, 0, 0.2);
}

:root {
  color-scheme: light only;
}
</style>
