import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDsie-pWxU1c8g9R1OEJYrfxm_5fkPKLY0",
    authDomain: "spohwi.firebaseapp.com",
    projectId: "spohwi",
    storageBucket: "spohwi.firebasestorage.app",
    messagingSenderId: "777107601262",
    appId: "1:777107601262:web:fc10f6b088f7df1496337f",
    measurementId: "G-4MBRPCHGRG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Initialize Analytics only in supported environments to prevent errors during SSR or strict environments
import { getAnalytics, isSupported } from "firebase/analytics";
isSupported().then(yes => yes && getAnalytics(app));
