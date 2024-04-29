<template>
  <div class="relative">
    <!-- 중앙 카드 영역 -->
    <div
      class="relative min-h-screen border flex justify-center items-center z-0"
    >
      <div
        v-for="(number, index) in defaultArray"
        :key="index"
        class="absolute cursor-pointer z-10"
        v-motion
        :initial="vMotionInitialInfo"
        :enter="getVMotionEnterInfo(index)"
        @click="clickCardDeck"
      >
        <PokemonCard>
          {{ index }}
        </PokemonCard>
      </div>
    </div>
    <!-- 선택 카드 영역 -->
    <div
      class="absolute start-0 top-0 w-[100%] min-h-screen border flex z-20 items-center justify-between"
    >
      <!-- 왼쪽 카드 영역 -->
      <div class="flex h-[100%] items-center ms-10">
        <div class="flex flex-col me-10">
          <div>
            <PokemonCard> hi </PokemonCard>
          </div>
          <div class="my-10">
            <PokemonCard> hi </PokemonCard>
          </div>
          <div>
            <PokemonCard> hi </PokemonCard>
          </div>
        </div>
        <div>
          <div class="flex flex-col">
            <div class="mb-10">
              <PokemonCard> hi </PokemonCard>
            </div>
            <div>
              <PokemonCard> hi </PokemonCard>
            </div>
          </div>
        </div>
      </div>
      <!-- 오른쪽 카드 영역 -->
      <div class="flex h-[100%] items-center me-10">
        <div>
          <div class="flex flex-col">
            <div class="mb-10">
              <PokemonCard> hi </PokemonCard>
            </div>
            <div>
              <PokemonCard> hi </PokemonCard>
            </div>
          </div>
        </div>
        <div class="flex flex-col ms-10">
          <div>
            <PokemonCard> hi </PokemonCard>
          </div>
          <div class="my-10">
            <PokemonCard> hi </PokemonCard>
          </div>
          <div>
            <PokemonCard> hi </PokemonCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { toRef, onMounted } from "vue";

import unitePokemonList from "@/json/unitePokemonList.json";

const defaultArray = toRef([]);

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
const shuffle = () => {
  defaultArray.value = [];

  setTimeout(() => {
    defaultArray.value = [
      ...Array(10)
        .fill(0)
        .map((value, index) => index)
        .sort(() => Math.random() - 0.5),
    ];
  }, 300);
};

const clickCardDeck = () => {
  defaultArray.value = defaultArray.value.slice(0, -1);
};

onMounted(() => {
  defaultArray.value = [
    ...Array(10)
      .fill(0)
      .map((value, index) => index),
  ];
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
