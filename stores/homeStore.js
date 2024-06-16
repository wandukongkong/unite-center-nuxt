import { toRef } from "vue";
import { defineStore } from "pinia";

export const useHomeStore = defineStore("homeStore", {
  state: () => {
    const hoveredMenuName = toRef("");

    return {
      hoveredMenuName,
    };
  },
});
