<script setup>
import { toRef, computed, onMounted, onBeforeMount } from "vue";
import { useMotionProperties, useMotionControls } from "@vueuse/motion";

const { isMobile } = useDevice();
const router = useRouter();

// Logo Motion
const logoRef = toRef();
const { motionProperties: logoMotionProperties } = useMotionProperties(logoRef);
const { apply: applyLogoMotion } = useMotionControls(logoMotionProperties, {
  initial: {
    scale: 0.8,
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
      x: 87,
      y: -420,
      scale: 0.8,
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    hover: {
      y: -425,
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
      y: -420,
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
      x: 550,
      y: -160,
      scale: 0.8,
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    hover: {
      y: -165,
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
      y: -160,
    },
  }
);

//object 6 motion
const object6Ref = toRef();
const { motionProperties: object6MotionProperties } =
  useMotionProperties(object6Ref);
const { apply: applyObject6Motion } = useMotionControls(
  object6MotionProperties,
  {
    initial: {
      x: 370,
      y: -435,
      scale: 0.7,
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    hover: {
      y: -440,
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
      y: -435,
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
      x: -20,
      y: -200,
      scale: 0.7,
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
  applyObject6Motion("initial");
  applyObject7Motion("initial");
});

onMounted(() => {
  applyLogoMotion("enter");
  applyObject3Motion("enter");
  applyObject4Motion("enter");
  applyObject6Motion("enter");
  applyObject7Motion("enter");
});
</script>
<template>
  <div
    v-if="!isMobile"
    class="flex flex-col min-h-screen justify-center items-center"
  >
    <div class="flex justify-end ms-5 items-center w-[940px]">
      <img
        ref="logoRef"
        class="opacity-0 h-[30px] py-1"
        src="@/public/img/pokemon/uniteCenterLogo.png"
      />
    </div>
    <div class="flex rounded-xl shadow-2xl w-[940px]">
      <div class="flex flex-col justify-between">
        <div class="flex flex-col ps-7 pe-5 py-6">
          <div
            class="flex items-center mb-5 hover:scale-[1.04] ease-in-out duration-200"
          >
            <div class="flex justify-center w-[50px]">
              <img src="@/public/img/pokemon/ball.png" class="h-4" />
            </div>
            <UButton
              class="bg-white w-[120px] text-black shadow-none py-0 hover:bg-white"
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
              <img src="@/public/img/pokemon/object6.png" class="h-4" />
            </div>
            <UButton
              class="bg-white w-[120px] text-black shadow-none py-0 hover:bg-white"
              @click="() => router.push('/dashboard')"
              @mouseover="() => applyObject6Motion('hover')"
              @mouseleave="() => applyObject6Motion('stop')"
            >
              <strong>Dashboard</strong>
            </UButton>
          </div>
          <div
            class="flex items-center mb-5 hover:scale-[1.04] ease-in-out duration-200"
          >
            <div class="flex justify-center w-[50px]">
              <img src="@/public/img/pokemon/object3.png" class="h-4" />
            </div>
            <UButton
              class="bg-white w-[120px] text-black shadow-none py-0 hover:bg-white"
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
              class="bg-white w-[120px] text-black shadow-none py-0 hover:bg-white"
              @click="() => router.push('/pick')"
              @mouseover="() => applyObject7Motion('hover')"
              @mouseleave="() => applyObject7Motion('stop')"
            >
              <strong>Random Pick</strong>
            </UButton>
          </div>
          <div
            class="flex items-center mb-5 hover:scale-[1.04] ease-in-out duration-200"
          >
            <div class="flex justify-center w-[50px]">
              <img src="@/public/img/pokemon/object1.png" class="h-4" />
            </div>
            <UButton
              class="bg-white w-[120px] text-black shadow-none py-0 hover:bg-white"
              @click="() => router.push('/circle')"
            >
              <strong>Circle</strong>
            </UButton>
          </div>
          <!-- <div
          class="flex items-center hover:scale-[1.04] ease-in-out duration-200"
        >
          <div class="flex justify-center w-[50px]">
            <img src="@/public/img/pokemon/object4.png" class="h-4" />
          </div>
          <UButton
            class="bg-white w-[120px] text-black shadow-none py-0 hover:bg-white"
            @click="() => router.push('/tournament')"
            @mouseover="() => applyObject4Motion('hover')"
            @mouseleave="() => applyObject4Motion('stop')"
          >
            <strong>Tournament</strong>
          </UButton>
        </div> -->
        </div>
        <div class="flex justify-around py-2">
          <UButton
            class="flex flex-1 justify-center ms-2 mb-2 border text-center bg-gray-50 hover:bg-white text-black py-0"
            @click="
              () => {
                router.push('/auth/signIn');
              }
            "
            ><strong>Sign In</strong></UButton
          >
          <UButton
            class="flex flex-1 justify-center ms-2 mb-2 border text-center bg-gray-50 hover:bg-white text-black py-0"
            ><strong>Sign Up</strong></UButton
          >
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
          ref="object6Ref"
          src="@/public/img/pokemon/object6.png"
          @click="() => router.push('/dashboard')"
          @mouseover="() => applyObject6Motion('hover')"
          @mouseleave="() => applyObject6Motion('stop')"
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
  <div v-else>
    <div class="flex flex-col justify-start items-center">
      <img
        class="h-[30px] py-1 my-12"
        src="@/public/img/pokemon/uniteCenterLogo.png"
      />
      <NuxtLink class="mb-5" to="/update" @click="isOpenMenu = false">
        <strong>Update</strong>
      </NuxtLink>
      <!-- <NuxtLink class="mb-5" to="/pick" @click="isOpenMenu = false">
        <strong>Random Pick</strong>
      </NuxtLink> -->
    </div>
  </div>
</template>
<style></style>
