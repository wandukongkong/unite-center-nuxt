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
</script>
<template>
  <div class="flex ps-20 h-[100vh]">
    <div class="flex flex-col">
      <img
        :src="selectedPokemonInfo.image"
        class="rounded"
        width="200"
        style="object-fit: contain"
      />
      <!-- <div class="bg-gradient-to-b from-[#afafaf] to-transparent h-[50px]">
        <strong class="text-white">
          {{ router.currentRoute.value.params.pokemonName }}
        </strong>
      </div> -->
    </div>
    <!-- TODO: Detail 영역 -->
    <div class="flex p-2" ref="detailArea">
      <!-- <div>
        <PokemonCard class="relative transition-transform">
          <img :src="selectedPokemonInfo.image" />
        </PokemonCard>
      </div> -->
      <div>
        <div
          v-for="(updatedInfo, updatedInfoIndex) in selectedPokemonDetailList"
          :key="updatedInfoIndex"
          class="px-10 w-[1200px]"
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
          <div class="border w-[100%] my-3 opacity-[0.7]"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
