<template>
  <div class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <h3 class="text-lg font-medium text-gray-900 mb-2">{{ task.title }}</h3>
        <p class="text-gray-600 mb-3">{{ task.description }}</p>

        <div class="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <div class="flex items-center">
            <Calendar class="h-4 w-4 mr-1" />
            <span>กำหนด: {{ formatDate(task.deadline) }}</span>
          </div>
          <div class="flex items-center">
            <span
              class="px-2 py-1 text-xs rounded-full border"
              :class="getPriorityColor(task.priority)"
            >
              {{ getPriorityLabel(task.priority) }}
            </span>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <span
            class="px-3 py-1 text-sm rounded-full"
            :class="getStatusColor(task.status)"
          >
            {{ getStatusLabel(task.status) }}
          </span>

          <div v-if="task.deadline && isOverdue(task.deadline) && task.status !== 'completed'" class="text-red-600 text-sm font-medium">
            เกินกำหนด
          </div>
        </div>
      </div>
    </div>

    <div v-if="showActions" class="mt-4 pt-4 border-t">
      <div class="flex space-x-2">
        <button
          v-if="task.status === 'todo'"
          @click="$emit('update-status', task.id, 'in-progress')"
          class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          เริ่มทำงาน
        </button>
        <button
          v-if="task.status === 'in-progress'"
          @click="$emit('update-status', task.id, 'completed')"
          class="flex-1 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
        >
          เสร็จสิ้น
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate, isOverdue, getStatusColor, getStatusLabel, getPriorityColor, getPriorityLabel } from '@/utils/helpers'
import { Calendar } from 'lucide-vue-next'

defineProps({
  task: {
    type: Object,
    required: true
  },
  showActions: {
    type: Boolean,
    default: true
  }
})

defineEmits(['update-status'])
</script>