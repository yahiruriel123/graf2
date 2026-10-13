/* =========================================================
   Dibujos adaptados de Khan Academy (ProcessingJS) a p5.js
   El código de cada dibujo se conserva tal cual lo escribí
   en Khan Academy; la función crearSketch() lo ejecuta dentro
   de una instancia de p5 (modo instancia) para poder mostrar
   varios lienzos en la misma página.
   ========================================================= */

const DIBUJOS = [
  {
    id: "rana",
    titulo: "Rana",
    descripcion: "Una rana verde hecha con elipses. Las variables x e y permiten mover toda la rana cambiando solo dos números.",
    codigo: `var x = 200;
var y = 250;

noStroke();
fill(30, 204, 91); // a nice froggy green!

ellipse(x, y, 200, 100); // face
ellipse(x - 50, y - 50, 40, 40); // left eye socket
ellipse(x + 50, y - 50, 40, 40); // right eye socket

fill(255, 255, 255); // for the whites of the eyes!
ellipse(x - 50, y - 50, 30, 30); // left eyeball
ellipse(x + 50, y - 50, 30, 30); // right eyeball

fill(0, 0, 0);
ellipse(x, y, 120, 60);

rect(x - 55, y - 55, 10, 10);
rect(x + 45, y - 55, 10, 10);`
  },
  {
    id: "conejo",
    titulo: "Dientes de conejo",
    descripcion: "Un conejo con orejas largas, ojos, boca y dientes. Usa la variable xd para el largo de los dientes y noFill() para dejarlos sin color.",
    codigo: `// The snowman
fill(250, 247, 237);
ellipse(200, 300, 150, 150);
ellipse(200, 200, 100, 100);
ellipse(200, 120, 75, 75);

ellipse(150, 70, 60, 120);  // left ear
ellipse(240, 70, 60, 120);  // right ear

ellipse(200, 170, 150, 150);    // face

var eveSize = 20;

fill(0, 0, 0);
ellipse(170, 150, eveSize, eveSize);  // left eye
ellipse(230, 150, eveSize, eveSize);  // right eye

line(150, 200, 250, 200);   // mouth

var xd = 30;
noFill();
rect(185, 200, 15, xd); // left tooth
rect(200, 200, 15, xd); // right tooth`
  },
  {
    id: "cena",
    titulo: "¿Qué hay de cena?",
    descripcion: "Tres círculos apilados y dos líneas a modo de brazos de ramita.",
    codigo: `ellipse(200, 300, 150, 150);
ellipse(200, 200, 100, 100);
ellipse(200, 120, 75, 75);
line(160, 200, 100, 100);
line(240, 200, 300, 70);`
  },
  {
    id: "dia-nevado",
    titulo: "Día nevado soleado",
    descripcion: "Una escena completa: cielo azul, pasto verde, un sol amarillo y el muñeco de nieve. Muestra la importancia del orden de dibujo.",
    codigo: `// The ground
background(0, 234, 255);
fill(0, 255, 9);
rect(0, 300, 400, 100);

// The sun
fill(255, 196, 0);
ellipse(80, 64, 100, 100);

// The snowman
fill(250, 247, 237);
ellipse(200, 300, 150, 150);
ellipse(200, 200, 100, 100);
ellipse(200, 120, 75, 75);`
  },
  {
    id: "muneco",
    titulo: "Muñeco de nieve",
    descripcion: "El muñeco clásico con tres elipses y una franja rectangular que representa el suelo.",
    codigo: `ellipse(200, 300, 150, 150);
ellipse(200, 200, 100, 100);
ellipse(200, 125, 75, 75);
rect(0, 350, 400, 50);`
  }
];

/**
 * Crea un sketch p5 (modo instancia) a partir del código de Khan Academy.
 * Se usa `with(p)` para que funciones como ellipse(), rect(), fill()...
 * se resuelvan sobre la instancia p5 sin tener que escribir "p." delante.
 */
function crearSketch(codigo) {
  const ejecutar = new Function("p", "with (p) {\n" + codigo + "\n}");
  return function (p) {
    p.setup = function () {
      p.createCanvas(400, 400);
      p.noLoop();               // dibujo estático: se ejecuta una sola vez
    };
    p.draw = function () {
      p.background(255);        // fondo blanco, como en Khan Academy
      ejecutar(p);
    };
  };
}
