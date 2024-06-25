<script setup>
const props = defineProps({
  teamName: {
    type: String,
    defualt: "",
  },
  memberList: {
    type: Array,
    default: () => [],
  },
});
</script>
<template>
  <div
    class="team-card hover:scale-[1.03] hover:shadow-xl ease-out duration-200 cursor-pointer"
  >
    <div class="mx-2 h-[25px]">{{ props.teamName }}</div>
    <div class="flex border p-3 rounded shadow-md">
      <div
        v-for="(memberInfo, memberInfoIndex) in props.memberList"
        :key="memberInfoIndex"
        class="border w-[65px] rounded me-1"
      >
        <div class="bg-gray-100">
          <img src="../public/img/unitePokemon/roster-default-2x.png" />
        </div>
        <div class="ps-1">
          <span> {{ memberInfo?.pokemonName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.team-card {
  transform: scale(1);
}
</style>
