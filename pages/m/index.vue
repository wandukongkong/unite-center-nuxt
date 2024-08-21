<script setup></script>
<template>
  <div class="flex flex-col justify-center items-center">
    <img
      class="h-[30px] py-1 my-12"
      src="@/public/img/pokemon/uniteCenterLogo.png"
    />
    <NuxtLink class="mb-5" to="/m/update" @click="isOpenMenu = false">
      <strong>Update</strong>
    </NuxtLink>
    <NuxtLink class="mb-5" to="/m/pick" @click="isOpenMenu = false">
      <strong>Random Pick</strong>
    </NuxtLink>
  </div>
</template>
<style></style>
