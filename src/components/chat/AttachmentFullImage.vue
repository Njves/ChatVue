<template>
    <div class="container-fluid" v-if="showFull" style="position: absolute; height: 90%">
        <img
            class="attached-img"
            :src="url + attachment.link"
            :class="{'remove-attach': onHover}"
            :alt="`Фотография ${index + 1}`" />
        <button class="btn btn-primary" @click="$emit('close')">Закрыть</button>
    </div>
</template>
<script setup>
import {defineProps} from 'vue'
const url = process.env.VUE_APP_URL
const props = defineProps({
    attachment: {
        type: Object,
        required: true,
        default: () => { },
    },
    showFull: {
        type: Boolean
    }
});

</script>