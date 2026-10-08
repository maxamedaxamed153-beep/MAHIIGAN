// reset-password.js
import { firebaseConfig } from "./config.js";
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 1. Bilaaw Firebase iyo Firestore
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    const resetForm = document.getElementById("resetForm");

    if (resetForm) {
        resetForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const passwordInput = document.getElementById("password");
            const confirmInput = document.getElementById("confirm");

            const password = passwordInput.value.trim();
            const confirm = confirmInput.value.trim();

            // Hubi in la geliyay furaha
            if (!password || !confirm) {
                alert("Fadlan buuxi labada meelood ee furaha!");
                return;
            }

            // Hubi in labada fure is leeyihiin
            if (password !== confirm) {
                alert("Fadlan hubi, labada fure isku mid ma aha!");
                return;
            }

            // Ogaaw email-ka user-ka (ha fariisto URL-ka ama localStorage)
            const urlParams = new URLSearchParams(window.location.search);
            const userEmail = urlParams.get("email") || localStorage.getItem("userEmail");

            if (!userEmail) {
                alert("Email-ka isticmaalaha la ma helin! Fadlan dib ka soo eeg ama maamuus link-ga.");
                return;
            }

            try {
                // Ku cusbooneysii furaha cusub document-ka user-ka ee Firestore
                const userDocRef = doc(db, "users", userEmail);
                
                await updateDoc(userDocRef, {
                    password: password
                });

                alert("Furahaaga si guul leh ayaa loo beddelay!");

                // Nadiifi email-ka kaydsan haddii uu u baahnaa
                localStorage.removeItem("userEmail");

                // U wareeji bogga login-ka
                window.location.href = "login.html";

            } catch (error) {
                console.error("Cillad Firestore:", error);
                alert("Cillad ayaa dhacday marka furaha la beddelayay: " + error.message);
            }
        });
    }
});
