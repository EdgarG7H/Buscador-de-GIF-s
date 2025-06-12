let offset = 0;
const limite = 9;

function buscarGIFs() {
  offset = 0;
  cargarGIFs();
}

function paginaSiguiente() {
  offset += limite;
  cargarGIFs();
}

function paginaAnterior() {
  if (offset >= limite) {
    offset -= limite;
    cargarGIFs();
  }
}

function cargarGIFs() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  const apiKey = "T7vqS61zYIm6IkP2JKdXTlVuZgaXQYIf";
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=${limite}&offset=${offset}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const gifContainer = document.getElementById("gifContainer");
      gifContainer.innerHTML = "";

      data.data.forEach(gif => {
        const img = document.createElement("img");
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        gifContainer.appendChild(img);
      });

  
      const prevButton = document.getElementById("prevPage");
      const pageNumber = document.getElementById("pageNumber");

      const currentPage = Math.floor(offset / limite) + 1;
      pageNumber.textContent = `Página ${currentPage}`;
      prevButton.style.display = offset === 0 ? "none" : "inline-block";
    })
    .catch(error => {
      console.error("Error al cargar los GIFs:", error);
    });
}
