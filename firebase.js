import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAaRTHlkfc0fDwfVNCDvqtMqg39NzIsqhY",
  authDomain: "login-6f03a.firebaseapp.com",
  projectId: "login-6f03a",
  storageBucket: "login-6f03a.firebasestorage.app",
  messagingSenderId: "392453627354",
  appId: "1:392453627354:web:dd84fb1a0e4d18790cb4e3"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
