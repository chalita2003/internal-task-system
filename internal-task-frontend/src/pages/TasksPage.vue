<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">งานของฉัน</h1>
      <button
        @click="isDialogOpen = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
      >
        <Plus class="h-5 w-5 mr-2" />
        สร้างงานใหม่
      </button>
    </div>

    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <Circle class="h-6 w-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">รอดำเนินการ</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.todo }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <Clock class="h-6 w-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">กำลังดำเนินการ</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.inProgress }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <CheckCircle2 class="h-6 w-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">เสร็จสิ้น</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.completed }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="bg-white shadow-sm rounded-lg border">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8 px-6">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            class="py-4 px-1 border-b-2 font-medium text-sm transition-colors"
            :class="activeTab === tab.key
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            {{ tab.label }}
            <span class="ml-2 py-0.5 px-2 rounded-full text-xs"
                  :class="activeTab === tab.key ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'">
              {{ tab.count }}
            </span>
          </button>
        </nav>
      </div>

      <div class="p-6">
        <div v-if="filteredTasks.length === 0" class="text-center py-12">
          <ClipboardList class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">ไม่มีงาน</h3>
          <p class="mt-1 text-sm text-gray-500">ยังไม่มีงานในหมวดหมู่นี้</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TaskCard
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
            @update-status="handleUpdateStatus"
          />
        </div>
      </div>
    </div>

    <!-- Create Task Dialog -->
    <div
      v-if="isDialogOpen"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click="isDialogOpen = false"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" @click.stop>
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">สร้างงานใหม่</h3>

          <form @submit.prevent="handleCreateTask" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">หัวข้องาน</label>
              <input
                v-model="newTask.title"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="กรุณากรอกหัวข้องาน"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">รายละเอียด</label>
              <textarea
                v-model="newTask.description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="กรุณากรอกรายละเอียดงาน"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">ความสำคัญ</label>
                <select
                  v-model="newTask.priority"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">ต่ำ</option>
                  <option value="medium">ปานกลาง</option>
                  <option value="high">สูง</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">กำหนดเสร็จ</label>
                <input
                  v-model="newTask.deadline"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div class="flex space-x-3 pt-4">
              <button
                type="button"
                @click="isDialogOpen = false"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                <span v-if="isSubmitting">กำลังสร้าง...</span>
                <span v-else>สร้างงาน</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue-sonner'
import api from '@/utils/api'
import TaskCard from '@/components/tasks/TaskCard.vue'
import {
  Plus,
  Circle,
  Clock,
  CheckCircle2,
  ClipboardList
} from 'lucide-vue-next'

const authStore = useAuthStore()

const tasks = ref([])
const isDialogOpen = ref(false)
const isSubmitting = ref(false)
const activeTab = ref('all')

const newTask = ref({
  title: '',
  description: '',
  priority: 'medium',
  deadline: ''
})

const stats = computed(() => ({
  todo: tasks.value.filter(t => t.status === 'todo').length,
  inProgress: tasks.value.filter(t => t.status === 'in-progress').length,
  completed: tasks.value.filter(t => t.status === 'completed').length
}))

const tabs = computed(() => [
  { key: 'all', label: 'ทั้งหมด', count: tasks.value.length },
  { key: 'todo', label: 'รอดำเนินการ', count: stats.value.todo },
  { key: 'in-progress', label: 'กำลังดำเนินการ', count: stats.value.inProgress },
  { key: 'completed', label: 'เสร็จสิ้น', count: stats.value.completed }
])

const filteredTasks = computed(() => {
  if (activeTab.value === 'all') return tasks.value
  return tasks.value.filter(task => task.status === activeTab.value)
})

const fetchTasks = async () => {
  try {
    const response = await api.get('/tasks')
    tasks.value = response.data
  } catch (error) {
    console.error('Error fetching tasks:', error)
    toast.error('เกิดข้อผิดพลาดในการโหลดงาน')
  }
}

const handleCreateTask = async () => {
  if (!newTask.value.title.trim()) {
    toast.error('กรุณากรอกหัวข้องาน')
    return
  }

  isSubmitting.value = true
  try {
    await api.post('/tasks', {
      title: newTask.value.title,
      description: newTask.value.description,
      priority: newTask.value.priority,
      deadline: newTask.value.deadline || null,
      assigned_to: null // จะ assigned ให้ตัวเอง หรือตาม role
    })

    toast.success('สร้างงานใหม่สำเร็จ')
    isDialogOpen.value = false
    newTask.value = { title: '', description: '', priority: 'medium', deadline: '' }
    await fetchTasks()
  } catch (error) {
    console.error('Error creating task:', error)
    toast.error('เกิดข้อผิดพลาดในการสร้างงาน')
  } finally {
    isSubmitting.value = false
  }
}

const handleUpdateStatus = async (taskId, newStatus) => {
  try {
    await api.put(`/tasks/${taskId}`, { status: newStatus })
    toast.success('อัปเดตสถานะงานสำเร็จ')
    await fetchTasks()
  } catch (error) {
    console.error('Error updating task status:', error)
    toast.error('เกิดข้อผิดพลาดในการอัปเดตงาน')
  }
}

onMounted(() => {
  fetchTasks()
})
</script>