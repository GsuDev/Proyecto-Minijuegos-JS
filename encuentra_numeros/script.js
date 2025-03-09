//Array de colores
const colores = [
    'rgb(255, 87, 51)', 'rgb(51, 255, 87)', 'rgb(51, 87, 255)',
    'rgb(255, 51, 161)', 'rgb(51, 255, 240)', 'rgb(255, 106, 51)', 'rgb(230, 51, 255)',
    'rgb(51, 255, 151)', 'rgb(255, 99, 71)', 'rgb(60, 179, 113)',
    'rgb(138, 43, 226)', 'rgb(255, 20, 147)', 'rgb(0, 191, 255)', 'rgb(50, 205, 50)',
    'rgb(139, 0, 0)',  'rgb(255, 69, 0)', 'rgb(255, 140, 0)'
];

//Función para asignar colores a los cuadrados de forma random
function asignarcolores() {
    var coloresUsados = []
    var listaNumero1 = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7]
    listaNumero1.sort(() => Math.random() - 0.5)


    var numClickeados = [];
    //Obtengo todos los elementos de la clase cuadrado
    var cuadrados = document.querySelectorAll(".cuadrado");

    var contadorVictoria=0
    //Recorro todos los cuadrados
    for (let i = 0; i < cuadrados.length; i++) {

        let colorAleator;
        do {

            //Asigno un color a cada cuadrado controlando que no se repitan
            colorAleator = colores[Math.floor(Math.random() * colores.length)]
        } while (coloresUsados.includes(colorAleator));

        coloresUsados.push(colorAleator); //Actualizo la lista de los colores que ya se han usado

        cuadrados[i].style.backgroundColor = colorAleator //Asigno el color

        // Crear un párrafo para mostrar el número
        const parrafo = document.createElement("p");
        parrafo.textContent = listaNumero1[i]; //Añado un numero randon al parrafo que he creado en cada cuadrado
        parrafo.style.visibility = "hidden"; // Ocultar el número
        cuadrados[i].appendChild(parrafo); //Añado al cuadrado el parrafo con su numero

        // Agregar evento de clic
         //Creo una variable para controlar que unicamente hade dos click por jugada
        //Funcion de clic en cada cuadrado
        cuadrados[i].addEventListener("click", function () {
            if (numClickeados.length==2) return //Si ya ha dado dos click finaliza


            // Si ya fue descubierto, no hacer nada
            if (parrafo.style.visibility === "visible") return;

            parrafo.style.visibility = "visible"; // Mostrar número

            numClickeados.push({ cuadrado: cuadrados[i], numero: parrafo.textContent }); //Creo un objeto con el div (cuadrado) y su nunmero (p)

            // Si se han seleccionado dos cuadrados
            if (numClickeados.length === 2) {

                if (numClickeados[0].numero === numClickeados[1].numero) {
                    
                    // Son iguales, mantenerlos visibles
                    numClickeados = [];
                    contadorVictoria++
                    var acutalizarContador= document.getElementById("contador")
                    acutalizarContador.innerHTML= 'Aciertos: ' + contadorVictoria;
                } else {
                    // Si no coinciden, ocultarlos después de un segundo
                    setTimeout(function () {
                        numClickeados[0].cuadrado.querySelector("p").style.visibility = "hidden";
                        numClickeados[1].cuadrado.querySelector("p").style.visibility = "hidden";
                        numClickeados = []; // Resetear la lista
                    }, 1200);
                }
            }
        });
    }
}







asignarcolores();
