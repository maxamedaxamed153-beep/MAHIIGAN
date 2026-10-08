// register2.js - Difaaca: hubinta account horay u jiray (ma qabsado form)

import { db } from "./firebase.js";
import { doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Hubi in email-ku horay account u lahaa
export async function checkAccountExists(email) {
  const snap = await getDoc(doc(db, "users", email));
  return { exists: snap.exists(), data: snap.exists() ? snap.data() : null };
}

// Abuur account cusub (ku wac verify-code bogga, kadib marka koodhka la xaqiijiyo)
// Soo celiyaa { status: "exists" } ama { status: "created" }
export async function createAccount({ name, email, password }) {
  const { exists } = await checkAccountExists(email);
  if (exists) return { status: "exists" };

  await setDoc(doc(db, "users", email), {
    name,
    email,
    password,
    createdAt: serverTimestamp()
  });
  return { status: "created" };
}
