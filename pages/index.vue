<script setup>
import { onMounted } from "vue";
import { useMotionProperties, useMotionControls } from "@vueuse/motion";

const router = useRouter();

const sideBarRef = toRef(null);
const logoRef = toRef(null);
const object3Ref = toRef(null);
const object7Ref = toRef(null);

// Object Properties
const { motionProperties: sideBarMotionProperties } =
  useMotionProperties(sideBarRef);
const { motionProperties: logoMotionProperties } = useMotionProperties(logoRef);
const { motionProperties: object3MotionProperties } =
  useMotionProperties(object3Ref);
const { motionProperties: object7MotionProperties } =
  useMotionProperties(object7Ref);

// Motion Event
const { apply: applySideBarMotion } = useMotionControls(
  sideBarMotionProperties,
  {
    initial: {
      x: 100,
      y: 170,
      opacity: 0,
      width: "250px",
      height: "60vh",
    },
    enter: {
      x: 200,
      y: 170,
      opacity: 1,
      transition: {
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
        damping: 15,
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
    stop: {
      y: 215,
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
    stop: {
      y: 440,
    },
  }
);

const clickMenuButton = (pageName) => {
  applySideBarMotion("leave");
};

onMounted(() => {
  applySideBarMotion("initial");
  applySideBarMotion("enter");
  applyLogoMotion("initial");
  applyObject3Motion("initial");
  applyObject7Motion("initial");
});
</script>
<template>
  <div>
    <div
      ref="sideBarRef"
      class="absolute opacity-0 hover:scale-105 hover:shadow-xl ease-out duration-200"
    >
      <UCard class="h-[100%]">
        <UButton
          class="flex w-[100%] mb-3 bg-white text-gray-950 shadow-none hover:bg-slate-100 hover:scale-110 ease-out duration-200"
          @mouseover="async () => await applyLogoMotion('enter')"
          @mouseleave="async () => await applyLogoMotion('stop')"
        >
          <div class="flex justify-center me-2 w-[50px]">
            <img class="h-[20px]" src="@/public/img/pokemon/ball.png" />
          </div>
          <strong>Home</strong>
        </UButton>
        <UButton
          class="flex w-[100%] mb-3 bg-white text-gray-950 shadow-none hover:bg-slate-100 hover:scale-110 ease-out duration-200"
          @click="() => clickMenuButton()"
          @mouseover="async () => await applyObject3Motion('enter')"
          @mouseleave="async () => await applyObject3Motion('stop')"
        >
          <div class="flex justify-center me-2 w-[50px]">
            <img class="h-[20px]" src="@/public/img/pokemon/object3.png" />
          </div>
          <strong>Update</strong>
        </UButton>
        <UButton
          class="flex w-[100%] mb-3 bg-white text-gray-950 shadow-none hover:bg-slate-100 hover:scale-110 ease-out duration-200"
          @mouseover="async () => await applyObject7Motion('enter')"
          @mouseleave="async () => await applyObject7Motion('stop')"
        >
          <div class="flex justify-center me-2 w-[50px]">
            <img class="h-[20px]" src="@/public/img/pokemon/object7.png" />
          </div>
          <strong>Random Pick</strong>
        </UButton>
      </UCard>
    </div>
    <!-- <div class="flex flex-col justify-center items-center bg-red-400"> -->
    <!-- <div class="relative flex justify-center w-[1200px] h-[800px] "> -->
    <!-- 로고 -->
    <div class="absolute opacity-0" ref="logoRef">
      <img
        class="hover:scale-105 hover:shadow-xl ease-out duration-200 cursor-pointer"
        src="@/public/img/pokemon/uniteCenterLogo.png"
      />
    </div>
    <!-- 배경 이미지 -->
    <div
      class="absolute flex items-center opacity-0 select-none min-h-screen"
      v-motion
      :initial="{
        opacity: 1,
        x: 470,
      }"
      :enter="{
        opacity: 1,
        x: 470,
      }"
    >
      <img src="@/public/img/pokemon/pokemoncenter.png" class="h-[60vh]" />
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
    <!-- <div class="absolute bottom-[26.5%] end-[18.2%]">
        <img class="object" src="@/public/img/pokemon/object4.png" />
      </div> -->
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
    <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<style lang="css"></style>
