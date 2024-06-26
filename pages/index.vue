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
const imageAreaRef = toRef(null);
const pokemonCenterRef = toRef(null);
const logoRef = toRef(null);

const object3Ref = toRef(null);
const object4Ref = toRef(null);
const object7Ref = toRef(null);

// Object Properties
const { motionProperties: imageAreaProperties } =
  useMotionProperties(imageAreaRef);
const { motionProperties: pokemonCenterProperties } =
  useMotionProperties(pokemonCenterRef);
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
      x: 0,
      y: 0,
      opacity: 1,
      width: "800px",
    },
    enter: {
      x: 0,
      y: 0,
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

const { apply: applyLogoMotion } = useMotionControls(logoMotionProperties, {
  initial: {
    x: 0,
    y: -300,
    opacity: 1,
  },
  enter: {
    y: -305,
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
    y: -300,
  },
});

const { apply: applyObject3Motion } = useMotionControls(
  object3MotionProperties,
  {
    initial: {
      x: -226,
      y: -164,
      opacity: 1,
    },
    enter: {
      y: -169,
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
      y: -164,
    },
  }
);
const { apply: applyObject4Motion } = useMotionControls(
  object4MotionProperties,
  {
    initial: {
      x: 280,
      y: 130,
      opacity: 1,
    },
    enter: {
      y: 125,
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
      y: 130,
    },
  }
);

const { apply: applyObject7Motion } = useMotionControls(
  object7MotionProperties,
  {
    initial: {
      x: -330,
      y: 95,
      scale: 1,
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
    enter: {
      y: 90,
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
      y: 95,
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
  applyLogoMotion("initial");
  applyObject3Motion("initial");
  applyObject4Motion("initial");
  applyObject7Motion("initial");
});

onMounted(() => {});
</script>
<template>
  <div>
    <div
      ref="imageAreaRef"
      class="relative flex justify-center items-center w-[100%] min-h-screen"
    >
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
