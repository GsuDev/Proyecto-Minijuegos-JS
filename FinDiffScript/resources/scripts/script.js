// Array de objetos. Cada objeto tiene las propiedades de un nivel
let levelData = [
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
      { x: 1184, y: 322, found: false, radius: 15 }, // Triangulo
      { x: 851, y: 296, found: false, radius: 30 }, // Bombilla
      { x: 806, y: 571, found: false, radius: 30 }, // Libro
      { x: 1025, y: 406, found: false, radius: 25 },// Boca
      { x: 728, y: 365, found: false, radius: 25 }, // Circulo
      { x: 1213, y: 135, found: false, radius: 30 }, // Cuadrado
      { x: 1254, y: 527, found: false, radius: 25 } // Discos duros
    ]
  },
  {
    "level": 2,
    "level-tag": "Advanced",
    "img-url": "resources/media/img/level-2.webp",
    "diff-number": 7,
    "isSolved": false,
    "correctDifferences": [
      { x: 845, y: 317, found: false, radius: 30 }, // Monitor 
      { x: 907, y: 168, found: false, radius: 15 }, // Corcho
      { x: 1226, y: 194, found: false, radius: 15 }, // Reloj
      { x: 1124, y: 329, found: false, radius: 30 }, // Libro inclinado
      { x: 1197, y: 554, found: false, radius: 20 }, // Ipod
      { x: 767, y: 460, found: false, radius: 30 }, // Lapiz de la planta
      { x: 760, y: 616, found: false, radius: 30 } // Raya libro
    ]
  },
  {
    "level": 3,
    "level-tag": "Expert",
    "img-url": "resources/media/img/level-3.webp",
    "diff-number": 7,
    "isSolved": false,
    "correctDifferences": [
      { x: 1025, y: 437, found: false, radius: 30 }, // Raya cuaderno
      { x: 1280, y: 263, found: false, radius: 30 }, // Color cuadradito
      { x: 1243, y: 610, found: false, radius: 30 }, // Raya libro
      { x: 793, y: 311, found: false, radius: 30 }, // Color lapiz
      { x: 737, y: 424, found: false, radius: 30 }, // Diu extraño de la izquierda
      { x: 719, y: 635, found: false, radius: 30 }, // Falta un lapiz en la esquina abajo izquierda
      { x: 1010, y: 117, found: false, radius: 30 } // Llave rara arriba de la cabeza
    ]
  }
];

// Array de objetos. Cada objeto tiene las propiedades de un botón
let buttonData = [
  { "id": 0, "button-tag": "Beginner", "button-html": "<button id='0' background class='button'><span>Beginner</span></button>" },
  { "id": 1, "button-tag": "Intermediate", "button-html": "<button id='1' class='button'><span>Intermediate</span></button>" },
  { "id": 2, "button-tag": "Advanced", "button-html": "<button id='2' class='button'><span>Advanced</span></button>" },
  { "id": 3, "button-tag": "Expert", "button-html": "<button id='3' class='button'><span>Expert</span></button>" }
];

// Contenedor de las imagenes
let container = document.getElementById('container');
// Contenedor de la intro
let introContainer = document.getElementById('intro-container')
// Título superior
let title = document.getElementById('title')
// html de la intro
let introHTML = `
    <div class="intro-text">
        <h2>¿Cómo jugar?</h2>
        <p>
            <br>La imagen de la izquierda y la derecha<br> son muy similares... 
            ¡Pero no son iguales!<br><br> Encuentra las 7 diferencias ocultas 
            y haz <br>click en ellas <u>en la imagen de la derecha.</u>
        </p>
    </div>
    <div id="buttonData-container"> <!-- Aquí van los botones --> </div>
`


// Función para mostrar la intro con el tutorial y los botones
function showIntroMenu() {

  // Agrandamos el título
  title.style.fontSize = '5em'
  // Limpiamos el contenedor de las imagenes y la intro
  container.innerHTML = ''
  introContainer.innerHTML = ''

  // Volcamos el HTML de la intro en el contenedor de la intro
  introContainer.innerHTML = introHTML

  // Capturamos el contenedor de los botones
  let buttonDataContainer = document.getElementById('buttonData-container');

  // Para cada botón del array de objetos buttonData
  buttonData.forEach(button => {
    // Añadimos el html del botón
    buttonDataContainer.innerHTML += button["button-html"];

    // Si el nivel está resuelto la sombra es verde sino es roja
    if (levelData[button.id].isSolved) {
      document.getElementById(button.id).style.backgroundColor = '#5cdb95'
    } else {
      document.getElementById(button.id).style.backgroundColor = '#e3683e'
    }
  });

  // Llamamos a la función que escucha el click de los botones
  addButtonClickEvent()

}


// Función para manejar el clic en los botones
function playLevel(level) {

  // 1 Eliminar la intro y los botones
  introContainer.innerHTML = ''
  // Achicamos el título
  title.style.fontSize = '2.5em'

  // 2 Obtener el contenedor y limpiar su contenido
  container.innerHTML = '';

  // 3 Crear un elemento <canvas> y configurarlo

  // ¿Por qué usar <canvas> en lugar de <img>?
  // Porque permite dibujar sobre la imagen (para los círculos rojos al encontrar diferencias). 
  // Con < img > solo podríamos mostrar la imagen, pero no interactuar con ella de forma tan flexible.
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d'); // Activa el contexto del canvas (permite usar la api del canvas)
  canvas.width = 1366; // Ancho de mis imagenes
  canvas.height = 768; // Alto de mis imagenes
  container.appendChild(canvas); // Agrega el canvas al contenedor

  // Contenedor de encontradas y del botón volver de debajo de las imagenes
  let footer = document.createElement('footer')

  // Contador de encontradas

  /*
  
  Aquí abajo me atasqué bastante porque quería hacer esta anidación para pocer hacer flex:

      #container
          |-footer
              |-foundCounter (contador de diferencias encontradas)
              |-backButton (botón de volver)

  Pero pensaba que haciendola una vez luego podría actualizar directamente con cada diferencia encontrada
  (el codigo que hace eso está abajo del todo de la función) usando "foundCounter.innerHTML = `Diferencias encontradas: ${foundCount} de 7` " 
  pero eso no actualizaba el DOM y por lo tanto el cambio no se mostraba.

  Hay que volver a realizar la anidación de arriba a abajo puesto que aunque el innerHTML de foundCounter se actualiza,
  el DOM no lo muestra ya que es como si se realizase una copia en container la primera vez que se anida y eso es lo que se muestra.
  Necesitas volver a hacer los appendChild después para que vuelva a coger el contenido de foundCounter y actualice el DOM con los cambios.
      
  */

  let foundCount = 0;
  let foundCounter = document.createElement('p') // Creo una elemento p
  foundCounter.innerHTML = "Diferencias encontradas: 0 de 7" // Le pongo el texto que quiero mostrar
  footer.appendChild(foundCounter); // Lo meto en el footer
  container.appendChild(footer) // Meto el footer en el contenedor de las imagenes


  // Botón de volver
  footer.innerHTML += `
        <button id="back"class="Btn">

            <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>

            <div class="text">Volver</div>
        </button>
    `
  // Capturo el botón de volver
  let backButton = document.getElementById('back')
  // Escucho el click del botón de volver
  backButton.addEventListener('click', () => {
    // Cuando se hace click llama a la función que muestra el menú
    showIntroMenu();
  });


  // 4 Cargar la imagen correspondiente
  let img = new Image();
  img.src = levelData[level]["img-url"];

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

    console.log('x:', x, 'y:', y)
    // 6 Verificar si el clic está cerca de una diferencia
    levelData[level].correctDifferences.forEach(diff => {
      // Hacemos la diferencia con la distancia euclidea (teorema de pitágoras)
      let distance = Math.sqrt((diff.x - x) ** 2 + (diff.y - y) ** 2);
      // Si la distancia entre el click y la diferencia es de menos de 15px y esa diferencia no estaba encontrada
      if (distance < 15 && !diff.found) { // 15px de margen

        diff.found = true; // La marcamos encontrada
        foundCount++; // Sumamos una diferencia al marcador de encuentros

        // 7 Marcar la diferencia encontrada dibujando un circulo rojo

        ctx.beginPath(); // Empieza el dibujo
        let radius = diff.radius
        ctx.arc(diff.x, diff.y, radius, 0, 2 * Math.PI); // Circulo
        ctx.strokeStyle = 'red'; // Color rojo al dibujo
        ctx.lineWidth = 3; // Grosor
        ctx.stroke(); // Acaba el dibujo

        // Llamamos a la función que actualiza el contador
        addFoundedDiff({ foundCounter, foundCount, footer })
      }
    });

    // 8️ Verificar si el usuario ha encontrado todas las diferencias

    // Usamos un timeout para dar tiempo a mostrar el circulo de la última diferencia y actualizar el contador
    // Le paso una función flecha anonima que se ejecutará despues de 200 ms
    setTimeout(() => {

      // Si se han encontrado todas las diferencias
      if (foundCount === levelData[level]["diff-number"]) {

        // Marca el nivel resuelto
        levelData[level].isSolved = true

        // Pregunta si se quiere volver al menú
        let ans = confirm('Nivel Completado! ¿Desea volver al menú?')

        // Si devuelve true es que se ha pulsado OK
        if (ans) {

          // Llama a la función que muestra la intro
          showIntroMenu()

        }
      }

    }, 200)

  });

}

// Cuando carga la página muestra la intro
document.addEventListener('DOMContentLoaded', () => {
  showIntroMenu();
});

// Función que añade a cada botón de selección de nivel a escuchar el click
function addButtonClickEvent() {
  // Para cada botón
  buttonData.forEach(button => {
    // Escucha el click
    document.getElementById(button.id).addEventListener('click', () => {
      // Al hacer click llama a la función del juego pasandole la id del nivel
      playLevel(parseInt(button.id));
    });
  });
}

function addFoundedDiff({ foundCounter, foundCount, footer }) {
  foundCounter.innerHTML = `Diferencias encontradas: ${foundCount} de 7`
  footer.innerHTML = ''
  footer.appendChild(foundCounter)
  // Botón de volver
  footer.innerHTML += `
        <button id="back"class="Btn">

            <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>

            <div class="text">Volver</div>
        </button>
        `
  let backButton = document.getElementById('back')
  backButton.addEventListener('click', () => {
    showIntroMenu();
  });
  container.appendChild(footer)
}
