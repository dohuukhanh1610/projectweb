// Import the functions you need from the SDKs you need
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth }
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore }
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAQZZXtMUgUGniaiU0YlKbG5PXrtcQE_kA",
    authDomain: "lam-web-truong.firebaseapp.com",
    projectId: "lam-web-truong",
    storageBucket: "lam-web-truong.firebasestorage.app",
    messagingSenderId: "745348127957",
    appId: "1:745348127957:web:5303bfbad95a8859ec965c",
    measurementId: "G-4KHPF1W4KE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);