
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDe4T0pyjQR_h_drevTZh_1sLxbycAyQUA",
  authDomain: "unreal-2026.firebaseapp.com",
  projectId: "unreal-2026",
  storageBucket: "unreal-2026.firebasestorage.app",
  messagingSenderId: "485958392372",
  appId: "1:485958392372:web:208395b8b4b3e0d81b8861",
  measurementId: "G-F3RW7TJEJ6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const googleProvider = new GoogleAuthProvider();
export default app;
