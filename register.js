// register.js
import { CONFIG } from './config.js'; // ✅ Ku dar safkan ugu sareysa
import { checkAccountExists } from './register2.js';
import { redirectIfLoggedIn } from './session.js';

// Haddii uu horay login u ahaa, u dir Home
redirectIfLoggedIn();

// Bilow EmailJS (key-ga wuxuu ka imaanayaa config.js)
emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);

const form = document.getElementById('registerForm');
const btn = document.querySelector('.btn-primary');

const resetBtn = () => {
    btn.disabled = false;
    btn.innerHTML = 'Send Code Email <i class="fa-solid fa-paper-plane"></i>';
    btn.style.backgroundColor = '#10b981';
};

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // 1. Soo qabo xogta
    const name = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // 2. Hubi account horay u jiray (register2.js)
    btn.disabled = true;
    btn.innerHTML = 'Waa la hubinayaa... <i class="fa-solid fa-spinner fa-spin"></i>';
    btn.style.backgroundColor = '#f59e0b';

    try {
        const { exists } = await checkAccountExists(email);
        if (exists) {
            alert('Email-kan horay account ayuu u lahaa! Fadlan Login samee. ⚠️');
            window.location.href = 'Login.html';
            return;
        }
    } catch (error) {
        alert('Cilad ayaa dhacday: ' + error.message);
        resetBtn();
        return;
    }

    // 3. Ku kaydi sessionStorage (Muhiim u ah Firebase)
    sessionStorage.setItem('userName', name);
    sessionStorage.setItem('userEmail', email);
    sessionStorage.setItem('userPassword', password);

    // 4. Samee koodhka
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    sessionStorage.setItem('savedCode', verificationCode);

    // 5. Badhanka bedel
    btn.innerHTML = 'Waa la dirayaa... <i class="fa-solid fa-spinner fa-spin"></i>';
    btn.style.backgroundColor = '#f59e0b';

    const templateParams = {
        to_name: name,
        to_email: email,
        passcode: verificationCode
    };

    // 6. Dir Email-ka
    emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, templateParams)
        .then(function (response) {
            window.location.href = 'verify-code.html';
        }, function (error) {
            alert('Cilad ayaa dhacday, fadlan dib u isku day.');
            resetBtn();
        });
});
