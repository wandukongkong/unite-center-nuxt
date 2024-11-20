<script setup>
import { toRef, computed } from "vue";
import circleDummyList from "@/json/uniteCircleList.json";

const router = useRouter();
const circleList = toRef([...circleDummyList]);

const selectedCircleCode = computed(
  () => router.currentRoute.value.params.circleCode
);
const selectedCircleInfo = computed(() =>
  circleList.value.find(
    (circleDummyInfo) => circleDummyInfo.circleCode === selectedCircleCode.value
  )
);
</script>
<template>
  <div class="flex flex-fill justify-center pt-5">
    <div class="w-[60%] py-3">
      <div class="flex justify-start mb-5">
        <div
          class="flex border rounded w-[200px] h-[250px] shadow-sm shadow-gray-400"
        ></div>
        <!-- 서클 간단 설명란 -->
        <div class="flex flex-col flex-1 px-5">
          <div class="mb-3">
            <strong class="text-xl me-2">Striker</strong>
            <small class="text-sm opacity-20 font-bold">2024-11-14 ~</small>
          </div>
          <div class="text-wrap mb-5">
            서클 설명 설명 설명설명 서클 설명설명 설명설명 설명 설명설명
            서클설명 설명설명 서클설명 설명설명 서클설명 설명설명 서클설명
            설명설명 서클명설명 서클명설명 서클 설명설명 설명설명 설명 설명설명
            서클설명 설명설명 서클설명 설명설명 서클설명 설명설명 서클설명
            설명설명 서클명설명 서클설명 설명설명 서클설명 설명설명 서클설명
            설명설명 서클
          </div>
          <div class="mb-5">http://kakaokakakoaka.co.akr.akd</div>
        </div>
      </div>
      <!-- TODO: circle content-->
      <div class="mb-[100px]">
        <div class="mb-3">
          <strong>- 가입 조건</strong>
        </div>
        <div class="flex flex-wrap justify-start items-start">
          <div class="border shadow-sm shadow-gray-400 mx-2 rounded px-5 py-1">
            <span>랭크 최고점수 1600</span>
          </div>
          <div class="border shadow-sm shadow-gray-400 mx-2 rounded px-5 py-1">
            <span>매 시즌 랭크 1600 이상</span>
          </div>
          <div class="border shadow-sm shadow-gray-400 mx-2 rounded px-5 py-1">
            <span>철새 불가</span>
          </div>
        </div>
      </div>
      <div>
        <div class="mb-3">
          <strong>- Member</strong>
        </div>
        <div class="flex flex-wrap">
          <div
            v-for="(
              circleMemberInfo, index
            ) in selectedCircleInfo.circleMemberList"
            :key="index"
            class="flex justify-center items-center border-2 rounded-full w-[70px] h-[70px] m-1 shadow-sm shadow-gray-400"
            :class="
              circleMemberInfo?.role === 'master' ? 'border-green-600 ' : ''
            "
          >
            {{ hi }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
