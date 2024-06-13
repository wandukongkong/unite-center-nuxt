<script setup>
import { onBeforeMount } from "vue";

const router = useRouter();
const { isMobile } = useDevice();

onBeforeMount(() => {
  if (isMobile) {
    router.push("/m");
  }
});
</script>
<template>
  <!-- <div class="flex flex-col justify-center items-center bg-red-400"> -->
  <!-- <div class="relative flex justify-center w-[1200px] h-[800px] "> -->
  <!-- <div class="flex justify-center h-[30px] mt-5">
        <img src="@/public/img/pokemon/uniteCenterLogo.png" width="auto" />
      </div> -->
  <!-- 배경 이미지 -->
  <div
    class="absolute bg-slate-500"
    v-motion
    :initial="{
      x: 400,
    }"
  >
    <img src="@/public/img/pokemon/pokemoncenter.png" />
  </div>
  <!-- 컴퓨터 오브젝트 -->
  <!-- <div class="absolute top-[14.4%] end-[28.2%]">
        <img class="object" src="@/public/img/pokemon/object1.png" />
      </div> -->
  <!-- 치료기 오브젝트 -->
  <!-- <div class="absolute top-[18.4%] end-[49.6%]">
        <img class="object" src="@/public/img/pokemon/object2.png" />
      </div> -->
  <!-- 책장 오브젝트 -->
  <!-- <div class="absolute top-[18.4%] start-[23.7%]">
        <img
          class="object"
          src="@/public/img/pokemon/object3.png"
          @click="router.push('/pokemon')"
        />
      </div> -->
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
  <!-- <div class="absolute bottom-[29.1%] start-[13%]">
        <img
          class="object"
          src="@/public/img/pokemon/object7.png"
          @click="router.push('/pick')"
        />
      </div> -->
  <!-- </div> -->
  <!-- </div> -->
</template>

<style lang="css">
.object {
  transition: transform 0.1s;
}

.object:hover {
  cursor: pointer;
  transform: scale(1.1);
}
</style>
