
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfG0LiZtHrFUOnZQt2uytsHxpDkVAk4sI",
  authDomain: "unreal-117f8.firebaseapp.com",
  projectId: "unreal-117f8",
  storageBucket: "unreal-117f8.firebasestorage.app",
  messagingSenderId: "52924929980",
  appId: "1:52924929980:web:2d4cb1f59aa348845e3db9",
  measurementId: "G-15DRK8VB1Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
