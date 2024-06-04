<script setup>
import { toRef, computed, watch, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useDayjs } from "#dayjs";

// store
import { useCommonStore } from "../../stores/commonStore";

// json
const dayjs = useDayjs();
const { unitePokemonList } = storeToRefs(useCommonStore());

const groupedPokemonList = computed(() => {
  // 날짜 별로 Group
  const groupedPokemonInfo = unitePokemonList.value.reduce(
    (result, unitePokemonInfo) => {
      const lastUpdatedDate = unitePokemonInfo.updatedList
        .sort((a, b) => {
          const aUpdatedDateNumber = Number(
            dayjs(a.updatedDate, "YYYY-MM-DD").format("YYYYMMDD")
          );
          const bUpdatedDateNumber = Number(
            dayjs(b.updatedDate, "YYYY-MM-DD").format("YYYYMMDD")
          );

          return aUpdatedDateNumber < bUpdatedDateNumber ? 1 : -1;
        })
        .at(0).updatedDate;

      if (!result[lastUpdatedDate]) {
        result[lastUpdatedDate] = [];
      }

      result[lastUpdatedDate].push(unitePokemonInfo);

      return result;
    },
    {}
  );

  // // Node 버전 21 이상만 Object.groupBy 사용 가능
  // const groupedPokemonInfo = Object.groupBy(
  //   unitePokemonList.value,
  //   (unitePokemonInfo) => {
  //     return unitePokemonInfo.updatedList
  //       .sort((a, b) => {
  //         const aUpdatedDateNumber = Number(
  //           dayjs(a.updatedDate, "YYYY-MM-DD").format("YYYYMMDD")
  //         );
  //         const bUpdatedDateNumber = Number(
  //           dayjs(b.updatedDate, "YYYY-MM-DD").format("YYYYMMDD")
  //         );
  //         return aUpdatedDateNumber < bUpdatedDateNumber ? 1 : -1;
  //       })
  //       .at(0).updatedDate;
  //   }
  // );

  // 배열로 변환
  return Object.keys(groupedPokemonInfo)
    .sort((a, b) =>
      Number(dayjs(a, "YYYY-MM-DD").format("YYYYMMDD")) <
      Number(dayjs(b, "YYYY-MM-DD").format("YYYYMMDD"))
        ? 1
        : -1
    )
    .map((key) => ({
      updatedDate: key,
      pokemonList: groupedPokemonInfo[key],
    }));
});
</script>
<template>
  <div class="ps-5">
    <!-- TODO: 검색 영역 -->
    <div class="flex flex-col items-end w-[100%] px-8 mt-[10px] mb-2">
      <UInput class="w-[100%] mb-2 opacity-0"></UInput>
      <!-- <div>정렬</div> -->
    </div>
    <!-- TODO: 리스트 영역 -->
    <div class="flex flex-col justify-start py-3">
      <div
        v-for="(groupedPokemonInfo, index) in groupedPokemonList"
        :key="index"
        class="mb-3"
      >
        <strong>{{ groupedPokemonInfo.updatedDate }}</strong>
        <div class="flex flex-wrap">
          <div
            v-for="(
              pokemonInfo, pokemonListIndex
            ) in groupedPokemonInfo.pokemonList"
            :key="pokemonListIndex"
            class="m-2"
          >
            <PokemonCard
              class="relative transition-transform hover:scale-[1.03] cursor-pointer"
            >
              <img
                :src="pokemonInfo.image"
                class="absolute top-0 start-0 rounded-lg pattern border-[1.4px] border-gray-700 shadow-gray-500 shadow-md"
                style="-webkit-user-drag: none"
                :style="{ backgroundColor: pokemonInfo.color }"
              />
              <div>{{ pokemonInfo.name }}</div>
            </PokemonCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
