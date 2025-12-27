import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD4SyFFNHI1k2Nn0LwlGwXBpK5LG9q6rXg",
    authDomain: "vit4lynv-1fb7c.firebaseapp.com",
    projectId: "vit4lynv-1fb7c",
    storageBucket: "vit4lynv-1fb7c.firebasestorage.app",
    messagingSenderId: "418954009350",
    appId: "1:418954009350:web:9bf8fadb44f81cf8815c87",
    measurementId: "G-PEWL5SMSH4"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);