// register.js

// Bilow EmailJS (key-ga wuxuu ka imaanayaa config.js)
emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);

const form = document.getElementById('registerForm');
const btn = document.querySelector('.btn-primary');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // 1. Soo qabo xogta
    const name = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 2. Ku kaydi sessionStorage (Muhiim u ah Firebase)
    sessionStorage.setItem('userName', name);
    sessionStorage.setItem('userEmail', email);
    sessionStorage.setItem('userPassword', password);

    // 3. Samee koodhka
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    sessionStorage.setItem('savedCode', verificationCode);

    // 4. Badhanka bedel
    btn.innerHTML = 'Waa la dirayaa... <i class="fa-solid fa-spinner fa-spin"></i>';
    btn.style.backgroundColor = '#f59e0b';

    const templateParams = {
        to_name: name,
        to_email: email,
        passcode: verificationCode
    };

    // 5. Dir Email-ka
    emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, templateParams)
        .then(function (response) {
            window.location.href = 'verify-code.html';
        }, function (error) {
            alert('Cilad ayaa dhacday, fadlan dib u isku day.');
            btn.innerHTML = 'Send Code Email <i class="fa-solid fa-paper-plane"></i>';
            btn.style.backgroundColor = '#10b981';
        });
});
