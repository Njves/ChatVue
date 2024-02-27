<template>
    <router-view></router-view>
</template>

<script setup>
import {useAuthStore} from "@/stores/authStore";
import {router} from "@/router";

const authStore = useAuthStore()
authStore.getUser().then(user => {
    // router.push('chat')
})
</script>

<style>
#app {
    font-family: 'Roboto Mono', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
  