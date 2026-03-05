async function loadPlugins() {
  const res = await fetch("plugins.json");
  const plugins = await res.json();
  const grid = document.getElementById("pluginGrid");
  plugins.forEach(plugin => {
    const card = document.createElement("a");
    card.className = "plugin-card";
    card.href = plugin.url;
    card.target = "_blank";
    card.innerHTML = `
      <img src="${plugin.image}">
      <div class="plugin-content">
        <h3>${plugin.name}</h3>
        <p>${plugin.description}</p>
      </div>
    `;
    grid.appendChild(card);
  });
  updateArrows();
}

const grid = document.querySelector(".plugin-grid");
const btnLeft = document.querySelector(".scroll-btn.left");
const btnRight = document.querySelector(".scroll-btn.right");

function updateArrows() {
  const scrollLeft = grid.scrollLeft;
  const maxScroll = grid.scrollWidth - grid.clientWidth;

  btnLeft.style.opacity = scrollLeft > 1 ? "1" : "0";
  btnLeft.style.pointerEvents = scrollLeft > 1 ? "auto" : "none";

  btnRight.style.opacity = scrollLeft < maxScroll - 1 ? "1" : "0";
  btnRight.style.pointerEvents = scrollLeft < maxScroll - 1 ? "auto" : "none";
}

grid.addEventListener("scroll", updateArrows);
window.addEventListener("resize", updateArrows);

grid.addEventListener("wheel", (e) => {
  if (e.deltaY !== 0) {
    e.preventDefault();
    grid.scrollBy({ left: e.deltaY * 2, behavior: "smooth" });
  }
}, { passive: false });

btnLeft.onclick = () => {
  grid.scrollBy({ left: -350, behavior: "smooth" });
};

btnRight.onclick = () => {
  grid.scrollBy({ left: 350, behavior: "smooth" });
};

loadPlugins();