const ORDER_A_PRICE = "Ascendente";
const ORDER_D_PRICE = "Descendente";
const ORDER_RELEVANTE = "RELEVANTE";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;


function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_A_PRICE) {
        result = array.sort(function(paramuno, paramdos) {
            if (paramuno.cost < paramdos.cost) { return -1; }
            if (paramuno.cost > paramdos.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_D_PRICE) {
        result = array.sort(function(paramuno, paramdos) {
            if (paramuno.cost > paramdos.cost) { return -1; }
            if (paramuno.cost < paramdos.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_RELEVANTE) {
        result = array.sort(function(paramuno, paramdos) {
            let paramunoCount = parseInt(paramuno.soldCount);
            let paramdosCount = parseInt(paramdos.soldCount);

            if (paramunoCount > paramdosCount) { return -1; }
            if (paramunoCount < paramdosCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let productos = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(productos.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(productos.cost) <= maxCount))) {

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + productos.imgSrc + `" alt="` + productos.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + productos.name + `</h4>
                            <small class="text-muted">` + productos.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + productos.description + `</p>
                        <p class="mb-1"> U$S ` + productos.cost + `</p>
                        
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("productos-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);


    showProductsList();
}
// //Función que se ejecuta una vez que se haya lanzado el evento de
// //que el documento se encuentra cargado, es decir, se encuentran todos los
// //elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_A_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_A_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_D_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowProducts(ORDER_RELEVANTE);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }

        showProductsList();
    });
});
// // Pautas Individuales

// // Con el listado de productos desplegados:

// // Aplicar filtros a partir de rango de precio definido.
// //  Agregar las funcionalidades de orden ascendente y descendente en función del precio y descendente en función de la relevancia.