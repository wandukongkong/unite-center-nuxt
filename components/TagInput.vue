<script setup>
const emit = defineEmits(["change-tags"]);
const props = defineProps({
  tags: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    defualt: "",
  },
  limit: {
    type: String,
    defualt: "0",
  },
});

// const tags = toRef([...props.tags]);
const input = toRef("");

const deleteTag = (tagValue) => {
  const filteredTags = props.tags.filter((tag) => tag !== tagValue);

  emit("change-tags", filteredTags);
};
</script>
<template>
  <div class="flex flex-wrap justify-start items-center p-1">
    <strong class="opacity-20 mt-1 me-3">{{ props.tags.length }}/10</strong>
    <div
      v-for="(tag, index) in props.tags"
      :key="index"
      class="flex justify-center items-center rounded-md px-2 me-1 mt-1 bg-[#ebaa41]"
    >
      <strong class="me-1 text-white mb-[1px]">{{ tag }}</strong>
      <UButton
        class="p-0 border-none hover:bg-[#c79038] h-[20px] bg-transparent"
        trailing-icon="i-heroicons-x-mark-16-solid"
        @click="() => deleteTag(tag)"
      ></UButton>
    </div>
    <UInput
      v-model="input"
      variant="none"
      class="h-[20px] focus:border-red active:border-none border-none mb-2"
      :placeholder="
        Number(props.limit) > props.tags.length ? props.placeholder : ''
      "
      @keypress.enter="
        (e) => {
          if (
            (Number(props.limit) === 0 ||
              Number(props.limit) > props.tags.length) &&
            input !== '' &&
            !props.tags.includes(input)
          ) {
            const tags = [...props.tags];

            tags.push(e.target.value);
            emit('change-tags', tags);
            input = '';
          }
        }
      "
    />
  </div>
</template>
<style></style>
