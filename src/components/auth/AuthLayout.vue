<template>
    <router-view></router-view>
</template>

<script setup>
import {useAuthStore} from "@/stores/authStore";

const authStore = useAuthStore()
authStore.getUser()
</script>

<style>
#app {
    font-family: 'Roboto Mono', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
  