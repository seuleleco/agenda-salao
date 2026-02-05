<template>
  <div class="d-flex align-items-center justify-content-between bg-info bg-opacity-10 px-2 py-1 mb-1 rounded">
    <span class="flex-grow-1 text-truncate small">{{ task.name }}</span>

  </div>
</template>

<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
});

defineEmits(['delete']);
</script>

<style scoped>
.hover-opacity-100:hover {
  opacity: 1 !important;
}
</style>
