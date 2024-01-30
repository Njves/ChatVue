<template>
    <div class="input-group mb-3">
        <input id="search-form" @input="messageStore.search($event.target.value)" type="text" class="form-control" minlength="1" placeholder="Введите запрос..." aria-label="Поиск" aria-describedby="basic-addon1">
        <button type="button" class="btn btn-secondary" id="search-run">Искать</button>
        <button type="button" @click="messageStore.removeMessages(messages)" class="btn btn-danger" v-if="showRemove">Удалить сообщение</button>
    </div>
</template>

<script setup>
import {useMessageStore} from "@/stores/messageStore";
import { defineProps } from "vue"
const messageStore = useMessageStore()


const props = defineProps({
    showRemove: {
        type: Boolean,
    },
    messages: {
        type: Object
    }
});


</script>
<style>


</style>