<template>
  <div class="clearfix" v-if="!isSender">
    <div class="message m-1" >
      <div class="row">
        <div class="col">
          <span>{{ message.user.username }} {{ formatDate(message.date) }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <span>{{ message.text }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="clearfix" v-else>
    <div class="message-owner m-1">
      <div class="row">
        <div class="col">
          <span>{{ message.user.username }} {{ formatDate(message.date) }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <span>{{ message.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import moment from 'moment';

const props = defineProps({
  message: {
    type: Object,
    required: true,
    default: () => { },
  },
  isSender: {
    type: Boolean,
    required: false,
    default: false
  }
});

const formatDate = (value) => {
  if (value)
    return moment(String(value)).format('hh:mm')
}

</script>
<style>
.message-owner {
  background-color: rgb(102, 102, 102, 0.2);
  padding: 8px;
  border-radius: 20px;
  width: fit-content;
  max-width: 70%;
  margin: 4px;
  word-break: break-all;
  float: right;
}
.message {
  background-color: rgb(102, 102, 102, 0.2);
  padding: 8px;
  border-radius: 20px;
  width: fit-content;
  max-width: 70%;
  margin: 4px;
  word-break: break-all;
  float: left;
}
</style>