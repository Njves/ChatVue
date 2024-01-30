import {createRouter, createWebHistory} from 'vue-router'
import { useAuthStore} from "@/stores/authStore";
import LoginComponent from '../components/auth/LoginComponent.vue'
import RegisterComponent from '../components/auth/RegisterComponent.vue'
import AuthLayout from '../components/auth/AuthLayout.vue'
import RoomsList from '../components/room/RoomsList.vue'
import NotFound from '../components/room/RoomsList.vue'
import ChatView from '../components/chat/ChatView.vue'


export const router = createRouter({
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

// router.beforeEach((to, from, next) => {
//     const auth = useAuthStore()
//     if(auth.token === true) next({name: 'chat'})
//     else next()
// })
