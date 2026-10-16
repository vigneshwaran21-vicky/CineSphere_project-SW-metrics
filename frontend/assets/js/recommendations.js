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
                const genres = item.genre.split(',').map(s => s.trim());
                genres.forEach(g => {
                    if (g) genreCounts[g] = (genreCounts[g] || 0) + 1;
                });
            }
            if (item.language) {
                langCounts[item.language.toUpperCase()] = (langCounts[item.language.toUpperCase()] || 0) + 1;
            }
        });

        // Preserve manually configured user preferences if set
        const existingPrefs = this.getUserPreferences();
        const topGenresFromHistory = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]).slice(0, 4);
        const topLangsFromHistory = Object.keys(langCounts).sort((a, b) => langCounts[b] - langCounts[a]).slice(0, 3);

        const prefs = {
            topGenres: existingPrefs.topGenres && existingPrefs.topGenres.length > 0 ? existingPrefs.topGenres : topGenresFromHistory,
            topLanguages: existingPrefs.topLanguages && existingPrefs.topLanguages.length > 0 ? existingPrefs.topLanguages : topLangsFromHistory,
            minRating: existingPrefs.minRating || 7.0
        };

        localStorage.setItem(this.prefKey, JSON.stringify(prefs));
        return prefs;
    },

    getUserPreferences() {
        try {
            const data = localStorage.getItem(this.prefKey);
            return data ? JSON.parse(data) : { topGenres: [], topLanguages: [], minRating: 7.0 };
        } catch(e) {
            return { topGenres: [], topLanguages: [], minRating: 7.0 };
        }
    },

    // AI scoring algorithm to rank candidate movies based on watch history & profile match
    getPersonalizedRecommendations(allMovies) {
        if (!allMovies || allMovies.length === 0) return [];
        
        const history = this.getWatchHistory();
        const prefs = this.getUserPreferences();
        const watchedIds = new Set(history.map(h => String(h.id)));

        const langEquivs = {
            'ta': ['ta', 'tamil'],
            'tamil': ['ta', 'tamil'],
            'te': ['te', 'telugu'],
            'telugu': ['te', 'telugu'],
            'hi': ['hi', 'hindi'],
            'hindi': ['hi', 'hindi'],
            'en': ['en', 'english'],
            'english': ['en', 'english'],
            'ja': ['ja', 'japanese'],
            'japanese': ['ja', 'japanese'],
            'ko': ['ko', 'korean'],
            'korean': ['ko', 'korean'],
            'es': ['es', 'spanish'],
            'fr': ['fr', 'french'],
            'de': ['de', 'german']
        };

        const scored = allMovies.map(movie => {
            let score = 0;
            
            // Penalty if already watched recently
            if (watchedIds.has(String(movie.id))) {
                score -= 4;
            }

            // Genre match score based on user profile preferences
            if (movie.genre && prefs.topGenres && prefs.topGenres.length > 0) {
                const movieGenres = movie.genre.toLowerCase();
                prefs.topGenres.forEach((g, index) => {
                    if (movieGenres.includes(g.toLowerCase())) {
                        score += 25 - (index * 4); // Heavy priority boost for edited genres
                    }
                });
            }

            // Language match score based on user profile preferences
            if (movie.original_language && prefs.topLanguages && prefs.topLanguages.length > 0) {
                const mLang = movie.original_language.toLowerCase().trim();
                prefs.topLanguages.forEach(l => {
                    const pLang = l.toLowerCase().trim();
                    const equivs = langEquivs[pLang] || [pLang];
                    if (equivs.includes(mLang) || mLang.includes(pLang)) {
                        score += 30; // Heavy priority boost for edited language preferences
                    }
                });
            }

            // Min Rating threshold score
            const r = parseFloat(movie.rating) || 7.0;
            const minR = parseFloat(prefs.minRating) || 0;
            if (minR > 0 && r < minR) {
                score -= 20; // Deprioritize below user's selected rating
            } else {
                score += (r * 1.5);
            }

            return { movie, score };
        });

        // Sort by AI recommendation score descending
        scored.sort((a, b) => b.score - a.score);
        const recommendations = scored.map(s => s.movie);

        // Ensure we always return at least 8 movies (fall back to top movies if needed)
        if (recommendations.length < 8) {
            allMovies.forEach(m => {
                if (!recommendations.some(r => r.id === m.id)) {
                    recommendations.push(m);
                }
            });
        }

        return recommendations;
    },

    // Render personalized "Recommended For You" carousel section
    async renderRecommendationSection(containerId, allMovies) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const section = document.getElementById('recommendationsSection');
        if (section) section.style.display = 'block';

        const content = document.getElementById('recommendationsContent');
        if (content) content.style.display = 'block';

        const recIcon = document.getElementById('recToggleIcon');
        if (recIcon) recIcon.style.transform = 'rotate(180deg)';

        const recommended = this.getPersonalizedRecommendations(allMovies);

        if (!recommended || recommended.length === 0) {
            container.innerHTML = '<p style="color:#aaa;padding:20px;text-align:center;">No recommendations available right now.</p>';
            return;
        }

        const prefs = this.getUserPreferences();
        const sectionHeader = document.getElementById('recommendationTitle');
        if (sectionHeader) {
            const tags = [];
            if (prefs.topGenres && prefs.topGenres.length > 0) tags.push(...prefs.topGenres.slice(0, 2));
            if (prefs.topLanguages && prefs.topLanguages.length > 0) tags.push(...prefs.topLanguages.slice(0, 2).map(l => l.toUpperCase()));
            
            if (tags.length > 0) {
                sectionHeader.innerHTML = `Recommended For You <span style="font-size:13px;font-weight:600;color:var(--primary-color);margin-left:8px;">(${tags.join(' &bull; ')})</span>`;
            } else {
                sectionHeader.innerHTML = `Recommended For You <span style="font-size:13px;font-weight:400;color:var(--primary-color);margin-left:8px;">(AI Curated)</span>`;
            }
        }

        if (typeof UI !== 'undefined' && typeof UI.renderMovieGrid === 'function') {
            UI.renderMovieGrid(containerId, recommended.slice(0, 8));
        }
    },

    // People Matcher: Collaborative Filtering
    async renderPeopleMatcherSection(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            if (container.parentElement) container.parentElement.style.display = 'none';
            return;
        }

        try {
            const res = await fetch(`backend/matcher.php?user_id=${user.id}`);
            const recommended = await res.json();

            if (recommended && recommended.length > 0) {
                if (container.parentElement) container.parentElement.style.display = 'block';
                if (typeof UI !== 'undefined' && typeof UI.renderMovieGrid === 'function') {
                    UI.renderMovieGrid(containerId, recommended.slice(0, 6));
                }
            } else {
                if (container.parentElement) container.parentElement.style.display = 'none';
            }
        } catch (e) {
            console.error('People Matcher failed:', e);
            if (container.parentElement) container.parentElement.style.display = 'none';
        }
    }
};

// Export to window
window.CineRec = CineRec;
