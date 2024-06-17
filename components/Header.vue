<script setup>
import { toRef, onBeforeMount, onMounted, watch } from "vue";
import { useMotionProperties, useMotionControls } from "@vueuse/motion";
import { storeToRefs } from "pinia";
import { useHomeStore } from "@/stores/homeStore";

// use
const route = useRoute();
const router = useRouter();
const { isMobile } = useDevice();

// store
const { hoveredMenuName } = storeToRefs(useHomeStore());

// local state
const sideBarRef = toRef(null);
const isShowButtonTitle = computed(
  () => router.currentRoute.value.fullPath === "/"
);

// Object Properties
const { motionProperties: sideBarMotionProperties } =
  useMotionProperties(sideBarRef);

// Motion Event
const { apply: applySideBarMotion } = useMotionControls(
  sideBarMotionProperties,
  {
    homeInitial: {
      x: 180,
      y: 170,
      opacity: 0,
      width: "250px",
      height: "60vh",
      backgroundColor: "white",
    },
    otherMenuInitial: {
      x: 10,
      y: 10,
      width: "50px",
      height: "97vh",
      opacity: 0,
      transition: {
        // duration: 1000,
        damping: 14,
        mass: 0.1,
      },
    },
    enterHome: {
      opacity: 1,
      x: 200,
      y: 170,
      width: "250px",
      height: "60vh",
      transition: {
        // duration: 1000,
        damping: 14,
        mass: 0.1,
      },
    },
    leaveHome: {
      x: 10,
      y: 10,
      width: "50px",
      height: "97vh",
      opacity: 1,
      transition: {
        // duration: 1000,
        damping: 14,
        mass: 0.1,
      },
    },
  }
);

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    if (router.currentRoute.value.fullPath === "/") {
      applySideBarMotion("enterHome");
    } else {
      applySideBarMotion("leaveHome");
    }
  }
);

onBeforeMount(() => {
  if (router.currentRoute.value.fullPath === "/") {
    applySideBarMotion("homeInitial");
  } else {
    applySideBarMotion("otherMenuInitial");
  }
});

onMounted(() => {
  if (router.currentRoute.value.fullPath === "/") {
    applySideBarMotion("enterHome");
  } else {
    applySideBarMotion("leaveHome");
  }
});
</script>
<template>
  <div ref="sideBarRef" class="absolute opacity-0 bg-white">
    <div
      class="border shadow-md rounded py-5 h-[100%] hover:scale-[1.01] hover:shadow-xl ease-out duration-300"
      :class="isShowButtonTitle ? 'px-2' : 'px-0'"
    >
      <UButton
        class="flex w-[100%] mb-3 bg-transparent border-0 shadow-none hover:bg-transparent hover:scale-110 ease-out duration-200"
        @mouseover="() => (hoveredMenuName = 'home')"
        @mouseleave="() => (hoveredMenuName = '')"
        @click="
          () => {
            router.push('/');
          }
        "
      >
        <div class="flex justify-center w-[50px]">
          <img class="h-[20px]" src="@/public/img/pokemon/ball.png" />
        </div>
        <Transition>
          <div v-if="isShowButtonTitle" class="ms-2 text-gray-950 truncate">
            <strong>Home</strong>
          </div>
        </Transition>
      </UButton>
      <UButton
        class="flex w-[100%] mb-3 bg-transparent border-0 shadow-none hover:bg-transparent hover:scale-110 ease-out duration-200"
        @mouseover="() => (hoveredMenuName = 'update')"
        @mouseleave="() => (hoveredMenuName = '')"
        @click="
          () => {
            router.push('/update');
          }
        "
      >
        <div class="flex justify-center w-[50px]">
          <img class="h-[20px]" src="@/public/img/pokemon/object3.png" />
        </div>
        <Transition>
          <div v-if="isShowButtonTitle" class="ms-2 text-gray-950 truncate">
            <strong>Update</strong>
          </div>
        </Transition>
      </UButton>
      <UButton
        class="flex w-[100%] mb-3 bg-transparent border-0 shadow-none hover:bg-transparent hover:scale-110 ease-out duration-200"
        @mouseover="() => (hoveredMenuName = 'pick')"
        @mouseleave="() => (hoveredMenuName = '')"
        @click="
          () => {
            router.push('/pick');
          }
        "
      >
        <div class="flex justify-center w-[50px]">
          <img class="h-[20px]" src="@/public/img/pokemon/object7.png" />
        </div>
        <Transition>
          <div v-if="isShowButtonTitle" class="ms-2 text-gray-950 truncate">
            <strong>Random Pick</strong>
          </div>
        </Transition>
      </UButton>
    </div>
  </div>
</template>
<style></style>
