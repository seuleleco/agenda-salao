<template>
  <div v-if="show" class="modal d-block" tabindex="-1" @click.self="$emit('close')">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ formatedDate }}
          </h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <div v-if="selectedTask">
            <h6>Detalhes da Tarefa</h6>
            <div class="card">
              <div class="card-body">
                <p class="card-text">{{ selectedTask.name }}</p>
                <button class="btn btn-danger" @click="handleDelete">
                  <img src="/icons/trash.svg" alt="Excluir" style="width: 16px; height: 16px;" />
                </button>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="list-group mb-3" style="max-height: 300px; overflow-y: auto;">
              <div v-if="tasks.length > 0">
                <div class="text-center">
              <span>Tarefas Agendadas</span>
                </div>
              <div
                  v-for="task in tasks"
                  :key="task.id"
                  class="list-group-item list-group-item-action"
                  @click="selectedTask = task"
                  style="cursor: pointer;"
              >
                <span class="text-black">{{ task.name }}</span>
              </div>
              </div>
              <div v-else class="text-center text-body-tertiary">
                <span>Sem Tarefas</span>
              </div>
            </div>
            <div v-if="showAddTask" class="modal-content text-center">
              <span class="m-2">Inserir Nova Tarefa</span>
            <input
                v-model="taskName"
                type="text"
                class="form-control mb-1"
                placeholder="Nome"
                @keyup.enter="handleAdd"
            />
              <SelectHour v-model="taskHour" v-model:end-Time="taskEndHour" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button v-if="!selectedTask" class="btn btn-primary" @click="showAddTask = !showAddTask">{{ showAddTask ? '- Nova Tarefa' : '+ Nova Tarefa'}}</button>
          <button v-if="selectedTask" type="button" class="btn btn-secondary" @click="selectedTask = null">Voltar</button>
          <button v-else type="button" class="btn btn-secondary" @click="closeModal">Fechar</button>
          <button v-if="!selectedTask" type="button" class="btn btn-primary" @click="handleAdd">Adicionar</button>
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

const showAddTask = ref(false);
const taskName = ref('');
const selectedTask = ref(null);

const handleAdd = () => {
  if (taskName.value.trim()) {
    emit('add', taskName.value.trim());
    taskName.value = '';
    showAddTask.value = false;
    emit('close');
  }
};

const handleDelete = () => {
  emit('delete', selectedTask.value.id);
  selectedTask.value = null;
};

const closeModal = () => {
  selectedTask.value = null;
  emit('close');
};

const formatedDate = computed(() => {
  const day = String(props.selectedDay).padStart(2, '0');
  const month = String(props.currentMonth + 1).padStart(2, '0');
  return `${day}/${month}/${props.currentYear}`;
});

watch(() => props.show, (newVal) => {
  if (!newVal) {
    taskName.value = '';
    selectedTask.value = null;
  }
});
</script>
