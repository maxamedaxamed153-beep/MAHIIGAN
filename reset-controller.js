// reset-controller.js
import { updateFirestorePassword } from "./reset-service.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resetForm");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirm");
    const alertMessage = document.getElementById("alertMessage");
    const submitBtn = form?.querySelector("button[type='submit']");

    // A. Password Toggle (Show/Hide)
    document.querySelectorAll(".toggle").forEach((btn) => {
        btn.addEventListener("click", () => {
            const input = document.getElementById(btn.dataset.target);
            if (input) {
                input.type = input.type === "password" ? "text" : "password";
            }
        });
    });

    // B. Ka soo saar URL-ka ID-ga ama Email-ka document-ka Firestore
    // Tusaale URL: reset-password.html?id=maxamedaxamed153@gmail.com
    const urlParams = new URLSearchParams(window.location.search);
    const docId = urlParams.get("id") || urlParams.get("email");

    if (!docId) {
        showAlert("Document ID ama Email lagama helin URL-ka.", "red");
        if (form) form.style.display = "none";
        return;
    }

    // C. Foomka Submit-kiisa
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

            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerText = "Keydinayaa...";

            // Cusboonaysii Firestore
            const result = await updateFirestorePassword(docId, password);

            if (result.success) {
                showAlert("Furahaaga si guul leh ayaa loo beddelay! Waxaa loo leexinayaa login-ka...", "green");
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            } else {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                showAlert("Khalad ayaa dhacay: " + result.error, "red");
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
});
