import { toRef } from "vue";
import { defineStore } from "pinia";

export const usePickStore = defineStore("pickStore", {
  state: () => {
    const isBanEx = toRef(false);
    const selectedMode = toRef("default");

    return {
      isBanEx,
      selectedMode,
    };
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
