<script setup>
import { toRef, computed, watch, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useDayjs } from "#dayjs";

// store
import { useCommonStore } from "../../stores/commonStore";

// json
const dayjs = useDayjs();
const { unitePokemonList } = storeToRefs(useCommonStore());

// use
const router = useRouter();

// state
const detailArea = toRef();
const isOpenDtail = toRef(false);
const selectedPokemonInfo = toRef({});

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

// click card event
const clickPokemonCard = (pokemonInfo) => {
  router.push(`/update/${pokemonInfo.name}`);
};
</script>
<template>
  <div class="absolute">
    <!-- TODO: 검색 영역 -->
    <!-- <div class="flex flex-col items-end w-[100%] px-8 mt-[10px] mb-2">
      <UInput class="w-[100%] mb-2 opacity-0"></UInput>
    </div> -->

    <!-- 리스트 영역 -->
    <Transition>
      <div
        class="reative flex flex-col justify-start pt-12 py-3 bg-transparent"
      >
        <div
          v-for="(groupedPokemonInfo, index) in groupedPokemonList"
          :key="index"
          class="ms-5"
        >
          <div>
            <strong>{{ groupedPokemonInfo.updatedDate }}</strong>
          </div>
          <div class="flex flex-wrap">
            <div
              v-for="(
                pokemonInfo, pokemonListIndex
              ) in groupedPokemonInfo.pokemonList"
              :key="pokemonListIndex"
              class="m-2"
            >
              <Card
                class="relative flex hover:scale-[1.05] hover:shadow-xl hover:shadow-gray-400 shadow-md shadow-gray-400 ease-out duration-200 cursor-pointer rounded"
                @click="() => clickPokemonCard(pokemonInfo)"
              >
                <NuxtImg
                  :src="pokemonInfo.image"
                  class="rounded pattern ease-out duration-200 h-[90px]"
                  style="-webkit-user-drag: none"
                  :style="{ backgroundColor: pokemonInfo.color }"
                  loading="lazy"
                />
              </Card>
            </div>
          </div>
          <div class="border w-[97%] my-3 opacity-[0.7]"></div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style></style>
