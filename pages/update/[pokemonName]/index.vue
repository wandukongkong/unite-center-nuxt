<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";

// store
import { useCommonStore } from "../../stores/commonStore";

// json
const { unitePokemonList } = storeToRefs(useCommonStore());

// use
const router = useRouter();

// local state
const selectedPokemonInfo = computed(() =>
  unitePokemonList.value.find(
    (unitePokemonInfo) =>
      unitePokemonInfo.name === router.currentRoute.value.params.pokemonName
  )
);
</script>
<template>
  <div class="ps-20 h-[100vh]">
    <!-- <div class="flex justify-start w-[100%] h-[200px] fixed">
      <img :src="selectedPokemonInfo.image" />
    </div> -->
    <!-- TODO: Detail 영역 -->
    <div class="flex p-2" ref="detailArea">
      <div>
        <PokemonCard class="relative transition-transform">
          <img :src="selectedPokemonInfo.image" />
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
