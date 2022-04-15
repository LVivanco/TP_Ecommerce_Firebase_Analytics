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


const auth = getAuth();
const db = getFirestore(app);
const RegColaboradorForm = document.getElementById('RegColaboradorForm');

RegColaboradorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('reg_mail').value;
    const password = document.getElementById('reg_pass').value;

    createUserWithEmailAndPassword(auth, email, password).then(cred => {
        console.log(cred.user.uid);
        const uid = cred.user.uid;
        const user = {
            Correo: email,
            Contrasena: password,
            Rol: "Colaborador",
            Nombre: "",
            Apellido: "",
            Empresa: "",
        };
        setDoc(doc(db, 'Users', uid), user).then(() => {
            RegColaboradorForm.reset();
            window.location.href = './admin_page.html'
        }).catch(err => {
            console.log(err)
        });

    }).catch(err => {
        console.log(err)
    })
});