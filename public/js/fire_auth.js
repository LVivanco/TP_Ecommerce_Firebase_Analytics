import {
    app
} from './firebase_config.js';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
import {
    getFirestore,
    doc,
    setDoc,
    collection,
    addDoc
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';


const Token = 'TP2ADMIN';
const auth = getAuth();
const db = getFirestore(app);

const loginForm = document.getElementById('LoginForm');
const registerForm = document.getElementById('RegForm');

const uid = "";

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('log_mail').value;
    const password = document.getElementById('log_pass').value;

    signInWithEmailAndPassword(auth, email, password).then(cred => {
        console.log(cred.user.uid);
        window.location.href = './admin_page.html';
        uid = cred.user.uid;
    }).catch(err => {
        console.log(err)
    });
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('reg_mail').value;
    const password = document.getElementById('reg_pass').value;
    const tkn = document.getElementById('reg_token').value;

    if (tkn === Token) {
        createUserWithEmailAndPassword(auth, email, password).then(cred => {
            console.log(cred.user.uid);
            uid = cred.user.uid;
            const user = {
                Correo: email,
                Contrasena: password,
                Rol: "Administrador",
                Nombre: "",
                Apellido: "",
                Empresa: Token,
            };
            const uid = cred.user.uid;
            setDoc(doc(db, 'Users', uid), user).then(() => {
                window.location.href = './admin_page.html'
            }).catch(err => {
                console.log(err)
            });

        }).catch(err => {
            console.log(err)
        })
    } else {
        alert('Token Invalido');
    }
});