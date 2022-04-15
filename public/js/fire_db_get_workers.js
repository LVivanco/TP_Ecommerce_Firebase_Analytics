import {
    app
} from './firebase_config.js';
import {
    getFirestore,
    collection,
    getDocs
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';

const db = getFirestore(app);
const idLstUsuarios = document.getElementById('idLstUsuarios');
var HTML_user = "";

async function getUsers() {
    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        HTML_user += `<li value="${doc.data().Rol}">${doc.data().Correo}</li>`;
        idLstUsuarios.innerHTML = HTML_user;
    });
};

getUsers();