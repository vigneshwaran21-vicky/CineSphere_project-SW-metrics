/* Live Movie Details Logic */
document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id');

    if (!movieId) {
        window.location.href = 'index.html';
        return;
    }

    // Fetch live movie using imported api.js routine
    const movie = await apiGetMovie(movieId);
    
    if (movie && !movie.error && !movie.message) {
        document.title = `${movie.title} | CineMatch`;
        document.getElementById('detailTitle').textContent = movie.title;
        document.getElementById('detailPoster').src = movie.image_url;
        document.getElementById('detailYear').textContent = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
        document.getElementById('detailDuration').textContent = "120 min";
        document.getElementById('detailGenre').textContent = movie.genre || "Feature Film";
        document.getElementById('detailRating').textContent = movie.rating;
        document.getElementById('detailDescription').textContent = movie.description;
        document.getElementById('detailDirector').textContent = movie.director || "Official Studio";
        if (Array.isArray(movie.cast) && movie.cast.length > 0) {
            const castContainer = document.getElementById('detailCast');
            castContainer.innerHTML = '';
            movie.cast.forEach(actor => {
                const actorName = typeof actor === 'object' ? actor.name : actor;
                const actorId = typeof actor === 'object' ? actor.id : actor;
                const badge = document.createElement('span');
                badge.className = 'badge glass-card';
                badge.style.cursor = 'pointer';
                badge.style.marginRight = '8px';
                badge.style.marginBottom = '8px';
                badge.style.display = 'inline-block';
                badge.innerHTML = `<i class="fas fa-user text-primary"></i> ${actorName}`;
                badge.onclick = () => {
                    if (typeof UI !== 'undefined' && UI.openActorModal) {
                        UI.openActorModal(actorId);
                    }
                };
                castContainer.appendChild(badge);
            });
        } else if (movie.cast) {
            const castContainer = document.getElementById('detailCast');
            castContainer.innerHTML = '';
            const names = (typeof movie.cast === 'string' ? movie.cast : 'Featured Cast').split(',');
            names.forEach(name => {
                const cleanName = name.trim();
                const badge = document.createElement('span');
                badge.className = 'badge glass-card';
                badge.style.cursor = 'pointer';
                badge.style.marginRight = '8px';
                badge.style.marginBottom = '8px';
                badge.style.display = 'inline-block';
                badge.innerHTML = `<i class="fas fa-user text-primary"></i> ${cleanName}`;
                badge.onclick = () => {
                    if (typeof UI !== 'undefined' && UI.openActorModal) {
                        UI.openActorModal(cleanName);
                    }
                };
                castContainer.appendChild(badge);
            });
        }

        const backdrop = document.getElementById('movieBackdrop');
        const bgUrl = movie.backdrop_url || movie.image_url;
        backdrop.style.backgroundImage = `linear-gradient(rgba(18, 18, 18, 0.75), rgba(18, 18, 18, 1)), url('${bgUrl}')`;

        // Record interaction in watch history recommendation engine
        if (typeof CineRec !== 'undefined') {
            CineRec.recordInteraction(movie);
            apiGetMovies().then(allMovies => {
                if (allMovies && allMovies.length > 0) {
                    const similar = CineRec.getPersonalizedRecommendations(allMovies);
                    UI.renderMovieGrid('similarMovies', similar.slice(0, 6));
                }
            });
        }

        // Poster download link
        const downloadPosterBtn = document.getElementById('downloadPosterBtn');
        if (downloadPosterBtn) {
            downloadPosterBtn.href = movie.image_url;
            downloadPosterBtn.setAttribute('download', `${movie.title.replace(/\s+/g, '_')}_Poster.jpg`);
        }



        // Watch Trailer Button
        const watchTrailerBtn = document.getElementById('watchTrailerBtn');
        if (watchTrailerBtn) {
            watchTrailerBtn.addEventListener('click', async () => {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    if (typeof UI !== 'undefined' && UI.showAuthAlert) UI.showAuthAlert('Watch HD Trailers');
                    return;
                }
                const trailers = await apiGetMovieTrailers(movieId);
                if (trailers && trailers.length > 0) {
                    UI.openTrailerModal(trailers[0].key, movie.title);
                } else {
                    UI.showToast('No official YouTube trailer available for this film.', 'info');
                }
            });
        }
    } else {
        document.title = "Movie Unavailable";
        document.getElementById('detailTitle').textContent = "Movie Unavailable";
        document.getElementById('detailDescription').textContent = "This movie could not be loaded from the live API.";
    }
});

