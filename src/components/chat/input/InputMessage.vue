<template>
    <div class="input">
        <AttachComponent />
        <input @keydown.enter="sendMessage" ref="inputText" v-model="textMessage" minlength="1" required id="message" type="text" class="form-control"
            placeholder="Введите сообщение..." aria-label="Default" aria-describedby="inputGroup-sizing-default">
        <button @click="sendMessage" class="btn send-msg" id="send_msg"><img class="send-img" src="../../../assets/send.svg"></button>
    </div>
</template>
<script setup>
import AttachComponent from './AttachComponent.vue';
import { useMessageStore } from '@/stores/messageStore'
import { useAttachmentStore } from "@/stores/attachmentStore";
import { ref, defineEmits } from 'vue'

const textMessage = ref('')
const messageStore = useMessageStore()
const attachmentsStore = useAttachmentStore()
const emit = defineEmits(['onMessageSend'])
messageStore.subscribe()

const sendMessage = () => {
    messageStore.sendMessage({text: textMessage.value, date: new Date(), attachments: attachmentsStore.attachedFiles})
    attachmentsStore.clearAttachments()
    textMessage.value = ''
    emit("onMessageSend")
}

</script>
<style>
.input {
    display: flex;
}
</style>