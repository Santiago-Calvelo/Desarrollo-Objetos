const fs = require('fs') 

function leerSeries() {
    let seriesJSON = fs.readFileSync('series_netflix.json', 'utf-8');
    return JSON.parse(seriesJSON);
}

const series = leerSeries();

// mostrar por pantalla todas las series cuyo genero sea terror
function obtenerListaSeriesPorAño(genero, anio1, anio2) {
    return series.filter((serie) => {
        return serie.genero.toLowerCase() == genero.toLowerCase() && (serie.anio >= anio1 && serie.anio <= anio2);
    });
}

function obtenerListaSeries(genero) {
    return series.filter((serie) => {
        return serie.genero.toLowerCase() === genero.toLowerCase()
    });
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

function obtenerVistasTotalesGenero(genero) {
    let seriesGenero = obtenerListaSeries(genero)

    return Object.values(seriesGenero).reduce((acumulador,serie) =>  acumulador += serie.cant_visitas, 0);
}

//console.log(obtenerVistasTotalesGenero("Ciencia ficción",));

// obtener el promedio de cantidad de visitas de las series cuyo genero sea drama y su año de filmacion sea entre 2012 y 2020

function obtenerPromedioVisitas(genero, anio1, anio2) {
    let seriesGenero = obtenerListaSeriesPorAño(genero, anio1, anio2);
    return seriesGenero.reduce((visitas, serie) => visitas += serie.cant_visitas, 0) / seriesGenero.length;
}

//console.log(obtenerPromedioVisitas("Drama", 2012, 2020))
// crear una funcion que nos diga si todas las series del genero drama que hayan sido filmadas entre 2012 y 2020 tiene su titulo que comienza con la letra A

function mostrarPeliculasPorLetra(genero, anio1, anio2, char) {
    let seriesGenero = obtenerListaSeriesPorAño(genero, anio1, anio2);

    return seriesGenero.every((serie) => serie.nombre.toLowerCase().startsWith(char.toLowerCase()));
}

//console.log(mostrarPeliculasPorLetra("Drama", 2012, 2020, "a"));