import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyABwzxaSftH4-Lrga8vxZSo0y8AD4uHHfQ",
        authDomain: "mahiigan-6763a.firebaseapp.com",
        projectId: "mahiigan-6763a",
        storageBucket: "mahiigan-6763a.firebasestorage.app",
        messagingSenderId: "527129135766",
        appId: "1:527129135766:web:84cfc0129557644a8310b7",
        measurementId: "G-7W5L7FSW9F"
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
