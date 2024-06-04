<script setup>
import { toRef } from "vue";

const router = useRouter();
const { isMobile } = useDevice();

const isOpenMenu = toRef(false);
</script>
<template>
  <div class="w-[100%] flex p-2">
    <UButton
      class="hover:bg-slate-200 border text-slate-800"
      color="transpaernt"
      trailing-icon="i-heroicons-bars-3-16-solid"
      @click="
        () => {
          isOpenMenu = !isOpenMenu;
        }
      "
    />
    <USlideover v-model="isOpenMenu" side="left">
      <div class="flex justify-end p-2 bg-white">
        <UButton
          class="hover:bg-slate-200 border text-slate-800"
          color="transparent"
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
          class="w-[100%] text-black hover:bg-slate-100 mb-3"
          color="transparent"
          @click="
            () => {
              router.push(isMobile ? '/m' : '/');
              isOpenMenu = false;
            }
          "
        >
          Home
        </UButton>
        <!-- <UButton
          class="w-[100%] bg-transparent text-black hover:bg-slate-100 mb-3"
          @click="
            () => {
              router.push('/pokemon');
              isOpenMenu = false;
            }
          "
        >
          Pokemon
        </UButton> -->
        <UButton
          class="w-[100%] text-black hover:bg-slate-100 mb-3"
          color="transparent"
          @click="
            () => {
              router.push(isMobile ? '/m/pick' : '/pick');
              // if (isMobile) {
              //   router.push('/m/pick');
              // } else {
              //   router.push('/pick');
              // }

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
