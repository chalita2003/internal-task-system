import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('currentUser') || 'null'))
  const token = ref(localStorage.getItem('token') || '')

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isManager = computed(() => user.value?.role === 'manager' || user.value?.role === 'admin')
  const isEmployee = computed(() => user.value?.role === 'employee')

  function setUser(userData, userToken) {
    user.value = userData
    token.value = userToken
    localStorage.setItem('currentUser', JSON.stringify(userData))
    localStorage.setItem('token', userToken)
  }

  function logout() {
    user.value = null
    token.value = ''
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
  }

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    isManager,
    isEmployee,
    setUser,
    logout
  }
})