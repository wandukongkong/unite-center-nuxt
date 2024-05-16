<script setup>
import { toRef } from "vue";

const isOpenMenu = toRef(false);
</script>
<template>
  <div class="w-[100%] flex p-2">
    <UButton
      class="bg-transparent hover:bg-slate-200 border text-slate-800"
      trailing-icon="i-heroicons-bars-3-16-solid"
      @click="
        () => {
          isOpenMenu = !isOpenMenu;
        }
      "
    />
    <USlideover v-model="isOpenMenu">
      <div class="p-4 flex-1">
        <Placeholder class="h-full" />
      </div>
    </USlideover>
  </div>
</template>
<style></style>
