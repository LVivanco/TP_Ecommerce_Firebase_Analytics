import {
    app
} from './firebase_config.js';
import {
    getAuth,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';

const auth = getAuth();


onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user.uid);
        var uid = user.uid;
    } else {
        console.log('No user');
    }
});