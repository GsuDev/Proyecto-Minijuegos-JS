let images = [
    { 
        "level": 0, 
        "level-tag": "Beginner", 
        "img-url": "resources/media/img/level-0.webp", 
        "diff-number": 7, 
        "isSolved": false,
        "correctDifferences": [
            { x: 800, y: 242, found: false, radius: 20 }, //Bombilla
            { x: 980, y: 98, found: false, radius: 13 }, // Sol
            { x: 1098, y: 183, found: false, radius: 15 }, // Nube
            { x: 979, y: 393, found: false, radius: 15 }, // Peca
            { x: 1156, y: 352, found: false, radius: 15 }, // Cubo ventana
            { x: 812, y: 675, found: false, radius: 20 }, // Pata mesa
            { x: 1009, y: 558, found: false, radius: 20 } // Lapiz
        ]
    },
    { 
        "level": 1, 
        "level-tag": "Intermediate", 
        "img-url": "resources/media/img/level-1.webp", 
        "diff-number": 7, 
        "isSolved": false,
        "correctDifferences": [
            { x: 800, y: 242, found: false, radius: 30 },
            { x: 980, y: 98, found: false, radius: 30 },
            { x: 1097, y: 181, found: false, radius: 30 },
            { x: 400, y: 300, found: false, radius: 30 },
            { x: 1156, y: 352, found: false, radius: 30 },
            { x: 812, y: 675, found: false, radius: 30 },
            { x: 1009, y: 558, found: false, radius: 30 }
        ]
    },
    { 
        "level": 2, 
        "level-tag": "Advanced", 
        "img-url": "resources/media/img/level-2.webp", 
        "diff-number": 7, 
        "isSolved": false,
        "correctDifferences": [
            { x: 800, y: 242, found: false, radius: 30 },
            { x: 980, y: 98, found: false, radius: 30 },
            { x: 1097, y: 181, found: false, radius: 30 },
            { x: 400, y: 300, found: false, radius: 30 },
            { x: 1156, y: 352, found: false, radius: 30 },
            { x: 812, y: 675, found: false, radius: 30 },
            { x: 1009, y: 558, found: false, radius: 30 }
        ]
    },
    { 
        "level": 3, 
        "level-tag": "Expert", 
        "img-url": "resources/media/img/level-3.webp", 
        "diff-number": 7, 
        "isSolved": false,
        "correctDifferences": [
            { x: 800, y: 242, found: false, radius: 30 },
            { x: 980, y: 98, found: false, radius: 30 },
            { x: 1097, y: 181, found: false, radius: 30 },
            { x: 400, y: 300, found: false, radius: 30 },
            { x: 1156, y: 352, found: false, radius: 30 },
            { x: 812, y: 675, found: false, radius: 30 },
            { x: 1009, y: 558, found: false, radius: 30 }
        ]
    }
];

let buttons = [
    { "id": 0, "button-tag": "Beginner", "button-html": "<button id='0' background class='button'><span>Beginner</span></button>" },
    { "id": 1, "button-tag": "Intermediate", "button-html": "<button id='1' class='button'><span>Intermediate</span></button>" },
    { "id": 2, "button-tag": "Advanced", "button-html": "<button id='2' class='button'><span>Advanced</span></button>" },
    { "id": 3, "button-tag": "Expert", "button-html": "<button id='3' class='button'><span>Expert</span></button>" }
];


let foundCount = 0;

// Función para mostrar los botones
function showButtons() {
    let buttonsContainer = document.getElementById('buttons-container');
    let container = document.getElementById('container');
    container.innerHTML = '';
    buttons.forEach(button => {
        buttonsContainer.innerHTML += button["button-html"];
        console.log(images[button.id].isSolved)
        if (images[button.id].isSolved){
            document.getElementById(button.id).style.backgroundColor = '#5cdb95'
        }else{
            document.getElementById(button.id).style.backgroundColor = '#e3683e'
        }
    });
    addButtonClickEvent()

}

// Función para manejar el clic en los botones

function handleButtonClick(level) {
    // 1 Eliminar todos los botones
    document.getElementById('buttons-container').innerHTML = '';

    // 2 Obtener el contenedor y limpiar su contenido
    let container = document.getElementById('container');
    container.innerHTML = '';

    // 3 Crear un elemento <canvas> y configurarlo

    // ¿Por qué usar <canvas> en lugar de <img>?
    // Porque permite dibujar sobre la imagen(para los círculos rojos al encontrar diferencias). 
    // Con < img > solo podríamos mostrar la imagen, pero no interactuar con ella de forma tan flexible.
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d'); // Activa el contexto del canvas (permite usar la api del canvas)
    canvas.width = 1366; // Ajustar según la imagen
    canvas.height = 768; // Ajustar según la imagen
    container.appendChild(canvas); // Agregar el canvas al contenedor
    // Contenedor de encontradas y volver
    let footer = document.createElement('footer')
    container.appendChild(footer)
    // Contador de encontradas
    let foundCounter = document.createElement('p') // Creo una elemento p
    foundCounter.innerHTML = "Diferencias encontradas: 0 de 7" // Lo relleno
    footer.appendChild(foundCounter) // Lo meto en container de debajo del canvas
    // Botón de volver
    footer.innerHTML += `
        <button id="back"class="Btn">

            <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>

            <div class="text">Volver</div>
        </button>
    `
    let backButton = document.getElementById('back')
    backButton.addEventListener('click', () => {
        showButtons();
    });


    // 4 Cargar la imagen correspondiente
    let img = new Image();
    img.src = images[level]["img-url"];
    // Cuando carga la imagen
    img.onload = function () {
        // Dibuja la imagen dentro del canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height); //context.drawImage(img(imagen), x(pos hor), y(pos ver), width(ancho), height(largo))
    };

    // 5 Manejar clics en el canvas
    canvas.addEventListener('click', (event) => {
        let rect = canvas.getBoundingClientRect(); // Devuelve un objeto con la posicion en X (rect.top) y en Y (rect.left) del canvas
        // Hace que las variables x e y sean relativas al canvas y no a la pantalla
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        console.log('x:',x,'y:',y)
        // 6 Verificar si el clic está cerca de una diferencia
        images[level].correctDifferences.forEach(diff => {
            // Hacemos la diferencia con la distancia euclidea (teorema de pitágoras)
            let distance = Math.sqrt((diff.x - x) ** 2 + (diff.y - y) ** 2);
            // Si la distancia entre el click y la diferencia es de menos de 15px y esa diferencia no estaba encontrada
            if (distance < 15 && !diff.found) { // 15px de margen

                diff.found = true; // La marcamos encontrada
                foundCount++; // Sumamos una diferencia al marcador de encuentros
                foundCounter.innerHTML = `Diferencias encontradas: ${foundCount} de 7`
                // 7 Marcar la diferencia encontrada dibujando un circulo rojo
                
                ctx.beginPath(); // Empieza el dibujo
                let radius = diff.radius
                ctx.arc(diff.x, diff.y, radius, 0, 2 * Math.PI); // Circulo
                ctx.strokeStyle = 'red'; // Color rojo al dibujo
                ctx.lineWidth = 3; // Grosor
                ctx.stroke(); // Acaba el dibujo

                // 8️⃣ Verificar si el usuario ha encontrado todas las diferencias
                if (foundCount === images[level]["diff-number"]) {
                    images[level].isSolved = true
                    let ans = confirm('Nivel Completado! ¿Desea volver al menú?')
                    if (ans){
                        showButtons()
                    }
                    
                }
            }
        });
    });
}

// Añadir evento a cada botón
document.addEventListener('DOMContentLoaded', () => {
    showButtons();
});

function addButtonClickEvent(){
    buttons.forEach(button => {
        document.getElementById(button.id).addEventListener('click', () => {
            handleButtonClick(parseInt(button.id));
        });
    });
}
