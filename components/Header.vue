<script setup>
import { toRef } from "vue";

const route = useRoute();
const router = useRouter();
const { isMobile } = useDevice();

const isOpenMenu = toRef(true);
</script>
<template>
  <div
    v-if="router.currentRoute.value.fullPath !== '/'"
    class="absolute opacity-0 bg-white"
    v-motion
    :initial="{
      x: 10,
      y: 10,
      width: '50px',
      height: '97vh',
    }"
    :enter="{
      opacity: 1,
    }"
  >
    <div
      class="border rounded py-5 h-[100%] hover:scale-[1.01] hover:shadow-xl ease-out duration-300"
    >
      <UButton
        class="flex w-[100%] mb-3 bg-white shadow-none hover:bg-transparent hover:scale-110 ease-out duration-200"
        @click="router.push('/')"
      >
        <div class="flex justify-center w-[50px]">
          <img class="h-[20px]" src="@/public/img/pokemon/ball.png" />
        </div>
      </UButton>
      <UButton
        class="flex w-[100%] mb-3 bg-white shadow-none hover:bg-transparent hover:scale-110 ease-out duration-200"
        @click="router.push('/update')"
      >
        <div class="flex justify-center w-[50px]">
          <img class="h-[20px]" src="@/public/img/pokemon/object3.png" />
        </div>
      </UButton>
      <UButton
        class="flex w-[100%] mb-3 bg-white shadow-none hover:bg-transparent hover:scale-110 ease-out duration-200"
        @click="router.push('/pick')"
      >
        <div class="flex justify-center w-[50px]">
          <img class="h-[20px]" src="@/public/img/pokemon/object7.png" />
        </div>
      </UButton>
    </div>
  </div>
</template>
<style></style>
