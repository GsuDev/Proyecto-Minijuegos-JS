document.addEventListener("DOMContentLoaded", () => {
    const gameArea = document.getElementById("gameArea");
    const car = document.getElementById("car");
    let carPosition = 200; // Posición inicial del coche
    const laneWidth = 100;
    let obstacles = [];
    let gameInterval;

    // Control del coche con las flechas
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" && carPosition > 0) {
            carPosition -= laneWidth;
        } else if (event.key === "ArrowRight" && carPosition < 400) {
            carPosition += laneWidth;
        }
        car.style.left = `${carPosition}px`;
    });

    // Crear obstáculos en carriles aleatorios con tamaño uniforme
    function createObstacle() {
        const obstacle = document.createElement("div");
        obstacle.classList.add("obstacle");
        obstacle.style.left = `${[0, 100, 200, 300, 400][Math.floor(Math.random() * 5)]}px`;
        obstacle.style.top = `0px`; // Empieza desde la parte superior
        gameArea.appendChild(obstacle);
        obstacles.push(obstacle);
    }

    // Mover obstáculos de manera lineal
    function moveObstacles() {
        obstacles.forEach((obstacle, index) => {
            let top = parseInt(obstacle.style.top);
            if (top >= 400) {
                obstacle.remove();
                obstacles.splice(index, 1);
            } else {
                // Movimiento uniforme
                obstacle.style.top = `${top + 20}px`;
            }

            // Detectar colisión
            if (
                top > 300 &&
                top < 350 &&
                parseInt(obstacle.style.left) === carPosition
            ) {
                clearInterval(gameInterval);
                alert("¡Has chocado! Fin del juego.");
                location.reload();
            }
        });

        // Asegurar que no haya obstáculos alineados sin espacio
        for (let i = 0; i < obstacles.length - 1; i++) {
            const currentObstacle = obstacles[i];
            const nextObstacle = obstacles[i + 1];
            const currentLeft = parseInt(currentObstacle.style.left);
            const nextLeft = parseInt(nextObstacle.style.left);

            // Si están en el mismo carril y cerca, mover uno de ellos
            if (Math.abs(currentLeft - nextLeft) < 100) {
                nextObstacle.style.left = `${[0, 100, 200, 300, 400].filter(
                    (pos) => pos !== currentLeft
                )[Math.floor(Math.random() * 4)]}px`;
            }
        }
    }


    // Lógica principal del juego
    function gameLoop() {
        if (Math.random() < 0.7) { // Probabilidad de crear un nuevo obstáculo
            createObstacle();
        }
        moveObstacles();
    }

    // Iniciar el juego
    gameInterval = setInterval(gameLoop, 800); // Velocidad del bucle del juego
});