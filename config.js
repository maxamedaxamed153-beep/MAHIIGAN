// config.js - Halkan ku kaydi keys-ka
export const CONFIG = {
    EMAILJS_PUBLIC_KEY: "9TO7hHMapqy4U9kNz",
    EMAILJS_SERVICE_ID: "service_j2uu8yq",
    //1.kan shaqadiisa waa in uu code ka passwer badalida  diro sida uu js ku fahmi karana waa ama xiriiriyaha waa
    //{{message}}
    EMAILJS_TEMPLATE_ID: "template_hd1r8rd",
    //2.kan waxa loo isticmaala in uu  diro xaqiijinta code ka in user ku lee yahay emailka
    //{{passcode}}
    EMAILJS_RESET_TEMPLATE_ID: "template_t13sh6n",
    // Firebase Keys
    FIREBASE: {
        apiKey: "AIzaSyABwzxaSftH4-Lrga8vxZSo0y8AD4uHHfQ",
        authDomain: "mahiigan-6763a.firebaseapp.com",
        projectId: "mahiigan-6763a",
        storageBucket: "mahiigan-6763a.firebasestorage.app",
        messagingSenderId: "527129135766",
        appId: "1:527129135766:web:84cfc0129557644a8310b7",
        measurementId: "G-7W5L7FSW9F"
    }
};
export const firebaseConfig = CONFIG.FIREBASE; // ✅ Ku dar safkan config.js hoosteeda
