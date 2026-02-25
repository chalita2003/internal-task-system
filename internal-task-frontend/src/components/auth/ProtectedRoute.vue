<template>
  <div v-if="isAuthenticated">
    <slot />
  </div>
  <div v-else>
    <router-view name="login" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
</script>