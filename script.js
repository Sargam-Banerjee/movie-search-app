const API_KEY = 'e98479a6';

document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = document.getElementById('search-input').value.trim();

    if (!query) {
        document.getElementById('results').innerHTML = `<p>Please enter a movie title to search.</p>`;
        return;
    }

    document.getElementById('results').innerHTML = `<p>Loading...</p>`;

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            document.getElementById('results').innerHTML = `<p>${data.Error}</p>`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('results').innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    }
});

function displayMovies(movies) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-card');
        movieElement.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Poster'}" alt="${movie.Title} Poster">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;
        resultsContainer.appendChild(movieElement);
    });
}