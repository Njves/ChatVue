import {createRouter, createWebHistory} from 'vue-router'
import LoginComponent from '../components/auth/LoginComponent.vue'
import RegisterComponent from '../components/auth/RegisterComponent.vue'
import AuthLayout from '../components/auth/AuthLayout.vue'
import RoomsList from '../components/room/RoomsList.vue'
import NotFound from '../components/room/RoomsList.vue'
import ChatView from '../components/chat/ChatView.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: {'name': 'login'},
            component: AuthLayout,
            children: [
                {
                    name: 'login',
                    path: '/login',
                    component: LoginComponent
                },
                {
                    name: 'register',
                    path: '/register',
                    component: RegisterComponent
                }
            ],   
        },
        {
            path: '/rooms',
            name: 'rooms',
            component: RoomsList
        },
        {
            path: '/chat',
            name: 'chat',
            component: ChatView
        },
        {
            path: '/:pathMatch(.*)',
            component: NotFound
        }
    ]
})