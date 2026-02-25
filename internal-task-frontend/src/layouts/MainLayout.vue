<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <Building2 class="h-8 w-8 text-blue-600 mr-2" />
            <h1 class="text-xl font-bold text-gray-900">ระบบจัดการงานภายใน</h1>
          </div>

          <!-- User Menu -->
          <div class="flex items-center space-x-4">
            <div class="hidden md:flex items-center space-x-2">
              <User class="h-5 w-5 text-gray-500" />
              <span class="text-sm text-gray-700">{{ user.name }}</span>
              <span
                class="px-2 py-1 text-xs rounded-full"
                :class="getRoleBadgeColor(user.role)"
              >
                {{ getRoleLabel(user.role) }}
              </span>
            </div>
            <button
              @click="handleLogout"
              class="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
            >
              <LogOut class="h-5 w-5" />
              <span class="hidden md:inline">ออกจากระบบ</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar Navigation -->
      <nav class="hidden md:block w-64 bg-white shadow-sm min-h-screen">
        <div class="p-4">
          <ul class="space-y-2">
            <li>
              <router-link
                to="/"
                class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
                :class="isActive('/') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'"
              >
                <LayoutDashboard class="h-5 w-5" />
                <span>แดชบอร์ด</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/tasks"
                class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
                :class="isActive('/tasks') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'"
              >
                <ClipboardList class="h-5 w-5" />
                <span>งานของฉัน</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/approvals"
                class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
                :class="isActive('/approvals') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'"
              >
                <FileCheck class="h-5 w-5" />
                <span>อนุมัติเอกสาร</span>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Mobile Navigation -->
      <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div class="flex justify-around py-2">
          <router-link
            to="/"
            class="flex flex-col items-center space-y-1 py-2 px-4 rounded-lg transition-colors"
            :class="isActive('/') ? 'text-blue-600' : 'text-gray-600'"
          >
            <LayoutDashboard class="h-5 w-5" />
            <span class="text-xs">แดชบอร์ด</span>
          </router-link>
          <router-link
            to="/tasks"
            class="flex flex-col items-center space-y-1 py-2 px-4 rounded-lg transition-colors"
            :class="isActive('/tasks') ? 'text-blue-600' : 'text-gray-600'"
          >
            <ClipboardList class="h-5 w-5" />
            <span class="text-xs">งาน</span>
          </router-link>
          <router-link
            to="/approvals"
            class="flex flex-col items-center space-y-1 py-2 px-4 rounded-lg transition-colors"
            :class="isActive('/approvals') ? 'text-blue-600' : 'text-gray-600'"
          >
            <FileCheck class="h-5 w-5" />
            <span class="text-xs">อนุมัติ</span>
          </router-link>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="flex-1 p-6 pb-20 md:pb-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getRoleBadgeColor, getRoleLabel } from '@/utils/helpers'
import {
  Building2,
  User,
  LogOut,
  LayoutDashboard,
  ClipboardList,
  FileCheck
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const isActive = (path) => route.path === path

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>