// Import the functions you need from the SDKs you need
import {
    initializeApp
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js';
import {
    getAnalytics
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-analytics.js';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyDAuHVzd4AzKhCIgBVsW-mEiRVL9STtGaE",
    authDomain: "tp2-ecommerce-project.firebaseapp.com",
    projectId: "tp2-ecommerce-project",
    storageBucket: "tp2-ecommerce-project.appspot.com",
    messagingSenderId: "563937204314",
    appId: "1:563937204314:web:2982bbf65d5e931896e063",
    measurementId: "G-1E2VRR482F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);