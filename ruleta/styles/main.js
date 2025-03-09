const numerosRuleta = [
    { numero: 0, color: "verde" },
    { numero: 32, color: "rojo" }, { numero: 15, color: "negro" },
    { numero: 19, color: "rojo" }, { numero: 4, color: "negro" },
    { numero: 21, color: "rojo" }, { numero: 2, color: "negro" },
    { numero: 25, color: "rojo" }, { numero: 17, color: "negro" },
    { numero: 34, color: "rojo" }, { numero: 6, color: "negro" },
    { numero: 27, color: "rojo" }, { numero: 13, color: "negro" },
    { numero: 36, color: "rojo" }, { numero: 11, color: "negro" },
    { numero: 30, color: "rojo" }, { numero: 8, color: "negro" },
    { numero: 23, color: "rojo" }, { numero: 10, color: "negro" },
    { numero: 5, color: "rojo" }, { numero: 24, color: "negro" },
    { numero: 16, color: "rojo" }, { numero: 33, color: "negro" },
    { numero: 1, color: "rojo" }, { numero: 20, color: "negro" },
    { numero: 14, color: "rojo" }, { numero: 31, color: "negro" },
    { numero: 9, color: "rojo" }, { numero: 22, color: "negro" },
    { numero: 18, color: "rojo" }, { numero: 29, color: "negro" },
    { numero: 7, color: "rojo" }, { numero: 28, color: "negro" },
    { numero: 12, color: "rojo" }, { numero: 35, color: "negro" },
    { numero: 3, color: "rojo" }, { numero: 26, color: "negro" }
];

let apuestas = [];

function generarNumeros() {
    const contenedor = document.getElementById("numeros");
    const radio = 110;

    numerosRuleta.forEach((item, index) => {
        const angulo = (index / numerosRuleta.length) * 2 * Math.PI;
        const x = Math.cos(angulo) * radio + 130; 
        const y = Math.sin(angulo) * radio + 130;

        const div = document.createElement("div");
        div.classList.add("numero", item.color);
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        div.textContent = item.numero;
        contenedor.appendChild(div);
    });
}

function agregarApuesta(tipo) {
    if (!apuestas.includes(tipo)) {
        apuestas.push(tipo);
        document.getElementById("apuestasRealizadas").textContent = `Apuestas: ${apuestas.join(", ")}`;
    }
}

function girarRuleta() {
    const numeroGanador = numerosRuleta[Math.floor(Math.random() * numerosRuleta.length)];
    const bola = document.getElementById("bola");

    // Animación de la bola girando en círculo
    let angulo = Math.random() * 2 * Math.PI; // Ángulo inicial aleatorio
    let vueltas = Math.floor(Math.random() * 5) + 5; // De 5 a 10 vueltas
    let velocidad = 0.3; // Velocidad inicial

    function animarBola() {
        if (vueltas > 0 || velocidad > 0.002) {
            angulo += velocidad;
            if (angulo >= 2 * Math.PI) {
                angulo = 0;
                vueltas--;
            }

            let radioBola = 80; // Radio del círculo donde gira la bola
            let x = Math.cos(angulo) * radioBola + 130;
            let y = Math.sin(angulo) * radioBola + 130;

            bola.style.left = `${x}px`;
            bola.style.top = `${y}px`;

            velocidad *= 0.98; // Reducir velocidad para simular frenado

            requestAnimationFrame(animarBola);
        } else {
            setTimeout(() => colocarBolaEnGanador(numeroGanador), 500);
        }
    }

    animarBola();

    document.getElementById("resultado").textContent =
        `El número ganador es ${numeroGanador.numero} (${numeroGanador.color})`;

    apuestas = []; // Reinicia apuestas después del giro
}

function colocarBolaEnGanador(numeroGanador) {
    const numeros = document.querySelectorAll(".numero");
    const bola = document.getElementById("bola");

    let candidato = numeros[Math.floor(Math.random() * numeros.length)]; // Elegimos un número aleatorio cercano
    let intentos = 0;

    // Asegurar que la bola caiga en el número ganador o cerca de él
    while (parseInt(candidato.textContent) !== numeroGanador.numero && intentos < 5) {
        candidato = numeros[Math.floor(Math.random() * numeros.length)];
        intentos++;
    }

    const rect = candidato.getBoundingClientRect();
    const ruletaRect = document.querySelector(".ruleta").getBoundingClientRect();
    
    let x = rect.left - ruletaRect.left + rect.width / 2;
    let y = rect.top - ruletaRect.top + rect.height / 2;

    bola.style.transition = "top 0.5s ease-out, left 0.5s ease-out";
    bola.style.left = `${x}px`;
    bola.style.top = `${y}px`;
}

window.onload = generarNumeros;
