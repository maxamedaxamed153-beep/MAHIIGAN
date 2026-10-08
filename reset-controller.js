// reset-controller.js
import { checkResetCode, setNewPassword, sendResetNotification } from "./reset-service.js";

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("resetForm");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirm");
    const alertMessage = document.getElementById("alertMessage");
    const submitBtn = form?.querySelector("button[type='submit']");
    
    let userEmail = "";

    // A. Password Toggle (Show/Hide)
    document.querySelectorAll(".toggle").forEach((btn) => {
        btn.addEventListener("click", () => {
            const input = document.getElementById(btn.dataset.target);
            if (input) {
                input.type = input.type === "password" ? "text" : "password";
            }
        });
    });

    // B. Akhri URL oobCode
    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get("oobCode");

    if (!oobCode) {
        showAlert("Link-ga aad isticmaashay ma saxna ama ma wato code-kii loo baahnaa.", "red");
        if (form) form.style.display = "none";
        return;
    }

    // C. Hubi in oobCode-ku shaqaynayo
    const codeCheck = await checkResetCode(oobCode);
    if (!codeCheck.success) {
        showAlert("Link-ga waa uu dhacay ama hore ayaa loo isticmaalay. Dib u codso link cusub.", "red");
        if (form) form.style.display = "none";
        return;
    }

    userEmail = codeCheck.email; // Kaydi email-ka isticmaalaha

    // D. Foomka Submit-kiisa
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const password = passwordInput.value.trim();
            const confirm = confirmInput.value.trim();

            if (!password || !confirm) {
                showAlert("Fadlan buuxi labada meeloodba.", "red");
                return;
            }

            if (password !== confirm) {
                showAlert("Labada fure isma leeyihiin, fadlan si sax ah u qor.", "red");
                return;
            }

            if (password.length < 6) {
                showAlert("Furaha waa inuu ka badan yahay ugu yaraan 6 xaraf/nambar.", "red");
                return;
            }

            // Disable button inta ay shaqadu socoto
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerText = "Fadlan sug...";

            // Beddel password-ka
            const res = await setNewPassword(oobCode, password);

            if (res.success) {
                showAlert("Furahaaga si guul leh ayaa loo beddelay! Waxaa loo leexinayaa bogga login-ka...", "green");

                // Ikhtiyaari: Dir ogeysiis EmailJS ah
                if (userEmail) {
                    await sendResetNotification(userEmail);
                }

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2500);

            } else {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                showAlert("Khalad ayaa dhacay: " + formatError(res.error), "red");
            }
        });
    }

    function showAlert(message, color) {
        if (alertMessage) {
            alertMessage.style.color = color === "green" ? "#1fd6a0" : "#ff6b6b";
            alertMessage.textContent = message;
            alertMessage.style.display = "block";
        }
    }

    function formatError(errorCode) {
        switch (errorCode) {
            case "auth/expired-action-code":
                return "Link-gii waa uu dhacay.";
            case "auth/invalid-action-code":
                return "Link-gu waa mid khaldan ama hore loo isticmaalay.";
            case "auth/weak-password":
                return "Furaha cusub waa inuu ka adag yahay 6 xaraf.";
            default:
                return errorCode;
        }
    }
});
