import {
    app
} from './firebase_config.js';
import {
    getAuth,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
import {
    getFirestore,
    doc,
    getDoc,
    getDocs,
    setDoc,
    collection
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';


const p_uid = document.getElementById('p_uid');
const logOut = document.getElementById('LogOut');
const db = getFirestore(app);
const auth = getAuth();

if (logOut != null) {
    logOut.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            window.location.href = './index.html';
        }).catch(err => {
            console.log(err)
        });
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user.uid);
        var uid = user.uid;
        console.log(auth.currentUser);
    } else {
        console.log('No user');
    }
});