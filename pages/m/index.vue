<script setup>
const router = useRouter();
const { isMobile } = useDevice();
</script>
<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <div
      class="relative flex justify-center items-center w-[400px] mb-20 bg-slate-500"
    >
      <!-- 배경 이미지 -->
      <div class="absolute">
        <div class="flex justify-center">
          <NuxtImg src="/img/pokemon/uniteCenterLogo.png" width="60%" />
        </div>
        <NuxtImg src="/img/pokemon/pokemoncenter.png" />
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
      <!-- <div cs -->
      <!-- 벽걸이 TV 오브젝트 -->
      <!-- <div class="absolute top-[14.4%] end-[41.9%]">
        <img class="object" src="@/public/img/pokemon/object6.png" />
      </div> -->
      <!-- 에스컬레이터 오브젝트 -->
      <div class="absolute bottom-[-80px] start-[11%] w-[45px]">
        <NuxtImg
          class="object"
          src="/img/pokemon/object7.png"
          @click="router.push(isMobile ? '/m/pick' : '/pick')"
        />
      </div>
    </div>
  </div>
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
