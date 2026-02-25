<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">แดชบอร์ด</h1>
      <div class="text-sm text-gray-500">
        ยินดีต้อนรับ, {{ user.name }}
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <ClipboardList class="h-6 w-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">งานทั้งหมด</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.totalTasks }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <Clock class="h-6 w-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">งานที่กำลังทำ</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.inProgressTasks }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <CheckCircle2 class="h-6 w-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">งานที่เสร็จสิ้น</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.completedTasks }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <FileCheck class="h-6 w-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">เอกสารรออนุมัติ</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.pendingApprovals }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="bg-white p-6 rounded-lg shadow-sm border">
      <h3 class="text-lg font-medium text-gray-900 mb-4">อัตราความสำเร็จ</h3>
      <div class="w-full bg-gray-200 rounded-full h-4">
        <div
          class="bg-blue-600 h-4 rounded-full transition-all duration-300"
          :style="{ width: `${stats.completionRate}%` }"
        ></div>
      </div>
      <p class="text-sm text-gray-600 mt-2">{{ stats.completionRate }}% ของงานทั้งหมดเสร็จสิ้น</p>
    </div>

    <!-- Recent Tasks and Approvals -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Tasks -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h3 class="text-lg font-medium text-gray-900 mb-4">งานล่าสุด</h3>
        <div v-if="recentTasks.length === 0" class="text-center py-8 text-gray-500">
          ไม่มีงานล่าสุด
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="task in recentTasks"
            :key="task.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div class="flex-1">
              <p class="font-medium text-gray-900">{{ task.title }}</p>
              <p class="text-sm text-gray-600">{{ getStatusLabel(task.status) }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <span
                class="px-2 py-1 text-xs rounded-full"
                :class="getStatusColor(task.status)"
              >
                {{ getStatusLabel(task.status) }}
              </span>
            </div>
          </div>
        </div>
        <router-link
          to="/tasks"
          class="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          ดูงานทั้งหมด
          <ChevronRight class="h-4 w-4 ml-1" />
        </router-link>
      </div>

      <!-- Recent Approvals -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h3 class="text-lg font-medium text-gray-900 mb-4">เอกสารล่าสุด</h3>
        <div v-if="recentApprovals.length === 0" class="text-center py-8 text-gray-500">
          ไม่มีเอกสารล่าสุด
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="approval in recentApprovals"
            :key="approval.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div class="flex-1">
              <p class="font-medium text-gray-900">{{ approval.title }}</p>
              <p class="text-sm text-gray-600">{{ getTypeLabel(approval.type) }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <span
                class="px-2 py-1 text-xs rounded-full"
                :class="getStatusColor(approval.status)"
              >
                {{ getStatusLabel(approval.status) }}
              </span>
            </div>
          </div>
        </div>
        <router-link
          to="/approvals"
          class="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          ดูเอกสารทั้งหมด
          <ChevronRight class="h-4 w-4 ml-1" />
        </router-link>
      </div>
    </div>

    <!-- Alert for pending approvals -->
    <div
      v-if="isManager && stats.pendingApprovals > 0"
      class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
    >
      <div class="flex">
        <AlertTriangle class="h-5 w-5 text-yellow-400" />
        <div class="ml-3">
          <h3 class="text-sm font-medium text-yellow-800">
            มีเอกสารรออนุมัติ
          </h3>
          <div class="mt-2 text-sm text-yellow-700">
            <p>คุณมี {{ stats.pendingApprovals }} เอกสารที่รอการอนุมัติ</p>
          </div>
          <div class="mt-4">
            <router-link
              to="/approvals"
              class="text-sm font-medium text-yellow-800 hover:text-yellow-900"
            >
              ไปที่หน้าอนุมัติเอกสาร →
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import {
  getStatusColor,
  getStatusLabel,
  getTypeLabel
} from '@/utils/helpers'
import api from '@/utils/api'
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  FileCheck,
  ChevronRight,
  AlertTriangle
} from 'lucide-vue-next'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
const isManager = computed(() => authStore.isManager)

const tasks = ref([])
const approvals = ref([])
const stats = ref({
  totalTasks: 0,
  inProgressTasks: 0,
  completedTasks: 0,
  pendingApprovals: 0,
  completionRate: 0
})

const recentTasks = computed(() => tasks.value.slice(0, 5))
const recentApprovals = computed(() => approvals.value.slice(0, 5))

const fetchData = async () => {
  try {
    const [tasksResponse, approvalsResponse] = await Promise.all([
      api.get('/tasks'),
      api.get('/approvals')
    ])

    tasks.value = tasksResponse.data
    approvals.value = approvalsResponse.data

    // Calculate stats
    const totalTasks = tasks.value.length
    const inProgressTasks = tasks.value.filter(t => t.status === 'in-progress').length
    const completedTasks = tasks.value.filter(t => t.status === 'completed').length
    const pendingApprovals = approvals.value.filter(a => a.status === 'pending').length
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    stats.value = {
      totalTasks,
      inProgressTasks,
      completedTasks,
      pendingApprovals,
      completionRate
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>