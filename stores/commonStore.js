import { computed } from "vue";
import { defineStore } from "pinia";

import unitePokemonListJson from "@/json/unitePokemonList.json";

export const useCommonStore = defineStore("commonStore", () => {
  const unitePokemonList = computed(() => unitePokemonListJson);

  return {
    unitePokemonList,
  };
});
