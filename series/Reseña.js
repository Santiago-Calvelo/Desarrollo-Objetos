class Reseña {
    constructor(puntaje, descripcion) {
        this.puntaje = puntaje;
        this.descripcion = descripcion;
    }

    // buena reseña = > 6 descripcion >= 300 caracteres

    isGoodReview() {
        return this.puntaje > 6 && this.descripcion.length >= 300;
    }

    isDescriptionLonger(longChars) {
        return this.descripcion.length > longChars;
    }

    containsString(string) {
        return this.descripcion.contains(string);
    }
}

module.exports = Reseña;