// session.js - Hubinta in qofku login yahay iyo meesha uu ka yimid

const KEY = "userSession";

// ---- Session ----
export function setSession(user, cameFrom = "login") {
  localStorage.setItem(KEY, JSON.stringify({
    email: user.email,
    name: user.name || "",
    cameFrom,                 // "login" ama "register"
    loginTime: Date.now()
  }));
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  const s = getSession();
  return !!(s && s.email);
}

export function clearSession() {
  localStorage.removeItem(KEY);
}

// ---- Meesha uu ka yimid (referrer) ----
// Wuxuu soo celiyaa: "login" | "register" | "direct" | "other"
export function getCameFrom() {
  const ref = document.referrer;
  if (!ref) return "direct";               // si toos ah ayuu u furay (link / bookmark)
  try {
    const path = new URL(ref).pathname.toLowerCase();
    if (path.endsWith("login.html")) return "login";
    if (path.endsWith("register.html")) return "register";
    return "other";
  } catch {
    return "other";
  }
}

// ---- Ilaalinta bogagga gudaha (Home.html iwm) ----
// Ku wac bogga kasta oo u baahan login: requireLogin();
export function requireLogin(loginPage = "Login.html") {
  if (!isLoggedIn()) {
    window.location.replace(loginPage);
    return false;
  }
  return true;
}

// ---- Bogagga Login/Register ----
// Haddii uu horay u login ahaa, ha arkin Login/Register - u dir Home
export function redirectIfLoggedIn(homePage = "Home.html") {
  if (isLoggedIn()) {
    window.location.replace(homePage);
    return true;
  }
  return false;
}

// ---- Logout ----
export function logout(loginPage = "Login.html") {
  clearSession();
  window.location.replace(loginPage);
}
