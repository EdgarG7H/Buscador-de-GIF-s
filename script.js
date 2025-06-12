let offset = 0;

function buscarGIFs() {
  offset = 0;
  cargarGIFs();
}

function paginaSiguiente() {
  offset += 9;
  cargarGIFs();
}

function cargarGIFs() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  const apiKey = "T7vqS61zYIm6IkP2JKdXTlVuZgaXQYIf"; // Reemplaza esto con tu propia API key de Giphy
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=9&offset=${offset}`;

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
    })
    .catch(error => {
      console.error("Error al cargar los GIFs:", error);
    });
}
