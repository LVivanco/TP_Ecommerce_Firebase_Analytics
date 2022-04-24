const id_Cat1 = document.getElementById('id_Cat1');

function setVariableHTML(nombre_variable, variable) {
    window.localStorage.setItem(nombre_variable, variable);
}

if (id_Cat1 != null) {
    id_Cat1.addEventListener('click', function () {
        setVariableHTML('Categoria', "Laptop");
        window.location.href = "products.html";
    });
}

//TODO: CAMBIAR LA URL PARA QUE SEA LA CORRECTA
if (window.location.pathname == "/public/products.html") {
    var Cat1 = window.localStorage.getItem('Categoria');
    console.log(Cat1);
}