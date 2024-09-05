<script setup>
import { toRef } from "vue";

const { data, refresh } = await useFetch("/api/status");
const { data: usersData } = await useFetch("/api/users");
const readyState = toRef(data.value);

const circleList = toRef([
  {
    circleName: "Strike",
    cirleUrl: "",
    circleImage: "",
    circleBorderImage: "",
  },
]);
</script>
<template>
  <div class="flex justify-center">
    {{ usersData }}
    <div class="container mt-3">
      <!-- <input class="border rounded w-[100%] mb-4" /> -->
      <Connection :code="readyState ?? 0" />
      <div
        v-for="(circleInfo, index) in circleList"
        :key="index"
        class="border rounded shadow-xl w-[200px] h-[250px]"
      >
        <div>
          {{ circleInfo.circleName }}
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
