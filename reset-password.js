// reset-password.js
// Xogta oo dhan (Firebase + EmailJS) waxay ka imaanaysaa config.js
import { CONFIG, firebaseConfig } from "./config.js";

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getAuth,
    sendPasswordResetEmail,
    verifyPasswordResetCode,
    confirmPasswordReset
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Initialize Firebase (hal mar kaliya)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize EmailJS (haddii library-gu page-ka ku jiro)
if (typeof emailjs !== "undefined") {
    emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
}

// 1) Codso link reset ah (email loo diro)
export async function requestPasswordReset(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.code };
    }
}

// 2) Hubi code-ka link-ga (oobCode) oo soo celi email-ka
export async function checkResetCode(oobCode) {
    try {
        const email = await verifyPasswordResetCode(auth, oobCode);
        return { success: true, email };
    } catch (error) {
        return { success: false, error: error.code };
    }
}

// 3) Beddel password-ka cusub
export async function setNewPassword(oobCode, newPassword) {
    try {
        await confirmPasswordReset(auth, oobCode, newPassword);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.code };
    }
}

// 4) (Ikhtiyaari) EmailJS: ogeysiis ku dir email-ka kadib beddelka
export async function sendResetNotification(email, name = "") {
    if (typeof emailjs === "undefined") return { success: false, error: "emailjs-not-loaded" };
    try {
        await emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_RESET_TEMPLATE_ID, {
            to_email: email,
            to_name: name
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.text || error.message };
    }
}
