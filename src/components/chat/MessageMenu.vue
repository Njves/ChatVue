<template>
    <div class="input-group">
        <input id="search-form" @input="messageStore.search($event.target.value)" type="text" class="form-control" minlength="1" placeholder="Введите запрос..." aria-label="Поиск" aria-describedby="basic-addon1">
        <button type="button" class="btn btn-secondary" id="search-run">Искать</button>
        <button type="button" @click="messageStore.removeMessages(messages)" class="btn btn-danger" v-if="showRemove">Удалить сообщение</button>
        <button type="button" class="btn btn-primary" @click="subscribe">Отслеживать</button>
    </div>
</template>

<script setup>
import {useMessageStore} from "@/stores/messageStore";
import { defineProps } from "vue"
import {usePushStore} from "@/stores/pushStore";
const messageStore = useMessageStore()
const pushStore = usePushStore()

const props = defineProps({
    showRemove: {
        type: Boolean,
    },
    messages: {
        type: Object
    }
});

const subscribe = () => {
    if(!pushStore.canBeRegister())
        return
    pushStore.requestNotificationPermission()
    pushStore.register()
}
</script>
<style>


</style>