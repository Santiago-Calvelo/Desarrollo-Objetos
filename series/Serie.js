class Serie {

    constructor (nombre, cantTemporadas, genero, anio, cantVisitas) {
        this.nombre = nombre;
        this.cantTemporadas = cantTemporadas;
        this.genero = genero;
        this.anio = anio;
        this.cantVisitas = cantVisitas;
        this.reseñas = [];
    }

    // metodo para definir si el nombre es largo
    isLongName() {
        return this.nombre.length > 15;
    }

    // fue filmada entre tal año (parametros)
    isInRange(anio1, anio2) {
        return this.anio >= anio1 && this.anio <= anio2;
    }

    getData() {
        return this.nombre + "-" + this.cantTemporadas + "-" + this.genero + "-" + this.anio 
    }

    isGoodSerie() {
        return this.cantVisitas >= 50000 && this.getPromReviews >= 6;
    }

    getPromReviews() {
        return this.reseñas.reduce((acumulador, reseña) => acumulador += reseña.puntaje) / this.reseñas.length;
    }

    isEndless() {
        return this.cantTemporadas > 5;
    }

    addReview(reseña) {
        this.reseñas.push(reseña);
    }

    isHighlyRecommend() {
        return this.isGoodSerie() &&  this.reseñas.reduce((acumulador, reseña) => reseña.isDescriptionLonger(150) ? acumulador += 1 : acumulador += 0, 0) >= 2;
    }

    isBadSerie() {
        return this.getPromReviews() < 4 && this.reseñas.reduce((acumulador, reseña) => reseña.containsString("perdida de tiempo") ? acumulador += 1 : acumulador += 0, 0) >= 1;
    }
}

module.exports = Serie;