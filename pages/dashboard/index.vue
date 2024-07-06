<script setup>
import { toRef, computed, watch } from "vue";

import { useDayjs } from "#dayjs";
// json
import unitePokemonList from "../../json/unitePokemonList.json";

// use
const dayjs = useDayjs();

const unitePokemonListClone = toRef(
  JSON.parse(JSON.stringify(unitePokemonList))
);

// 포지션별 카운트 차트 옵션
const positionPokemonChartOption = computed(() => {
  const groupedUnitePokemonInfo = unitePokemonListClone.value.reduce(
    (result, unitePokemonInfo) => {
      if (!result?.[unitePokemonInfo.position]) {
        result[unitePokemonInfo.position] = [];
      }

      result[unitePokemonInfo.position].push(unitePokemonInfo);

      return result;
    },
    {}
  );

  const series = Object.keys(groupedUnitePokemonInfo).map((positionName) => {
    return {
      type: "bar",
      name: positionName,
      data: [(groupedUnitePokemonInfo?.[positionName] || []).length],
      cursor: "default",
    };
  });

  const colors = Object.keys(groupedUnitePokemonInfo).map(
    (positionName) => (groupedUnitePokemonInfo?.[positionName] || [])[0]?.color
  );

  return {
    grid: {
      top: 20,
      left: 0,
      right: 0,
      bottom: 0,
    },
    label: {
      show: true,
      position: "top",
      fontWeight: "bold",
    },
    legend: {
      show: false,
      selected: groupedUnitePokemonInfo,
    },
    tooltip: {
      show: false,
      className: "echarts-tooltip",
    },
    xAxis: {
      type: "category",

      axisLabel: {
        show: false,
        interval: 0,
        rotate: 60,
      },
    },
    yAxis: {},
    itemStyle: {
      borderRadius: 3,
    },
    color: colors,
    series: series,
  };
});

// 가장 업데이트가 많은 포켓몬
const mostUpdatedPokemonInfo = computed(() => {
  return unitePokemonListClone.value.sort((a, b) =>
    a.updatedList.length < b.updatedList.length ? 1 : -1
  )?.[0];
});

// 가장 업데이트가 적은 포켓몬
const leastUpdatedPokemonInfo = computed(() => {
  return unitePokemonListClone.value
    .filter((unitePokemonInfo) => unitePokemonInfo.updatedList.length > 1)
    .sort((a, b) =>
      a.updatedList.length > b.updatedList.length ? 1 : -1
    )?.[0];
});

// 가장 최신 업데이트 포켓몬
const latestUpdatePokemonList = computed(() => {
  const groupedUnitePokemonInfo = unitePokemonListClone.value.reduce(
    (result, unitePokemonInfo) => {
      unitePokemonInfo.updatedList.forEach((updateInfo) => {
        if (!result?.[updateInfo.updatedDate]) {
          result[updateInfo.updatedDate] = [];
        }

        result[updateInfo.updatedDate].push(unitePokemonInfo);
      });

      return result;
    },
    {}
  );

  const lastesUpdateDate =
    Object.keys(groupedUnitePokemonInfo).sort((a, b) =>
      Number(dayjs(a, "YYYY-MM-DD").format("YYYYMMDD")) <
      Number(dayjs(b, "YYYY-MM-DD").format("YYYYMMDD"))
        ? 1
        : -1
    )?.[0] || "";

  return groupedUnitePokemonInfo[lastesUpdateDate];
});
</script>
<template>
  <div class="flex flex-wrap px-20 pt-3">
    <!-- layer1 -->
    <div class="">
      <!-- 포지션 별 카운트 차트 -->
      <div
        class="border rounded px-5 py-2 m-2 shadow-md hover:scale-[1.03] hover:shadow-2xl ease-out duration-300"
      >
        <div class="text-sm font-mono mb-2 font-bold">Position Count</div>
        <div class="w-[300px] h-[200px] mb-2 ms-2">
          <VChart :option="positionPokemonChartOption" />
        </div>
      </div>
      <!-- 업데이트가 가장 많은 포켓몬 -->
      <div
        class="border rounded px-5 py-2 m-2 shadow-md hover:scale-[1.03] hover:shadow-2xl ease-out duration-300"
      >
        <div class="text-sm font-mono mb-2 font-bold">Most updated Pokemon</div>
        <div class="w-[300px] h-[150px] mb-2 ms-2 flex items-center">
          <img
            :src="mostUpdatedPokemonInfo.image"
            class="h-[100%] flex-1 border rounded-xl shadow-md bg-gradient-to-b from-slate-300 to-transparent"
            style="object-fit: contain"
          />
          <div class="flex flex-1 justify-center font-bold text-5xl">
            {{ mostUpdatedPokemonInfo.updatedList.length }}
          </div>
        </div>
      </div>
      <!-- 업데이트가 가장 적은 포켓몬 -->
      <div
        class="border rounded px-5 py-2 m-2 shadow-md hover:scale-[1.03] hover:shadow-2xl ease-out duration-300"
      >
        <div class="text-sm font-mono mb-2 font-bold">
          Least updated pokemon
        </div>
        <div class="w-[300px] h-[150px] mb-2 ms-2 flex items-center">
          <img
            :src="leastUpdatedPokemonInfo.image"
            class="h-[100%] flex-1 border rounded-md shadow-md bg-gradient-to-b from-slate-300 to-transparent"
            style="object-fit: contain"
          />
          <div class="flex flex-1 justify-center font-bold text-5xl">
            {{ leastUpdatedPokemonInfo.updatedList.length }}
          </div>
        </div>
      </div>
    </div>
    <!-- layer2 -->
    <div class="">
      <!-- 가장 최근에 업데이트 된 포켓몬 -->
      <div
        class="border rounded px-5 py-2 m-2 shadow-xl hover:scale-[1.03] hover:shadow-2xl ease-out duration-300"
      >
        <div class="text-sm font-mono mb-2 font-bold">
          Latest updated pokemon
        </div>
        <div class="flex content-start flex-wrap w-[300px] mb-2 ms-2">
          <div
            v-for="(latestUpdatePokemonInfo, index) in latestUpdatePokemonList"
            :key="index"
            class="pattern shadow-md rounded-xl m-1 w-[50px] h-[57px]"
            :style="{ backgroundColor: latestUpdatePokemonInfo.color }"
          >
            <UTooltip :text="latestUpdatePokemonInfo.nameKo">
              <img
                :src="latestUpdatePokemonInfo.image"
                class="rounded-xl"
                style="object-fit: fill"
              />
            </UTooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
