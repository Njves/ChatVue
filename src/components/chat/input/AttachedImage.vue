<template>
    <div class="container d-flex attach-container flex-column">
        <img
            class="attached-img mb-1"
            :src="url + attachment.link"
            width="150px"
            height="170px"

            :class="{'remove-attach': onHover}"
            :alt="`Фотография ${index + 1}`" @click="showFull = true" />
        <button class="btn p-0" @click="attachmentStore.removeAttachment(attachment)">Удалить</button>
    </div>



</template>
<script setup>
import {useAttachmentStore} from "@/stores/attachmentStore";
import {defineProps, inject, ref} from 'vue'
import AttachmentFullImage from "@/components/chat/AttachmentFullImage.vue";
const attachmentStore = useAttachmentStore()
const props = defineProps({
    attachment: {
        type: Object,
        required: true,
        default: () => { },
    },
    index: Number
});
const url = process.env.VUE_APP_URL
const onHover = ref(false)
const showFull = ref(false)

</script>
<style>
.attached-img {
    object-fit: cover;
}
.remove-attach {
    opacity: 0.3;
}
.attach-container {
    cursor: pointer;
}
</style>