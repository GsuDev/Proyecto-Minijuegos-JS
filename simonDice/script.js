var cuadrados = document.querySelectorAll(".cuadrado >*"); //Hijos de la clase cuadrado
var ordenCorrecto = [];
var correcto = [];
var contador = 1;

function mostrarAlerta(mensaje) {
  const alerta = document.createElement('div');
  alerta.classList.add('alerta'); // Agrega la clase 'alerta' al css
  alerta.textContent = mensaje;
  document.body.appendChild(alerta);

  setTimeout(() => {
    alerta.remove();
  }, 5000); // La alerta desaparece después de 5 segundos
}
function jugada1() {
  mostrarAlerta("JUGADA-" + contador);
  var rondaContador = document.getElementById("ronda")
  rondaContador.innerHTML = "Ronda: " + contador
  ordenCorrecto = []; // Reinicia la lista correcta para cada nueva jugada
  correcto = []; // Reinicia la lista de selecciones correctas del usuario

  for (let i = 0; i < contador; i++) {
    let cuadradoRandom = cuadrados[Math.floor(Math.random() * cuadrados.length)];
    ordenCorrecto.push(cuadradoRandom); // Añade el cuadrado random a la lista de los correctos

    setTimeout(function () {
      cuadradoRandom.style.visibility = "hidden";
    }, 1000 * (i + 1)); // Asegura que se oculte primero

    setTimeout(function () {
      cuadradoRandom.style.visibility = "visible";
    }, 1000 * (i + 1) + 500); // Luego se hace visible
  }
  listeners(); // Añade los listeners después de mostrar la jugada
}

function listeners() {
  for (let i = 0; i < cuadrados.length; i++) {
    cuadrados[i].addEventListener("click", manejarClic);
  }
}

function manejarClic(event) {
  let cuadradoSeleccionado = event.target;
  correcto.push(cuadradoSeleccionado);

  if (correcto.length === ordenCorrecto.length) {
    check();
  }
}
function check() {
  let esCorrecto = true;
  for (let i = 0; i < correcto.length; i++) {
    if (correcto[i] !== ordenCorrecto[i]) {
      esCorrecto = false;
      break;
    }
  }

  if (!esCorrecto) {
    mostrarAlerta("¡Perdiste!");
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  } else {
    mostrarAlerta("¡GANASTE!");
    contador++;
    setTimeout(jugada1, 1000); // Añadir una pequeña pausa antes de la siguiente ronda
  }
}

jugada1();
