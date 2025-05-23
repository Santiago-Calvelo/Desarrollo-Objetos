// crear una funcion que reciba un nombre por parametro y cuente la cantidad de clientes que tengan ese nombre
const { log } = require('console');
const fs = require('fs');
const { totalmem } = require('os');

function leerClientes() {
    const clientesCsv = fs.readFileSync('clientes.csv', "utf-8");
    const lineasClientes = clientesCsv.split('\n');
    lineasClientes.shift()
    let clientes = [];


    for (let i = 0; i < lineasClientes.length; i++) {
        const [id, nombre, apellido, documento, sexo, fecha_nacimiento] = lineasClientes[i].split(",");

        if (id) {
            clientes.push({
                id,
                nombre,
                apellido,
                documento,
                sexo,
                fechaNacimiento: fecha_nacimiento
            })
        }
    }

    return clientes;
}
let clientes = leerClientes();

function leerCompras() {
    const comprasJson = fs.readFileSync('compras.json', 'utf-8');
    return JSON.parse(comprasJson);
}

const compras = leerCompras();

function contarApariciones(nombre) {
    let count = 0;

    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].nombre == nombre) {
            count++;
        }
    }

    return count;
}

// crear una funcion que ordene clientes
function ordenarClientes() {
    return clientes.sort((a,b) => a.apellido.localeCompare(b.apellido));
}


let nombre = "Juan";
//console.log("La cantidad de apareciones para " + nombre + " es de: " + contarApariciones(nombre, clientes));


//crear una funcion que reciba un año y que cuente la cantidad de clientes que nacieron en ese año
function contarNacimientosAño(año) {
    let count = 0;

    for (let i = 0; i < clientes.length; i++) {
        let añoNacimiento = clientes[i].fechaNacimiento.split("-")[2];
        if (añoNacimiento == año) {
            count++;
        }
    }

    return count;
}

//console.log(contarNacimientosAño(1994,clientes));

// crear una funcion que dado el id de un cliente nos diga cual fue el gasto total

function obtenerGastoTotal(id) {
    let total = 0;
    let i = 0;
    let encontrado = false;
    do {
        if (id == compras[i].id_cliente) {
            total = compras[i].precio_total;
            
            encontrado = true;
        }
        i++
    } while (!encontrado && i < compras.length);
    
    return total;
}

// crear una funcion que dado el dni de un cliente devuelva su gasto total
function obtenerClienteIDYGasto(dni) {
    let id = 0;
    let encontrado = false;
    let i = 0;
    do {
        if (dni == clientes[i].documento) {
            encontrado = true;
            id = clientes[i].id;
        }
        i++;
    } while (!encontrado);
    return obtenerGastoTotal(id);
}

//console.log(obtenerClienteIDYGasto(56789321));

function buscarCliente(id) {
    id++;
    let cliente = clientes.find((clientes) => clientes.id == id)
    
    if (cliente !== undefined) {
        console.log(cliente);
    }
}

function obtenerGastosPorCliente() {
    let totalesPorCliente = {}; 

    for (let compra of compras) {
        if (!totalesPorCliente[compra.id_cliente]) {
            totalesPorCliente[compra.id_cliente] = 0;
        }   
        totalesPorCliente[compra.id_cliente] += compra.precio_total;
    }
    obtenerGastoMaximo(totalesPorCliente)
}

function obtenerGastoMaximo(totalesPorCliente) {
    const ids = Object.values(totalesPorCliente);

    // Usamos el primer ID para iniciar max y idClienteConMax
    //let idCliente = ids[0];
    //let max = totalesPorCliente[idCliente];

    /*for (let i = 1; i < ids.length; i++) {
        const id = ids[i];
        if (totalesPorCliente[id] > max) {
            max = totalesPorCliente[id];
            idCliente = id;
        }
    } */

    let max = Object.values(totalesPorCliente).reduce((a,b) => Math.max(a,b), ids[0]);

    buscarCliente(Object.values(totalesPorCliente).indexOf(max));
    //console.log(max)
}

//console.log(obtenerGastosPorCliente());

// una funcion que nos diga si al menos un cliente pertenece a la decada del 70

function obtenerClientesDecada(decada) {
    return clientes.some((cliente) => {
        let decadaCliente = cliente.fechaNacimiento.split("-")[2].slice(-3);
        return decadaCliente >= decada && decadaCliente <= decada+9;
    }); 
}

// una funcion que nos diga si todos los clientes de la decada del 80 gastaron 4000

function obtenerSiGastaron4000(decada) {
    return clientes.every((cliente) => {
        let decadaCliente = cliente.fechaNacimiento.split("-")[2].slice(-3);
        return decadaCliente >= decada && decadaCliente <= decada+9 && obtenerGastoTotal(cliente.id) >= 4000;
    })
}

console.log(obtenerSiGastaron4000(80));
// una funcion que nos diga si al menos un cliente es menor de edad y si los gastos de los menores es mayor a 50.000

function obtenerMenoresYGastos() {
    return clientes.some((cliente) => {
        let anio = cliente.fechaNacimiento.split("-")[2];
        return (2025 - anio) < 18 && obtenerGastoTotal(cliente.id) >= 50000;
    })
}

// mostrar por pantalla todas las series cuyo genero sea terror
// mostrar por pantalla todas las series que tengan 3 o más temporadas y sean del año 2017 en adelante
// obtener la cantidad total de visitas de las series de ciencia ficcion