<template>
  <div class="attached-files-list d-flex flex-wrap">
    <div
        v-for="(attachment, index) in attachmentStore.attachedFiles"
        :key="index"
        class="attached-file">
      <AttachedImage :attachment="attachment" :index="index" />
    </div>
  </div>
</template>
<script setup>
import {useAttachmentStore} from "@/stores/attachmentStore";
import {inject, ref} from 'vue'
import AttachedImage from "@/components/chat/input/AttachedImage.vue";

const attachmentStore = useAttachmentStore()

</script>
<style>
.attached-img {
  object-fit: cover;
}
.remove-attach {
    opacity: 0.5
}
</style>