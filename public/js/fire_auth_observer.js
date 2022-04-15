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


const idWelcome = document.getElementById('idWelcome');
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
        var datos = getData(uid);
        datos.then(data => {
            viewAdminEnable(data.Rol);
            idWelcome.innerHTML = `Bienvenido ${data.Correo}  - ${data.Rol}`;
        }).catch(err => {
            console.log(err)
        });
        console.log(datos)
    } else {
        console.log('No user');
    }
});

async function getData(uid) {
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
}

async function viewAdminEnable(rol) {
    const viewAdmin = document.getElementById('viewAdmin');

    if (viewAdmin != null) {
        if (rol === "Administrador") {
            viewAdmin.style.display = "block";
        } else {
            viewAdmin.style.display = "none";
        }
    }
}