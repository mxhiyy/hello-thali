
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVhPS7O8gbKQ4__SsoIbo-vh445iaSx3E",
  authDomain: "hellothali-eff52.firebaseapp.com",
  projectId: "hellothali-eff52",
  storageBucket: "hellothali-eff52.appspot.com",
  messagingSenderId: "623921715141",
  appId: "1:623921715141:web:bffa46da99cdb636c29dac"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);