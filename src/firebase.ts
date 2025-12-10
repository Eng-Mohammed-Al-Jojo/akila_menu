


/*----*/

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAlg6Q-lk3_7LQYT_rce1N6G_v4OQHGWLM",
  authDomain: "akila-2e3dc.firebaseapp.com",
  databaseURL: "https://akila-2e3dc-default-rtdb.firebaseio.com",
  projectId: "akila-2e3dc",
  storageBucket: "akila-2e3dc.firebasestorage.app",
  messagingSenderId: "399011970798",
  appId: "1:399011970798:web:79f51957e17dcdc392fdff",
  measurementId: "G-31Z6GK3YED"
};

const app = initializeApp(firebaseConfig);

// 👇 هذا هو المهم
export const db = getDatabase(app);
