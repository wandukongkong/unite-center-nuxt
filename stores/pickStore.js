import { toRef } from "vue";
import { defineStore } from "pinia";

export const usePickStore = defineStore("pickStore", {
  state: () => {
    const isBanEx = toRef(false);
    const isDuplicatedPokemon = toRef(false);
    const selectedMode = toRef("default");

    return {
      isBanEx,
      isDuplicatedPokemon,
      selectedMode,
    };
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
