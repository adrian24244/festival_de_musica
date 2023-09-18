
document.addEventListener("DOMContentLoaded", function () { //EVENTO QUE SE ACTIVA CUANDO SE HA CARGADO EL HTML
    iniciarApp();
});


function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
};

function navegacionFija() {

    const barra = document.querySelector(".header");
    const sobreFestival = document.querySelector(".sobre-festival");
    const body = document.querySelector("body");

    window.addEventListener("scroll", function () {

        if(sobreFestival.getBoundingClientRect().top < 0){
            barra.classList.add("fijo");
            body.classList.add("body-scroll");
        }else{
            barra.classList.remove("fijo");
            body.classList.remove("body-scroll");
        }

    });

}

function scrollNav() {
    const enlaces = document.querySelectorAll(".navegacion-principal a");

    enlaces.forEach(enlaces => {
        enlaces.addEventListener("click", function (e) {
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);

            seccion.scrollIntoView({ behavior: "smooth" });

        })
    })

}


function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes");


    for (let i = 1; i <= 12; i++) { //para crear la imagen y agregarla como un arreglo a la galeria pero funciona ya que los nombre de las imagenes son
        //consecutivos ejemplo (1 , 2, 3 ...)

        const imagen = document.createElement("picture");

        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/${i}.jpg" alt="imagen galeria   ">
        `;
        imagen.classList.add("imag");


        imagen.onclick = function () {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);

    }
}

function mostrarImagen(id) {

    const imagen = document.createElement("picture");

    imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande${id}.jpg" alt="imagen galeria   ">
    `;

    //crear overlay  con la imagen
    const overlay = document.createElement("DIV");
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");

    overlay.onclick = function () {
        const body = document.querySelector("body"); //para poder dar click fuera de la imagen y que igualmente se cierre
        body.classList.remove("fijar-body");
        overlay.remove();
    }

    //boton para cerrar el "overlay" modal
    const cerrarModal = document.createElement("P");
    cerrarModal.textContent = "X";
    cerrarModal.classList.add("btn-cerrar");

    cerrarModal.onclick = function () {

        const body = document.querySelector("body"); //para poder seleccionarle y eliminarle la clase que impide que cuando se abra la imagen grande no se pueda hacer scroll
        body.classList.remove("fijar-body");

        overlay.remove();
    };

    overlay.appendChild(cerrarModal);

    //añadir al html
    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("fijar-body");


}