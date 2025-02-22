
let result = document.getElementById('result')
let opComponent = []
let op1 = 0.0
let op2 = 0.0
let lastOperator

function press(num) {
    if (!((num === '0') && opComponent.length === 1) && !((num === '00' || num === '.') && opComponent.length === 0)) {
        opComponent.push(num)
        result.innerHTML = opComponent.join('') 
    }
}

// Función borrar todo
function clearAll() {
    opComponent = []
    result.innerHTML = '0'
    op1 = 0
}

// Función suma
function plus(){
    // Acumula lo que haya en el array de pantalla en op1
    op1 += parseFloat(opComponent.join(''))
    // Muestra op1 en pantalla como resultado parcial
    result.innerHTML = op1
    // Vacía el array de pantalla
    opComponent = []
    // Guarda que la ultima operación que se ha hecho es una suma
    lastOperator = '+'
}
function minus() {
    if (lastOperator === '-'){
        // Resta lo que haya en el array de pantalla a op1
        op1 -= parseFloat(opComponent.join(''))
    }else{
        // Acumula lo que haya en el array de pantalla en op1
        op1 += parseFloat(opComponent.join(''))
    }
    // Muestra op1 en pantalla como resultado parcial
    result.innerHTML = op1
    // Vacía el array de pantalla
    opComponent = []
    // Guarda que la ultima operación que se ha hecho es una resta
    lastOperator = '-'
}

// Función igual
function equals(){

    // Según la ultima operación
    switch (lastOperator){
        // Si fue una suma
        case '+':
            // Acumula el ultimo numero introducido del array pantalla en op1
            op1 += parseFloat(opComponent)
            // Muestra el resultado
            result.innerHTML = op1
        break
        case '-':
            // Resta el ultimo numero introducido del array pantalla a op1
            op1 -= parseFloat(opComponent)
            // Muestra el resultado
            result.innerHTML = op1
        break
        case null:
            
        break
    }
    
    lastOperator = null
}