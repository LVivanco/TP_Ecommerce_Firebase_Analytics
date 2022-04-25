import {
    app
} from './firebase_config.js';
import {
    getFirestore,
    doc,
    collection,
    addDoc,
    query,
    where,
    getDocs
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';

import {
    data
} from '../src/JSON/bquxjob_64878710_1806191d2bc.js';


const db = getFirestore(app);
const idSubirData = document.getElementById('idSubirData');

/*
function saveData(data) {
    addDoc(collection(db, 'Analisis_Importado'), data).then((e) => {
        console.log("Listo");
    }).catch(err => {
        console.log(err)
    });
}

idSubirData.addEventListener('click', (ev) => {
    data.forEach(element => {
        saveData(element);
        console.log(element);
    });

    console.log("Listo Todo");
}) */

var arr_data = [];
var arr_data_all = [];
var id_producto_se = "CT01PR002";
var arr_pr_anterior_obj = [];
var arr_pr_anterior_e = [];
var result = [];
var result_2 = [];
var obj_r = {};



async function getDataAanlisisProductoSelect(idProducto) {
    const data_analisis = collection(db, "Analisis_Importado");
    const q = query(data_analisis, where("producto_seleccionado", "==", idProducto));

    const data_q = await getDocs(q);

    data_q.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        arr_data.push(doc.data());
    });
}

async function getTopProductsOfSelectProduct(idProducto) {

    await getDataAanlisisProductoSelect(idProducto).then(() => {
        //console.log(arr_data);
        arr_pr_anterior_obj = arr_data.filter(function (item) {
            return item.producto_anterior != "null";
        })

        arr_pr_anterior_obj.forEach((element) => {
            if (!arr_pr_anterior_e.includes(element.producto_anterior)) {
                arr_pr_anterior_e.push(element.producto_anterior);
            }
        });
        //console.log(arr_pr_anterior_e);
        arr_pr_anterior_e.forEach((element) => {
            var x = arr_data.filter(function (item) {
                return item.producto_anterior == element;
            });
            obj_r = {
                id_producto_an: element,
                cantidad_sesiones: x.length
            }
            result.push(obj_r);
        });

        result = result.sort((a, b) => (a.cantidad_sesiones < b.cantidad_sesiones) ? 1 : -1)

    });
    return result;
};


async function getDataAanlisisProductoAll() {
    const querySnapshot = await getDocs(collection(db, "Analisis_Importado"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        arr_data_all.push(doc.data());
    });
}

/*
getDataAanlisisProductoAll().then((e) => {
    console.log(arr_data_all);
});
*/


/*
getTopProducts().then((r) => {
    console.log(r)
});
*/