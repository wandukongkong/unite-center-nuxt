<script setup>
import { toRef, onMounted, onBeforeMount, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useMotionProperties, useMotionControls } from "@vueuse/motion";

// store
import { usePickStore } from "@/stores/pickStore";

// json
import unitePokemonListJson from "@/json/unitePokemonList.json";

// store state
const {
  isBanEx,
  isDuplicatedPokemon,
  isActiveUserInput,
  isOnlyShufflePokemon,
  isBanGlobal,
  selectedMode,
  selectedBanPokemonInfo,
  userTags,
} = storeToRefs(usePickStore());
const { isMobile } = useDevice();
const router = useRouter();
const colorMode = useColorMode();

// state
const versusVRef = toRef(null);
const versusSRef = toRef(null);

const isOpenUserInputModal = toRef(false);
const isOpenBanPokemonModal = toRef(false);
const isLoading = toRef(true);
const selectedCardList = toRef([]);
const selectedUsers = toRef([]);
const clickedCardIndex = toRef(-1);
const clickedCardTagIndex = toRef(-1);
const isDuplicateUserName = toRef(false);
const defaultArray = toRef([]);
const unitePokemonList = toRef([...unitePokemonListJson]);
const modalInputValue = toRef("");
const originModalInputValue = toRef("");
const banSearchInputValue = toRef("");
const selectedBanCardNumber = toRef(0);
const selectedFirstBanPokemonInfo = toRef({});
const selectedSecondBanPokemonInfo = toRef({});
const selectedThirdBanPokemonInfo = toRef({});
const defaultCardList = toRef([
  {
    cardNumber: 0,
    position: [330, 200],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 5,
    position: [330, -200],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 1,
    position: [110, 200],
    name: "",
    color: "",
    image: "",
  },
 {
    cardNumber: 6,
    position: [110, -200],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 2,
    position: [-110, 200],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 7,
    position: [-110, -200],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 3,
    position: [-330, 200],
    name: "",
    color: "",
    image: "",
  },
{
    cardNumber: 8,
    position: [-330, -200],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 4,
    position: [-550, 200],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 9,
    position: [-550, -200],
    name: "",
    color: "",
    image: "",
  },
]);

const defaultCardListClone = toRef([
  {
    cardNumber: 0,
    position: [330, 200],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 1,
    position: [110, 200],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 2,
    position: [-110, 200],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 3,
    position: [-330, 200],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 4,
    position: [-550, 200],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 5,
    position: [330, -200],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 6,
    position: [110, -200],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 7,
    position: [-110, -200],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 8,
    position: [-330, -200],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 9,
    position: [-550, -200],
    name: "",
    color: "",
    image: "",
  },
]);

const filteredUnitePokemonList = computed(() => {
  return banSearchInputValue.value === ""
    ? unitePokemonListJson
    : unitePokemonListJson.filter((unitePokemonInfo) =>
        unitePokemonInfo.nameKo
          .toLocaleLowerCase()
          .trim()
          .includes(banSearchInputValue.value.toLocaleLowerCase().trim())
      );
});

// Object Properties
const { motionProperties: vuersusVMotionProperties } =
  useMotionProperties(versusVRef);
const { motionProperties: vuersusSMotionProperties } =
  useMotionProperties(versusSRef);

// Motion Event
const { apply: applyVersusVMotion } = useMotionControls(
  vuersusVMotionProperties,
  {
    initial: {
      opacity: 0,
      // scale: 0.16,
      width: 80,
      x: -80,
      y: -100,
    },
    enter: {
      opacity: 1,
      // scale: 0.16,
      x: -110,
      y: 5,
      transition: {
        delay: 600,
      },
    },
    leave: {
      opacity: 0,
      transition: {
        delay: 0,
      },
    },
  }
);
const { apply: applyVersusSMotion } = useMotionControls(
  vuersusSMotionProperties,
  {
    initial: {
      opacity: 0,
      // scale: 0.7,
      // scale: 0.16,
      width: 80,
      x: -140,
      y: 100,
    },
    enter: {
      opacity: 1,
      // scale: 0.16,
      x: -110,
      y: 5,
      transition: {
        delay: 600,
      },
    },
    leave: {
      opacity: 0,
      transition: {
        delay: 0,
      },
    },
  }
);

// Suffle
const resetCardDeck = () => {
  isLoading.value = true;
  defaultArray.value = [];
  selectedCardList.value = [];

  let unitePokemonListClone = [...unitePokemonList.value];

  applyVersusVMotion("leave");
  applyVersusSMotion("leave");

  // Ban 체크
  if (isBanGlobal.value) {
    unitePokemonListClone = unitePokemonListClone.filter((unitePokemonInfo) => {
      const banPokemonNamese = Object.keys(selectedBanPokemonInfo.value).map(
        (key) => selectedBanPokemonInfo.value?.[key]?.name || ""
      );

      return !banPokemonNamese.includes(unitePokemonInfo.name);
    });
  }

  // 포켓몬 포지션 체크
  unitePokemonListClone = unitePokemonListClone
    .filter(
      (unitePokemonInfo) =>
        unitePokemonInfo.position === selectedMode.value ||
        selectedMode.value === "default"
    )
    .sort(() => crypto.getRandomValues(new Uint32Array(1)) / 2 ** 32 - 0.5)
    .sort(() => crypto.getRandomValues(new Uint32Array(1)) / 2 ** 32 - 0.5)
    .sort(() => crypto.getRandomValues(new Uint32Array(1)) / 2 ** 32 - 0.5);

  // 카드의 수가 부족할 경우, 중복 강제 적용
  if (unitePokemonListClone.length < 10) {
    isDuplicatedPokemon.value = true;
  }

  // Ex 벤 체크
  if (isBanEx.value) {
    unitePokemonListClone = unitePokemonListClone
      .filter((unitePokemonInfo) => !unitePokemonInfo.isEx)
      .sort(() => crypto.getRandomValues(new Uint32Array(1)) / 2 ** 32 - 0.5)
      .sort(() => crypto.getRandomValues(new Uint32Array(1)) / 2 ** 32 - 0.5)
      .sort(() => crypto.getRandomValues(new Uint32Array(1)) / 2 ** 32 - 0.5);
  }

  // 중복 포켓몬 체크
  if (isDuplicatedPokemon.value) {
    const aTeamPokemonList = unitePokemonListClone
      .sort(() => crypto.getRandomValues(new Uint32Array(1)) / 2 ** 32 - 0.5)
      .sort(() => crypto.getRandomValues(new Uint32Array(1)) / 2 ** 32 - 0.5)
      .sort(() => crypto.getRandomValues(new Uint32Array(1)) / 2 ** 32 - 0.5)
      .slice(0, 5);

    const bTeamPokemonList = unitePokemonListClone
      .sort(() => crypto.getRandomValues(new Uint32Array(1)) / 2 ** 32 - 0.5)
      .sort(() => crypto.getRandomValues(new Uint32Array(1)) / 2 ** 32 - 0.5)
      .sort(() => crypto.getRandomValues(new Uint32Array(1)) / 2 ** 32 - 0.5)
      .slice(0, 5);

    unitePokemonListClone = [...aTeamPokemonList, ...bTeamPokemonList];
  }

  // 유저 입력 체크
  if (isActiveUserInput.value) {
    const deffUsers = 10 - userTags.value.length;
    let userTagsClone = [...userTags.value];

    if (userTags.value.length < 10) {
      userTagsClone = [
        ...userTagsClone,
        ...Array(deffUsers).fill("AI Trainer"),
      ];
    }

    if (isOnlyShufflePokemon.value) {
      selectedUsers.value = [...userTagsClone];
    } else {
      selectedUsers.value = [...userTagsClone]
        .sort(() => crypto.getRandomValues(new Uint32Array(1)) / 2 ** 32 - 0.5)
        .sort(() => crypto.getRandomValues(new Uint32Array(1)) / 2 ** 32 - 0.5)
        .sort(() => crypto.getRandomValues(new Uint32Array(1)) / 2 ** 32 - 0.5);
    }
  }

  // 카드에 맞게 리스트 가공
  unitePokemonListClone = unitePokemonListClone.map(
    (unitePokemonInfo, index) => ({
      cardNumber: index,
      position: defaultCardList.value[index]?.position,
      name: unitePokemonInfo.name,
      nameKo: unitePokemonInfo.nameKo,
      color: unitePokemonInfo.color,
      image: unitePokemonInfo.image,
    })
  );

  setTimeout(() => {
    defaultArray.value = unitePokemonListClone.slice(0, 10);
  }, 300);

  setTimeout(() => {
    isLoading.value = false;
    applyVersusVMotion("initial");
    applyVersusSMotion("initial");
  }, 1700);
};

// 덱 카드 클릭 이벤트
const clickCardDeck = (cardInfo) => {
  selectedCardList.value.push(cardInfo);
  defaultArray.value = defaultArray.value.slice(0, -1);

  if (selectedCardList.value.length >= 10) {
    applyVersusVMotion("enter");
    applyVersusSMotion("enter");
  }
};

// 픽된 카드 클릭 이벤트
const clickCard = (cardIndex) => {
  isOpenUserInputModal.value = true;

  modalInputValue.value = selectedUsers.value[cardIndex];
  originModalInputValue.value = selectedUsers.value[cardIndex];
  clickedCardIndex.value = cardIndex;
  clickedCardTagIndex.value = userTags.value.findIndex(
    (tagValue) => tagValue === modalInputValue.value
  );
};

// 모달창 save 이벤트
const changeUser = () => {
  // isDuplicateUserName.value =
  //   userTags.value.findIndex(
  //     (tagValue) => tagValue === modalInputValue.value
  //   ) !== -1;

  const convertedUserTags = userTags.value.map((tagValue, index) => {
    return index === clickedCardTagIndex.value
      ? modalInputValue.value
      : tagValue;
  });

  if (clickedCardTagIndex !== -1 && !isDuplicateUserName.value) {
    userTags.value = convertedUserTags;
    selectedUsers.value[clickedCardIndex.value] = modalInputValue.value;
    isOpenUserInputModal.value = false;
  }
};

watch(
  () => isOpenUserInputModal.value,
  () => {
    if (isOpenUserInputModal.value === false) {
      isDuplicateUserName.value = false;
    }
  }
);

onMounted(() => {
  // defaultArray.value = defaultCardList.value;
  resetCardDeck();
});

const tagInputHandler = (itmes) => {
  userTags.value = itmes;

  resetCardDeck();
};

onBeforeMount(() => {
  applyVersusVMotion("initial");
  applyVersusSMotion("initial");
});
</script>
<template>
  <div class="relative select-none" style="-webkit-user-drag: none">
    <div
      v-if="isActiveUserInput"
      class="absolute flex justify-start items-center py-3 z-40 opacity-0"
      v-motion
      :initial="{
        x: 100,
        y: -100,
        opacity: 0,
      }"
      :enter="{
        x: 100,
        y: 0,
        opacity: 1,
      }"
    >
      <TagInput
        :tags="userTags"
        limit="10"
        placeholder="유저 입력 Enter ↵"
        @change-tags="tagInputHandler"
      ></TagInput>
    </div>
    <div class="relative min-h-screen flex justify-center items-center">
      <div
        v-if="isBanGlobal"
        class="absolute opacity-0"
        v-motion
        :initial="{
          opacity: 0,
          x: 650,
          y: -190,
        }"
        :enter="{
          opacity: isBanGlobal ? 1 : 0,
          x: 650,
          y: -180,
          transition: {
            delay: 1900,
            damping: 15,
            mass: 0.1,
          },
        }"
      >
        <div class="w-[100%] text-center font-bold text-gray-400 font-sans">
          <small>금지 포켓몬 </small>
        </div>
        <div class="w-[100%] border rounded mt-1 mb-3"></div>
        <div class="flex justify-between">
          <div
            class="relative me-2 w-[50px] h-[56px]"
            @click="
              () => {
                selectedBanCardNumber = 1;
                isOpenBanPokemonModal = true;
              }
            "
          >
            <PokemonCard
              v-if="selectedBanPokemonInfo[1].image"
              class="w-[100%] h-[100%] rounded border shadow-md shadow-gray-400 mb-2 cursor-pointer hover:scale-[1.1] hover:shadow-lg transition ease-in-out duration-200 bg-zinc-100"
              :style="{
                backgroundColor: selectedBanPokemonInfo[1].color,
              }"
            >
              <NuxtImg
                class="rounded pattern"
                :src="selectedBanPokemonInfo[1].image"
                placeholder="/img/unitePokemon/roster-default-2x.png"
              ></NuxtImg>
            </PokemonCard>
            <button
              v-else
              class="w-[100%] h-[100%] text-zinc-600 shadow-md rounded shadow-gray-400 mb-2 cursor-pointer hover:scale-[1.1] hover:shadow-lg transition ease-in-out duration-200"
            >
              <UIcon name="i-heroicons-plus-16-solid" class="w-5 h-5" />
            </button>
          </div>
          <div
            class="relative me-2 w-[50px] h-[56px]"
            @click="
              () => {
                selectedBanCardNumber = 2;
                isOpenBanPokemonModal = true;
              }
            "
          >
            <PokemonCard
              v-if="selectedBanPokemonInfo[2].image"
              class="w-[100%] h-[100%] rounded border shadow-md shadow-gray-400 mb-2 cursor-pointer hover:scale-[1.1] hover:shadow-lg transition ease-in-out duration-200 bg-zinc-100"
              :style="{
                backgroundColor: selectedBanPokemonInfo[2].color,
              }"
            >
              <NuxtImg
                class="rounded pattern"
                :src="selectedBanPokemonInfo[2].image"
                placeholder="/img/unitePokemon/roster-default-2x.png"
              ></NuxtImg>
            </PokemonCard>
            <button
              v-else
              class="w-[100%] h-[100%] text-zinc-600 shadow-md rounded shadow-gray-400 mb-2 cursor-pointer hover:scale-[1.1] hover:shadow-lg transition ease-in-out duration-200"
            >
              <UIcon name="i-heroicons-plus-16-solid" class="w-5 h-5" />
            </button>
          </div>
          <div
            class="relative w-[50px] h-[56px]"
            @click="
              () => {
                selectedBanCardNumber = 3;
                isOpenBanPokemonModal = true;
              }
            "
          >
            <PokemonCard
              v-if="selectedBanPokemonInfo[3].image"
              class="w-[100%] h-[100%] rounded border shadow-md shadow-gray-400 mb-2 cursor-pointer hover:scale-[1.1] hover:shadow-lg transition ease-in-out duration-200 bg-zinc-100"
              :style="{
                backgroundColor: selectedBanPokemonInfo[3].color,
              }"
            >
              <NuxtImg
                class="rounded pattern"
                :src="selectedBanPokemonInfo[3].image"
                placeholder="/img/unitePokemon/roster-default-2x.png"
              ></NuxtImg>
            </PokemonCard>
            <button
              v-else
              class="w-[100%] h-[100%] text-zinc-600 shadow-md rounded shadow-gray-400 mb-2 cursor-pointer hover:scale-[1.1] hover:shadow-lg transition ease-in-out duration-200"
            >
              <UIcon name="i-heroicons-plus-16-solid" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <!--  카드 덱 영역 -->
      <div
        v-for="(cardInfo, index) in defaultArray"
        :key="index"
        class="absolute cursor-pointer p-2"
        v-motion
        :initial="{
          scale: 1.2,
          opacity: 0,
          x: 650,
          y: -500,
          rotate: 0,
        }"
        :enter="{
          scale: 1,
          opacity: 1,
          x: 650,
          y: -index * 1.2,
          rotate: (Math.random() - 0.5) * 5,
          transition: {
            damping: 15,
            mass: 0.1,
            delay: index * 100,
          },
        }"
      >
        <PokemonCard
          class="card-back hover:scale-[1.05] hover:shadow-xl hover:shadow-gray-400 shadow-md shadow-gray-400 ease-out duration-200 cursor-pointer rounded"
          :class="isMobile ? 'w-[100px]' : 'w-[150px] h-[190px]'"
        >
          <div class="flex flex-col justify-center items-center h-[100%]">
            <NuxtImg
              src="/img/pokemon/uniteLogo.png"
              width="80"
              class="mb-3"
              loading="lazy"
            />
            <NuxtImg
              src="/img/pokemon/monsterball.png"
              width="60"
              loading="lazy"
            />
          </div>
        </PokemonCard>
        <div
          v-if="defaultArray.length === index + 1"
          class="absolute top-[14px] scale-[1.1]"
          :class="isMobile ? 'w-[100px]' : 'w-[150px] h-[190px]'"
          @click="
            () => {
              if (!isLoading) {
                clickCardDeck(cardInfo);
              }
            }
          "
        >
          <PokemonCard class="opacity-0"> </PokemonCard>
        </div>
      </div>
      <!-- 위쪽 카드 영역 -->
      <div
        v-for="(cardInfo, index) in selectedCardList.slice(0, 5)"
        :key="index"
        class="absolute"
        v-motion
        :initial="{
          opacity: 1,
          scale: 1,
          x: 650,
          y: 0,
        }"
        :enter="{
          opacity: 1,
          scale: 1.25,
          x: cardInfo?.position[0] ?? 0,
          y: cardInfo?.position[1] ?? 0,
          style: {
            paddingTop: 50,
          },
          transition: {
            damping: 15,
            mass: 0.1,
          },
        }"
      >
        <PokemonCard
          class="relative shadow-gray-400 rounded shadow-md ease-out duration-200"
          :class="`
            ${
              (selectedUsers?.[index] || '') !== 'AI Trainer'
                ? 'cursor-pointer hover:scale-[1.03]'
                : 'cursor-default'
            }
             ${isMobile ? 'w-[100px]' : 'w-[150px] h-[190px]'}
          `"
          @click="
            () => {
              if (
                (selectedUsers?.[index] || '') !== 'AI Trainer' &&
                isActiveUserInput
              ) {
                clickCard(index);
              }
            }
          "
        >
          <NuxtImg
            :src="cardInfo.image"
            placeholder="/img/unitePokemon/roster-default-2x.png"
            :title="cardInfo.nameKo"
            class="rounded pattern w-[100%] h-[100%]"
            style="-webkit-user-drag: none"
            :style="{ backgroundColor: cardInfo.color }"
            loading="lazy"
          />
          <div
            v-if="isActiveUserInput"
            class="absolute bottom-0 w-[100%] px-1 bg-gradient-to-r from-slate-800 to-transparent rounded-b-md text-white"
          >
            <strong>
              {{ selectedUsers[index] }}
            </strong>
          </div>
        </PokemonCard>
      </div>
      <!-- 아래쪽 카드 영역 -->
      <div
        v-for="(cardInfo, index) in selectedCardList.slice(5, 10)"
        :key="index"
        class="absolute"
        v-motion
        :initial="{
          opacity: 1,
          scale: 1,
          x: 650,
          y: 0,
        }"
        :enter="{
          opacity: 1,
          scale: 1.25,
          x: cardInfo?.position[0] ?? 0,
          y: cardInfo?.position[1] ?? 0,
          transition: {
            damping: 15,
            mass: 0.1,
          },
        }"
      >
        <PokemonCard
          class="relative shadow-gray-400 rounded shadow-md ease-out duration-200"
          :class="`${
            (selectedUsers?.[index + 5] || '') !== 'AI Trainer'
              ? 'cursor-pointer hover:scale-[1.03]'
              : 'cursor-default'
          } ${isMobile ? 'w-[100px]' : 'w-[150px] h-[190px]'}`"
          @click="
            () => {
              if (
                (selectedUsers?.[index + 5] || '') !== 'AI Trainer' &&
                isActiveUserInput
              ) {
                clickCard(index + 5);
              }
            }
          "
        >
          <NuxtImg
            :src="cardInfo.image"
            placeholder="/img/unitePokemon/roster-default-2x.png"
            :title="cardInfo.nameKo"
            class="rounded pattern w-[100%] h-[100%]"
            style="-webkit-user-drag: none"
            :style="{ backgroundColor: cardInfo.color }"
            loading="lazy"
          />
          <div
            v-if="isActiveUserInput"
            class="absolute bottom-0 w-[100%] px-1 bg-gradient-to-r from-slate-800 to-transparent rounded-b-md text-white"
          >
            <strong>
              {{ selectedUsers[index + 5] }}
            </strong>
          </div>
        </PokemonCard>
      </div>
      <!-- 버튼 영역 -->
      <div
        class="absolute flex flex-col items-center opacity-0"
        v-motion
        :initial="{
          opacity: 0,
          x: 650,
          y: 150,
        }"
        :enter="{
          opacity: 1,
          x: 650,
          y: 150,
          transition: {
            damping: 15,
            mass: 0.1,
          },
        }"
      >
        <div class="flex flex-col items-center">
          <div class="flex mb-3">
            <UButton
              class="w-[40px] h-[40px] mx-1 py-0 flex justify-center"
              :trailing-icon="
                isLoading ? '' : 'i-heroicons-arrow-path-16-solid'
              "
              :loading="isLoading"
              color="yellow"
              @click="() => resetCardDeck()"
            >
            </UButton>
            <UPopover>
              <UButton
                class="w-[40px] h-[40px] mx-1 py-0 flex justify-center border"
                color="white"
                trailing-icon="i-heroicons-cog-6-tooth"
              />
              <template #panel>
                <div class="relative">
                  <div class="px-4 py-2 flex flex-col">
                    <!-- <small class="truncate me-14 mb-2 opacity-[0.4]"
                      >타입 선택</small -->
                    <UDivider label="타입 선택" />
                    <div class="flex flex-wrap justify-start mt-3">
                      <UTooltip text="전체">
                        <UButton
                          class="bg-transparent hover:bg-[#ececec] m-1 w-[20px] h-[20px] rounded-sm flex justify-center items-center border-none shadow-none"
                          color="transparent"
                          :class="
                            selectedMode === 'default' ? 'bg-[#ececec]' : ''
                          "
                          @click="
                            () => {
                              selectedMode = 'default';
                              resetCardDeck();
                            }
                          "
                          ><div class="text-[#7e7e7e] mb-1">●</div></UButton
                        >
                      </UTooltip>
                      <UTooltip text="어택">
                        <UButton
                          class="bg-transparent hover:bg-[#ececec] m-1 w-[20px] h-[20px] rounded-sm flex justify-center items-center border-none shadow-none"
                          color="transparent"
                          :class="
                            selectedMode === 'attack' ? 'bg-[#ececec]' : ''
                          "
                          @click="
                            () => {
                              selectedMode = 'attack';
                              resetCardDeck();
                            }
                          "
                          ><div class="text-[#f15438] mb-1">●</div></UButton
                        >
                      </UTooltip>
                      <UTooltip text="서포트">
                        <UButton
                          class="bg-transparent hover:bg-[#ececec] m-1 w-[20px] h-[20px] rounded-sm flex justify-center items-center border-none shadow-none"
                          color="transparent"
                          :class="
                            selectedMode === 'support' ? 'bg-[#ececec]' : ''
                          "
                          @click="
                            () => {
                              selectedMode = 'support';
                              resetCardDeck();
                            }
                          "
                          ><div class="text-[#fecc51] mb-1">●</div></UButton
                        >
                      </UTooltip>
                      <UTooltip text="벨런스">
                        <UButton
                          class="bg-transparent hover:bg-[#ececec] m-1 w-[20px] h-[20px] rounded-sm flex justify-center items-center border-none shadow-none"
                          color="transparent"
                          :class="
                            selectedMode === 'balance' ? 'bg-[#ececec]' : ''
                          "
                          @click="
                            () => {
                              selectedMode = 'balance';
                              resetCardDeck();
                            }
                          "
                          ><div class="text-[#ce5fd3] mb-1">●</div></UButton
                        >
                      </UTooltip>
                      <UTooltip text="스피드">
                        <UButton
                          class="bg-transparent hover:bg-[#ececec] m-1 w-[20px] h-[20px] rounded-sm flex justify-center items-center border-none shadow-none"
                          color="transparent"
                          :class="
                            selectedMode === 'speed' ? 'bg-[#ececec]' : ''
                          "
                          @click="
                            () => {
                              selectedMode = 'speed';
                              resetCardDeck();
                            }
                          "
                          ><div class="text-[#29a5e3] mb-1">●</div></UButton
                        >
                      </UTooltip>
                      <UTooltip text="디펜스">
                        <UButton
                          class="bg-transparent hover:bg-[#ececec] m-1 w-[20px] h-[20px] rounded-sm flex justify-center items-center border-none shadow-none"
                          color="transparent"
                          :class="
                            selectedMode === 'defence' ? 'bg-[#ececec]' : ''
                          "
                          @click="
                            () => {
                              selectedMode = 'defence';
                              resetCardDeck();
                            }
                          "
                          ><div class="text-[#aced5b] mb-1">●</div></UButton
                        >
                      </UTooltip>
                    </div>
                  </div>
                  <div class="px-4 pb-2 flex flex-col">
                    <!-- <small class="truncate me-14 mb-2 opacity-[0.4]"
                      >기타</small
                    > -->
                    <UDivider label="기타" />
                    <!-- <Placeholder class="h-20 w-48" /> -->
                    <div class="flex flex-col justify-start w-[180px] mt-3">
                      <UCheckbox
                        v-model="isBanEx"
                        class="mb-1"
                        :disabled="isLoading"
                        color="yellow"
                        name="isEx"
                        label="전설 금지"
                        @change="resetCardDeck"
                      />
                      <UCheckbox
                        v-model="isDuplicatedPokemon"
                        class="mb-1"
                        :disabled="isLoading"
                        color="yellow"
                        name="isDuplicated"
                        label="중복 허용"
                        @change="resetCardDeck"
                      />
                      <UCheckbox
                        v-model="isActiveUserInput"
                        class="mb-1"
                        :disabled="isLoading"
                        color="yellow"
                        name="isActiveInput"
                        label="유저 입력"
                        @change="resetCardDeck"
                      />
                      <UCheckbox
                        v-model="isOnlyShufflePokemon"
                        class="mb-1"
                        :disabled="isLoading"
                        color="yellow"
                        name="isOnlyShufflePokemon"
                        label="포켓몬만 랜덤"
                        @change="resetCardDeck"
                      />
                      <UCheckbox
                        v-model="isBanGlobal"
                        class="mb-1"
                        :disabled="isLoading"
                        color="yellow"
                        name="isOnlyShufflePokemon"
                        label="금지 포켓몬 사용"
                        @change="resetCardDeck"
                      />
                    </div>
                  </div>
                  <!-- loading -->
                  <div
                    v-if="isLoading"
                    class="absolute top-0 flex justify-center items-center w-[100%] h-[100%] bg-slate-100 opacity-[0.5]"
                  >
                    <UButton
                      class="bg-transparent disabled:bg-transparent text-gray-600"
                      :loading="true"
                      style="cursor: default"
                    />
                  </div>
                </div>
              </template>
            </UPopover>
          </div>
        </div>
      </div>
      <!-- 중앙 versus 영역 -->
      <div class="absolute opacity-0" ref="versusVRef">
        <NuxtImg
          class="h-[90%]"
          src="/img/versus_v.png"
          style="-webkit-user-drag: none"
          loading="lazy"
        />
      </div>
      <div class="absolute opacity-0" ref="versusSRef">
        <NuxtImg
          class="h-[90%]"
          src="/img/versus_s.png"
          style="-webkit-user-drag: none"
          loading="lazy"
        />
      </div>
    </div>
    <!-- 포켓먼 클릭에 의한 모달 영역 -->
    <div v-if="isOpenUserInputModal">
      <UModal v-model="isOpenUserInputModal">
        <div class="p-4">
          <div class="mb-3">
            <UFormGroup label="User Name" :error="isDuplicateUserName">
              <UInput
                v-model="modalInputValue"
                class="pt-2"
                color="yellow"
                @keypress.enter="changeUser"
                @input="
                  (e) => {
                    if (e.target.value !== originModalInputValue) {
                      isDuplicateUserName =
                        userTags.findIndex(
                          (tagValue) => tagValue === e.target.value
                        ) !== -1;
                    } else {
                      isDuplicateUserName = false;
                    }
                  }
                "
              ></UInput>
            </UFormGroup>
          </div>
          <div class="flex justify-between items-center">
            <div class="ms-2 text-gray-300">
              <Transition>
                <div v-if="isDuplicateUserName">Username already exists!</div>
              </Transition>
            </div>
            <div>
              <UButton class="me-2" color="yellow" @click="changeUser"
                >Save</UButton
              >
              <UButton
                class=""
                color="white"
                @click="() => (isOpenUserInputModal = false)"
                >Cancel</UButton
              >
            </div>
          </div>
        </div>
      </UModal>
    </div>
    <!-- 벤 modal 창  -->
    <UModal v-model="isOpenBanPokemonModal" fullscreen>
      <UCard
        :ui="{
          base: 'h-full flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow',
          },
        }"
      >
        <template #header>
          <div class="flex items-center justify-between mb-3">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              <UInput
                v-model="banSearchInputValue"
                icon="i-heroicons-magnifying-glass-20-solid"
                color="yellow"
                class="w-[300px]"
              />
            </h3>
            <UButton
              color="yellow"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="my-1"
              @click="isOpenBanPokemonModal = false"
            />
          </div>
          <div class="flex flex-wrap">
            <TransitionGroup name="list">
              <PokemonCard
                class="w-[100px] rounded shadow-sm shadow-gray-400 me-2 mb-2 cursor-pointer hover:scale-[1.1] hover:shadow-lg transition ease-in-out duration-200"
                @click="
                  () => {
                    if (!isLoading) {
                      selectedBanPokemonInfo[selectedBanCardNumber] = {};

                      isOpenBanPokemonModal = false;
                      resetCardDeck();
                    }
                  }
                "
              >
                <NuxtImg
                  class="rounded pattern"
                  src="/img/unitePokemon/roster-default-2x.png"
                ></NuxtImg>
              </PokemonCard>
              <div
                v-for="(unitePokemonInfo, index) in filteredUnitePokemonList"
                :key="index"
              >
                <PokemonCard
                  class="w-[100px] rounded shadow-md shadow-gray-400 me-2 mb-2 cursor-pointer hover:scale-[1.1] hover:shadow-lg transition ease-in-out duration-200"
                  :style="{ backgroundColor: unitePokemonInfo.color }"
                  @click="
                    () => {
                      if (!isLoading) {
                        selectedBanPokemonInfo[selectedBanCardNumber] =
                          unitePokemonInfo;

                        isOpenBanPokemonModal = false;
                        resetCardDeck();
                      }
                    }
                  "
                >
                  <NuxtImg
                    class="rounded pattern"
                    :src="unitePokemonInfo.image"
                  ></NuxtImg>
                </PokemonCard>
              </div>
            </TransitionGroup>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}

.card-back {
  /* background: linear-gradient(-45deg, #ca9ccb 50%, #e8ceb0 50%); */
  background-image: url("@/public/svg/square-pattern.svg");
  background-size: 120px, auto;
  background-position:
    center,
    left top;
}
.diagonal {
  background-image: linear-gradient(
    to left bottom,
    transparent calc(50% - 1px),
    #d60000,
    transparent calc(50% + 1px)
  );
  background-size: 120% 120%;
  background-position: center;
}
</style>
