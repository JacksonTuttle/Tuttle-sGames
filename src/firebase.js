import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSzS2b0ciYJ_wLmGVP_EwvmF0owhhvQYM",
  authDomain: "tuttlesgames-3233e.firebaseapp.com",
  projectId: "tuttlesgames-3233e",
  messagingSenderId: "703283640816",
  appId: "1:703283640816:web:e9c4879600ba59f3ea8535"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
