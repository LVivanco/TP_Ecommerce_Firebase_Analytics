import {
    app
} from './firebase_config.js';
import {
    getFirestore,
    collection,
    getDocs
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';

const db = getFirestore(app);

const idProductosPopulares = document.getElementById('idProductosPopulares');
const idTodosProductos = document.getElementById('idTodosProductos');

var ar_productos = [];

async function getProducts() {
    const productos = await getDocs(collection(db, "Productos"));
    productos.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        ar_productos.push({
            id: doc.id,
            src: doc.data().Imagen,
            Nombre: doc.data().Nombre
        });
    });
}

function crearProducto(product) {
    var Producto_HTML = `<div class="col-4">
    <a href="" id="${product.id}" class="own_product">
    <img src="${product.src}"/>
    <p style="display: none" id="idProductCode"> CODE: ${product.id}</p></a>
    <h4>${product.Nombre}</h4>
    <p> S/. ${Math.round(Math.random() * 100)} .00</p>
    </div>`;
    return Producto_HTML;
}

function anadirProductos(products) {
    products.forEach((product) => {

        if (idProductosPopulares != null) {
            idProductosPopulares.innerHTML += crearProducto({
                id: product.id,
                src: product.src,
                Nombre: product.Nombre
            });
        }

        if (idTodosProductos != null) {
            idTodosProductos.innerHTML += crearProducto({
                id: product.id,
                src: product.src,
                Nombre: product.Nombre
            });
        }
    });
}

var random_sort_products = [];
var top3_productos = [];

function selct_child_tag(tag) {
    var child_tag = document.getElementsByTagName(tag);
    return child_tag;
}


getProducts().then(() => {
    random_sort_products = ar_productos.sort(() => Math.random() - 0.5);
    top3_productos = random_sort_products.slice(0, 3);
    if (idProductosPopulares != null) {
        anadirProductos(top3_productos);
    }

    if (idTodosProductos != null) {
        anadirProductos(random_sort_products);
    }

    for (let i = 0; i < selct_child_tag('a').length; i++) {
        //console.log(selct_child_tag('a')[i]);
        if (selct_child_tag('a')[i].id.includes("PR")) {
            //console.log("este si");

            selct_child_tag('a')[i].addEventListener('click', function (ev) {
                ev.preventDefault();
                var id_producto = this.id;
                console.log(id_producto);
                window.localStorage.setItem('id_producto', id_producto);
                window.location.href = "product_details.html";
            });
        }
    }
});