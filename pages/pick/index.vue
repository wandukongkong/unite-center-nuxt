<script setup>
import { toRef, onMounted, onBeforeMount, watch } from "vue";
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
  selectedMode,
  userTags,
} = storeToRefs(usePickStore());

// state
const versusVRef = toRef(null);
const versusSRef = toRef(null);

const isOpenModal = toRef(false);
const { isMobile } = useDevice();
const router = useRouter();
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
const defaultCardList = toRef([
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
      scale: 0.16,
      x: -80,
      y: -100,
    },
    enter: {
      opacity: 1,
      scale: 0.16,
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
      scale: 0.16,
      x: -140,
      y: 100,
    },
    enter: {
      opacity: 1,
      scale: 0.16,
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

  // 포켓몬 포지션 체크
  unitePokemonListClone = unitePokemonListClone
    .filter(
      (unitePokemonInfo) =>
        unitePokemonInfo.position === selectedMode.value ||
        selectedMode.value === "default"
    )
    .sort(() => Math.random() - 0.5)
    .sort(() => Math.random() - 0.5)
    .sort(() => Math.random() - 0.5);

  // 카드의 수가 부족할 경우, 중복 강제 적용
  if (unitePokemonListClone.length < 10) {
    isDuplicatedPokemon.value = true;
  }

  // Ex 벤 체크
  if (isBanEx.value) {
    unitePokemonListClone = unitePokemonListClone
      .filter((unitePokemonInfo) => !unitePokemonInfo.isEx)
      .sort(() => Math.random() - 0.5)
      .sort(() => Math.random() - 0.5)
      .sort(() => Math.random() - 0.5);
  }

  // 중복 포켓몬 체크
  if (isDuplicatedPokemon.value) {
    const aTeamPokemonList = unitePokemonListClone
      .sort(() => Math.random() - 0.5)
      .sort(() => Math.random() - 0.5)
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    const bTeamPokemonList = unitePokemonListClone
      .sort(() => Math.random() - 0.5)
      .sort(() => Math.random() - 0.5)
      .sort(() => Math.random() - 0.5)
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
        .sort(() => Math.random() - 0.5)
        .sort(() => Math.random() - 0.5)
        .sort(() => Math.random() - 0.5);
    }
  }

  // 카드에 맞게 리스트 가공
  unitePokemonListClone = unitePokemonListClone.map(
    (unitePokemonInfo, index) => ({
      cardNumber: index,
      position: defaultCardList.value[index]?.position,
      name: unitePokemonInfo.name,
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
  isOpenModal.value = true;

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
    isOpenModal.value = false;
  }
};

watch(
  () => isOpenModal.value,
  () => {
    if (isOpenModal.value === false) {
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

  if (isMobile) {
    router.push("/m/pick");
  }
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
      <!-- TODO: -->
      <TagInput
        :tags="userTags"
        limit="10"
        placeholder="Enter User"
        @change-tags="tagInputHandler"
      ></TagInput>
    </div>
    <div class="relative min-h-screen flex justify-center items-center">
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
        >
          <div class="flex flex-col justify-center items-center h-[100%]">
            <NuxtImg src="/img/pokemon/uniteLogo.png" width="80" class="mb-3" />
            <NuxtImg src="/img/pokemon/monsterball.png" width="60" />
          </div>
        </PokemonCard>
        <div
          v-if="defaultArray.length === index + 1"
          class="absolute top-[14px] scale-[1.1]"
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
            // transition: rotateY('150deg'),
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
          :class="
            (selectedUsers?.[index] || '') !== 'AI Trainer'
              ? 'cursor-pointer hover:scale-[1.03]'
              : 'cursor-not-allowed'
          "
          @click="
            () => {
              if ((selectedUsers?.[index] || '') !== 'AI Trainer') {
                clickCard(index);
              }
            }
          "
        >
          <NuxtImg
            :src="cardInfo.image"
            class="rounded pattern w-[100%] h-[100%]"
            style="-webkit-user-drag: none"
            :style="{ backgroundColor: cardInfo.color }"
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
          :class="
            (selectedUsers?.[index + 5] || '') !== 'AI Trainer'
              ? 'cursor-pointer hover:scale-[1.03]'
              : 'cursor-not-allowed'
          "
          @click="
            () => {
              if ((selectedUsers?.[index + 5] || '') !== 'AI Trainer') {
                clickCard(index + 5);
              }
            }
          "
        >
          <NuxtImg
            :src="cardInfo.image"
            class="rounded pattern w-[100%] h-[100%]"
            style="-webkit-user-drag: none"
            :style="{ backgroundColor: cardInfo.color }"
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
              @click="() => resetCardDeck()"
            >
            </UButton>
            <UPopover>
              <UButton
                class="w-[40px] h-[40px] mx-1 py-0 flex justify-center"
                color="white"
                trailing-icon="i-heroicons-cog-6-tooth"
              />
              <template #panel>
                <div class="relative">
                  <div class="px-4 py-2 flex flex-col">
                    <small class="truncate me-14 mb-2 opacity-[0.4]"
                      >Position Mode</small
                    >
                    <div class="flex flex-wrap justify-start">
                      <UTooltip text="Default">
                        <UButton
                          class="bg-transparent hover:bg-[#ececec] m-1 w-[20px] h-[20px] rounded-sm flex justify-center items-center border-none shadow-none"
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
                      <UTooltip text="Attack">
                        <UButton
                          class="bg-transparent hover:bg-[#ececec] m-1 w-[20px] h-[20px] rounded-sm flex justify-center items-center border-none shadow-none"
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
                      <UTooltip text="Support">
                        <UButton
                          class="bg-transparent hover:bg-[#ececec] m-1 w-[20px] h-[20px] rounded-sm flex justify-center items-center border-none shadow-none"
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
                      <UTooltip text="Balance">
                        <UButton
                          class="bg-transparent hover:bg-[#ececec] m-1 w-[20px] h-[20px] rounded-sm flex justify-center items-center border-none shadow-none"
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
                      <UTooltip text="Speed">
                        <UButton
                          class="bg-transparent hover:bg-[#ececec] m-1 w-[20px] h-[20px] rounded-sm flex justify-center items-center border-none shadow-none"
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
                      <UTooltip text="Defence">
                        <UButton
                          class="bg-transparent hover:bg-[#ececec] m-1 w-[20px] h-[20px] rounded-sm flex justify-center items-center border-none shadow-none"
                          :class="
                            selectedMode === 'Defence' ? 'bg-[#ececec]' : ''
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
                  <div class="px-4 py-2 flex flex-col">
                    <small class="truncate me-14 mb-2 opacity-[0.4]"
                      >Other</small
                    >
                    <!-- <Placeholder class="h-20 w-48" /> -->
                    <div class="flex flex-wrap justify-start w-[180px]">
                      <UCheckbox
                        v-model="isBanEx"
                        class="mb-1"
                        :disabled="isLoading"
                        name="isEx"
                        label="Ban EX"
                        @change="resetCardDeck"
                      />
                      <UCheckbox
                        v-model="isDuplicatedPokemon"
                        class="mb-1"
                        :disabled="isLoading"
                        name="isDuplicated"
                        label="Duplicate Pokemon"
                        @change="resetCardDeck"
                      />
                      <UCheckbox
                        v-model="isActiveUserInput"
                        class="mb-1"
                        :disabled="isLoading"
                        name="isActiveInput"
                        label="Show User"
                        @change="resetCardDeck"
                      />
                      <UCheckbox
                        v-model="isOnlyShufflePokemon"
                        :disabled="isLoading"
                        name="isOnlyShufflePokemon"
                        label="Only Shuffle Pokemon"
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
        />
      </div>
      <div class="absolute opacity-0" ref="versusSRef">
        <NuxtImg
          class="h-[90%]"
          src="/img/versus_s.png"
          style="-webkit-user-drag: none"
        />
      </div>
    </div>
    <!-- TODO: 포켓먼 클릭에 의한 모달 영역 -->
    <div v-if="isOpenModal">
      <UModal v-model="isOpenModal">
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
              <UButton
                class="me-2 bg-[#ebaa41] hover:bg-[#cfa157]"
                @click="changeUser"
                >Save</UButton
              >
              <UButton
                class=""
                color="white"
                @click="() => (isOpenModal = false)"
                >Cancel</UButton
              >
            </div>
          </div>
        </div>
      </UModal>
    </div>
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
</style>
