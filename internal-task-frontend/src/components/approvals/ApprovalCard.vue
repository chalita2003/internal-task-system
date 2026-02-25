<template>
  <div class="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <div class="flex items-center space-x-2 mb-2">
          <h3 class="text-lg font-medium text-gray-900">{{ approval.title }}</h3>
          <span
            class="px-2 py-1 text-xs rounded-full"
            :class="getStatusColor(approval.status)"
          >
            {{ getStatusLabel(approval.status) }}
          </span>
        </div>

        <p class="text-gray-600 mb-3">{{ approval.description }}</p>

        <div class="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-3">
          <div class="flex items-center">
            <FileText class="h-4 w-4 mr-1" />
            <span>ประเภท: {{ getTypeLabel(approval.type) }}</span>
          </div>
          <div v-if="approval.amount" class="flex items-center">
            <DollarSign class="h-4 w-4 mr-1" />
            <span>{{ approval.amount.toLocaleString() }} บาท</span>
          </div>
          <div class="flex items-center">
            <Calendar class="h-4 w-4 mr-1" />
            <span>วันที่สร้าง: {{ formatDate(approval.created_at) }}</span>
          </div>
          <div v-if="approval.updated_at" class="flex items-center">
            <Clock class="h-4 w-4 mr-1" />
            <span>วันที่อัปเดต: {{ formatDate(approval.updated_at) }}</span>
          </div>
        </div>

        <div v-if="approval.comment" class="bg-gray-50 p-3 rounded-md">
          <div class="flex items-center mb-1">
            <MessageSquare class="h-4 w-4 mr-1 text-gray-500" />
            <span class="text-sm font-medium text-gray-700">ความเห็น:</span>
          </div>
          <p class="text-sm text-gray-600">{{ approval.comment }}</p>
        </div>
      </div>
    </div>

    <div v-if="showActions && approval.status === 'pending' && canApprove" class="mt-4 pt-4 border-t">
      <div class="flex space-x-2">
        <button
          @click="$emit('approve', approval)"
          class="flex-1 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
        >
          <CheckCircle2 class="h-4 w-4 mr-1" />
          อนุมัติ
        </button>
        <button
          @click="$emit('reject', approval)"
          class="flex-1 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
        >
          <XCircle class="h-4 w-4 mr-1" />
          ปฏิเสธ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { formatDate, getStatusColor, getStatusLabel, getTypeLabel } from '@/utils/helpers'
import {
  FileText,
  DollarSign,
  Calendar,
  Clock,
  MessageSquare,
  CheckCircle2,
  XCircle
} from 'lucide-vue-next'

const authStore = useAuthStore()

defineProps({
  approval: {
    type: Object,
    required: true
  },
  showActions: {
    type: Boolean,
    default: true
  }
})

const canApprove = computed(() => authStore.isManager)

defineEmits(['approve', 'reject'])
</script>