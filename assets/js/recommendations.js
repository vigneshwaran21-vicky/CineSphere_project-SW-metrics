/* CineMatch AI & History-Based Movie Recommendation Engine */
const CineRec = {
    historyKey: 'cinematch_watch_history',
    prefKey: 'cinematch_user_prefs',

    // Record user watch / click interaction
    recordInteraction(movie) {
        if (!movie || !movie.id) return;
        
        let history = this.getWatchHistory();
        // Remove duplicate if exists
        history = history.filter(item => item.id !== movie.id);
        
        // Add to beginning of history
        history.unshift({
            id: movie.id,
            title: movie.title,
            genre: movie.genre || 'Feature Film',
            language: movie.original_language || 'EN',
            timestamp: Date.now()
        });

        // Keep last 20 interactions
        if (history.length > 20) history = history.slice(0, 20);
        
        localStorage.setItem(this.historyKey, JSON.stringify(history));
        this.updateUserPreferences(history);
    },

    getWatchHistory() {
        try {
            return JSON.parse(localStorage.getItem(this.historyKey)) || [];
        } catch(e) {
            return [];
        }
    },

    // Analyze watch history to calculate top favorite genres & languages
    updateUserPreferences(history) {
        const genreCounts = {};
        const langCounts = {};

        history.forEach(item => {
            if (item.genre) {
                const genres = item.genre.split(', ');
                genres.forEach(g => {
                    genreCounts[g] = (genreCounts[g] || 0) + 1;
                });
            }
            if (item.language) {
                langCounts[item.language] = (langCounts[item.language] || 0) + 1;
            }
        });

        const prefs = {
            topGenres: Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]).slice(0, 3),
            topLanguages: Object.keys(langCounts).sort((a, b) => langCounts[b] - langCounts[a]).slice(0, 2)
        };

        localStorage.setItem(this.prefKey, JSON.stringify(prefs));
        return prefs;
    },

    getUserPreferences() {
        try {
            return JSON.parse(localStorage.getItem(this.prefKey)) || { topGenres: [], topLanguages: [] };
        } catch(e) {
            return { topGenres: [], topLanguages: [] };
        }
    },

    // AI scoring algorithm to rank candidate movies based on watch history match
    getPersonalizedRecommendations(allMovies) {
        if (!allMovies || allMovies.length === 0) return [];
        
        const history = this.getWatchHistory();
        const prefs = this.getUserPreferences();
        const watchedIds = new Set(history.map(h => h.id));

        const scored = allMovies.map(movie => {
            let score = 0;
            
            // Penalty if already watched recently
            if (watchedIds.has(movie.id)) {
                score -= 5;
            }

            // Genre match score
            if (movie.genre) {
                const movieGenres = movie.genre.split(', ');
                prefs.topGenres.forEach((g, index) => {
                    if (movieGenres.includes(g)) {
                        score += (3 - index) * 2; // Higher weight for top 1 genre
                    }
                });
            }

            // Language match score
            if (movie.original_language && prefs.topLanguages.includes(movie.original_language)) {
                score += 3;
            }

            // Rating score boost
            if (movie.rating) {
                score += (parseFloat(movie.rating) / 2);
            }

            return { movie, score };
        });
/* CineMatch AI & History-Based Movie Recommendation Engine */
const CineRec = {
    historyKey: 'cinematch_watch_history',
    prefKey: 'cinematch_user_prefs',

    // Record user watch / click interaction
    recordInteraction(movie) {
        if (!movie || !movie.id) return;
        
        let history = this.getWatchHistory();
        // Remove duplicate if exists
        history = history.filter(item => item.id !== movie.id);
        
        // Add to beginning of history
        history.unshift({
            id: movie.id,
            title: movie.title,
            genre: movie.genre || 'Feature Film',
            language: movie.original_language || 'EN',
            timestamp: Date.now()
        });

        // Keep last 20 interactions
        if (history.length > 20) history = history.slice(0, 20);
        
        localStorage.setItem(this.historyKey, JSON.stringify(history));
        this.updateUserPreferences(history);
    },

    getWatchHistory() {
        try {
            return JSON.parse(localStorage.getItem(this.historyKey)) || [];
        } catch(e) {
            return [];
        }
    },

    // Analyze watch history to calculate top favorite genres & languages
    updateUserPreferences(history) {
        const genreCounts = {};
        const langCounts = {};

        history.forEach(item => {
            if (item.genre) {
                const genres = item.genre.split(', ');
                genres.forEach(g => {
                    genreCounts[g] = (genreCounts[g] || 0) + 1;
                });
            }
            if (item.language) {
                langCounts[item.language] = (langCounts[item.language] || 0) + 1;
            }
        });

        const prefs = {
            topGenres: Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]).slice(0, 3),
            topLanguages: Object.keys(langCounts).sort((a, b) => langCounts[b] - langCounts[a]).slice(0, 2)
        };

        localStorage.setItem(this.prefKey, JSON.stringify(prefs));
        return prefs;
    },

    getUserPreferences() {
        try {
            return JSON.parse(localStorage.getItem(this.prefKey)) || { topGenres: [], topLanguages: [] };
        } catch(e) {
            return { topGenres: [], topLanguages: [] };
        }
    },

    // AI scoring algorithm to rank candidate movies based on watch history match
    getPersonalizedRecommendations(allMovies) {
        if (!allMovies || allMovies.length === 0) return [];
        
        const history = this.getWatchHistory();
        const prefs = this.getUserPreferences();
        const watchedIds = new Set(history.map(h => h.id));

        const scored = allMovies.map(movie => {
            let score = 0;
            
            // Penalty if already watched recently
            if (watchedIds.has(movie.id)) {
                score -= 5;
            }

            // Genre match score
            if (movie.genre) {
                const movieGenres = movie.genre.split(', ');
                prefs.topGenres.forEach((g, index) => {
                    if (movieGenres.includes(g)) {
                        score += (3 - index) * 2; // Higher weight for top 1 genre
                    }
                });
            }

            // Language match score
            if (movie.original_language && prefs.topLanguages.includes(movie.original_language)) {
                score += 3;
            }

            // Rating score boost
            if (movie.rating) {
                score += (parseFloat(movie.rating) / 2);
            }

            return { movie, score };
        });

        // Sort by AI recommendation score descending
        scored.sort((a, b) => b.score - a.score);
        return scored.map(s => s.movie);
    },

    // Render personalized "Recommended For You" carousel section
    async renderRecommendationSection(containerId, allMovies) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const recommended = this.getPersonalizedRecommendations(allMovies);

        if (recommended.length === 0) {
            container.innerHTML = '';
            return;
        }

        const sectionHeader = document.getElementById('recommendationTitle');
        if (sectionHeader) {
            sectionHeader.innerHTML = `Recommended For You`;
        }

        UI.renderMovieGrid(containerId, recommended.slice(0, 8));
    },

    // People Matcher: Collaborative Filtering
    async renderPeopleMatcherSection(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            container.parentElement.style.display = 'none';
            return;
        }

        try {
            const res = await fetch(`backend/matcher.php?user_id=${user.id}`);
            const recommended = await res.json();

            if (recommended && recommended.length > 0) {
                container.parentElement.style.display = 'block';
                UI.renderMovieGrid(containerId, recommended.slice(0, 6));
            } else {
                container.parentElement.style.display = 'none';
            }
        } catch (e) {
            console.error('People Matcher failed:', e);
            container.parentElement.style.display = 'none';
        }
    }
};
