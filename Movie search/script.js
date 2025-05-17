const apiKey = "7c80de90"; // Correctly use just the API key
const searchInput = document.getElementById("searchInput");
const movieContainer = document.getElementById("movieContainer");

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      searchMovies(query);
    }
  }
});

function searchMovies(query) {
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)
    .then((response) => response.json())
    .then((data) => {
      movieContainer.innerHTML = "";

      if (data.Response === "True") {
        data.Search.forEach((movie) => {
          const card = document.createElement("div");
          card.className = "movie-card";

          card.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}" alt="${movie.Title}">
            <div class="movie-details">
              <h2>${movie.Title}</h2>
              <p><strong>Year:</strong> ${movie.Year}</p>
              <p><strong>Type:</strong> ${movie.Type}</p>
            </div>
          `;

          movieContainer.appendChild(card);
        });
      } else {
        movieContainer.innerHTML = `<p>Movie not found</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching movie information:", error);
      movieContainer.innerHTML = `<p>Error fetching data</p>`;
    });
}
