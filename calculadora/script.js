let numeroActual = "0";
let numeroAnterior = "";
let operacionActual = "";
let esperandoNuevoNumero = false;

const pantalla = document.getElementById("pantalla");

function actualizarPantalla() {
  pantalla.textContent = numeroActual;
  pantalla.style.color = numeroActual === "Error" ? "#ff8f8f" : "white";
}

function agregarNumero(numero) {
  if (numeroActual === "Error") {
    numeroActual = numero === "." ? "0." : numero;
    esperandoNuevoNumero = false;
  } else if (esperandoNuevoNumero) {
    numeroActual = numero === "." ? "0." : numero;
    esperandoNuevoNumero = false;
  } else if (numero === ".") {
    if (!numeroActual.includes(".")) {
      numeroActual += ".";
    }
  } else {
    numeroActual = numeroActual === "0" ? numero : numeroActual + numero;
  }
  actualizarPantalla();
}

function operacion(op) {
  if (numeroActual === "Error") return;
  if (numeroAnterior !== "" && !esperandoNuevoNumero) {
    calcular();
  }
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

document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") agregarNumero(e.key);
  else if (e.key === ".") agregarNumero(".");
  else if (e.key === "+") operacion("+");
  else if (e.key === "-") operacion("-");
  else if (e.key === "*") operacion("*");
  else if (e.key === "/") { e.preventDefault(); operacion("/"); }
  else if (e.key === "Enter" || e.key === "=") { e.preventDefault(); calcular(); }
  else if (e.key === "Escape") limpiar();
});

actualizarPantalla();