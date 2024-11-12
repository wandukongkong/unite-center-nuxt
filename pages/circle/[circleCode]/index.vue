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
  <div class="flex flex-fill justify-center">
    <div class="w-[60%] py-3">
      <div class="flex justify-start mb-5">
        <div
          class="flex border rounded w-[200px] h-[250px] shadow-md shadow-gray-400"
        ></div>
        <!-- 서클 간단 설명란 -->
        <div class="flex flex-col flex-1 px-5">
          <div class="mb-3">
            <strong class="text-xl">Striker</strong>
          </div>
          <div class="text-wrap mb-5">
            서클 설명 설명 설명설명 서클 설명설명 설명설명 설명 설명설명
            서클설명 설명설명 서클설명 설명설명 서클설명 설명설명 서클설명
            설명설명 서클명설명 서클명설명 서클 설명설명 설명설명 설명 설명설명
            서클설명 설명설명 서클설명 설명설명 서클설명 설명설명 서클설명
            설명설명 서클명설명 서클설명 설명설명 서클설명 설명설명 서클설명
            설명설명 서클
          </div>
          <div>http://kakaokakakoaka.co.akr.akd</div>
        </div>
      </div>
      <!-- TODO: circle content-->
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
            class="flex justify-center items-center border-2 rounded-full w-[70px] h-[70px] m-1"
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
