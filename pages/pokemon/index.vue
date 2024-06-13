<script setup>
import { toRef, computed, watch, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useDayjs } from "#dayjs";
import { useSpring, useMotionProperties } from "@vueuse/motion";

// store
import { useCommonStore } from "../../stores/commonStore";

// json
const dayjs = useDayjs();
const { unitePokemonList } = storeToRefs(useCommonStore());

// state
const detailArea = toRef();
const isOpenDtail = toRef(false);
const selectedPokemonInfo = toRef({});

// motion

const { motionProperties: detailAreaMotionProperties } = useMotionProperties(
  detailArea,
  {
    opacity: 0,
    x: -500,
  }
);

const { set: setDetailMotion } = useSpring(detailAreaMotionProperties, {
  duration: 500,
  transform: {
    delay: 3000,
  },
});

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

// TODO: click card event
const clickPokemonCard = (pokemonInfo) => {
  selectedPokemonInfo.value = pokemonInfo;
  isOpenDtail.value = true;

  setDetailMotion({
    opacity: 1,
    x: 0,
  });
};
</script>
<template>
  <div class="ps-5">
    <!-- TODO: 검색 영역 -->
    <div class="flex flex-col items-end w-[100%] px-8 mt-[10px] mb-2">
      <UInput class="w-[100%] mb-2 opacity-0"></UInput>
      <!-- <div>정렬</div> -->
    </div>

    <!-- TODO: 리스트 영역 -->
    <Transition>
      <div v-if="!isOpenDtail" class="reative flex flex-col justify-start py-3">
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
                @click="() => clickPokemonCard(pokemonInfo)"
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
    </Transition>

    <!-- TODO: Detail 영역 -->
    <div class="flex opacity-0" ref="detailArea">
      <div>
        <PokemonCard class="relative transition-transform">
          <img
            :src="selectedPokemonInfo.image"
            class="absolute top-0 start-0 rounded-lg"
            style="-webkit-user-drag: none; object-fit: fill"
          />
        </PokemonCard>
      </div>
      <div>
        <div
          v-for="(
            updatedInfo, updatedInfoIndex
          ) in selectedPokemonInfo.updatedList"
          :key="updatedInfoIndex"
          class="px-10"
        >
          <div class="mb-2">
            <strong>
              {{ updatedInfo.updatedDate }}
            </strong>
          </div>
          <div
            v-for="(
              updatedContentInfo, updatedContentInfoIndex
            ) in updatedInfo.updatedContentList"
            :key="updatedContentInfoIndex"
            class="m-3"
          >
            <div>- {{ updatedContentInfo.updatedName }}</div>
            <div>
              <div
                v-for="(
                  updatedContent, updatedContentIndex
                ) in updatedContentInfo.updatedContents"
                :key="updatedContentIndex"
              >
                {{ updatedContent }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
