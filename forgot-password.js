// forgot-password.js - Dirista code-ka soo celinta password-ka

import { CONFIG } from './config.js';
import { db } from './firebase.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Bilow EmailJS (key-ga wuxuu ka imaanayaa config.js)
emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);

const form = document.getElementById('forgotForm');
const sendBtn = document.getElementById('sendBtn');

// Badhanka ku celi xaaladdiisii hore
function resetBtn() {
    sendBtn.innerHTML = 'Dir Code-ka <i class="fa-solid fa-paper-plane"></i>';
    sendBtn.disabled = false;
}

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();

    // Bedel badhanka si qofku u ogaado inuu sugayo
    sendBtn.innerHTML = 'Waa la dirayaa... <i class="fa-solid fa-spinner fa-spin"></i>';
    sendBtn.disabled = true;

    try {
        // 1. Hubi in email-ka uu ku jiro Firestore
        const docSnap = await getDoc(doc(db, "users", email));

        if (!docSnap.exists()) {
            alert('Email-kan kuma jiro diiwaanka! Fadlan hubi xarfo-qalka. ❌');
            resetBtn();
            return;
        }

        const userData = docSnap.data();

        // 2. Samee code 6 lambar ah oo random ah
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // 3. Ku kaydi Session si loo isticmaalo boggaga xiga
        sessionStorage.setItem('resetEmail', email);
        sessionStorage.setItem('resetCode', verificationCode);

        // 4. Xogta loo dirayo EmailJS
        const templateParams = {
            to_email: email,
            to_name: userData.name,
            message: verificationCode
        };

        // 5. Dir email-ka
        await emailjs.send(
            CONFIG.EMAILJS_SERVICE_ID,
            CONFIG.EMAILJS_TEMPLATE_ID,
            templateParams
        );

        alert('Code-ka xaqiijinta ayaa loo diray Email-kaaga! ✅');
        window.location.href = 'verify-reset.html';

    } catch (error) {
        alert('Cilad ayaa dhacday: ' + (error.message || JSON.stringify(error)));
        resetBtn();
    }
});
