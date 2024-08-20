<script setup>
const { isMobile } = useDevice();
</script>
<template>
  <div class="bg-transparent z-50" style="position: fixed; top: 10">
    <div v-if="isMobile">
      <MobileHeader></MobileHeader>
    </div>
    <div v-else>
      <Header></Header>
    </div>
  </div>
  <slot></slot>
</template>
