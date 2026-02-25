<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div class="w-full max-w-md space-y-6">
      <!-- Header -->
      <div class="text-center space-y-2">
        <div class="flex justify-center mb-4">
          <div class="bg-indigo-600 p-4 rounded-2xl">
            <Building2 class="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 class="text-3xl font-bold text-gray-900">ระบบจัดการงานภายในองค์กร</h1>
        <p class="text-gray-600">Internal Task & Approval System</p>
      </div>

      <!-- Login Card -->
      <div class="bg-white rounded-lg shadow-lg border">
        <div class="p-6">
          <div class="mb-4">
            <h2 class="text-xl font-semibold text-gray-900">เข้าสู่ระบบ</h2>
            <p class="text-sm text-gray-600 mt-1">กรุณากรอกข้อมูลเพื่อเข้าใช้งาน</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-700">อีเมล</label>
              <input
                id="email"
                type="email"
                placeholder="example@company.com"
                v-model="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div class="space-y-2">
              <label for="password" class="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
              <input
                id="password"
                type="password"
                placeholder="••••••"
                v-model="password"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <span v-if="isLoading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                กำลังเข้าสู่ระบบ...
              </span>
              <span v-else class="flex items-center">
                <LogIn class="w-4 h-4 mr-2" />
                เข้าสู่ระบบ
              </span>
            </button>
          </form>
        </div>
      </div>

      <!-- Demo Accounts -->
      <div class="bg-white rounded-lg shadow-lg border">
        <div class="p-6">
          <div class="mb-4">
            <h3 class="text-sm font-semibold text-gray-900">ทดลองใช้งาน (Demo)</h3>
            <p class="text-xs text-gray-600 mt-1">คลิกเพื่อเข้าสู่ระบบด้วยบทบาทต่างๆ</p>
          </div>

          <div class="space-y-2">
            <button
              @click="handleDemoLogin('employee')"
              class="w-full flex items-center justify-start px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span class="text-sm">พนักงาน (Employee)</span>
              </div>
            </button>
            <button
              @click="handleDemoLogin('manager')"
              class="w-full flex items-center justify-start px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span class="text-sm">ผู้จัดการ (Manager)</span>
              </div>
            </button>
            <button
              @click="handleDemoLogin('admin')"
              class="w-full flex items-center justify-start px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span class="text-sm">ผู้ดูแลระบบ (Admin)</span>
              </div>
            </button>
            <p class="text-xs text-gray-500 mt-4">
              หมายเหตุ: รหัสผ่านทุกบัญชีคือ <code class="bg-gray-100 px-2 py-1 rounded text-xs">123456</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue-sonner'
import api from '@/utils/api'
import { Building2, LogIn, User } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  if (!email.value || !password.value) {
    toast.error("กรุณากรอกอีเมลและรหัสผ่าน")
    return
  }

  isLoading.value = true

  try {
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })

    authStore.setUser(response.data.user, response.data.token)
    toast.success(`ยินดีต้อนรับ ${response.data.user.name}!`)
    router.push('/')
  } catch (err) {
    toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง")
  } finally {
    isLoading.value = false
  }
}

const handleDemoLogin = async (role) => {
  const demoAccounts = {
    employee: { email: 'somchai@company.com', password: '123456' },
    manager: { email: 'somying@company.com', password: '123456' },
    admin: { email: 'admin@company.com', password: '123456' }
  }

  const account = demoAccounts[role]
  if (!account) return

  email.value = account.email
  password.value = account.password
  await handleLogin()
}
</script>