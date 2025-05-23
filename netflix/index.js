const fs = require('fs') 

function leerSeries() {
    let seriesJSON = fs.readFileSync('series_netflix.json', 'utf-8');
    return JSON.parse(seriesJSON);
}

const series = leerSeries();

// mostrar por pantalla todas las series cuyo genero sea terror
function mostrarSeriesGenero(genero) {
    return series.filter((serie) => serie.genero.toLowerCase() === genero.toLowerCase());
}

//console.log(mostrarSeriesGenero("terror"));

// mostrar por pantalla todas las series que tengan 3 o más temporadas y sean del año 2017 en adelante

function mostrarSeriesPorAnioYTemporadas(cantTemp, anio) {
    return series.filter((serie) => {
        return serie.cant_temporadas >= cantTemp && serie.anio >= anio;
    });
}

//console.log(mostrarSeriesPorAnioYTemporadas(3, 2017));

// obtener la cantidad total de visitas de las series de ciencia ficcion

function obtenerVistasTotalesCF(genero) {
    return Object.values(series).reduce((acumulador,serie) => 
        serie.genero.toLowerCase() == genero.toLowerCase() ? acumulador += serie.cant_visitas : acumulador += 0, 0);
}

console.log(obtenerVistasTotalesCF("Ciencia ficción"));

// obtener el promedio de cantidad de visitas de las series cuyo genero sea drama y su año de filmacion sea entre 2012 y 2020

function mostrarPromedioGeneroYAnio(genero, anio) {
    return series.filter((serie) => {
        return serie.genero.toLowerCase() === genero.toLowerCase() && serie.anio >= anio;
    });
}

// crear una funcion que nos diga si todas las series del genero drama que hayan sido filmadas entre 2012 y 2020 tiene su titulo que comienza con la letra A