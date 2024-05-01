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
    <!-- 선택 카드 영역 -->
    <!-- <div
      class="absolute start-0 top-0 w-[100%] min-h-screen border flex items-center justify-between"
    > -->
    <!-- TODO: 왼쪽 카드 영역 -->
    <!-- <div
      class="absolute top-0 min-h-screen w-[400px] ms-10 bg-red-700 z-50"
    ></div> -->
    <!-- TODO: 오른쪽 카드 영역 -->
    <!-- <div class="flex h-[100%] items-center me-10">
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
    </div> -->
    <!-- </div> -->
    <div
      class="absolute min-h-screen w-[100%] top-0 flex flex-col justify-center items-center pt-[100px]"
    >
      <PokemonCard class="opacity-0"></PokemonCard>
      <UButton @click="() => shuffle()">Shuffle</UButton>
    </div>
  </div>
</template>
<script setup>
import { toRef, onMounted } from "vue";

import unitePokemonList from "@/json/unitePokemonList.json";

// FIXME: 단건으로 컨트롤 할 것인가?
// 왼쪽 카드 ref
const nineCardRef = toRef();
const eightCardRef = toRef();
const sevenCardRef = toRef();
const sixCardRef = toRef();
const fiveCardRef = toRef();

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
const shuffle = () => {
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
