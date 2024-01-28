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
import { useMessageStore } from '../../../stores/messageStore'
import { ref } from 'vue'

const textMessage = ref('')
const messageStore = useMessageStore()
messageStore.subscribe()

const sendMessage = () => {
    messageStore.sendMessage({text: textMessage.value, date: new Date()})
    textMessage.value = ''
}

</script>
<style>
.input {
    display: flex;
}
</style>