import { initializeApp } from "firebase/app";
import firebaseConfig from "@/lib/config/firebase.config";

export const app = initializeApp(firebaseConfig);
