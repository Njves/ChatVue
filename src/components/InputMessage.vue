<template>
    <div class="input">
        <AttachComponent />
        <input maxlength="256" minlength="1" required id="message" type="text" class="form-control"
            placeholder="Введите сообщение..." aria-label="Default" aria-describedby="inputGroup-sizing-default">

        <button class="btn send-msg" id="send_msg"><img class="send-img" src="../assets/send.svg"></button>
    </div>
</template>
<script setup>
import AttachComponent from './AttachComponent.vue';
</script>
<style>
.input {
    display: flex;
}
</style>