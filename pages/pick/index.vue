<template>
  <div class="relative">
    <!-- 중앙 카드 영역 -->
    <div class="relative min-h-screen border flex justify-center items-center">
      <div
        v-for="(cardInfo, index) in defaultArray"
        :key="index"
        class="absolute cursor-pointer z-10"
        v-motion
        :initial="vMotionInitialInfo"
        :enter="getVMotionEnterInfo(index)"
        @click="() => clickCardDeck(cardInfo)"
      >
        <PokemonCard>
          {{ index }}
        </PokemonCard>
      </div>
      <!-- TODO: 왼쪽 카드 영역 -->
      <div
        v-for="(cardInfo, index) in selectedCardList.slice(0, 5)"
        :key="index"
        class="absolute"
        v-motion
        :initial="{
          opacity: 0,
          y: 0,
          x: 0,
        }"
        :enter="{
          opacity: 1,
          x: cardInfo?.position[0] ?? 0,
          y: cardInfo?.position[1] ?? 0,
          transition: {
            damping: 15,
            mass: 0.1,
          },
        }"
      >
        <PokemonCard> {{ cardInfo?.cardNumber }} </PokemonCard>
      </div>
      <!-- TODO: 오른쪽 카드 영역 -->
      <div
        v-for="(cardInfo, index) in selectedCardList.slice(5, 10)"
        :key="index"
        class="absolute"
        v-motion
        :initial="{
          opacity: 0,
          y: 0,
          x: 0,
        }"
        :enter="{
          opacity: 1,
          x: cardInfo?.position[0] ?? 0,
          y: cardInfo?.position[1] ?? 0,
          transition: {
            damping: 15,
            mass: 0.1,
          },
        }"
      >
        <PokemonCard> {{ cardInfo?.cardNumber }} </PokemonCard>
      </div>
    </div>
    <div
      class="absolute min-h-screen w-[100%] top-0 flex flex-col justify-center items-center pt-[100px]"
    >
      <PokemonCard class="opacity-0"></PokemonCard>
      <div class="flex items-center">
        <UButton
          class="w-[40px] h-[40px] mx-1 py-0 flex justify-center"
          trailing-icon="i-heroicons-arrow-path-16-solid"
          @click="() => resetCardDeck()"
        >
        </UButton>
        <UPopover>
          <UButton
            class="w-[40px] h-[40px] mx-1 py-0 flex justify-center"
            color="white"
            trailing-icon="i-heroicons-cog-6-tooth"
          />
          <template #panel="{ close }">
            <div class="p-4 flex flex-wrap justify-around">
              <!-- <Placeholder class="h-20 w-48" /> -->
              <UTooltip text="Default">
                <UButton
                  class="bg-[#7e7e7e] hover:bg-[#dbdada] m-1 w-[15px] h-[15px] rounded-xl"
                  @click="close"
                ></UButton>
              </UTooltip>
              <UTooltip text="Attack">
                <UButton
                  class="bg-[#f15438] hover:bg-[#eeb4aa] m-1 w-[15px] h-[15px] rounded-xl"
                  @click="close"
                ></UButton>
              </UTooltip>
              <UTooltip text="Support">
                <UButton
                  class="bg-[#fecc51] hover:bg-[#e8d39d] m-1 w-[15px] h-[15px] rounded-xl"
                  @click="close"
                ></UButton>
              </UTooltip>
              <UTooltip text="Balance">
                <UButton
                  class="bg-[#ce5fd3] hover:bg-[#e1a0e5] m-1 w-[15px] h-[15px] rounded-xl"
                  @click="close"
                ></UButton>
              </UTooltip>
              <UTooltip text="Speed">
                <UButton
                  class="bg-[#29a5e3] hover:bg-[#b4e1f8] m-1 w-[15px] h-[15px] rounded-xl"
                  @click="close"
                ></UButton>
              </UTooltip>
              <UTooltip text="Defence">
                <UButton
                  class="bg-[#aced5b] hover:bg-[#c5dea5] m-1 w-[15px] h-[15px] rounded-xl"
                  @click="close"
                ></UButton>
              </UTooltip>
            </div>
          </template>
        </UPopover>
        <!-- material-symbols:settings -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { toRef, onMounted } from "vue";

import unitePokemonList from "@/json/unitePokemonList.json";

const selectedCardList = toRef([]);
const defaultArray = toRef([]);
const defaultCardList = toRef([
  {
    cardNumber: 0,
    position: [400, 125],
  },
  {
    cardNumber: 1,
    position: [400, -125],
  },
  {
    cardNumber: 2,
    position: [650, 250],
  },
  {
    cardNumber: 3,
    position: [650, 0],
  },
  {
    cardNumber: 4,
    position: [650, -250],
  },
  {
    cardNumber: 5,
    position: [-400, 125],
  },
  {
    cardNumber: 6,
    position: [-400, -125],
  },
  {
    cardNumber: 7,
    position: [-650, 250],
  },
  {
    cardNumber: 8,
    position: [-650, 0],
  },
  {
    cardNumber: 9,
    position: [-650, -250],
  },
]);

const vMotionInitialInfo = toRef({
  scale: 1.3,
  opacity: 0,
  y: -500,
  rotate: 0,
});

const getVMotionEnterInfo = (index) => {
  return {
    scale: 1,
    opacity: 1,
    y: -index * 1.2,
    x: 0,
    rotate: (Math.random() - 0.5) * 5,
    transition: {
      damping: 15,
      mass: 0.1,
      delay: index * 100,
    },
  };
};

// TODO: Suffle
const resetCardDeck = () => {
  defaultArray.value = [];
  selectedCardList.value = [];

  setTimeout(() => {
    defaultArray.value = defaultCardList.value;
  }, 300);
};

const clickCardDeck = (cardInfo) => {
  defaultArray.value = defaultArray.value.slice(0, -1);

  selectedCardList.value.push(cardInfo);
};

onMounted(() => {
  defaultArray.value = defaultCardList.value;
});
</script>
<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
