<script setup>
import { toRef, watchEffect } from "vue";

const props = defineProps({
  tournamentList: {
    type: Array,
    default: () => [
      {
        round: 1,
        matchList: [
          {
            match: 1,
            config: {
              x: 0,
              y: 20,
            },
            teamList: [
              {
                teamName: "TeamA",
              },
              {
                teamName: "TeamB",
              },
            ],
          },
          {
            match: 2,
            config: {
              x: 0,
              y: 120,
            },
            teamList: [
              {
                teamName: "TeamC",
              },
              {
                teamName: "TeamD",
              },
            ],
          },
        ],
      },
      {
        round: 2,
        matchList: [
          {
            match: 3,
            config: {
              x: 0,
              y: 60,
            },
            teamList: [
              {
                teamName: "TeamA",
              },
              {
                teamName: "TeamC",
              },
            ],
          },
        ],
      },
    ],
  },
});

const configKonva = toRef({
  width: window.screen.width,
  height: window.screen.height,
});

const matchRectInfo = toRef({
  // draggable: true,
});

const teamRectInfo = toRef({
  x: 0,
  width: 170,
  height: 30,
  stroke: "black",
  strokeWidth: 1,
  fill: "white",
  cornerRadius: 3,
  shadowBlur: 0,
  // draggable: true,
});

const teamNameTextConfig = toRef({
  x: 5,
  y: 5,
  fontSize: 10,
});

const hoverMouse = (e) => {
  e.target.to({
    scaleX: 1.03,
    scaleY: 1.03,
    duration: 0.05,
    shadowBlur: 5,
  });
};

const leaveMouse = (e) => {
  e.target.to({
    scaleX: 1,
    scaleY: 1,
    duration: 0.1,
    shadowBlur: 0,
  });
};
</script>
<template>
  <v-stage :config="configKonva">
    <!-- Round -->
    <v-layer
      v-for="(tournamentInfo, tournamentInfoIndex) in props.tournamentList"
      :key="tournamentInfoIndex"
      :config="{
        x: 110 + 300 * tournamentInfoIndex,
        y: 50,
      }"
    >
      <v-text
        :config="{ text: `${tournamentInfo.round} Round`, fontSize: 15 }"
      />
      <!-- match -->
      <v-group
        v-for="(matchInfo, matchInfoIndex) in tournamentInfo.matchList"
        :key="matchInfoIndex"
        :config="{
          x: matchInfo?.config?.x ?? 0,
          y: matchInfo?.config?.y ?? 0,
        }"
      >
        <!-- team -->
        <v-group
          v-for="(teamInfo, teamInfoIndex) in matchInfo.teamList"
          :config="{
            y: 10 + 40 * teamInfoIndex,
          }"
        >
          <v-rect
            :key="teamInfoIndex"
            :config="{
              ...teamRectInfo,
            }"
          >
          </v-rect>
          <v-text
            :config="{ text: teamInfo.teamName, ...teamNameTextConfig }"
          ></v-text>
        </v-group>
      </v-group>
    </v-layer>
  </v-stage>
</template>
<style></style>
