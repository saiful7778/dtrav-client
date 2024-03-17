import { initializeApp } from "firebase/app";
import firebaseConfig from "@/lib/config/firebase.config";
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
