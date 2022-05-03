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
const idFrameDataStudio = document.getElementById('idFrameDataStudio');

const idEmpresaForm = document.getElementById('idEmpresaForm');
const idLblEmpresa = document.getElementById('idLblEmpresa');

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

            idWelcome.innerHTML = `Bienvenido ${data.Correo}  - ${data.Rol} - para la empresa ${data.Empresa}`;
            if (idLblEmpresa != null) {
                idLblEmpresa.value = `${data.Empresa}`;
            }
            viewAdminEnable(data.Rol);

        }).catch(err => {
            console.log(err)
        });
        console.log(datos)
    } else {

        if (window.location.href.includes('admin_page.html')) {
            alert("No hay sesión iniciada");
            window.location.href = "account.html";
        }
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
            if (idFrameDataStudio != null) {
                idFrameDataStudio.style.display = "block";
            }
        } else {
            if (idFrameDataStudio != null) {
                idFrameDataStudio.style.display = "block";
            }
            viewAdmin.style.display = "none";
        }
    }

}