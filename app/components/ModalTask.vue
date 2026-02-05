<template>
  <div v-if="show" class="modal d-block" tabindex="-1" @click.self="$emit('close')">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ selectedDay }}/{{ currentMonth + 1 }}/{{ currentYear }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <div class="list-group mb-3" style="max-height: 300px; overflow-y: auto;">
            <div v-for="task in tasks" :key="task.id" class="list-group-item d-flex justify-content-between align-items-center">
              <span>{{ task.name }}</span>
              <button class="btn btn-sm btn-outline-danger" @click="$emit('delete', task.id)">
                <img src="/icons/trash.svg" alt="Excluir" style="width: 16px; height: 16px;" />
              </button>
            </div>
          </div>
          <input
              v-model="taskName"
              type="text"
              class="form-control"
              placeholder="Nome da tarefa"
              @keyup.enter="handleAdd"
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Fechar</button>
          <button type="button" class="btn btn-primary" @click="handleAdd">Adicionar</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="show" class="modal-backdrop fade show"></div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  selectedDay: Number,
  currentMonth: Number,
  currentYear: Number,
  tasks: Array
});

const emit = defineEmits(['close', 'add', 'delete']);

const taskName = ref('');

const handleAdd = () => {
  if (taskName.value.trim()) {
    emit('add', taskName.value.trim());
    taskName.value = '';
  }
};

watch(() => props.show, (newVal) => {
  if (!newVal) taskName.value = '';
});
</script>
