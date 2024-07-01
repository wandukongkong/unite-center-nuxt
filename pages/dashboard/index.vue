<script setup>
import { toRef, computed } from "vue";

// json
import unitePokemonList from "../../json/unitePokemonList.json";

const unitePokemonListClone = toRef(
  JSON.parse(JSON.stringify(unitePokemonList))
);

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
</script>
<template>
  <div class="flex flex-wrap px-20 pt-3">
    <div
      class="border rounded px-5 py-2 shadow-xl hover:scale-[1.03] hover:shadow-2xl ease-out duration-300"
    >
      <!-- <div class="font-mono font-bold text-sm mb-2">Position</div> -->
      <div class="w-[300px] h-[200px] mb-2">
        <VChart :option="positionPokemonChartOption" />
      </div>
    </div>
  </div>
</template>
<style></style>
