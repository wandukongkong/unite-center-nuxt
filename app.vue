<template>
  <div class="">
    <!-- <NuxtWelcome /> -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<style>
/* transition */
body,
html {
  background-color: rgb(247, 247, 247);
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
    linear-gradient(180deg, rgb(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 38%);
  background-size: 120px, auto;
  background-position:
    center,
    left top;
}

:root {
  color-scheme: light only;
}
</style>
