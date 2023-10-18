import data from './data/dataProduct';
const product = document.getElementById('producto');
const openCarBtn = document.querySelectorAll('[data-accion="abrir-carrito"]');
const closeCarBtn = document.querySelectorAll('[data-accion="cerrar-carrito"]');
const carWindow = document.getElementById('carrito');
const addToCarBtn = document.getElementById('agregar-al-carrito');
const notification = document.getElementById('notificacion');

let car = [];
const formatCurrency = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'CRC' });

const colorImageMap = {
    base: './img/thumbs/base.jpg',
    negro: './img/thumbs/negro.jpg',
    rojo: './img/thumbs/rojo.jpg',
    amarillo: './img/thumbs/amarillo.jpg',
};

function getImageRoute(color) {
    return colorImageMap[color] || colorImageMap.base;
}

const carFunctionality = () => {
    let productPrice;
    carWindow.classList.add('carrito--active');

    const previousProducts = carWindow.querySelectorAll('.carrito__producto');
    previousProducts.forEach((productExist) => {
        productExist.remove();
    });

    let total = 0;

    if (car.length < 1) {
        carWindow.classList.add('carrito--vacio');

    } else {
        carWindow.classList.remove('carrito--vacio');
        car.forEach((carProduct) => {
            data.productInfo.forEach((productExist) => {
                if (productExist.id === carProduct.id) {
                    carProduct.price = productExist.price;
                    productPrice = productExist.price * carProduct.quantity;
                    total += productPrice;
                }
            });
            const selectedColor = carProduct.color;
            const thumbnailsRoute = getImageRoute(selectedColor);

            const template = `<div class="carrito__producto-info">
        <img src="${thumbnailsRoute}" alt="" class="carrito__thumb" />
        <div>
            <p class="carrito__producto-nombre">
                <span class="carrito__producto-cantidad">${carProduct.quantity} x </span>${carProduct.name}
            </p>
            <p class="carrito__producto-propiedades">
                Tamaño:<span> ${carProduct.size}</span> Color:<span> ${carProduct.color}</span>
            </p>
        </div>
    </div>
    <div class="carrito__producto-contenedor-precio">
        <button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
            >
                <path
                    d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                />
            </svg>
        </button>
        <p class="carrito__producto-precio">${formatCurrency.format(productPrice)}</p>
    </div>`;

            const carItem = document.createElement('div');

            carItem.innerHTML = template;
            carItem.classList.add('carrito__producto');
            carWindow.querySelector('.carrito__body').appendChild(carItem);
        });
    }
    carWindow.querySelector('.carrito__total').innerText = formatCurrency.format(total);
}

addToCarBtn.addEventListener('click', () => {
    const productId = product.dataset.productoId;
    const productName = product.querySelector('.producto__nombre').innerHTML;
    const productDescription = product.querySelector('.producto__descripcion').innerHTML;
    const productColor = product.querySelector('#propiedad-color input:checked').value;
    const productSize = product.querySelector('#propiedad-tamaño input:checked').value;
    const productQuantity = parseInt(product.querySelector('#cantidad').value);

    if (car.length > 0) {
        let productIntoCar = false;

        car.forEach((productExistIntoCar) => {
            if (productExistIntoCar.id === productId && productExistIntoCar.name === productName && productExistIntoCar.color === productColor && productExistIntoCar.size === productSize) {
                productExistIntoCar.quantity += productQuantity;
                productIntoCar = true;
            }
        });
        if (!productIntoCar) {
            car.push({
                id: productId,
                name: productName,
                description: productDescription,
                color: productColor,
                size: productSize,
                quantity: productQuantity,
            });
        }
    } else {
        car.push({
            id: productId,
            name: productName,
            description: productDescription,
            color: productColor,
            size: productSize,
            quantity: productQuantity,
        });
    }

    let thumbSrc = product.querySelectorAll('.producto__thumb-img')[0].src;
    if (productColor === 'rojo') {
        thumbSrc = './img/thumbs/rojo.jpg';
    } else if (productColor === 'amarillo') {
        thumbSrc = './img/thumbs/amarillo.jpg';
    }
    notification.querySelector('.notificacion__thumb').src = thumbSrc;
    notification.classList.add('notificacion--active');

    //Delete the notification active class.
    setTimeout(() => {
        notification.classList.remove('notificacion--active');
    }, 4000);

});


openCarBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        carFunctionality();
    });
});

closeCarBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        carWindow.classList.remove('carrito--active');
    });
});

carWindow.addEventListener('click', (event) => {
    if (event.target.closest('button').dataset.accion === 'eliminar-item-carrito') {
        const productClick = event.target.closest('.carrito__producto');
        const indexProductIntoCar = [...carWindow.querySelectorAll('.carrito__producto')].indexOf(productClick); //Convierto a arreglo a base del operador SPREAD (...)
        car = car.filter((itemIntoCar, index) => {
            if (index !== indexProductIntoCar) {
                return itemIntoCar;
            }
        });
        carFunctionality();
    }

});


//Send car data to the server.
carWindow.querySelector('#carrito__btn-comprar').addEventListener('click', (event) => {
    console.log('Enviando petición de compra');
    console.log(car);
});


