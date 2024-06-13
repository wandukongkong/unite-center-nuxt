<script setup>
import { toRef } from "vue";

const router = useRouter();
const { isMobile } = useDevice();

const isOpenMenu = toRef(true);
</script>
<template>
  <div
    class="flex items-center absolute opacity-0 min-h-screen"
    v-motion
    :initial="{
      x: 200,
    }"
    :enter="{
      opacity: 1,
    }"
  >
    <div class="opacity-1" v-motion-slide-bottom>
      <UCard class="hover:scale-[1.01] hover:shadow-xl ease-in duration-100">
        <div class="w-[200px] h-[60vh]">
          <UButton class="flex w-[100%] mb-3">
            <div class="flex justify-center me-2 w-[50px]">
              <img class="h-[20px]" src="@/public/img/pokemon/ball.png" />
            </div>
            <strong>Home</strong>
          </UButton>
          <UButton class="flex w-[100%] mb-3">
            <div class="flex justify-center me-2 w-[50px]">
              <img class="h-[20px]" src="@/public/img/pokemon/object3.png" />
            </div>
            <strong>Update</strong>
          </UButton>
          <UButton class="flex w-[100%] mb-3">
            <div class="flex justify-center me-2 w-[50px]">
              <img class="h-[20px]" src="@/public/img/pokemon/object7.png" />
            </div>
            <strong>Random Pick</strong>
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>
<style></style>
