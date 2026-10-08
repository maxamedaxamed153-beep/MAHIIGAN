// reset-service.js
import { CONFIG, firebaseConfig } from "./config.js";

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getAuth,
    verifyPasswordResetCode,
    confirmPasswordReset
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize EmailJS
if (typeof emailjs !== "undefined" && CONFIG?.EMAILJS_PUBLIC_KEY) {
    emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
}

// 1. Hubi code-ka link-ga (oobCode)
export async function checkResetCode(oobCode) {
    try {
        const email = await verifyPasswordResetCode(auth, oobCode);
        return { success: true, email };
    } catch (error) {
        return { success: false, error: error.code || error.message };
    }
}

// 2. Beddel password-ka
export async function setNewPassword(oobCode, newPassword) {
    try {
        await confirmPasswordReset(auth, oobCode, newPassword);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.code || error.message };
    }
}

// 3. EmailJS notification (Ogeysiis)
export async function sendResetNotification(email, name = "") {
    if (typeof emailjs === "undefined" || !CONFIG?.EMAILJS_SERVICE_ID) {
        return { success: false, error: "emailjs-not-available" };
    }
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
