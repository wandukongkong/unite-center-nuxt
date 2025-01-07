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
const { isMobile } = useDevice();
const dayjs = useDayjs();

// motion
// container motion
const pokemonImage = toRef();
const { motionProperties: pokemonImageMotionProperties } =
  useMotionProperties(pokemonImage);
const { apply: applyPokemonImageMotion } = useMotionControls(
  pokemonImageMotionProperties,
  {
    initial: {
      scale: 1,
      opacity: 0,
      x: -200,
    },
    enter: {
      x: 0,
      opacity: 1,
      type: "spring",
      bounce: 4,
      transition: {
        type: "spring",
        stiffness: 100,
        // damping: 25,
        mass: 0.5,
      },
    },
  }
);

// local state
const selectedPokemonInfo = computed(() =>
  unitePokemonList.value.find(
    (unitePokemonInfo) =>
      unitePokemonInfo.name === router.currentRoute.value.params.pokemonName
  )
);

// const selectedPokemonDetailList = computed(() => {
//   return selectedPokemonInfo.value.updatedList.sort((a, b) => {
//     const aDateNumber = Number(
//       dayjs(a.updatedDate, "YYYY-MM-DD").format("YYYYMMDD")
//     );
//     const bDateNumber = Number(
//       dayjs(b.updatedDate, "YYYY-MM-DD").format("YYYYMMDD")
//     );

//     return aDateNumber < bDateNumber ? 1 : -1;
//   });
// });

const selectedPokemonDetailList = toRef([]);

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

const setConvertedPokemonUpdateList = () => {
  selectedPokemonInfo.value.updatedList
    .sort((a, b) => {
      const aDateNumber = Number(
        dayjs(a.updatedDate, "YYYY-MM-DD").format("YYYYMMDD")
      );
      const bDateNumber = Number(
        dayjs(b.updatedDate, "YYYY-MM-DD").format("YYYYMMDD")
      );

      return aDateNumber < bDateNumber ? 1 : -1;
    })
    .forEach((updatedInfo, index) => {
      setTimeout(() => {
        selectedPokemonDetailList.value.push(updatedInfo);
      }, index * 150);
    });
};

onBeforeMount(() => {
  applyPokemonImageMotion("initial");
});

onMounted(() => {
  applyPokemonImageMotion("enter");

  setConvertedPokemonUpdateList();
});
</script>
<template>
  <div class="flex" :class="isMobile ? 'pt-10' : 'ps-20'">
    <div v-if="!isMobile" class="flex flex-col">
      <NuxtImg
        ref="pokemonImage"
        :src="selectedPokemonInfo.image"
        placeholder="/img/unitePokemon/roster-default-2x.png"
        class="rounded shadow-md m-3"
        width="200"
        style="object-fit: contain"
      />
    </div>
    <!-- Detail 영역 -->
    <div class="flex flex-col flex-1 px-2 pb-2" ref="detailArea">
      <TransitionGroup name="bounce">
        <div
          v-for="(updatedInfo, updatedInfoIndex) in selectedPokemonDetailList"
          :key="updatedInfoIndex"
          class="w-100 m-2 px-2 pt-2 rounded border shadow-md"
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
            <div class="mb-1">- {{ updatedContentInfo.updatedNameKo }}</div>
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
      </TransitionGroup>
    </div>
  </div>
</template>
<style></style>
