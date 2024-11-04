<script setup></script>
<template>
  <div
    class="container mx-auto min-h-screen flex flex-col justify-center items-center"
  >
    <UInput class="w-[250px] h-[35px] mb-2" placeholder="CODE"></UInput>
    <UButton class=" w-[250px] h-[35px] p-0 bg-slate-400 hover:bg-slate-300  flex justify-center"><strong> Sign in</strong></UButton>
    <div class="w-[230px] my-5 border border-gray-100"></div>
    <div>
      <UButton class=" w-[250px]  hover:bg-[#10C65C]  p-0">
        <img class="h-[35px] object-cover"  src="../../../.output/public/img/naver/btnG_아이콘사각.png"></img>
        <strong>Sign in with Naver</strong>
      </UButton>
    </div>
  </div>
</template>
<style></style>
