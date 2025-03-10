document.addEventListener("DOMContentLoaded", () => {
    const gameArea = document.getElementById("gameArea"); // Selecciona el contenedor principal del juego.
    const car = document.getElementById("car"); // Selecciona el elemento del coche controlado por el jugador.
    const livesDisplay = document.getElementById("lives"); // Selecciona el elemento para mostrar las vidas restantes.
    let carPosition = 200; // Posición inicial del coche (tercer carril).
    const laneWidth = 100; // Ancho de un carril.
    let obstacles = []; // Array para almacenar los obstáculos activos.
    let gameInterval; // Almacena el intervalo principal del juego.
    let lives = 3; // Número inicial de vidas del jugador.

    // Actualiza el contador de vidas
    function updateLives() {
        livesDisplay.textContent = `Vidas: ${lives}`; // Muestra las vidas restantes en la interfaz.
    }

    // Control del coche con las flechas izquierda y derecha
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" && carPosition > 0) { 
            carPosition -= laneWidth; // Mueve el coche al carril izquierdo si no está en el más extremo.
        } else if (event.key === "ArrowRight" && carPosition < 400) { 
            carPosition += laneWidth; // Mueve el coche al carril derecho si no está en el más extremo.
        }
        car.style.left = `${carPosition}px`; // Actualiza la posición visual del coche.
    });

    // Crear obstáculos asegurando siempre un carril libre
    function createObstacle() {
        const freeLane = Math.floor(Math.random() * 5); // Selecciona un carril aleatorio como libre.
        for (let i = 0; i < 5; i++) { // Recorre los 5 carriles posibles.
            if (i !== freeLane) { // Si el carril no es el libre:
                const obstacle = document.createElement("div"); // Crea un nuevo obstáculo.
                obstacle.classList.add("obstacle"); // Asigna la clase CSS "obstacle".
                obstacle.style.left = `${i * laneWidth}px`; // Posiciona el obstáculo en el carril correspondiente.
                obstacle.style.top = `0px`; // Comienza desde la parte superior del tablero.
                gameArea.appendChild(obstacle); // Añade el obstáculo al tablero del juego.
                obstacles.push(obstacle); // Lo almacena en el array de obstáculos activos.
            }
        }
    }

    // Mover obstáculos hacia abajo
    function moveObstacles() {
        obstacles.forEach((obstacle, index) => {
            let top = parseInt(obstacle.style.top); // Obtiene la posición vertical actual del obstáculo.

            if (top >= 400) { 
                // Si el obstáculo llega al final del tablero:
                obstacle.remove(); // Eliminar el obstáculo del DOM.
                obstacles.splice(index, 1); // Eliminarlo del array.
            } else {
                // De lo contrario, mueve el obstáculo hacia abajo de manera uniforme.
                obstacle.style.top = `${top + 20}px`; // Incremento de 20px para la posición vertical.
            }

            // Detectar colisión entre el coche y el obstáculo
            if (
                top > 300 && // Si el obstáculo está a la altura del coche...
                top < 350 && // ...y dentro de un rango de colisión...
                parseInt(obstacle.style.left) === carPosition // ...y está en el mismo carril:
            ) {
                obstacles.splice(index, 1); // Elimina el obstáculo tras la colisión.
                obstacle.remove(); // Elimina el obstáculo visualmente.
                lives -= 1; // Resta una vida al jugador.
                updateLives(); // Actualiza el contador visual de vidas.

                if (lives === 0) { 
                    // Si las vidas llegan a 0:
                    clearInterval(gameInterval); // Detiene el juego.
                    alert("¡Te quedaste sin vidas! Fin del juego.");
                    location.reload(); // Reinicia la página para comenzar de nuevo.
                }
            }
        });
    }

    // Lógica principal del juego
    function gameLoop() {
        if (Math.random() < 0.7) { // Genera obstáculos con una probabilidad del 70% en cada ciclo.
            setInterval(createObstacle(),6500); // Crea nuevos obstáculos.
        }
        moveObstacles(); // Mueve los obstáculos existentes.
    }

    // Iniciar el juego
    updateLives(); // Muestra el número inicial de vidas.
    gameInterval = setInterval(gameLoop, 800); // Ejecuta el bucle del juego cada 800ms.
});
