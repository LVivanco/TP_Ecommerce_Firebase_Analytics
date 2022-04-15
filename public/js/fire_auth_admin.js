import {
    app
} from './firebase_config.js';
import {
    getAuth,
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
import {
    getFirestore,
    doc,
    getDoc,
    getDocs,
    setDoc,
    collection
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';



const Token = 'TP2ADMIN';
const auth = getAuth();
const db = getFirestore(app);

const logOut = document.getElementById('LogOut');

logOut.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        window.location.href = './index.html';
    }).catch(err => {
        console.log(err)
    });
});

console.log(auth.currentUser.uid);