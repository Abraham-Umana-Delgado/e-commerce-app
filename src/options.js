export default class Options {
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