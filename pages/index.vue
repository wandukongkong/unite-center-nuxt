<script setup>
import { toRef, computed, onMounted, onBeforeMount } from "vue";
import { useMotionProperties, useMotionControls } from "@vueuse/motion";

const router = useRouter();

// Logo Motion
const logoRef = toRef();
const { motionProperties: logoMotionProperties } = useMotionProperties(logoRef);
const { apply: applyLogoMotion } = useMotionControls(logoMotionProperties, {
  initial: {
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
  },
  hover: {
    y: -5,
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
    y: 0,
  },
});

// object3 Motion
const object3Ref = toRef();
const { motionProperties: object3MotionProperties } =
  useMotionProperties(object3Ref);
const { apply: applyObject3Motion } = useMotionControls(
  object3MotionProperties,
  {
    initial: {
      x: 127,
      y: -500,
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    hover: {
      y: -505,
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
      y: -500,
    },
  }
);

// object4 motion
const object4Ref = toRef();
const { motionProperties: object4MotionProperties } =
  useMotionProperties(object4Ref);
const { apply: applyObject4Motion } = useMotionControls(
  object4MotionProperties,
  {
    initial: {
      x: 710,
      y: -190,
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    hover: {
      y: -195,
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
      y: -190,
    },
  }
);

// object7 motion
const object7Ref = toRef();
const { motionProperties: object7MotionProperties } =
  useMotionProperties(object7Ref);
const { apply: applyObject7Motion } = useMotionControls(
  object7MotionProperties,
  {
    initial: {
      x: 0,
      y: -200,
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    hover: {
      y: -205,
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
      y: -200,
    },
  }
);

onBeforeMount(() => {
  applyLogoMotion("initial");
  applyObject3Motion("initial");
  applyObject4Motion("initial");
  applyObject7Motion("initial");
});

onMounted(() => {
  applyLogoMotion("enter");
  applyObject3Motion("enter");
  applyObject4Motion("enter");
  applyObject7Motion("enter");
});
</script>
<template>
  <div class="flex flex-col min-h-screen justify-center items-center">
    <img
      ref="logoRef"
      class="mb-3 opacity-0"
      src="@/public/img/pokemon/uniteCenterLogo.png"
    />
    <div class="flex rounded-xl shadow-2xl">
      <div class="flex flex-col ps-7 pe-9 py-6">
        <div
          class="flex items-center mb-5 hover:scale-[1.04] ease-in-out duration-200"
        >
          <div class="flex justify-center w-[50px]">
            <img src="@/public/img/pokemon/ball.png" class="h-4" />
          </div>
          <UButton
            class="bg-white text-black shadow-none py-0 hover:bg-white"
            @mouseover="() => applyLogoMotion('hover')"
            @mouseleave="() => applyLogoMotion('stop')"
          >
            <strong>Home</strong>
          </UButton>
        </div>
        <div
          class="flex items-center mb-5 hover:scale-[1.04] ease-in-out duration-200"
        >
          <div class="flex justify-center w-[50px]">
            <img src="@/public/img/pokemon/object3.png" class="h-4" />
          </div>
          <UButton
            class="bg-white text-black shadow-none py-0 hover:bg-white"
            @click="() => router.push('/update')"
            @mouseover="() => applyObject3Motion('hover')"
            @mouseleave="() => applyObject3Motion('stop')"
          >
            <strong>Update</strong>
          </UButton>
        </div>
        <div
          class="flex items-center mb-5 hover:scale-[1.04] ease-in-out duration-200"
        >
          <div class="flex justify-center w-[50px]">
            <img src="@/public/img/pokemon/object7.png" class="h-4" />
          </div>
          <UButton
            class="bg-white text-black shadow-none py-0 hover:bg-white"
            @click="() => router.push('/pick')"
            @mouseover="() => applyObject7Motion('hover')"
            @mouseleave="() => applyObject7Motion('stop')"
          >
            <strong>Random Pick</strong>
          </UButton>
        </div>
        <div
          class="flex items-center hover:scale-[1.04] ease-in-out duration-200"
        >
          <div class="flex justify-center w-[50px]">
            <img src="@/public/img/pokemon/object4.png" class="h-4" />
          </div>
          <UButton
            class="bg-white text-black shadow-none py-0 hover:bg-white"
            @click="() => router.push('/tournament')"
            @mouseover="() => applyObject4Motion('hover')"
            @mouseleave="() => applyObject4Motion('stop')"
          >
            <strong>Tournament</strong>
          </UButton>
        </div>
      </div>
      <div class="relative border-8 border-white rounded-xl">
        <img class="rounded-md" src="@/public/img/pokemon/pokemoncenter.png" />
        <img
          class="absolute opacity-0 cursor-pointer"
          ref="object3Ref"
          src="@/public/img/pokemon/object3.png"
          @click="() => router.push('/update')"
          @mouseover="() => applyObject3Motion('hover')"
          @mouseleave="() => applyObject3Motion('stop')"
        />
        <img
          class="absolute opacity-0 cursor-pointer"
          ref="object4Ref"
          src="@/public/img/pokemon/object4.png"
          @click="() => router.push('/tournament')"
          @mouseover="() => applyObject4Motion('hover')"
          @mouseleave="() => applyObject4Motion('stop')"
        />
        <img
          class="absolute opacity-0 cursor-pointer"
          ref="object7Ref"
          src="@/public/img/pokemon/object7.png"
          @click="() => router.push('/pick')"
          @mouseover="() => applyObject7Motion('hover')"
          @mouseleave="() => applyObject7Motion('stop')"
        />
      </div>
    </div>
  </div>
</template>
<style></style>
