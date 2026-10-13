/* Construye la galería, el menú responsivo y la demo con canvas nativo */

// 1) Galería: una tarjeta por dibujo
const galeria = document.getElementById("galeria");

DIBUJOS.forEach((d, i) => {
  const art = document.createElement("article");
  art.className = "proyecto";
  art.id = d.id;

  const lienzo = document.createElement("div");
  lienzo.className = "lienzo";
  lienzo.id = "lienzo-" + d.id;

  const info = document.createElement("div");
  info.className = "info";
  info.innerHTML = `<h3>${i + 1}. ${d.titulo}</h3><p>${d.descripcion}</p>
    <details open><summary>Ver código</summary><pre><code></code></pre></details>`;
  info.querySelector("code").textContent = d.codigo;   // textContent evita interpretar HTML

  art.append(lienzo, info);
  galeria.appendChild(art);

  new p5(crearSketch(d.codigo), lienzo);              // modo instancia
});

// 2) Demo con canvas nativo (sin p5.js)
(function () {
  const ctx = document.getElementById("demo-nativo").getContext("2d");
  ctx.fillStyle = "#cfeeff"; ctx.fillRect(0, 0, 300, 300);
  ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 270, 300, 30);
  ctx.strokeStyle = "#000"; ctx.lineWidth = 2;
  function circulo(x, y, d) {
    ctx.beginPath();
    ctx.arc(x, y, d / 2, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
  }
  circulo(150, 220, 110);
  circulo(150, 140, 75);
  circulo(150, 85, 55);
})();

// 3) Menú móvil
const menu = document.getElementById("menu");
document.getElementById("menu-btn").addEventListener("click", () => menu.classList.toggle("open"));
menu.addEventListener("click", e => { if (e.target.tagName === "A") menu.classList.remove("open"); });

// 4) Resaltar el enlace de la sección visible
const enlaces = [...menu.querySelectorAll("a")];
const observer = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      enlaces.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("main section[id], .proyecto").forEach(s => observer.observe(s));

// 5) Árbol DOM real: recorre document.body (máx. 4 niveles)
document.getElementById("btn-dom").addEventListener("click", () => {
  const salida = document.getElementById("dom-vivo");
  const lineas = [];
  function recorrer(nodo, nivel) {
    if (nivel > 4) return;
    let etiqueta = nodo.tagName.toLowerCase();
    if (nodo.id) etiqueta += "#" + nodo.id;
    if (nodo.classList.length) etiqueta += "." + [...nodo.classList].join(".");
    lineas.push("  ".repeat(nivel) + "<" + etiqueta + ">  (" + nodo.children.length + " hijos)");
    [...nodo.children].forEach(h => recorrer(h, nivel + 1));
  }
  recorrer(document.body, 0);
  salida.querySelector("code").textContent = lineas.join("\n");
  salida.hidden = false;
});
