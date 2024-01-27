<template>
    <div class="container login-form" style="max-width: 50%;">
        <form @submit.prevent="authStore.auth('login', form)">
            <h2 style="padding-bottom: 8px; text-align: center;">Логин</h2>
            <div class="mb-3">
                <label for="inputUsername" class="form-label">Имя пользователя</label>
                <input v-model="username" :="usernameAttrs" type="text" class="form-control" id="inputUsername">
                <div id="usernameHelp" class="form-text">Введите имя пользователя</div>
                {{  errors.username }}
            </div>
            <div class="mb-3">
                <label for="inputPassword" class="form-label">Пароль</label>
                <input type="password" :="passwordAttrs" v-model="form.password" class="form-control" id="inputPassword">
                {{ errors.password }}
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="checkRemberMe">
                <label class="form-check-label" for="checkRemberMe">Запомнить меня</label>
            </div>
            <div class="mb-3">
                <span class="text-danger">{{ authStore.error }}</span>
            </div>
            <div class="mb-3">
                <span class="text-success">{{ authStore.user }}</span>
            </div>
            <div class="mb-3 center">
                <router-link :to="{ 'name': 'register' }" class="btn btn-primary">Создать аккаунт</router-link>
            </div>
            <button :disabled="!meta.valid" type="submit" class="btn btn-success">Войти
            </button>
            <div class="d-flex justify-content-center" v-if="authStore.loader">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

import { useForm } from 'vee-validate';
import * as yup from 'yup';

const { meta, errors, defineField } = useForm({
  validationSchema: yup.object({
    username: yup.string().required(),
    password: yup.string().required().min(6).max(12)
  }),
});

const [username, usernameAttrs] = defineField('username');
const [password, passwordAttrs] = defineField('password');
const form = reactive({ username: username, password: password, color: '#00000' })
</script>
<style>
.login-form {
    margin: 100px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
</style>