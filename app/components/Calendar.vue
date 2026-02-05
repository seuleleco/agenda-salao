<template>
  <div class="container my-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <button class="btn btn-outline-primary" @click="previousMonth">< Anterior</button>
      <h2>{{ monthNames[currentMonth] }} {{ currentYear }}</h2>
      <button class="btn btn-outline-primary" @click="nextMonth">Próximo ></button>
    </div>
    <div class="calendar-grid">
      <div v-for="day in weekDays" :key="day" class="calendar-header">
        {{ day }}
      </div>
      <div v-for="blank in startDay" :key="'blank-' + blank" class="calendar-day empty"></div>
      <div
          v-for="day in daysInMonth"
          :key="day"
          class="calendar-day"
          @click="openTaskModal(day)"
      >
        <div class="day-number">{{ day }}</div>
        <div class="day-content">
          <ViewTask
              v-for="task in getTaskForDay(day)"
              :key="task.id"
              :task="task"
          />
        </div>
      </div>
    </div>
    <ModalTask
        :show="showModal"
        :selectedDay="selectedDay"
        :currentMonth="currentMonth"
        :currentYear="currentYear"
        :tasks="getTaskForDay(selectedDay)"
        @close="closeModal"
        @add="addTask"
        @delete="deleteTask"
    />
  </div>
</template>

<script setup>
import ViewTask from './ViewTask.vue';
import ModalTask from './ModalTask.vue';

const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth());
const showModal = ref(false);
const selectedDay = ref(null);
const tasks = ref({});

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const startDay = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const openTaskModal = (day) => {
  selectedDay.value = day;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const getDateKey = (day) => {
  return `${currentYear.value}-${currentMonth.value}-${day}`;
};

const addTask = (taskName) => {
  const dateKey = getDateKey(selectedDay.value);
  if (!tasks.value[dateKey]) {
    tasks.value[dateKey] = [];
  }
  tasks.value[dateKey].push({
    id: Date.now(),
    name: taskName
  });
};

const deleteTask = (taskId) => {
  const dateKey = getDateKey(selectedDay.value);
  if (tasks.value[dateKey]) {
    tasks.value[dateKey] = tasks.value[dateKey].filter(task => task.id !== taskId);
  }
};

const getTaskForDay = (day) => {
  if (!day) return [];
  const dateKey = getDateKey(day);
  return tasks.value[dateKey] || [];
};
</script>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #dee2e6;
  border: 1px solid #dee2e6;
}

.calendar-header {
  background-color: #f8f9fa;
  padding: 12px;
  text-align: center;
  font-weight: bold;
  border: 1px solid #dee2e6;
}

.calendar-day {
  background-color: white;
  min-height: 120px;
  padding: 8px;
  border: 1px solid #dee2e6;
}

.calendar-day.empty {
  background-color: #f8f9fa;
}

.day-number {
  font-weight: 600;
  margin-bottom: 8px;
  color: #495057;
}

.day-content {
  min-height: 80px;
}

.calendar-day:not(.empty):hover {
  background-color: #f8f9fa;
  cursor: pointer;
}
</style>
