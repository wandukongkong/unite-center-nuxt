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
            <strong class="text-xl me-2">{{
              selectedCircleInfo.circleName
            }}</strong>
            <small class="text-sm opacity-20 font-bold"
              >{{ selectedCircleInfo.createAt }} ~
              {{ selectedCircleInfo.closedAt }}</small
            >
          </div>
          <div class="text-wrap mb-5">
            {{ selectedCircleInfo.description }}
          </div>
          <div class="mb-5">{{ selectedCircleInfo.cirleUrl }}</div>
        </div>
      </div>
      <!-- TODO: circle content-->
      <div class="mb-[100px]">
        <div class="mb-3">
          <strong>- 가입 조건</strong>
        </div>
        <div class="flex flex-wrap justify-start items-start">
          <div
            v-for="(
              condition, index
            ) in selectedCircleInfo.membershipConditions"
            :key="index"
            class="border shadow-sm shadow-gray-400 mx-2 rounded px-5 py-1"
          >
            <span>{{ condition }}</span>
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
