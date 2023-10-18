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