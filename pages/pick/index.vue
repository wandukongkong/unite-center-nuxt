<template>
  <div class="relative min-h-screen border flex justify-center items-center">
    <TransitionGroup name="fade">
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
    </TransitionGroup>
    <div class="flex flex-col items-center">
      <PokemonCard class="mt-20 opacity-0 z-0"></PokemonCard>
      <UButton @click="shuffle">Shuffle</UButton>
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
