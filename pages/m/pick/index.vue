<script setup>
import { toRef, onMounted } from "vue";
import { storeToRefs } from "pinia";

// store
import { usePickStore } from "@/stores/pickStore";

// json
import unitePokemonListJson from "@/json/unitePokemonList.json";

// store state
const { isBanEx, isDuplicatedPokemon, selectedMode } =
  storeToRefs(usePickStore());

// state
const isLoading = toRef(true);
const selectedCardList = toRef([]);
const defaultArray = toRef([]);
const unitePokemonList = toRef([...unitePokemonListJson]);
const defaultCardList = toRef([
  {
    cardNumber: 0,
    position: [110, 70],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 1,
    position: [0, 70],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 2,
    position: [-110, 70],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 3,
    position: [60, 170],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 4,
    position: [-60, 170],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 5,
    position: [110, -190],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 6,
    position: [0, -190],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 7,
    position: [-110, -190],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 8,
    position: [60, -290],
    name: "",
    color: "",
    image: "",
  },
  {
    cardNumber: 9,
    position: [-60, -290],
    name: "",
    color: "",
    image: "",
  },
]);

// Suffle
const resetCardDeck = () => {
  isLoading.value = true;
  defaultArray.value = [];
  selectedCardList.value = [];

  let unitePokemonListClone = [...unitePokemonList.value];

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
  }, 1700);
};

// 덱 카드 클릭 이벤트
const clickCardDeck = (cardInfo) => {
  selectedCardList.value.push(cardInfo);
  defaultArray.value = defaultArray.value.slice(0, -1);
};

// 이미지 동적 import
const getPokemonImage = (imageUrl) => {
  return new URL(imageUrl);
};

onMounted(() => {
  // defaultArray.value = defaultCardList.value;
  resetCardDeck();

  setTimeout(() => {
    isLoading.value = false;

    // defaultArray.value.forEach((info) => {
    //   clickCardDeck(info);
    // });
  }, 1500);
});
</script>
<template>
  <div
    class="relative select-none border-red-500"
    style="-webkit-user-drag: none"
  >
    <div class="relative min-h-screen border flex justify-center items-center">
      <!--  카드 덱 영역 -->
      <div
        v-for="(cardInfo, index) in defaultArray"
        :key="index"
        class="absolute cursor-pointer"
        v-motion
        :initial="{
          scale: 0.5,
          opacity: 0,
          x: 0,
          y: -300,
          rotate: 0,
        }"
        :enter="{
          scale: 0.3,
          opacity: 1,
          x: 0,
          y: -index * 1.2 - 60,
          rotate: (Math.random() - 0.5) * 5,
          transition: {
            damping: 15,
            mass: 0.1,
            delay: index * 100,
          },
        }"
        @click="
          () => {
            if (!isLoading) {
              clickCardDeck(cardInfo);
            }
          }
        "
      >
        <PokemonCard class="border-8 ring-1 card-back">
          <div class="flex flex-col justify-center items-center">
            <img
              src="@/public/img/pokemon/uniteLogo.png"
              width="100"
              class="mb-3"
            />
            <img src="@/public/img/pokemon/monsterball.png" width="60" />
          </div>
        </PokemonCard>
      </div>
      <!--  위쪽 카드 영역 -->
      <div
        v-for="(cardInfo, index) in selectedCardList.slice(0, 5)"
        :key="index"
        class="absolute"
        v-motion
        :initial="{
          opacity: 1,
          scale: 0.3,
          x: 0,
          y: 0,
        }"
        :enter="{
          opacity: 1,
          scale: 0.35,
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
        <PokemonCard>
          <div class="absolute top-0 start-0">
            <img
              :src="cardInfo.image"
              class="rounded-lg pattern border-[1.4px] border-gray-700 shadow-gray-500 shadow-md"
              style="-webkit-user-drag: none"
              :style="{ backgroundColor: cardInfo.color }"
            />
          </div>
          <div>
            {{ cardInfo.name }}
          </div>
        </PokemonCard>
      </div>
      <!--  아래쪽 카드 영역 -->
      <div
        v-for="(cardInfo, index) in selectedCardList.slice(5, 10)"
        :key="index"
        class="absolute"
        v-motion
        :initial="{
          opacity: 1,
          scale: 0.3,
          x: 0,
          y: 0,
        }"
        :enter="{
          opacity: 1,
          scale: 0.35,
          x: cardInfo?.position[0] ?? 0,
          y: cardInfo?.position[1] ?? 0,
          transition: {
            damping: 15,
            mass: 0.1,
          },
        }"
      >
        <PokemonCard>
          <div class="absolute top-0 start-0">
            <img
              :src="cardInfo.image"
              class="rounded-lg pattern border-[1.4px] border-gray-700 shadow-gray-500 shadow-md"
              style="-webkit-user-drag: none"
              :style="{ backgroundColor: cardInfo.color }"
            />
          </div>
          <div>
            {{ cardInfo.color }}
          </div>
        </PokemonCard>
      </div>
      <!--  버튼 영역 -->
      <div
        class="absolute flex flex-col items-center opacity-0"
        v-motion
        :initial="{
          scale: 0.5,
          opacity: 0,
          x: 0,
          y: 0,
        }"
        :enter="{
          scale: 0.5,
          opacity: 1,
          x: 0,
          y: 0,
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
                    <div class="flex flex-wrap justify-start w-[170px]">
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
                        :disabled="isLoading"
                        name="isDuplicated"
                        label="Duplicate Pokemon"
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
      <!--  중앙 versus 영역 -->
      <div
        v-if="selectedCardList.length > 9"
        class="absolute"
        v-motion
        :initial="{
          opacity: 0,
          scale: 0.7,
          x: 0,
          y: -65,
        }"
        :enter="{
          opacity: 1,
          scale: 0.25,
          x: 0,
          y: -65,
          transition: {
            delay: 500,
          },
        }"
      >
        <img src="@/public/img/versus2.png" style="-webkit-user-drag: none" />
      </div>
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
