import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2gBS-QY8NFkv-d_MTw3V5Wk6PsmoP4yY",
  authDomain: "eveningcoders-dfd74.firebaseapp.com",
  projectId: "eveningcoders-dfd74",
  storageBucket: "eveningcoders-dfd74.firebasestorage.app",
  messagingSenderId: "14141737901",
  appId: "1:14141737901:web:7390eb42c1c199e0d5af24",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
