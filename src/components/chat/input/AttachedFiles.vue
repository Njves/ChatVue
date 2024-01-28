<template>
  <div class="attached-files-list d-flex flex-wrap">
    <div
        v-for="(photo, index) in attachmentStore.attachedFiles"
        :key="index"
        class="attached-file">
      <button
          class="attached-file-remove"
      />
      <img
          class="attached-img"
          :src="getSrc(photo)"
          width="150px"
          height="170px"
          :alt="`Фотография ${index + 1}`">
    </div>
  </div>
</template>
<script setup>
import {useAttachmentStore} from "@/stores/attachmentStore";
import { inject } from 'vue'

const attachmentStore = useAttachmentStore()
const getSrc = (photo) => {
  return URL.createObjectURL(photo);
}


</script>
<style>
.attached-img {
  object-fit: cover;
}
</style>