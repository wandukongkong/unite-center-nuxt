import { toRef } from "vue";
import { defineStore } from "pinia";

export const usePickStore = defineStore("pickStore", {
  state: () => {
    const isBanEx = toRef(false);
    const isDuplicatedPokemon = toRef(false);
    const isActiveUserInput = toRef(false);
    const isOnlyShufflePokemon = toRef(false);
    const userTags = toRef([]);
    // const userTags = useState("userTags", () => []);
    const selectedMode = toRef("default");

    return {
      isBanEx,
      isDuplicatedPokemon,
      isActiveUserInput,
      isOnlyShufflePokemon,
      userTags,
      selectedMode,
    };
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
