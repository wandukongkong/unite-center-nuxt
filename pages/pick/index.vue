<template>
  <div class="relative min-h-screen border border-red-500">
    <div
      v-for="(number, index) in Array(15).fill(0)"
      class="absolute start-[45%]"
      :class="`top-[40%]`"
    >
      <div
        v-motion
        :initial="{
          scale: 1,
          opacity: 0,
          y: -500,
          rotate: 0,
        }"
        :enter="{
          scale: 1,
          opacity: 1,
          y: -index * 1.2,
          rotate: (Math.random() - 0.5) * 5,
          transition: {
            // type: 'spring',
            // stiffness: 250,
            damping: 15,
            mass: 0.1,
            delay: index * 100,
          },
        }"
      >
        <PokemonCard></PokemonCard>
      </div>
    </div>
  </div>
</template>
<script setup>
import unitePokemonList from "@/json/unitePokemonList.json";

const shuffle = () => {};
</script>
<style></style>
