// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    getAnalytics
} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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