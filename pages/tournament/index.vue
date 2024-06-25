<script setup>
import { toRef, onMounted } from "vue";

const canvas = toRef();
const teamList = toRef([
  {
    teamName: "A",
    isVictory: false,
    groupName: "a",
    memberList: [
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
    ],
  },
  {
    teamName: "B",
    isVictory: false,
    groupName: "a",
    memberList: [
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
    ],
  },
  {
    teamName: "C",
    isVictory: false,
    groupName: "b",
    memberList: [
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
    ],
  },
  {
    teamName: "D",
    isVictory: false,
    groupName: "b",
    memberList: [
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
    ],
  },
]);

const finalTeamList = computed(() => {
  let result = [];

  result = Array(teamList.value.length / 2)
    .fill({})
    .map((dummyValue, index) => ({
      teamName: "",
      isVictory: false,
      groupName: "",
      memberList: [
        {
          pokemonName: "User",
          userName: "",
        },
        {
          pokemonName: "User",
          userName: "",
        },
        {
          pokemonName: "User",
          userName: "",
        },
        {
          pokemonName: "User",
          userName: "",
        },
        {
          pokemonName: "User",
          userName: "",
        },
      ],
    }));

  return result;
});

const victoryTeamInfo = computed(() => {
  return {
    teamName: "",
    isVictory: false,
    groupName: "",
    memberList: [
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
      {
        pokemonName: "User",
        userName: "",
      },
    ],
  };
});

onMounted(() => {});
</script>
<template>
  <div class="relative min-h-screen flex items-center">
    <!-- TODO: 기본 참가자 영역 -->
    <div
      class="absolute w-[100%] min-h-screen flex justify-center items-center bg-black z-30 opacity-[0.1] text-white"
    >
      준비 중...
    </div>
    <div
      v-for="(teamInfo, index) in teamList"
      class="absolute opacity-0"
      :key="index"
      v-motion
      :initial="{
        opacity: 1,
        x: 100,
        y: (index * 3 + 1) * 60 - 350,
      }"
      :enter="{
        opacity: 1,
      }"
    >
      <TeamCard
        :teamName="teamInfo.teamName"
        :memberList="teamInfo.memberList"
      ></TeamCard>
    </div>
    <!-- TODO: 4강 영역 -->
    <div
      v-for="(semifinalTeamInfo, index) in finalTeamList"
      class="absolute opacity-0"
      :key="index"
      v-motion
      :initial="{
        opacity: 1,
        x: 680,
        y: (index * 3 + 1) * 90 - 250,
      }"
      :enter="{
        opacity: 1,
      }"
    >
      <TeamCard
        :teamName="semifinalTeamInfo.teamName"
        :memberList="semifinalTeamInfo.memberList"
      ></TeamCard>
      <!-- :class="`top-[${(index * 3 + 1) * 60 - 350}px]`" -->
    </div>
    <!-- 결승 영역 -->
    <div
      class="absolute opacity-0"
      :key="index"
      v-motion
      :initial="{
        opacity: 1,
        x: 1250,
        y: -20,
      }"
      :enter="{
        opacity: 1,
      }"
    >
      <TeamCard
        :teamName="victoryTeamInfo.teamName"
        :memberList="victoryTeamInfo.memberList"
      ></TeamCard>
      <!-- :class="`top-[${(index * 3 + 1) * 60 - 350}px]`" -->
    </div>
  </div>
</template>
<style></style>
