'use strict';

var data = {
    productInfo: [
        {
            id: '1',
            name: 'Tennis Converse Standard.',
            description: 'Lorem ipsum dolor sit amet.',
            price: 500.00,
            color: ['negro', 'rojo', 'amarillo'],
            size: ['1.5', '2', '2.5', '3', '3.5', '4'],
        },
        {
            id: '2',
            name: 'Tennis Converse 2000.',
            description: 'Lorem ipsum dolor sit amet.',
            price: 300.00,
            color: ['negro', 'rojo', 'amarillo'],
            size: ['1.5', '2', '2.5', '3', '3.5', '4'],
        },
    ],
};

const product$1 = document.getElementById('producto');
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
};

addToCarBtn.addEventListener('click', () => {
    const productId = product$1.dataset.productoId;
    const productName = product$1.querySelector('.producto__nombre').innerHTML;
    const productDescription = product$1.querySelector('.producto__descripcion').innerHTML;
    const productColor = product$1.querySelector('#propiedad-color input:checked').value;
    const productSize = product$1.querySelector('#propiedad-tamaño input:checked').value;
    const productQuantity = parseInt(product$1.querySelector('#cantidad').value);

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

    let thumbSrc = product$1.querySelectorAll('.producto__thumb-img')[0].src;
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

const product = document.getElementById('producto');
const mainProductImage = product.querySelector('.producto__imagen');
const thumbsProduct = product.querySelector('.producto__thumbs');
const colorCategoryProductBtn = product.querySelector('#propiedad-color');
const btnIncreaseProductQuantity = product.querySelector('#incrementar-cantidad');
const btnDecreaseProductQuantity = product.querySelector('#disminuir-cantidad');
const inputProductQuantity = product.querySelector('#cantidad');

//Thumbnails select functionality
thumbsProduct.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        const imageSrc = event.target.src; //La ruta del thumbnail al que le estamos dando clic.
        const lastIndex = imageSrc.lastIndexOf('/'); //Atrapa la ultima diagonal existente en la cadena de texto.

        //El metodo substring sirve para cortar una cadena de caracteres desde un punto especifico.       
        const thumbnailName = imageSrc.substring(lastIndex + 1);//Quiero que cortes desde la posicion en donde esta la diagonal + 1 osea el corte estara desde una posicion despues de la diagonal.
        //El thumbnailName nos va a servir para cambiar la direccion y la imagen principal al seleccionar otro thumbnail.

        mainProductImage.src = `./img/tennis/${thumbnailName}`;
    }
});

//Color category product select functionality.
colorCategoryProductBtn.addEventListener('click', (event) => {
    if (event.target.tagName === 'INPUT') {
        mainProductImage.src = `./img/tennis/${event.target.value}.jpg`;
    }
});

//Increase the product quantity.
btnDecreaseProductQuantity.addEventListener('click', (event) => {
    if (parseInt(inputProductQuantity.value) > 1) {
        inputProductQuantity.value = parseInt(inputProductQuantity.value) - 1;
    } else {
        alert('La cantidad minima permitida es de 1');
    }
});

//Decrease the product quantity
btnIncreaseProductQuantity.addEventListener('click', () => {
    inputProductQuantity.value = parseInt(inputProductQuantity.value) + 1;
});

//Is secure to the user can't put another number that will be not 1.
inputProductQuantity.addEventListener('input', () => {
    let currentProductValue = parseInt(inputProductQuantity.value);
    if (isNaN(currentProductValue) || currentProductValue < 1) {
        inputProductQuantity.value = 1;
    }
});

class Options {
    constructor(idContainerOptions) {
        this.ContainerOptions = document.getElementById(idContainerOptions);
        this.tabs = this.ContainerOptions.querySelector('.tabs');
        this.tabs.addEventListener('click', (event) => {
            if ([...event.target.classList].includes('tabs__button')) {
                const idTab = event.target.dataset.tab;

                //Se usa para identificar el contenido de la tab que esta activa y quitarlo cuando yo le doy clic a otra.
                if (this.ContainerOptions.querySelector('.tabs__button--active')) {
                    this.ContainerOptions.querySelector('.tabs__button--active').classList.remove('tabs__button--active');
                }

                //Se usa para identificar el BTN del tab activo y quitarle la clase ACTIVE para luego ponersela al nuevo tab al que le di clic.
                if (this.ContainerOptions.querySelector('.tab--active')) {
                    this.ContainerOptions.querySelector('.tab--active').classList.remove('tab--active');
                }

                //Accede por medio del dataset de la tab que concuerda con el ID del contenido de la tab nueva que acabo de seleccionar y muestrame el contenido, activandole la clase TAB ACTIVE.
                this.ContainerOptions.querySelector(`#${idTab}`).classList.add('tab--active'); //Muestro el contenido de la TAB que clicke

                event.target.classList.add('tabs__button--active'); //Marcar el btn de la tab activa para indicarle al usuario que estamos ahi posicionados.
            }
        });
    }
}

new Options('mas-informacion');
