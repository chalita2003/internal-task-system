<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">อนุมัติเอกสาร</h1>
      <button
        @click="isDialogOpen = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
      >
        <Plus class="h-5 w-5 mr-2" />
        สร้างคำขออนุมัติ
      </button>
    </div>

    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <Clock class="h-6 w-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">รออนุมัติ</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.pending }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <CheckCircle2 class="h-6 w-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">อนุมัติแล้ว</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.approved }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <XCircle class="h-6 w-6 text-red-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">ปฏิเสธ</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.rejected }}</p>
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
        <div v-if="filteredApprovals.length === 0" class="text-center py-12">
          <FileCheck class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">ไม่มีเอกสาร</h3>
          <p class="mt-1 text-sm text-gray-500">ยังไม่มีเอกสารในหมวดหมู่นี้</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ApprovalCard
            v-for="approval in filteredApprovals"
            :key="approval.id"
            :approval="approval"
            @approve="handleApprove"
            @reject="handleReject"
          />
        </div>
      </div>
    </div>

    <!-- Create Approval Dialog -->
    <div
      v-if="isDialogOpen"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click="isDialogOpen = false"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" @click.stop>
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">สร้างคำขออนุมัติ</h3>

          <form @submit.prevent="handleCreateApproval" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">หัวข้อ</label>
              <input
                v-model="newApproval.title"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="กรุณากรอกหัวข้อ"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">รายละเอียด</label>
              <textarea
                v-model="newApproval.description"
                rows="3"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="กรุณากรอกรายละเอียด"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">ประเภท</label>
                <select
                  v-model="newApproval.type"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="leave">ลางาน</option>
                  <option value="purchase">จัดซื้อ</option>
                  <option value="budget">งบประมาณ</option>
                  <option value="other">อื่นๆ</option>
                </select>
              </div>

              <div v-if="newApproval.type === 'purchase' || newApproval.type === 'budget'">
                <label class="block text-sm font-medium text-gray-700 mb-1">จำนวนเงิน</label>
                <input
                  v-model="newApproval.amount"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
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
                <span v-if="isSubmitting">กำลังส่ง...</span>
                <span v-else>ส่งคำขออนุมัติ</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Approval Action Dialog -->
    <div
      v-if="selectedApproval"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click="closeApprovalDialog"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" @click.stop>
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ approvalAction === 'approve' ? 'อนุมัติ' : 'ปฏิเสธ' }}เอกสาร
          </h3>
          <p class="text-gray-600 mb-4">{{ selectedApproval.title }}</p>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ความเห็น (ไม่บังคับ)</label>
              <textarea
                v-model="comment"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="กรุณากรอกความเห็น"
              ></textarea>
            </div>

            <div class="flex space-x-3 pt-4">
              <button
                type="button"
                @click="closeApprovalDialog"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                @click="handleApprovalAction"
                :disabled="isSubmitting"
                class="flex-1 px-4 py-2 rounded-md text-white font-medium disabled:opacity-50"
                :class="approvalAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'"
              >
                <span v-if="isSubmitting">กำลังดำเนินการ...</span>
                <span v-else>{{ approvalAction === 'approve' ? 'อนุมัติ' : 'ปฏิเสธ' }}</span>
              </button>
            </div>
          </div>
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
import ApprovalCard from '@/components/approvals/ApprovalCard.vue'
import {
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  FileCheck
} from 'lucide-vue-next'

const authStore = useAuthStore()

const approvals = ref([])
const isDialogOpen = ref(false)
const isSubmitting = ref(false)
const activeTab = ref('all')
const selectedApproval = ref(null)
const approvalAction = ref(null)
const comment = ref('')

const newApproval = ref({
  title: '',
  description: '',
  type: 'leave',
  amount: ''
})

const stats = computed(() => ({
  pending: approvals.value.filter(a => a.status === 'pending').length,
  approved: approvals.value.filter(a => a.status === 'approved').length,
  rejected: approvals.value.filter(a => a.status === 'rejected').length
}))

const tabs = computed(() => [
  { key: 'all', label: 'ทั้งหมด', count: approvals.value.length },
  { key: 'pending', label: 'รออนุมัติ', count: stats.value.pending },
  { key: 'approved', label: 'อนุมัติแล้ว', count: stats.value.approved },
  { key: 'rejected', label: 'ปฏิเสธ', count: stats.value.rejected }
])

const filteredApprovals = computed(() => {
  if (activeTab.value === 'all') return approvals.value
  return approvals.value.filter(approval => approval.status === activeTab.value)
})

const fetchApprovals = async () => {
  try {
    const response = await api.get('/approvals')
    approvals.value = response.data
  } catch (error) {
    console.error('Error fetching approvals:', error)
    toast.error('เกิดข้อผิดพลาดในการโหลดเอกสาร')
  }
}

const handleCreateApproval = async () => {
  if (!newApproval.value.title.trim() || !newApproval.value.description.trim()) {
    toast.error('กรุณากรอกข้อมูลให้ครบถ้วน')
    return
  }

  isSubmitting.value = true
  try {
    await api.post('/approvals', {
      title: newApproval.value.title,
      description: newApproval.value.description,
      type: newApproval.value.type,
      amount: newApproval.value.amount ? parseFloat(newApproval.value.amount) : null
    })

    toast.success('ส่งคำขออนุมัติสำเร็จ')
    isDialogOpen.value = false
    newApproval.value = { title: '', description: '', type: 'leave', amount: '' }
    await fetchApprovals()
  } catch (error) {
    console.error('Error creating approval:', error)
    toast.error('เกิดข้อผิดพลาดในการส่งคำขออนุมัติ')
  } finally {
    isSubmitting.value = false
  }
}

const handleApprove = (approval) => {
  selectedApproval.value = approval
  approvalAction.value = 'approve'
  comment.value = ''
}

const handleReject = (approval) => {
  selectedApproval.value = approval
  approvalAction.value = 'reject'
  comment.value = ''
}

const closeApprovalDialog = () => {
  selectedApproval.value = null
  approvalAction.value = null
  comment.value = ''
}

const handleApprovalAction = async () => {
  if (!selectedApproval.value) return

  isSubmitting.value = true
  try {
    const endpoint = approvalAction.value === 'approve' ? 'approve' : 'reject'
    await api.put(`/approvals/${selectedApproval.value.id}/${endpoint}`, {
      comment: comment.value
    })

    toast.success(`เอกสาร${approvalAction.value === 'approve' ? 'อนุมัติ' : 'ปฏิเสธ'}สำเร็จ`)
    closeApprovalDialog()
    await fetchApprovals()
  } catch (error) {
    console.error('Error processing approval:', error)
    toast.error('เกิดข้อผิดพลาดในการดำเนินการ')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchApprovals()
})
</script>