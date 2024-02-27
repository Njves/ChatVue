import {defineStore} from "pinia";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCpBvT5wSfuSYn65vHBhgZpIP91_TsKXlA",
    authDomain: "chat-f82e6.firebaseapp.com",
    projectId: "chat-f82e6",
    storageBucket: "chat-f82e6.appspot.com",
    messagingSenderId: "893896682214",
    appId: "1:893896682214:web:0f22bf7d8ef894f62c2927",
    measurementId: "G-T93C6L0Y19"
};





export const usePushStore = defineStore("pushStore", {
    state: () => ({
        worker: null,
        messaging: getMessaging(initializeApp(firebaseConfig))
    }),
    actions: {
        canBeRegister() {
            if (!('serviceWorker' in navigator)) {
                // Service Worker isn't supported on this browser, disable or hide UI.
                return false;
            }
            return 'PushManager' in window;

        },
        async register() {
            this.worker =  navigator.serviceWorker
                .register('/firebase-messaging-sw.js')
                .then(function (registration) {
                    console.log('Service worker successfully registered.');
                    return registration;
                })
                .catch(function (err) {
                    console.error('Unable to register service worker.', err);
                });
        },
        async requestNotificationPermission() {

            getToken(this.messaging, {
                vapidKey: "BOSEtNKd-Y1IaaH5ghnrOcqK6D8hoFG-R0GJtxwhQK11cCBxQKm6A685S2Sl6AE8wILvqSKIsKYp53kUnQQ68Z0"
            }).then(function(currentToken) {
                if(currentToken) {
                    console.log('Отправка токена на сервер...');
                    const res = fetch('https://127.0.0.1:5000/notification/' + currentToken)
                    console.log(res)
                    window.localStorage.setItem(
                        'sentFirebaseMessagingToken',
                        currentToken ? currentToken : ''
                    );
                }
            })
            onMessage(this.messaging, function(payload) {
                Notification.requestPermission(function(permission) {
                    if (permission === 'granted') {
                        navigator.serviceWorker.ready.then(function(registration) {
                            // Copy data object to get parameters in the click handler
                            console.log(payload)
                            payload.data = JSON.parse(JSON.stringify(payload.notification));

                            registration.showNotification(payload.data.title, payload.data);
                        }).catch(function(error) {
                            console.log(error)
                        });
                    }
                });
            })

        }
    }

})
