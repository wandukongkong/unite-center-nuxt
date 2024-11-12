<script setup>
import { toRef } from "vue";
import circleDummyList from "@/json/uniteCircleList.json";

const { data, refresh } = await useFetch("/api/status");
const { data: usersData } = await useFetch("/api/users");
const readyState = toRef(data.value);

const router = useRouter();

// FIXME: delete

// local state
const containerRef = toRef();

const circleList = toRef([...circleDummyList]);

const clickCircleCard = (circleCode) => {
  router.push(`/circle/${circleCode}`);
};
</script>
<template>
  <div class="flex justify-center">
    <!-- TODO: 검색 영역 -->
    <div></div>
    <div ref="containerRef" class="container mt-3">
      <div
        v-for="(circleInfo, index) in circleList"
        :key="index"
        class="border w-[200px] h-[250px] hover:scale-[1.05] hover:shadow-xl hover:shadow-gray-400 shadow-md shadow-gray-400 ease-out duration-200 cursor-pointer rounded"
        @click="() => clickCircleCard(circleInfo?.circleCode)"
      >
        <div>
          {{ circleInfo.circleName }}
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
