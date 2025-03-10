document.addEventListener("DOMContentLoaded", () => {
    const gameArea = document.getElementById("gameArea");
    const car = document.getElementById("car");
    const livesDisplay = document.getElementById("lives");
    let carPosition = 200; // Posición inicial del coche
    const laneWidth = 100; // Ancho de un carril
    let obstacles = []; // Array para almacenar los obstáculos activos
    let speed = 14; // Velocidad inicial de los obstáculos
    let initialObstacleDelay = 2000; // Tiempo inicial entre la creación de obstáculos
    let delayReductionPerRound = 300; // Reducción del tiempo entre obstáculos por ronda
    let obstaclesPerRound = 12; // Obstáculos iniciales
    let additionalObstaclesPerRound = 4; // Obstáculos extra por ronda
    let round = 1; // Número de la ronda actual
    let maxRounds = 5; // Número máximo de rondas
    let lives = 3; // Vidas iniciales
    let gameInterval; // Intervalo para mover obstáculos
    let obstacleCreationTimeouts = []; // Para rastrear los tiempos de creación de obstáculos

    // Actualizar el contador de vidas y rondas
    function updateStatus() {
        livesDisplay.textContent = `Vidas: ${lives} | Ronda: ${round}`;
    }

    // Control del coche con las flechas izquierda y derecha
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" && carPosition > 0) {
            carPosition -= laneWidth; // Mueve el coche al carril izquierdo
        } else if (event.key === "ArrowRight" && carPosition < 400) {
            carPosition += laneWidth; // Mueve el coche al carril derecho
        }
        car.style.left = `${carPosition}px`; // Actualiza la posición visual del coche
    });

    // Crear un obstáculo en un carril aleatorio
    function createObstacle() {
        const obstacle = document.createElement("div");
        obstacle.classList.add("obstacle");
        obstacle.style.left = `${[0, 100, 200, 300, 400][Math.floor(Math.random() * 5)]}px`; // Carril aleatorio
        obstacle.style.top = `-50px`; // Aparece justo por encima del área visible
        gameArea.appendChild(obstacle);
        obstacles.push(obstacle);
    }

    // Crear un conjunto de obstáculos para la ronda
    function createObstaclesForRound(totalObstacles, delay) {
        for (let i = 0; i < totalObstacles; i++) {
            const timeout = setTimeout(() => createObstacle(), i * delay);
            obstacleCreationTimeouts.push(timeout); // Rastrear los tiempos para poder limpiarlos
        }
    }

    // Mover obstáculos en cada ciclo
    function moveObstacles() {
        obstacles.forEach((obstacle, index) => {
            let top = parseInt(obstacle.style.top);

            // Si el obstáculo sale del tablero, elimínalo
            if (top >= 400) {
                obstacle.remove();
                obstacles.splice(index, 1);
            } else {
                obstacle.style.top = `${top + speed}px`; // Movimiento hacia abajo
            }

            // Detectar colisión
            if (
                top > 300 &&
                top < 350 &&
                parseInt(obstacle.style.left) === carPosition
            ) {
                obstacles.splice(index, 1); // Elimina el obstáculo tras colisión
                obstacle.remove();
                lives -= 1; // Restar una vida al jugador
                updateStatus(); // Actualizar visualmente

                if (lives === 0) {
                    endGame("¡Te quedaste sin vidas! Fin del juego."); // Termina el juego
                }
            }
        });

        // Si no quedan obstáculos y la ronda no ha terminado, pasar a la siguiente ronda
        if (obstacles.length === 0 && round <= maxRounds) {
            nextRound();
        }
    }

    // Terminar el juego
    function endGame(message) {
        clearInterval(gameInterval); // Detiene el movimiento de obstáculos
        obstacleCreationTimeouts.forEach(clearTimeout); // Detener la creación de nuevos obstáculos
        alert(message);
        location.reload(); // Reinicia el juego
    }

    // Pasar a la siguiente ronda
    function nextRound() {
        round += 1; // Incrementar la ronda
        if (round > maxRounds) {
            endGame("¡Felicidades, ganaste el juego!"); // Si pasa el máximo de rondas
        } else {
            speed += 7; // Incrementar la velocidad
            const newDelay = Math.max(initialObstacleDelay - delayReductionPerRound * (round - 1), 500); // Reducir el tiempo entre obstáculos
            const totalObstacles = obstaclesPerRound + (round - 1) * additionalObstaclesPerRound; // Calcular el número de obstáculos para la ronda
            createObstaclesForRound(totalObstacles, newDelay); // Crear obstáculos para la nueva ronda
            updateStatus(); // Actualizar visualmente
        }
    }

    // Iniciar el juego
    function startGame() {
        updateStatus(); // Mostrar las vidas y la ronda iniciales
        const totalObstacles = obstaclesPerRound; // Número inicial de obstáculos
        createObstaclesForRound(totalObstacles, initialObstacleDelay); // Crear los obstáculos iniciales
        gameInterval = setInterval(moveObstacles, 50); // Mover obstáculos cada 50ms
    }

    startGame(); // Arranca el juego
});

