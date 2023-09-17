
const { src, dest, watch, parallel } = require("gulp"); //SRC PARA BUSCAR , DEST PARA DESTINARLE UNA CARPETA DE ALMACENAMIENTO , watch escuchador en tiempo real
//Parallel ejecutar todas las funciones al mismo tiempo 


//DEPENDENCIAS CSS
const sass = require("gulp-sass")(require("sass")); //importando la funcion sass para agregarla en el pipe
const plumber = require("gulp-plumber")

//DEPENDENCIAS IMAGENES
const avif = require("gulp-avif");
const cache = require("gulp-cache"); //DEPENDENCIA QUE FUNCIONA CON LA DEPENDENCIA AVIF
const imagemin = require("gulp-imagemin") // DEPENDENCIA PARA ALIGERAR IMAGENES 
const webp = require("gulp-webp"); // DEPENDENCIA CONVERTIR A WEBP

function css(done) {
    //PERIMERO BUSCA EL ARCHIO, LUEGO LO COMPILA (FUNCION SASS) Y LUEGO LO GUARDA EN LA RUTA DESTINO (BUILD/CSS)
    src("src/scss/**/*.scss") // DE ESTA MANERA VA BUSCANDO DE MANERA RECURSIVA EN TODAS LAS CARPETAS ARCHIVOS SASS MIENTRAS ESTEN EN LA CARPETA (src/scss)
        .pipe(plumber())
        .pipe(sass()) //compilarlo
        .pipe(dest("build/css")) //almacenarlo en el disco
    done();//callback avisa a gulp cuando llega al final
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest("build/img"));
    done();
}

function versionwebp(done) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}') //BUSCA TODAS LAS IMAGENES CON ESAS EXTENSIONES
        .pipe(webp(opciones)) //APLICA OPCION DE CALIDAD
        .pipe(dest("build/img")) //LAS GUARDA EN ESE DESTINO
    done();
}

function versionavif(done) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}') //BUSCA TODAS LAS IMAGENES CON ESAS EXTENSIONES
        .pipe(avif(opciones)) //APLICA OPCION DE CALIDAD
        .pipe(dest("build/img")) //LAS GUARDA EN ESE DESTINO
    done();
}

function javascript(done) {
    src("src/js/**/*.js")
        .pipe(dest("build/js"))

        done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css); //   <------------<------------<-------------<-------------<----------------<--------------<------------
    watch("src/js/**/*.js", javascript);

    done();
}

//exports.css = css; SE LLAMARIA A ESTA FUNCION PERO SIN EL ESCUCHADOR WATCH POR ESO MEJOR SE LLAMA AL WATCH Y EL LLAMA A ESTA FUNCION
exports.js = javascript;
// exports.imagenes = imagenes;
// exports.versionwebp = versionwebp;
// exports.versionavif = versionavif;
exports.dev = parallel(imagenes, versionwebp, versionavif, javascript, dev);
