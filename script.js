let numeroActual = "0";
let numeroAnterior = "";
let operacionActual = "";
let esperandoNuevoNumero = false;

const pantalla = document.getElementById("pantalla");
const listaHistorial = document.getElementById("lista-historial");

function actualizarPantalla() {
  pantalla.textContent = numeroActual;
  pantalla.style.color = numeroActual === "Error" ? "#ff8f8f" : "white";
}

function agregarNumero(numero) {
  if (numeroActual === "Error" || esperandoNuevoNumero) {
    numeroActual = numero === "." ? "0." : numero;
    esperandoNuevoNumero = false;
  } else if (numero === ".") {
    if (!numeroActual.includes(".")) numeroActual += ".";
  } else {
    numeroActual = numeroActual === "0" ? numero : numeroActual + numero;
  }
  actualizarPantalla();
}

function borrar() {
  if (numeroActual === "Error" || esperandoNuevoNumero) return;
  numeroActual = numeroActual.length > 1 ? numeroActual.slice(0, -1) : "0";
  actualizarPantalla();
}

function operacion(op) {
  if (numeroActual === "Error") return;
  if (numeroAnterior !== "" && !esperandoNuevoNumero) calcular();
  operacionActual = op;
  numeroAnterior = numeroActual;
  esperandoNuevoNumero = true;
}

function calcular() {
  if (operacionActual === "") return;

  const anterior = parseFloat(numeroAnterior);
  const actual = parseFloat(numeroActual);
  if (isNaN(anterior) || isNaN(actual)) return;

  let resultado;
  switch (operacionActual) {
    case "+": resultado = anterior + actual; break;
    case "-": resultado = anterior - actual; break;
    case "*": resultado = anterior * actual; break;
    case "/":
      if (actual === 0) {
        numeroActual = "Error";
        operacionActual = "";
        numeroAnterior = "";
        esperandoNuevoNumero = true;
        actualizarPantalla();
        return;
      }
      resultado = anterior / actual;
      break;
    default: return;
  }

  // Añadir al historial
  const li = document.createElement("li");
  li.textContent = `${anterior} ${operacionActual === '*' ? '×' : operacionActual === '/' ? '÷' : operacionActual} ${actual} = ${resultado}`;
  listaHistorial.prepend(li); // prepend lo pone arriba del todo

  numeroActual = resultado.toString();
  operacionActual = "";
  numeroAnterior = "";
  esperandoNuevoNumero = true;
  actualizarPantalla();
}

function limpiar() {
  numeroActual = "0";
  numeroAnterior = "";
  operacionActual = "";
  esperandoNuevoNumero = false;
  actualizarPantalla();
}

// Soporte Teclado
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") agregarNumero(e.key);
  else if (e.key === ".") agregarNumero(".");
  else if (e.key === "+") operacion("+");
  else if (e.key === "-") operacion("-");
  else if (e.key === "*") operacion("*");
  else if (e.key === "/") { e.preventDefault(); operacion("/"); }
  else if (e.key === "Enter" || e.key === "=") { e.preventDefault(); calcular(); }
  else if (e.key === "Backspace") { e.preventDefault(); borrar(); } // Backspace por teclado
  else if (e.key === "Escape") limpiar();
});

actualizarPantalla();
