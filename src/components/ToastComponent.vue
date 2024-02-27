<template>
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">Пришло сообщение</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>

            <div v-if="message" class="toast-body">
                {{ message.text }}
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    message: {
        type: Object
    }
})
</script>
