/* UI Utility Functions */
const UI = {
    renderMovieCard(movie) {
        const langBadge = movie.original_language ? `<span class="open-license-badge" style="border-color:var(--primary-color);">${movie.original_language}</span>` : '';

        return `
            <div class="movie-card">
                <div class="movie-poster-wrapper" style="position:relative; overflow:hidden; border-radius:12px;" onclick="window.location.href='movie-details.html?id=${movie.id}'">
                    <img src="${movie.image_url}" alt="${movie.title}" class="movie-poster" style="cursor:pointer; transition: transform 0.3s ease, filter 0.3s ease;" onmouseenter="this.style.transform='scale(1.05)'; this.style.filter='brightness(1.15)';" onmouseleave="this.style.transform='scale(1)'; this.style.filter='brightness(1)';">
                    <div class="movie-rating">
                        <i class="fas fa-star text-primary"></i>
                        <span>${movie.rating}/10</span>
                    </div>
                    ${langBadge}
                </div>
                <div class="movie-info">
                    <h3 onclick="window.location.href='movie-details.html?id=${movie.id}'" style="cursor:pointer;" title="${movie.title}">${movie.title.length > 20 ? movie.title.substring(0, 20) + '...' : movie.title}</h3>
                    <div class="movie-meta">
                        <span style="color:var(--text-muted); font-size:12px;">${movie.genre ? movie.genre.split(', ')[0] : 'Feature Film'} &bull; ${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
                    </div>
                    <div class="movie-card-actions" style="margin-top: 12px;">
                        <a href="movie-details.html?id=${movie.id}" class="btn btn-primary" style="width:100%; font-size:14px; font-weight:600; text-align:center; padding: 11px 16px; border-radius:8px; display:inline-flex; align-items:center; justify-content:center; gap:8px; box-shadow: 0 4px 12px rgba(245,197,24,0.25); transition: all 0.3s ease;">
                            <i class="fas fa-info-circle" style="font-size:15px;"></i> View Details
                        </a>
                    </div>
                </div>
            </div>
        `;
    },

    renderMovieGrid(containerId, movies) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (!movies || movies.length === 0) {
            container.innerHTML = '<p class="text-muted" style="width:100%; text-align:center; padding: 40px;">No movies found in Live API database.</p>';
            return;
        }

        container.innerHTML = movies.map(movie => this.renderMovieCard(movie)).join('');
    },

    showToast(message, type = 'info') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'error') icon = 'exclamation-circle';

        toast.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
};
