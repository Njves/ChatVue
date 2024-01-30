<template>
    <button class="btn attach" @click="inputFile.click()"><img class="attach-img" src="../../../assets/paperclip.svg"/></button>
    <input v-show="false" multiple ref="inputFile" @change="onAttachFile" type="file" />
</template>
<script setup>
import { ref } from 'vue'
import {useMessageStore} from "@/stores/messageStore";
import {useAttachmentStore} from "@/stores/attachmentStore";
const inputFile = ref(null)
const store = useAttachmentStore()
const onAttachFile = (event) => {
    for(const file of event.target.files)
    store.uploadFile(file)
}

</script>