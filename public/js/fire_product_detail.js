import {
    app
} from './firebase_config.js';
import {
    getFirestore,
    collection,
    getDocs
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';
import {
    getAnalytics,
    logEvent
} from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-analytics.js';

const analytics = getAnalytics(app);
const db = getFirestore(app);


const idProductDetailCont = document.getElementById('idProductDetailCont');
const idProductosSugeridos = document.getElementById('idProductosSugeridos');

const id_producto = window.localStorage.getItem('id_producto');
var ar_productos = [];
var ob_producto = {};

async function getProducts() {
    const productos = await getDocs(collection(db, "Productos"));
    productos.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        ar_productos.push({
            id: doc.id,
            src: doc.data().Imagen,
            Nombre: doc.data().Nombre,
            Categoria: doc.data().Categoria
        });
    });
}

function productDetail(product) {
    var Producto_HTML = `<div class="col-2" id="idProductoImg">
                <img src="${product.src}" width="100%" id="ProductImg">
            </div>
            <div class="col-2">
                <div id="idProdcutoDetail">
                    <p>${product.Categoria}</p>
                    <h1>${product.Nombre}</h1>
                    <h4>S/. ${Math.round(Math.random() * 100)}.00</h4>
                </div>


                <input type="number" value="1">
                <a href="" class="btn" id="idAddCart">Añadir al Carrito</a>

                <h3>Detalles del Producto <i class="fa fa-indent"></i></h3>
                <br>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis quis at adipisci delectus
                    accusamus doloribus molestiae nesciunt beatae iure. Odio consectetur in voluptatibus architecto
                    dolorum doloremque nisi quas fugit magnam.</p>
            </div>`;
    return Producto_HTML;
}

function productosSugeridos(product) {
    var Producto_HTML = `<div class="col-4">
    <a href="" id="${product.id}" class="own_product">
    <img src="${product.src}"/>
    <p style="display: none" id="idProductCode"> CODE: ${product.id}</p></a>
    <h4>${product.Nombre}</h4>
    <p> S/. ${Math.round(Math.random() * 100)}.00</p>
    </div>`;
    return Producto_HTML;
}

function selct_child_tag(tag) {
    var child_tag = document.getElementsByTagName(tag);
    return child_tag;
}

var ar_product_notViewed = [];
var random_sort_products = [];
var top3_productos = [];

getProducts().then(() => {
    ob_producto = ar_productos.find(product => product.id == id_producto);
    ar_product_notViewed = ar_productos.filter(product => product.id != id_producto);
    random_sort_products = ar_product_notViewed.sort(() => Math.random() - 0.5);
    top3_productos = ar_product_notViewed.slice(0, 3);

    if (idProductDetailCont != null && ob_producto != null) {
        idProductDetailCont.innerHTML = productDetail(ob_producto);
        const idProdcutoDetail = document.getElementById('idProdcutoDetail');
        const idProductoImg = document.getElementById('idProductoImg');
        const idAddCart = document.getElementById('idAddCart');

        idAddCart.href = "about.html";
        console.log(idProdcutoDetail);
        console.log(idProductoImg);
    }

    if (idProductosSugeridos != null) {
        top3_productos.forEach((product) => {
            if (product.id != id_producto) {
                idProductosSugeridos.innerHTML += productosSugeridos(product);
            }
        });
    }

    for (let i = 0; i < selct_child_tag('a').length; i++) {
        //console.log(selct_child_tag('a')[i]);
        if (selct_child_tag('a')[i].id.includes("PR")) {
            //console.log("este si");
            selct_child_tag('a')[i].addEventListener('click', function (ev) {
                ev.preventDefault();
                var id_producto = this.id;
                logEvent(analytics, 'product_select', {
                    Produc_id: id_producto,
                    Product_id_previus: window.localStorage.getItem('id_producto')
                });

                window.localStorage.setItem('id_producto', id_producto);
                window.location.href = "product_details.html";
            });
        }
    }
});