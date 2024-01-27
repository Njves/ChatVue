import {createRouter, createWebHistory} from 'vue-router'
import LoginComponent from '../components/LoginComponent'
import RegisterComponent from '../components/RegisterComponent'
import AuthLayout from '../components/AuthLayout'
import RoomsList from '../components/RoomsList'
import NotFound from '../components/RoomsList'
import ChatView from '../components/ChatView'

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