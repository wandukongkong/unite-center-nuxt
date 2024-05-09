<script setup>
import { toRef, onMounted } from "vue";
import { storeToRefs } from "pinia";

// store
import { usePickStore } from "@/stores/pickStore";

// json
import unitePokemonList from "@/json/unitePokemonList.json";

// state
const isLoading = toRef(true);
const selectedCardList = toRef([]);
const defaultArray = toRef([]);
const defaultCardList = toRef([
  {
    cardNumber: 0,
    position: [150, 200],
  },
  {
    cardNumber: 1,
    position: [-50, 200],
  },
  {
    cardNumber: 2,
    position: [-250, 200],
  },
  {
    cardNumber: 3,
    position: [-450, 200],
  },
  {
    cardNumber: 4,
    position: [-650, 200],
  },
  {
    cardNumber: 5,
    position: [150, -200],
  },
  {
    cardNumber: 6,
    position: [-50, -200],
  },
  {
    cardNumber: 7,
    position: [-250, -200],
  },
  {
    cardNumber: 8,
    position: [-450, -200],
  },
  {
    cardNumber: 9,
    position: [-650, -200],
  },
]);

// store state
const { isBanEx, selectedMode } = storeToRefs(usePickStore());

// TODO: Suffle
const resetCardDeck = () => {
  isLoading.value = true;
  defaultArray.value = [];
  selectedCardList.value = [];

  setTimeout(() => {
    defaultArray.value = defaultCardList.value;
  }, 300);

  setTimeout(() => {
    isLoading.value = false;
  }, 1500);
};

// 덱 카드 클릭 이벤트
const clickCardDeck = (cardInfo) => {
  defaultArray.value = defaultArray.value.slice(0, -1);

  selectedCardList.value.push(cardInfo);
};

onMounted(() => {
  defaultArray.value = defaultCardList.value;

  setTimeout(() => {
    isLoading.value = false;
  }, 1500);
});
</script>
<template>
  <div class="relative">
    <div class="relative min-h-screen border flex justify-center items-center">
      <!--  카드 덱 영역 -->
      <div
        v-for="(cardInfo, index) in defaultArray"
        :key="index"
        class="absolute cursor-pointer z-10"
        v-motion
        :initial="{
          scale: 1.3,
          opacity: 0,
          x: 600,
          y: -500,
          rotate: 0,
        }"
        :enter="{
          scale: 1,
          opacity: 1,
          x: 600,
          y: -index * 1.2,
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
        <PokemonCard>
          {{ index }}
        </PokemonCard>
      </div>
      <div
        class="absolute cursor-pointer z-0"
        v-motion
        :initial="{
          scale: 1,
          opacity: 0,
          x: 600,
          y: 0,
        }"
        :enter="{
          scale: 1,
          opacity: 0,
          x: 600,
          y: 0,
        }"
      >
        <PokemonCard>
          {{ index }}
        </PokemonCard>
      </div>
      <!-- TODO: 위쪽 카드 영역 -->
      <div
        v-for="(cardInfo, index) in selectedCardList.slice(0, 5)"
        :key="index"
        class="absolute"
        v-motion
        :initial="{
          opacity: 1,
          scale: 1,
          x: 600,
          y: 0,
        }"
        :enter="{
          opacity: 1,
          scale: 1.2,
          x: cardInfo?.position[0] ?? 0,
          y: cardInfo?.position[1] ?? 0,
          transition: {
            damping: 15,
            mass: 0.1,
          },
        }"
      >
        <PokemonCard> {{ cardInfo?.cardNumber }} </PokemonCard>
      </div>
      <!-- TODO: 아래쪽 카드 영역 -->
      <div
        v-for="(cardInfo, index) in selectedCardList.slice(5, 10)"
        :key="index"
        class="absolute"
        v-motion
        :initial="{
          opacity: 1,
          scale: 1,
          x: 600,
          y: 0,
        }"
        :enter="{
          opacity: 1,
          scale: 1.2,
          x: cardInfo?.position[0] ?? 0,
          y: cardInfo?.position[1] ?? 0,
          transition: {
            damping: 15,
            mass: 0.1,
          },
        }"
      >
        <PokemonCard> {{ cardInfo?.cardNumber }} </PokemonCard>
      </div>
      <!-- TODO: 버튼 영역 -->
      <div
        class="absolute flex flex-col items-center opacity-0"
        v-motion
        :initial="{
          opacity: 1,
          x: 600,
          y: 150,
        }"
        :enter="{
          opacity: 1,
          x: 600,
          y: 150,
          transition: {
            damping: 15,
            mass: 0.1,
          },
        }"
      >
        <div class="flex items-center">
          <UButton
            class="w-[40px] h-[40px] mx-1 py-0 flex justify-center"
            trailing-icon="i-heroicons-arrow-path-16-solid"
            :disabled="isLoading"
            @click="() => resetCardDeck()"
          >
          </UButton>
          <UPopover>
            <UButton
              class="w-[40px] h-[40px] mx-1 py-0 flex justify-center"
              color="white"
              trailing-icon="i-heroicons-cog-6-tooth"
            />
            <template #panel="{ close }">
              <div class="px-4 py-2 flex flex-col">
                <small class="truncate me-14 mb-2 opacity-[0.4]"
                  >Position Mode</small
                >
                <!-- <Placeholder class="h-20 w-48" /> -->
                <div class="flex flex-wrap justify-start">
                  <UTooltip text="Default">
                    <UButton
                      class="bg-transparent hover:bg-[#ececec] m-1 w-[20px] h-[20px] rounded-sm flex justify-center items-center border-none shadow-none"
                      :class="selectedMode === 'default' ? 'bg-[#ececec]' : ''"
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
                      :class="selectedMode === 'attack' ? 'bg-[#ececec]' : ''"
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
                      :class="selectedMode === 'support' ? 'bg-[#ececec]' : ''"
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
                      :class="selectedMode === 'balance' ? 'bg-[#ececec]' : ''"
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
                      :class="selectedMode === 'speed' ? 'bg-[#ececec]' : ''"
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
                      :class="selectedMode === 'Defence' ? 'bg-[#ececec]' : ''"
                      @click="
                        () => {
                          selectedMode = 'Defence';
                          resetCardDeck();
                        }
                      "
                      ><div class="text-[#aced5b] mb-1">●</div></UButton
                    >
                  </UTooltip>
                </div>
              </div>
              <div class="px-4 py-2 flex flex-col">
                <small class="truncate me-14 mb-2 opacity-[0.4]">Other</small>
                <!-- <Placeholder class="h-20 w-48" /> -->
                <div class="flex flex-wrap justify-start">
                  <UCheckbox
                    v-model="isBanEx"
                    name="isEx"
                    label="Ban EX"
                    @change="resetCardDeck"
                  />
                </div>
              </div>
            </template>
          </UPopover>
          <!-- material-symbols:settings -->
        </div>
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
</style>
