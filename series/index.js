const Serie = require('./Serie');
const Reseña = require('./Reseña');
const fs = require('fs') 

function initSeries(data) {
    let seriesJSON = JSON.parse(data);
    const series = seriesJSON.map((serie) => new Serie(
    serie.nombre,
    serie.cant_temporadas,
    serie.genero,
    serie.anio,
    serie.cant_visitas)
    );

    return series;
}

let series = initSeries(fs.readFileSync('series_netflix.json', 'utf-8'));

const eternauta = new Serie("El eternauta", 1, "Ciencia Ficción", 2025, 1000000000000);
const avatar = new Serie("Avatar: La leyenda de Aang", 3, "Fantasía", 2010, 1059218);

series.push(eternauta, avatar);

/*for (let serie of series) {
    if (serie.isGoodSerie()) {
        console.log(serie.nombre);
    }
}*/

/* for (let serie of series) {
    if (serie.isEndless()) {
        console.log(serie.nombre);
    }
} */

let reseña1 = new Reseña(2,"sakldfja perdida de tiempo kasbfjkasndsa{kndwjhbkak´pfcaosuindjkn21pokdosandcapçkeqoihnwi1nepoksacoinañne 1wmkianbcz saldkiowuqhmd{al,{hscbn{l,sap´jdbnavfnda{dpjshndsasakldfjahfgjdakldfjkasbfjkasndsa{kndwjhbkak´pfcaosuindjkn21pokdosandcapçkeqoihnwi1nepoksacoinañne 1wmkianbcz saldkiowuqhmd{al,{hscbn{l,sap´jdbnavfnda{dpjshndsa")
let reseña2 = new Reseña(8, "a");

series[0].addReview(reseña1);
series[0].addReview(reseña1);


//console.log(reseña2.isGoodReview());

// nos interesa saber si una serie fue fuertemente recomendada (es buena && +2 reseñas > 1500 caracteres)

//console.log(series[0].isHighlyRecommend());

// serie mala (prom < 4 && +1 reseña contiene "perdida de tiempo")

console.log(series[0].isBadSerie());


// de cada plataforma nos interesa saber su nombre y las series que ofrece, por cada plataforma queremos saber si tiene buen contenido (prom series buenas > 6)
// plataforma mal contenido (prom series buenas < 45)

