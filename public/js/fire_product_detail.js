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


var arr_data = [];
var arr_pr_anterior_obj = [];
var arr_pr_anterior_e = [];
var result = [];
var obj_r = {};

var ar_product_notViewed = [];
var an_products_id = [];
var an_products = [];
//var random_sort_products = [];
//var top3_productos = [];

getProducts().then(() => {

    ob_producto = ar_productos.find(product => product.id == id_producto);

    if (idProductDetailCont != null && ob_producto != null) {
        idProductDetailCont.innerHTML = productDetail(ob_producto);
        const idProdcutoDetail = document.getElementById('idProdcutoDetail');
        const idProductoImg = document.getElementById('idProductoImg');
        const idAddCart = document.getElementById('idAddCart');

        idAddCart.addEventListener('click', (ev) => {
            ev.preventDefault();
            logEvent(analytics, 'product_select_cart', {
                Product_id_cart: window.localStorage.getItem('id_producto')
            });
            window.location.href = "about.html";
        });

        //console.log(idProdcutoDetail);
        //console.log(idProductoImg);
    }


    ar_product_notViewed = ar_productos.filter(product => product.id != id_producto);
    //random_sort_products = ar_product_notViewed.sort(() => Math.random() - 0.5);
    //top3_productos = ar_product_notViewed.slice(0, 3);


    if (idProductosSugeridos != null) {

        getTopProductsOfSelectProduct(id_producto).then((r) => {
            //console.log(r);
            r.forEach((rr) => {
                an_products_id.push(rr.id_producto_an);
            })
            //console.log(an_products_id);
            an_products = ar_product_notViewed.filter(product => an_products_id.slice(0, 3).includes(product.id));
            //console.log(an_products);
            an_products.forEach((product) => {
                idProductosSugeridos.innerHTML += productosSugeridos(product);
            });

            for (let i = 0; i < selct_child_tag('a').length; i++) {
                //console.log(selct_child_tag('a')[i]);
                if (selct_child_tag('a')[i].id.includes("PR")) {
                    //console.log("este si");
                    selct_child_tag('a')[i].addEventListener('click', function (ev) {
                        ev.preventDefault();
                        //console.log(this.id);

                        var id_producto_selec_mod = this.id;
                        logEvent(analytics, 'product_select', {
                            Produc_id: id_producto_selec_mod,
                            Product_id_previus: window.localStorage.getItem('id_producto')
                        });
                        //console.log(window.localStorage.getItem('id_producto'));
                        window.localStorage.setItem('id_producto', id_producto_selec_mod);
                        //console.log(window.localStorage.getItem('id_producto'));
                        window.location.href = "product_details.html";

                    });
                }
            }

        });
    }

});

function selct_child_tag(tag) {
    var child_tag = document.getElementsByTagName(tag);
    return child_tag;
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
    <p style="display: none" id="idProductCode"> CODE: ${product.id}</p>
    <h4>${product.Nombre}</h4>
    <p> S/. ${Math.round(Math.random() * 100)}.00</p>
    </a>
    </div>`;
    return Producto_HTML;
}

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