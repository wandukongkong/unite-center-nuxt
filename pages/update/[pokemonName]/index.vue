<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useDayjs } from "#dayjs";

// store
import { useCommonStore } from "../../stores/commonStore";

// json
const { unitePokemonList } = storeToRefs(useCommonStore());

// use
const router = useRouter();
const dayjs = useDayjs();

// local state
const selectedPokemonInfo = computed(() =>
  unitePokemonList.value.find(
    (unitePokemonInfo) =>
      unitePokemonInfo.name === router.currentRoute.value.params.pokemonName
  )
);

const selectedPokemonDetailList = computed(() => {
  return selectedPokemonInfo.value.updatedList.sort((a, b) => {
    const aDateNumber = Number(
      dayjs(a.updatedDate, "YYYY-MM-DD").format("YYYYMMDD")
    );
    const bDateNumber = Number(
      dayjs(b.updatedDate, "YYYY-MM-DD").format("YYYYMMDD")
    );

    return aDateNumber < bDateNumber ? 1 : -1;
  });
});

const convertedSkillInfo = computed(() => {
  return selectedPokemonDetailList.value.reduce(
    (result, selectedPokemonDetailInfo) => {
      (selectedPokemonDetailInfo?.updatedContentList || []).forEach(
        (updatedContentInfo) => {
          if (!result?.[updatedContentInfo?.updatedName]) {
            result[updatedContentInfo?.updatedName] = [];
          }

          result[updatedContentInfo?.updatedName].push(
            selectedPokemonDetailInfo
          );
        }
      );

      return result;
    },
    {}
  );
});
</script>
<template>
  <div class="flex ps-20 h-[100vh]">
    <div class="flex flex-col">
      <img
        :src="selectedPokemonInfo.image"
        class="rounded shadow-md m-3"
        width="200"
        style="object-fit: contain"
      />
      <div>
        <div
          v-for="(skillInfo, index) in selectedPokemonInfo.skillList"
          :key="index"
          class="flex justify-between px-4 items-center mb-2"
        >
          <div class="flex items-center">
            <img
              :src="skillInfo.image"
              class="me-2"
              width="30"
              style="object-fit: contain"
            />
            <strong
              class="truncate w-[140px]"
              :title="skillInfo.skillNameKo"
              style="font-size: 9pt"
              >{{ skillInfo.skillNameKo }}</strong
            >
          </div>
          <strong>
            {{
              (convertedSkillInfo?.[skillInfo.skillNameKo] || []).length
            }}</strong
          >
        </div>
      </div>
    </div>
    <!-- Detail 영역 -->
    <div class="flex flex-col flex-1 px-2" ref="detailArea">
      <div
        v-for="(updatedInfo, updatedInfoIndex) in selectedPokemonDetailList"
        :key="updatedInfoIndex"
        class="w-100 m-3 px-2 pt-2 rounded border shadow-md"
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
          class="m-5"
        >
          <div class="mb-1">- {{ updatedContentInfo.updatedName }}</div>
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
        <!-- <div class="border w-[100%] my-3 opacity-[0.7]"></div> -->
      </div>
    </div>
  </div>
</template>
<style></style>
