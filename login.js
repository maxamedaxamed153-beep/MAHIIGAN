import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { firebaseConfig } from './config.js';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('identity').value.trim();
  const pass = document.getElementById('password').value;

  try {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();

      if (userData.password === pass) {
        alert(`Ku soo dhawaada sxb ${userData.name}! ✅`);
        window.location.href = 'Home.html';
      } else {
        alert('Password-kaagu waa qaldan yahay! ❌');
      }
    } else {
      alert('Email-kan ma aha mid is-diiwaangeliyey! ❌');
    }
  } catch (error) {
    alert('Cilad ayaa dhacday: ' + error.message);
  }
});
