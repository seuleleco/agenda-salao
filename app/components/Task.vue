<template>
  <div class="d-flex align-items-center justify-content-between bg-info bg-opacity-10 px-2 py-1 mb-1 rounded">
    <span class="flex-grow-1 text-truncate small">{{ task.name }}</span>
    <button
        class="btn btn-link btn-sm p-0 ms-2 opacity-50 hover-opacity-100"
        @click="$emit('delete')"
        title="Excluir tarefa"
    >
      <img src="/icons/trash.svg" alt="Excluir" width="16" height="16">
    </button>
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
