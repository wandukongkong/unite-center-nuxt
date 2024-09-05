<script setup>
const { isMobile } = useDevice();
const router = useRouter();
</script>
<template>
  <div class="bg-transparent z-50" style="position: fixed; top: 10">
    <div v-if="isMobile && router.currentRoute.value.fullPath !== '/'">
      <MobileHeader></MobileHeader>
    </div>
    <div v-else>
      <Header></Header>
    </div>
  </div>
  <slot></slot>
</template>
