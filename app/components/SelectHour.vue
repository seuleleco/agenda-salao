<template>
  <div>
    <span>Selecione o horario</span>
  </div>
  <div class="d-flex gap-2 justify-content-center">
  <input
      :type="startTime ? 'time' : 'text'"
      class="form-control w-25 "
      :value="startTime"
      @input="$emit('update:startTime', $event.target.value)"
      @focus="$event.target.type = 'time'"
      @blur="!startTime && ($event.target.type = 'text')"
      placeholder="Inicio"
  />
  <input
      :type="endTime ? 'time' : 'text'"
      class="form-control w-25"
      :value="endTime"
      @input="$emit('update:endTime', $event.target.value)"
      @focus="$event.target.type = 'time'"
      @blur="!endTime && ($event.target.type = 'text')"
      placeholder="Término"
  />
  </div>
</template>

<script setup>
defineProps({
  startTime: String,
  endTime: String
})

defineEmits(['update:startTime', 'update:endTime'])
</script>
