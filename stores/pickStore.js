import { toRef } from "vue";
import { defineStore } from "pinia";

export const usePickStore = defineStore("pickStore", {
  state: () => {
    const isBanEx = toRef(false);
    const isDuplicatedPokemon = toRef(false);
    const isActiveUserInput = toRef(false);
    const isOnlyShufflePokemon = toRef(false);
    const isBanGlobal = toRef(false);
    const userTags = toRef([]);
    // const userTags = useState("userTags", () => []);
    const selectedMode = toRef("default");
    const selectedBanPokemonInfo = toRef({
      1: {},
      2: {},
      3: {},
    });

    return {
      isBanEx,
      isDuplicatedPokemon,
      isActiveUserInput,
      isOnlyShufflePokemon,
      isBanGlobal,
      userTags,
      selectedMode,
      selectedBanPokemonInfo,
    };
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
