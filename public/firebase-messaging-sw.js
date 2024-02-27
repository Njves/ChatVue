importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js')
self.addEventListener('install', (event) => {
    console.log('Установлен');
});

self.addEventListener('activate', (event) => {
    console.log('Активирован');
});

self.addEventListener('fetch', (event) => {
    console.log('Происходит запрос на сервер');
});

const firebaseConfig = {
    apiKey: "AIzaSyCpBvT5wSfuSYn65vHBhgZpIP91_TsKXlA",
    authDomain: "chat-f82e6.firebaseapp.com",
    projectId: "chat-f82e6",
    storageBucket: "chat-f82e6.appspot.com",
    messagingSenderId: "893896682214",
    appId: "1:893896682214:web:0f22bf7d8ef894f62c2927",
    measurementId: "G-T93C6L0Y19"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage(messaging, function(payload) {
    console.log('Handling background message', payload);

    // Copy data object to get parameters in the click handler
    payload.data.data = JSON.parse(JSON.stringify(payload.data));

    return self.registration.showNotification(payload.data.title, payload.data);
});
