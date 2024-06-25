<script setup>
import { onMounted, onBeforeMount, watch } from "vue";
import { storeToRefs } from "pinia";
import { useMotionProperties, useMotionControls } from "@vueuse/motion";
import { useHomeStore } from "@/stores/homeStore";

// use
const router = useRouter();

//store
const { hoveredMenuName } = storeToRefs(useHomeStore());

// local state
const isClickedMenuButton = toRef(false);
const imageAreaRef = toRef(null);
const pokemonCenterRef = toRef(null);
const sideBarRef = toRef(null);
const logoRef = toRef(null);

const object3Ref = toRef(null);
const object4Ref = toRef(null);
const object7Ref = toRef(null);

// Object Properties
const { motionProperties: imageAreaProperties } =
  useMotionProperties(imageAreaRef);
const { motionProperties: pokemonCenterProperties } =
  useMotionProperties(pokemonCenterRef);
const { motionProperties: sideBarMotionProperties } =
  useMotionProperties(sideBarRef);
const { motionProperties: logoMotionProperties } = useMotionProperties(logoRef);
const { motionProperties: object3MotionProperties } =
  useMotionProperties(object3Ref);
const { motionProperties: object4MotionProperties } =
  useMotionProperties(object4Ref);
const { motionProperties: object7MotionProperties } =
  useMotionProperties(object7Ref);

// Motion Event
const { apply: applyImageAreaMotion } = useMotionControls(imageAreaProperties, {
  initial: {
    opacity: 1,
  },
  enter: {
    opacity: 1,
    transition: {
      delay: 300,
      damping: 15,
      mass: 0.1,
    },
  },
  leave: {
    opacity: 0,
    transition: {
      damping: 15,
      mass: 0.1,
    },
  },
});

const { apply: applyPokemonCenterMotion } = useMotionControls(
  pokemonCenterProperties,
  {
    initial: {
      x: 470,
      y: 170,
      opacity: 1,
      width: "800px",
    },
    enter: {
      x: 470,
      y: 170,
      opacity: 1,
      transition: {
        delay: 300,
        damping: 15,
        mass: 0.1,
      },
    },
    leave: {
      opacity: 0,
    },
  }
);

const { apply: applySideBarMotion } = useMotionControls(
  sideBarMotionProperties,
  {
    initial: {
      x: 100,
      y: 170,
      opacity: 0,
      width: "250px",
      height: "60vh",
      backgroundColor: "white",
    },
    enter: {
      x: 200,
      y: 170,
      opacity: 1,
      transition: {
        delay: 300,
        damping: 15,
        mass: 0.1,
      },
    },
    leave: {
      x: 10,
      y: 10,
      width: "50px",
      height: "97vh",
      transition: {
        // duration: 1000,
        damping: 14,
        mass: 0.1,
      },
    },
  }
);

const { apply: applyLogoMotion } = useMotionControls(logoMotionProperties, {
  initial: {
    x: 700,
    y: 120,
    opacity: 1,
  },
  enter: {
    y: 115,
    transition: {
      duration: 400,
      ease: "easyOut",
      repeat: Infinity,
      repeatDelay: 0,
      repeatType: "reverse",
    },
  },
  leave: {
    opacity: 0,
  },
  stop: {
    y: 120,
  },
});

const { apply: applyObject3Motion } = useMotionControls(
  object3MotionProperties,
  {
    initial: {
      x: 580,
      y: 215,
      opacity: 1,
    },
    enter: {
      y: 210,
      transition: {
        duration: 400,
        ease: "easyOut",
        repeat: Infinity,
        repeatDelay: 0,
        repeatType: "reverse",
      },
    },
    leave: {
      opacity: 0,
    },
    stop: {
      y: 215,
    },
  }
);
const { apply: applyObject4Motion } = useMotionControls(
  object4MotionProperties,
  {
    initial: {
      x: 1100,
      y: 495,
      opacity: 1,
    },
    enter: {
      y: 490,
      transition: {
        duration: 400,
        ease: "easyOut",
        repeat: Infinity,
        repeatDelay: 0,
        repeatType: "reverse",
      },
    },
    leave: {
      opacity: 0,
    },
    stop: {
      y: 495,
    },
  }
);

const { apply: applyObject7Motion } = useMotionControls(
  object7MotionProperties,
  {
    initial: {
      x: 475,
      y: 440,
      scale: 1,
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
    enter: {
      y: 435,
      transition: {
        duration: 400,
        ease: "easyOut",
        repeat: Infinity,
        repeatDelay: 0,
        repeatType: "reverse",
      },
    },
    leave: {
      opacity: 0,
    },
    stop: {
      y: 440,
    },
  }
);

watch(
  () => hoveredMenuName.value,
  () => {
    switch (hoveredMenuName.value) {
      case "home":
        applyLogoMotion("enter");

        break;
      case "update":
        applyObject3Motion("enter");

        break;
      case "pick":
        applyObject7Motion("enter");

        break;
      case "tournament":
        applyObject4Motion("enter");

        break;

      default:
        applyLogoMotion("stop");
        applyObject3Motion("stop");
        applyObject4Motion("stop");
        applyObject7Motion("stop");
        break;
    }
  }
);

onBeforeMount(() => {
  applyImageAreaMotion("initial");
  applyPokemonCenterMotion("initial");
  applySideBarMotion("initial");
  applyLogoMotion("initial");
  applyObject3Motion("initial");
  applyObject4Motion("initial");
  applyObject7Motion("initial");
});

onMounted(() => {
  applySideBarMotion("enter");
});
</script>
<template>
  <div>
    <div ref="imageAreaRef">
      <!-- 로고 -->
      <div class="absolute opacity-0" ref="logoRef">
        <img
          class="hover:scale-105 hover:shadow-xl ease-out duration-200 cursor-pointer"
          src="@/public/img/pokemon/uniteCenterLogo.png"
        />
      </div>
      <!-- 배경 이미지 -->
      <div ref="pokemonCenterRef" class="absolute opacity-0 select-none">
        <!-- v-motion
      :initial="{
        opacity: 1,
        x: 470,
      }"
      :enter="{
        opacity: 1,
        x: 470,
      }" -->
        <img src="@/public/img/pokemon/pokemoncenter.png" />
      </div>
      <!-- 컴퓨터 오브젝트 -->
      <!-- <div class="absolute">
    <img class="object" src="@/public/img/pokemon/object1.png" />
  </div> -->
      <!-- 치료기 오브젝트 -->
      <!-- <div class="absolute top-[18.4%] end-[49.6%]">
        <img class="object" src="@/public/img/pokemon/object2.png" />
      </div> -->
      <!-- 책장 오브젝트 -->
      <div class="absolute opacity-0" ref="object3Ref">
        <img
          class="hover:scale-105 hover:shadow-xl ease-out duration-200 cursor-pointer"
          src="@/public/img/pokemon/object3.png"
          @click="router.push('/update')"
        />
      </div>
      <!-- 테이블 오브젝트 -->
      <div class="absolute opacity-0" ref="object4Ref">
        <img
          class="hover:scale-105 hover:shadow-xl ease-out duration-200 cursor-pointer"
          src="@/public/img/pokemon/object4.png"
          @click="router.push('/tournament')"
        />
      </div>
      <!-- 벽걸이 지도 오브젝트 -->
      <!-- <div class="absolute top-[14.9%] end-[18.5%]">
        <img class="object" src="@/public/img/pokemon/object5.png" />
      </div> -->
      <!-- 벽걸이 TV 오브젝트 -->
      <!-- <div class="absolute top-[14.4%] end-[41.9%]">
        <img class="object" src="@/public/img/pokemon/object6.png" />
      </div> -->
      <!-- 에스컬레이터 오브젝트 -->
      <div class="absolute opacity-0" ref="object7Ref">
        <img
          class="hover:scale-105 hover:shadow-xl ease-out duration-200 cursor-pointer"
          src="@/public/img/pokemon/object7.png"
          @click="router.push('/pick')"
        />
      </div>
    </div>
    <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<style lang="css"></style>
