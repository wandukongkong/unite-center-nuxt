<script setup>
import { toRef } from "vue";

const router = useRouter();

const isOpenMenu = toRef(false);
</script>
<template>
  <div class="w-[100%] flex p-2">
    <UButton
      class="bg-white hover:bg-slate-200 border text-slate-800"
      trailing-icon="i-heroicons-bars-3-16-solid"
      @click="
        () => {
          isOpenMenu = !isOpenMenu;
        }
      "
    />
    <USlideover v-model="isOpenMenu" side="left">
      <div class="flex justify-end p-2">
        <UButton
          class="bg-transparent hover:bg-slate-200 border text-slate-800"
          trailing-icon="i-heroicons-x-mark-16-solid"
          @click="
            () => {
              isOpenMenu = false;
            }
          "
        />
      </div>
      <div class="p-5">
        <UButton
          class="w-[100%] bg-transparent text-black hover:bg-slate-100 mb-3"
          @click="
            () => {
              router.push('/');
              isOpenMenu = false;
            }
          "
        >
          Home
        </UButton>
        <UButton
          class="w-[100%] bg-transparent text-black hover:bg-slate-100 mb-3"
          @click="
            () => {
              router.push('/pokemon');
              isOpenMenu = false;
            }
          "
        >
          Pokemon
        </UButton>
        <UButton
          class="w-[100%] bg-transparent text-black hover:bg-slate-100 mb-3"
          @click="
            () => {
              router.push('/pick');
              isOpenMenu = false;
            }
          "
        >
          Random Pick
        </UButton>
      </div>

      <Placeholder class="h-full" />
    </USlideover>
  </div>
</template>
<style></style>
