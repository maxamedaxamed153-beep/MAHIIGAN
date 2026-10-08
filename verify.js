import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Xogta Firebase config ka soo import gareey config.js
import { CONFIG } from './config.js'; // ✅ Soo import garee CONFIG

const app = initializeApp(CONFIG.FIREBASE); // ✅ Isticmaal CONFIG.FIREBASE
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Soosaarida Email-ka ku kaydsan Session Storage
const savedEmail = sessionStorage.getItem('resetEmail') || sessionStorage.getItem('userEmail');
const emailDisplay = document.querySelector('.subtitle strong');

if (savedEmail && emailDisplay) {
  emailDisplay.textContent = savedEmail;
}

  // 2. Maareynta 6-da Sanduuq ee OTP (Auto-focus, Backspace, Paste)
  const boxes = document.querySelectorAll('.otp');

  boxes.forEach((box, i) => {
    // Qorista lambarrada & u gudubka sanduuqa xiga
    box.addEventListener('input', () => {
      box.value = box.value.replace(/\D/g, '');
      if (box.value && i < boxes.length - 1) {
        boxes[i + 1].focus();
      }
    });

    // Ka noqoshada (Backspace)
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && i > 0) {
        boxes[i - 1].focus();
      }
    });

    // Ku shubida koodh dhan oo la copy soo sameeyay (Paste)
    box.addEventListener('paste', (e) => {
      const digits = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, boxes.length);
      if (!digits) return;
      e.preventDefault();
      digits.split('').forEach((d, k) => {
        if (boxes[k]) boxes[k].value = d;
      });
      boxes[Math.min(digits.length, boxes.length - 1)].focus();
    });
  });

  if (boxes.length > 0) boxes[0].focus();

  // 3. Waqtiyaysaha (Timer)
  let seconds = 26;
  const timerEl = document.getElementById('timer');
  if (timerEl) {
    const countdown = setInterval(() => {
      seconds--;
      if (seconds <= 0) {
        clearInterval(countdown);
        timerEl.innerHTML = '<a href="#">Dib u dir</a>';
        if (timerEl.previousSibling) {
          timerEl.previousSibling.textContent = '';
        }
      } else {
        timerEl.textContent = seconds + 's';
      }
    }, 1000);
  }

  // 4. Xaqiijinta Koodhka & U dirida Firebase Firestore
  const otpForm = document.getElementById('otpForm');
  if (otpForm) {
    otpForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Isku xidh 6-da god ee koodhka lagu qoray
      const userCode = Array.from(boxes).map(box => box.value).join('');
      const savedCode = sessionStorage.getItem('resetCode') || sessionStorage.getItem('savedCode');

      if (userCode.length < 6) {
        alert('Fadlan dhameystir 6-da lambar ee koodhka.');
        return;
      }

      if (userCode === savedCode) {
        const name = sessionStorage.getItem('userName');
        const email = sessionStorage.getItem('userEmail');
        const pass = sessionStorage.getItem('userPassword');

        try {
          await setDoc(doc(db, "users", email), {
            name: name,
            email: email,
            password: pass,
            date: new Date().toISOString()
          });
          alert('Waa la diiwaangeliyay! ✅');
          window.location.href = 'home.html';
        } catch (error) {
          alert('Cilad ayaa dhacday: ' + error.message);
        }
      } else {
        alert('Koodhkaagu waa qaldan yahay.');
      }
    });
  }
});
