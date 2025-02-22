let result = document.getElementById('result') // Div donde se sacarán los resultados
let screenNums = [] // Aquí se guardan uno a uno como elementos del vector los numeros en string
let operationChain = [] // Aquí se almacenan los numeros ya como float y los signos de las operaciones a realizar
let partialResult = 0.0 // Variable de resultado parcial
let notValidAtInit = ['00','.']

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
        screenNums.push(num)
        result.innerHTML = screenNums.join('')
    }
}


function addToChain(){
    if (screenNums.length !== 0){
        operationChain.push(parseFloat(screenNums.join('')))
    }
}
function opButton(op) {
    addToChain()
    operationChain.push(op)
    console.log(operationChain)
    screenNums = []
}

function equals() {
    addToChain()
    partialResult += operationChain[0]
    for (let i = 1; i < operationChain.length; i++) {
        switch(operationChain[i]){
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
            case '%':
                operationChain[i - 1] /= 100
                operationChain.splice(i, 1)
            break
            case '^':
                partialResult **= (operationChain[i + 1] !== 'sqr') ? operationChain[i + 1] : 1
            break
        }
    }
    console.log(partialResult)
    result.innerHTML = partialResult
    partialResult = 0
    
}
function sqr(i) {
    // console.log('Cuando llega al sqr', operationChain)

    let aux = operationChain[i + 2] ** 0.5

    // console.log('cuando hace la raiz de lo siguiente', operationChain)

    operationChain.splice(i, -1)

    //console.log('cuando borra el signo', operationChain)
    return aux
}