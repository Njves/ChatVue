<template>
    <div class="container control-container p-0">
        <InputMessage @onMessageSend="$emit('onMessageSend');console.log('scroll control')"/>
      <AttachedFiles />
    </div>

</template>

<script setup>
import InputMessage from './InputMessage.vue';
import AttachedFiles from "@/components/chat/input/AttachedFiles.vue";


</script>
<style>
.dragged {
  background-color: black;
}
.control {
    position: sticky;
    bottom: 0;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 -2px 1px 0 rgba(0, 0, 0, 0.16);
    border-left: 1px rgba(0, 0, 0, 0.16) solid;
    border-right: 1px rgba(0, 0, 0, 0.16) solid;
    border-bottom: 1px rgba(0, 0, 0, 0.16) solid;
    padding: 8px;
    margin:8px 8px 4px 8px;
}
</style>
