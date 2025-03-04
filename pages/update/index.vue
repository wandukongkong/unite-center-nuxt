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

// use
const { isMobile } = useDevice();
const router = useRouter();

// state
const container = toRef();
const detailArea = toRef();
const isOpenDtail = toRef(false);
const selectedPokemonInfo = toRef({});

// motion
// container motion
const { motionProperties: containerMotionProperties } =
  useMotionProperties(container);
const { apply: applyContainerMotion } = useMotionControls(
  containerMotionProperties,
  {
    initial: {
      scale: 1,
      opacity: 0,
    },
    enter: {
      x: 0,
      opacity: 1,
    },
    leave: {
      x: 15,
      // bounce: 4,
      transition: {
        duration: 150,
        ease: "easyOut",
        repeatDelay: 0,
        // repeatType: "reverse",
      },
    },
    leave2: {
      x: -200,
      opacity: 0,
      bounce: 0,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 25,
        mass: 0.5,
      },
    },
  }
);

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

const groupedPokemonList = toRef([]);

// const groupedPokemonList = computed(() => {
//   // 날짜 별로 Group
//   const groupedPokemonInfo = unitePokemonList.value.reduce(
//     (result, unitePokemonInfo) => {
//       const lastUpdatedDate = unitePokemonInfo.updatedList
//         .sort((a, b) => {
//           const aUpdatedDateNumber = Number(
//             dayjs(a.updatedDate, "YYYY-MM-DD").format("YYYYMMDD")
//           );
//           const bUpdatedDateNumber = Number(
//             dayjs(b.updatedDate, "YYYY-MM-DD").format("YYYYMMDD")
//           );

//           return aUpdatedDateNumber < bUpdatedDateNumber ? 1 : -1;
//         })
//         .at(0).updatedDate;

//       if (!result[lastUpdatedDate]) {
//         result[lastUpdatedDate] = [];
//       }

//       result[lastUpdatedDate].push(unitePokemonInfo);

//       return result;
//     },
//     {}
//   );

//   // 배열로 변환
//   return Object.keys(groupedPokemonInfo)
//     .sort((a, b) =>
//       Number(dayjs(a, "YYYY-MM-DD").format("YYYYMMDD")) <
//       Number(dayjs(b, "YYYY-MM-DD").format("YYYYMMDD"))
//         ? 1
//         : -1
//     )
//     .map((key) => ({
//       updatedDate: key,
//       pokemonList: groupedPokemonInfo[key],
//     }));
// });

const setGrouppedPokemonList = () => {
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
  groupedPokemonList.value = Object.keys(groupedPokemonInfo)
    .sort((a, b) =>
      Number(dayjs(a, "YYYY-MM-DD").format("YYYYMMDD")) <
      Number(dayjs(b, "YYYY-MM-DD").format("YYYYMMDD"))
        ? 1
        : -1
    )
    .map((key) => ({
      updatedDate: key,
      pokemonList: [],
    }));

  groupedPokemonList.value.forEach((info, iindex) => {
    groupedPokemonInfo[info.updatedDate].forEach((pokemonInfo, index) => {
      setTimeout(
        () => {
          info.pokemonList.push(pokemonInfo);
        },
        iindex * 150 + index * 50
      );
    });
  });
};

// click card event
const clickPokemonCard = async (pokemonInfo) => {
  await applyContainerMotion("leave");
  await applyContainerMotion("leave2");
  router.push(`/update/${pokemonInfo.name}`);
};

onBeforeMount(() => {
  applyContainerMotion("initial");
});

onMounted(() => {
  applyContainerMotion("enter");
  setGrouppedPokemonList();
});
</script>
<template>
  <div ref="container">
    <div class="absolute">
      <!-- TODO: 검색 영역 -->
      <!-- <div class="flex flex-col items-end w-[100%] px-8 mt-[10px] mb-2">
      <UInput class="w-[100%] mb-2 opacity-0"></UInput>
    </div> -->

      <!-- 리스트 영역 -->
      <Transition>
        <div
          class="reative flex flex-col justify-start py-3 bg-transparent"
          :class="isMobile ? 'mt-10' : ''"
        >
          <Transition-group>
            <div
              v-for="(groupedPokemonInfo, index) in groupedPokemonList"
              :key="index"
              :class="isMobile ? 'ms-5' : 'ms-20'"
            >
              <div v-if="groupedPokemonInfo.pokemonList.length > 0">
                <strong>{{ groupedPokemonInfo.updatedDate }}</strong>
              </div>
              <div class="flex flex-wrap mb-5">
                <TransitionGroup name="bounce">
                  <div
                    v-for="(
                      pokemonInfo, pokemonListIndex
                    ) in groupedPokemonInfo.pokemonList"
                    :key="pokemonListIndex"
                    class="m-2"
                  >
                    <PokemonCard
                      class="relative flex hover:scale-[1.05] hover:shadow-xl hover:shadow-gray-400 shadow-md shadow-gray-400 ease-out duration-200 cursor-pointer rounded w-[90px] h-[105px]"
                      @click="() => clickPokemonCard(pokemonInfo)"
                    >
                      <NuxtImg
                        v-if="
                          pokemonInfo.updatedList.length === 1 &&
                          (
                            pokemonInfo.updatedList[0]?.['updateStates'] || []
                          ).includes('new')
                        "
                        src="/img/icon/new.png"
                        class="h-10 absolute start-[-15px] top-[-22px]"
                        style=""
                      ></NuxtImg>
                      <NuxtImg
                        :title="pokemonInfo?.nameKo"
                        :src="pokemonInfo.image"
                        class="rounded pattern ease-out w-[100%] duration-200"
                        placeholder-class="custom-test"
                        placeholder="/img/unitePokemon/roster-default-2x.png"
                        style="-webkit-user-drag: none"
                        :style="{ backgroundColor: pokemonInfo.color }"
                      />
                      <div
                        class="absolute bottom-0 w-[100%] flex justify-end mb-2"
                      >
                        <div
                          v-for="(state, index) in pokemonInfo.updatedList.find(
                            (updateInfo) =>
                              updateInfo.updatedDate ===
                              groupedPokemonInfo.updatedDate
                          )?.updateStates || []"
                          :key="index"
                          class="bg-white rounded-full border-2 border-gray-400 me-1 shadow-md shadow-gray-600"
                        >
                          <NuxtImg
                            v-if="state === 'buff'"
                            src="/img/icon/up-arrow.png"
                            class="h-4"
                            style="padding: 2px"
                          ></NuxtImg>
                          <NuxtImg
                            v-if="state === 'nurf'"
                            src="/img/icon/down-arrow.png"
                            class="h-4"
                            style="padding: 2px"
                          ></NuxtImg>
                          <NuxtImg
                            v-if="state === 'adjust'"
                            src="/img/icon/adjust.png"
                            class="h-4"
                            style="padding: 2px"
                          ></NuxtImg>
                        </div>
                      </div>
                    </PokemonCard>
                  </div>
                </TransitionGroup>
              </div>
              <!-- <div class="border w-[97%] my-3 opacity-[0.7]"></div> -->
            </div>
          </Transition-group>
        </div>
      </Transition>
    </div>
  </div>
</template>
<style>
.custom-test:not(.my-placeholder-class) {
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>
