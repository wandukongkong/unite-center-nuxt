<script setup>
import { toRef, onBeforeMount } from "vue";

const router = useRouter();

const isOpenMenu = toRef(false);
</script>
<template>
  <UButton
    class="m-2"
    icon="i-heroicons-bars-3-16-solid"
    color="gray"
    @click="isOpenMenu = true"
  />

  <USlideover v-model="isOpenMenu">
    <div class="p-4">
      <UButton
        color="gray"
        variant="ghost"
        size="sm"
        icon="i-heroicons-x-mark-20-solid"
        class="flex sm:hidden start-5 top-5 z-10"
        square
        padded
        @click="isOpenMenu = false"
      />
    </div>
    <div class="flex flex-col items-center px-3">
      <!-- <NuxtLink class="mb-5" to="/m" @click="isOpenMenu = false">
        <strong>Home</strong>
      </NuxtLink> -->
      <NuxtLink class="mb-5" to="/update" @click="isOpenMenu = false">
        <strong>Update</strong>
      </NuxtLink>
      <NuxtLink class="mb-5" to="/pick" @click="isOpenMenu = false">
        <strong>Random Pick dd</strong>
      </NuxtLink>
    </div>
  </USlideover>
</template>
<style></style>
