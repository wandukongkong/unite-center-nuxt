<script setup>
import { toRef } from "vue";

// json
import unitePokemonListJson from "@/json/unitePokemonList.json";

const unitePokemonList = toRef([...unitePokemonListJson]);
</script>
<template>
  <div class="ps-5 select-none" style="-webkit-user-drag: none">
    <!-- TODO: 검색 영역 -->
    <div class="flex flex-col items-end w-[100%] px-8 mt-[10px] mb-2">
      <UInput class="w-[100%] mb-2"></UInput>
      <div>정렬</div>
    </div>
    <!-- TODO: 리스트 영역 -->
    <div class="flex flex-wrap justify-start">
      <div
        v-for="(cardInfo, index) in unitePokemonList"
        :key="index"
        class="m-2"
      >
        <PokemonCard
          class="relative transition-transform hover:scale-[1.03] cursor-pointer"
        >
          <img
            :src="cardInfo.image"
            class="absolute top-0 start-0 rounded-lg pattern border-[1.4px] border-gray-700 shadow-gray-500 shadow-md"
            style="-webkit-user-drag: none"
            :style="{ backgroundColor: cardInfo.color }"
          />
          <div>{{ cardInfo.name }}</div>
        </PokemonCard>
      </div>
    </div>
  </div>
</template>
<style></style>
