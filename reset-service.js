// reset-service.js
import { firebaseConfig } from "./config.js";
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Initialize Firebase & Firestore
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Wuxuu cusboonaysiiyaa field-ka 'password' ee ku dhex jira Document-ka 'users'
 * @param {string} documentId - Document ID-ga Firestore (e.g. email-ka ama User ID-ga)
 * @param {string} newPassword - Furaha cusub
 */
export async function updateFirestorePassword(documentId, newPassword) {
    try {
        const userRef = doc(db, "users", documentId);
        
        // Cusboonaysii field-ka password-ka oo kaliya
        await updateDoc(userRef, {
            password: newPassword
        });
        
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
