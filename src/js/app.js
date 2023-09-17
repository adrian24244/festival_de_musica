
document.addEventListener("DOMContentLoaded", function () { //EVENTO QUE SE ACTIVA CUANDO SE HA CARGADO EL HTML
    iniciarApp();
});


function iniciarApp() {
    crearGaleria();
};

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

        galeria.appendChild(imagen);

    }


}


