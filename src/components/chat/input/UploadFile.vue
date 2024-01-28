<template>
  <div class="input-wrapper" :class="{dragged: isDragged}">
    <span v-if="isDragged">Перетащите сюда файл</span>
    <input :ref="inputFiles" @change="uploadFile"
           class="draggedFile" title="" type="file" multiple
           @dragenter="isDragged = true" @dragleave="isDragged = false" />
  </div>
</template>
<script setup>
import { ref, provide } from "vue"
import { useAttachmentStore } from "@/stores/attachmentStore";

const attachmentStore = useAttachmentStore()
const inputFiles = ref(null)
const isDragged = ref(false)

const uploadFile = (event) => {

  // if(event.target.files)
  //   photos.value = [...photos.value, ...event.target.files]

  for (let i = 0; i < event.target.files.length; i++) {
    attachmentStore.uploadFile(event.target.files[i])
  }


  if (inputFiles.value) {
    inputFiles.value.value = '';
  }
  isDragged.value = false
}
</script>
<style>
.input-wrapper {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.dragged {
  opacity: 100;
  background-color: rgba(0, 0, 0, 0.2);
}

.draggedFile {
  position: absolute;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  opacity: 0;
}
</style>