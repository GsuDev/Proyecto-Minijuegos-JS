
// El script tiene un problema y es que las operaciones se llevan a cabo en orden de escritura
// y no en orden aritmético, habría que hacer tres bucles en la función equals(). Uno que primero repase la exponenciación
// otro que repase las multiplicaciónes y divisiones y otro final con las sumas y restas de forma que
// cada bucle sustituya los elementos de la cadena de operaciones para que el siguiente pueda trabajar.

// LAURA DICE QUE ASÍ ESTÁ BIEN


let result = document.getElementById('result') // Div donde se sacarán los resultados
let screenNums = [] // Aquí se guardan uno a uno como elementos del vector los numeros en string
let operationChain = [] // Aquí se almacenan los numeros ya como float y los signos de las operaciones a realizar
let partialResult = 0.0 // Variable de resultado parcial
let notValidAtInit = ['00', '.']
let mem = 0


// FUNCIONES

// Funcion borrar todo, para el botón 'CE'
function clearAll() {

  screenNums = [] // Borra el array de la pantalla
  operationChain = [] // Borra los numeros y operaciones guardadas
  result.innerHTML = '0' // Borra la pantalla y muestra '0'
  partialResult = 0 // Borra el resultado parcial
}

// Función apretar un numero, para las teclas con un número
function press(num) {

  // No muestra por pantalla el '0', '00' o el '.' si no se ha pulsado antes otro numero
  if (!(screenNums.length === 0 && notValidAtInit.includes(num))) {

    // Caso de que se introduce algo valido
    screenNums.push(num) // Añadimos al array de la pantalla el número que se ha apretado
    result.innerHTML = screenNums.join('') // Mostramos el array pantalla en el html

  }
}

// Función añadir a la cadena de operaciones, guarda los numeros ya parseados en la cadena
function addToChain() {

  // Comprobamos que se haya escrito algún número
  if (screenNums.length !== 0) {

    // De ser así juntamos sus cifras, lo parseamos y lo añadimos a la cadena
    operationChain.push(parseFloat(screenNums.join('')))

  }
}

// Función apretar un botón de operación
function opButton(op) {

  addToChain() // Añade el número que hubiera en pantalla
  operationChain.push(op) // Añade la operación pulsada
  console.log(operationChain) // Para debug (saca la cadena por consola)
  screenNums = [] // Vacía el array de la pantalla

}

// Función apretar un botón de memoria
function memButton(op) {
  // Según cual de ellos se pulse realizamos una acción diferente
  switch (op) {
    case 'MC': // Resetea la memoria
      mem = 0
      break
    case 'MR': // Muestra la memoria por pantalla
      screenNums = [mem]
      result.innerHTML = screenNums
      operationChain = [] // Reinicia la cadena de operaciones porque se ha alterado lo que había en pantalla
      break
    case 'M+': // Suma lo que haya en pantalla a la memoria
      mem += parseFloat(screenNums.join(''))
      break
    case 'M-': // Resta lo que haya en pantalla a la memoria
      mem -= parseFloat(screenNums.join(''))
  }
}

// Función apretar el botón de igual que realiza las operaciones y devuelve el resultado
function equals() {

  addToChain() // Añade lo último que hubiera en la pantalla a la cadena
  partialResult += operationChain[0] // Acumula el primer elemento de la cadena


  // A partir de ahí recorre la cadena y según el símbolo que se encuentra realiza una operación
  for (let i = 1; i < operationChain.length; i++) {

    // Siempre comprueba, si dentro de dos elementos hay un % puesto que significaría 2 cosas:
    //      1. Que estamos hubicados en un símbolo de operación.
    //      2. Que el siguiente elemento se debe transformar en el anterior elemento multiplicado por el
    //         siguiente entre 100 es decir si la cadena era: ['100', '+', '20', '%'] se debe transformar
    //         en: ['100', '+', '100*(20/100)] de forma que el resto de operaciones siguen funcionando.
    if (operationChain[i + 2] === '%') {

      operationChain[i + 1] = operationChain[i - 1] * (operationChain[i + 1] / 100)
      operationChain.splice(i + 2, -1) // Borra el símbolo % para evitar interferencias

    }

    // Comprueba el símbolo, realiza la operación y acumula el resultado.
    switch (operationChain[i]) {

      // Usamos el operador ternario para el caso que despues del signo haya un simbolo de raíz
      // ya que el simbolo de raíz va siempre antes del número y no detras como los demás.
      case '+':
        partialResult += (operationChain[i + 1] !== 'sqr') ? operationChain[i + 1] : sqr(i)
        break
      case '-':
        partialResult -= (operationChain[i + 1] !== 'sqr') ? operationChain[i + 1] : sqr(i)
        break
      case 'x':
        partialResult *= (operationChain[i + 1] !== 'sqr') ? operationChain[i + 1] : sqr(i)
        break
      case '/':
        partialResult /= (operationChain[i + 1] !== 'sqr') ? operationChain[i + 1] : sqr(i)
        break

      case '^':
        partialResult **= (operationChain[i + 1] !== 'sqr') ? operationChain[i + 1] : 1
        break

    }
  }

  console.log(partialResult) //Para debug:
  screenNums = [partialResult] // Reinicia el array de la pantalla
  result.innerHTML = screenNums // Saca el resultado en el html
  partialResult = 0 // Reinicia el resultado parcial
}

// Función raíz cuando se la llama desde equals()
function sqr(i) {

  // Para debug: console.log('Cuando llega al sqr', operationChain)

  // Hace la raiz y la almacena en una variable auxiliar
  let aux = operationChain[i + 2] ** 0.5

  // Para debug:  console.log('cuando hace la raiz de lo siguiente', operationChain)

  // Elimina el símbolo de raíz una vez hecha la operación para evitar interferencias
  operationChain.splice(i, -1)

  // Para debug: console.log('cuando borra el signo', operationChain)
  return aux

}