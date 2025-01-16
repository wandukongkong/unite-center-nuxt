<script setup lang="ts">
useSeoMeta({
  title: "Unite Center",
  description: "잡다한 기능이 있는 포켓몬 유나이트 센터 입니다.",
  ogTitle: "Unite Center",
  ogDescription: "잡다한 기능이 있는 포켓몬 유나이트 센터 입니다.",
  ogImage: "/public/img/pokemon/uniteCenter.png",
  twitterCard: "summary_large_image",
});
</script>
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

.list-enter-active {
  transition: all 0.2s ease;
}
.list-leave-active {
  opacity: 0;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  /* transform: translateY(10px); */
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
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
