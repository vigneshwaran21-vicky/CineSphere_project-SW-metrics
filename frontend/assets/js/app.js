/* Main Application Logic */
const app = {
    selectedGenre: '',
    selectedLanguage: '',
    selectedSort: 'popularity.desc',
    heroMovies: [],
    heroIndex: 0,
    heroTimer: null,

    async init() {
        this.bindEvents();
        this.initSearchAutocomplete();
        await this.renderHomePage();
        
        const user = JSON.parse(localStorage.getItem('user'));
        const setupCompleted = localStorage.getItem('cinematch_setup_completed');
        if (user && !setupCompleted) {
            if (typeof UI !== 'undefined' && UI.openQuickSetupModal) {
                UI.openQuickSetupModal();
            }
        }
    },

    bindEvents() {
        const searchInput = document.getElementById('movieSearch');
        if (searchInput) {
            let timeout = null;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => this.handleSearch(e), 400);
            });
        }

        const langMap = {
            'english': 'en', 'hindi': 'hi', 'tamil': 'ta', 'telugu': 'te',
            'malayalam': 'ml', 'kannada': 'kn', 'marathi': 'mr', 'bengali': 'bn',
            'punjabi': 'pa', 'gujarati': 'gu', 'urdu': 'ur', 'spanish': 'es',
            'french': 'fr', 'japanese': 'ja', 'korean': 'ko', 'german': 'de',
            'italian': 'it', 'russian': 'ru', 'chinese': 'zh', 'arabic': 'ar',
            'portuguese': 'pt', 'turkish': 'tr', 'polish': 'pl', 'dutch': 'nl',
            'swedish': 'sv', 'vietnamese': 'vi', 'thai': 'th'
        };

        const langInputs = document.querySelectorAll('.language-hybrid-input, #languageSearchInput, #languageFilter');
        langInputs.forEach(input => {
            const handleLang = (e) => {
                const rawVal = e.target.value;
                const val = rawVal.toLowerCase().trim();
                const code = (val.includes('all') || val === '') ? '' : (langMap[val] || val);
                this.selectedLanguage = code;
                
                langInputs.forEach(other => {
                    if (other !== e.target) {
                        other.value = rawVal;
                    }
                });

                this.saveState();
                this.handleFilterChange();
            };
            input.addEventListener('input', handleLang);
            input.addEventListener('change', handleLang);
            input.addEventListener('focus', (e) => e.target.select());
            input.addEventListener('click', (e) => e.target.select());
        });

        const sortFilter = document.getElementById('sortFilter');
        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.selectedSort = e.target.value;
                this.handleFilterChange();
            });
        }

        const genrePills = document.querySelectorAll('.genre-pill');
        genrePills.forEach(pill => {
            pill.addEventListener('click', (e) => {
                genrePills.forEach(p => p.classList.remove('active'));
                e.target.classList.add('active');
                this.selectedGenre = e.target.getAttribute('data-genre') || '';
                this.handleFilterChange();
            });
        });
    },

    initSearchAutocomplete() {
        const searchInput = document.getElementById('movieSearch');
        const wrapper = document.querySelector('.search-input-wrapper');
        if (!searchInput || !wrapper) return;

        let dropdown = document.getElementById('searchDropdown');
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.id = 'searchDropdown';
            dropdown.className = 'search-dropdown';
            wrapper.appendChild(dropdown);
        }

        let debounce = null;
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            clearTimeout(debounce);

            if (query.length < 2) {
                dropdown.style.display = 'none';
                return;
            }

            debounce = setTimeout(async () => {
                const results = await apiSearchMovies(query);
                if (results && results.length > 0) {
                    dropdown.innerHTML = results.slice(0, 5).map(m => `
                        <div class="search-dropdown-item" onclick="app.showMovieDetails('${m.id}')">
                            <img src="${m.image_url}" class="search-dropdown-poster" alt="${m.title}">
                            <div class="search-dropdown-info">
                                <div class="search-dropdown-title">${m.title}</div>
                                <div class="search-dropdown-meta">★ ${m.rating}/10 &bull; ${m.genre ? m.genre.split(', ')[0] : 'Film'} (${m.release_date ? m.release_date.split('-')[0] : 'N/A'})</div>
                            </div>
                        </div>
                    `).join('');
                    dropdown.style.display = 'block';
                } else {
                    dropdown.innerHTML = '<div style="padding: 12px; font-size: 13px; color: #888; text-align: center;">No matching movies found</div>';
                    dropdown.style.display = 'block';
                }
            }, 250);
        });

        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
    },

    async renderHomePage() {
        const featuredGrid = document.getElementById('featuredMovies');
        const topRatedGrid = document.getElementById('topRatedMovies');
        
        if(!featuredGrid) return; // not on homepage

        featuredGrid.innerHTML = '<div style="margin:50px auto; border:4px solid rgba(255,255,255,0.1); border-top:4px solid var(--primary-color); border-radius:50%; width:40px; height:40px; animation:spin 1s linear infinite;"></div>';
        
        try {
            const movies = await apiGetMovies();
            const topRated = await apiGetTopRatedMovies();

            if(!movies.error && movies.length > 0) {
                this.heroMovies = movies.slice(0, 5);
                this.initHeroCarousel();

                UI.renderMovieGrid('featuredMovies', movies.slice(0, 12));
                UI.renderMovieGrid('topRatedMovies', (topRated && topRated.length > 0) ? topRated.slice(0, 12) : movies.slice(12, 24));
                
                // Handle recommendations section visibility and display
                const user = JSON.parse(localStorage.getItem('user'));
                const recSec = document.getElementById('recommendationsSection');
                if (recSec) {
                    recSec.style.display = 'block';
                    if (typeof CineRec !== 'undefined') {
                        CineRec.renderRecommendationSection('recommendedMovies', movies);
                        if (user && CineRec.renderPeopleMatcherSection) {
                            CineRec.renderPeopleMatcherSection('peopleMatcherMovies');
                        }
                    }
                }
            } else if (movies.error) {
                featuredGrid.innerHTML = `<p style="text-align:center;width:100%;color:red;padding:20px;border:1px solid red;background:rgba(255,0,0,0.1);">Detailed Error: ${movies.message}</p>`;
            } else {
                featuredGrid.innerHTML = '<p style="text-align:center;width:100%;">Failed to connect to Live API. No movies returned.</p>';
            }
        } catch(e) {
            featuredGrid.innerHTML = '<p style="text-align:center;width:100%;">Live Data Server Error.</p>';
        }
    },

    initHeroCarousel() {
        const hero = document.getElementById('heroCarousel');
        if (!hero || this.heroMovies.length === 0) return;

        this.renderHeroSlide(0);

        if (this.heroTimer) clearInterval(this.heroTimer);
        this.heroTimer = setInterval(() => {
            this.heroIndex = (this.heroIndex + 1) % this.heroMovies.length;
            this.renderHeroSlide(this.heroIndex);
        }, 6000);
    },

    renderHeroSlide(index) {
        const hero = document.getElementById('heroCarousel');
        const movie = this.heroMovies[index];
        if (!hero || !movie) return;

        const bgUrl = movie.backdrop_url || movie.image_url;
        hero.style.backgroundImage = `linear-gradient(rgba(18, 18, 18, 0.4), rgba(18, 18, 18, 0.85)), url('${bgUrl}')`;

        const heroContent = document.getElementById('heroContent');
        if (heroContent) {
            const safeTitle = (movie.title || 'Movie').replace(/'/g, "\\'");
            heroContent.innerHTML = `
                <span class="badge badge-primary"><i class="fas fa-fire"></i> TRENDING CINEMA FEATURED</span>
                <h1 class="hero-title">${movie.title}</h1>
                <p class="hero-subtitle">${movie.description}</p>
                <div class="hero-actions">
                    <button class="btn btn-primary" onclick="app.playTrailerDirect('${movie.id}', '${safeTitle}')"><i class="fas fa-play"></i> Watch Trailer</button>
                    <a href="movie-details.html?id=${movie.id}" class="btn btn-outline"><i class="fas fa-info-circle"></i> Details & Cast</a>
                    <button class="btn btn-outline" onclick="CineMatch AI.toggle()" style="background: rgba(255,255,255,0.08);"><i class="fas fa-robot"></i> Ask CineMatch AI AI</button>
                </div>
            `;
        }
    },

    async playTrailerDirect(movieId, title) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            if (typeof UI !== 'undefined' && UI.showAuthAlert) UI.showAuthAlert('Watch HD Trailers');
            return;
        }

        if (typeof UI !== 'undefined' && UI.openTrailerModal) {
            UI.showToast('Opening official video trailer...', 'info');
            try {
                const trailers = await apiGetMovieTrailers(movieId);
                if (trailers && trailers.length > 0 && trailers[0].key) {
                    UI.openTrailerModal(trailers[0].key, title);
                } else {
                    UI.openTrailerModal(null, title);
                }
            } catch(e) {
                UI.openTrailerModal(null, title);
            }
        }
    },

    async handleFilterChange() {
        const featuredTitle = document.querySelector('#movies .section-title');
        const grid = document.getElementById('featuredMovies');
        const topRatedSection = document.getElementById('top-rated');
        
        featuredTitle.textContent = `Discovering Cinema Results`;
        grid.innerHTML = '<div style="margin:50px auto; border:4px solid rgba(255,255,255,0.1); border-top:4px solid var(--primary-color); border-radius:50%; width:40px; height:40px; animation:spin 1s linear infinite;"></div>';
        
        try {
            const movies = await apiDiscoverMovies(this.selectedGenre, this.selectedLanguage, this.selectedSort);
            UI.renderMovieGrid('featuredMovies', movies);
            if (topRatedSection) topRatedSection.style.display = (this.selectedGenre || this.selectedLanguage) ? 'none' : 'block';
            
            const moviesSec = document.getElementById('movies');
            if (moviesSec) moviesSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch(e) {
            grid.innerHTML = '<p style="text-align:center;width:100%;">Failed to apply filters across the Live API.</p>';
        }
    },

    async handleSearch(e) {
        const query = e.target.value.toLowerCase().trim();
        const featuredTitle = document.querySelector('#movies .section-title');
        const grid = document.getElementById('featuredMovies');
        const topRatedSection = document.getElementById('top-rated');
        
        if (query) {
            featuredTitle.textContent = `Live Search Results for "${query}"`;
            grid.innerHTML = '<div style="margin:50px auto; border:4px solid rgba(255,255,255,0.1); border-top:4px solid var(--primary-color); border-radius:50%; width:40px; height:40px; animation:spin 1s linear infinite;"></div>';
            
            try {
                const movies = await apiSearchMovies(query);
                UI.renderMovieGrid('featuredMovies', movies);
                if(topRatedSection) topRatedSection.style.display = 'none';
                
                const moviesSec = document.getElementById('movies');
                if (moviesSec) moviesSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } catch(e) {
                grid.innerHTML = '<p style="text-align:center;width:100%;">Search failed across the Live API.</p>';
            }
        } else {
            featuredTitle.textContent = 'Trending & Live Discover';
            this.handleFilterChange();
        }
    },

    showMovieDetails(id) {
        this.saveState();
        window.location.href = `movie-details.html?id=${id}`;
    },

    saveState() {
        try {
            sessionStorage.setItem('cinesphere_state', JSON.stringify({
                genre: this.selectedGenre,
                language: this.selectedLanguage,
                sort: this.selectedSort,
                search: document.getElementById('movieSearch')?.value || '',
                scrollY: window.scrollY
            }));
        } catch(e){}
    },

    restoreState() {
        try {
            const saved = sessionStorage.getItem('cinesphere_state');
            if (saved) {
                const st = JSON.parse(saved);
                this.selectedGenre = st.genre || '';
                this.selectedLanguage = st.language || '';
                this.selectedSort = st.sort || 'popularity.desc';
                
                const searchInput = document.getElementById('movieSearch');
                if (searchInput && st.search) searchInput.value = st.search;

                const langInputs = document.querySelectorAll('.language-hybrid-input, #languageSearchInput, #languageFilter');
                langInputs.forEach(inp => { if (inp && st.language) inp.value = st.language; });

                if (st.search) {
                    this.handleSearch({ target: { value: st.search } });
                } else if (st.genre || st.language || (st.sort && st.sort !== 'popularity.desc')) {
                    this.handleFilterChange();
                }

                if (st.scrollY) {
                    setTimeout(() => window.scrollTo(0, st.scrollY), 400);
                }
            }
        } catch(e){}
    },

    toggleRecommendations() {
        const content = document.getElementById('recommendationsContent');
        const icon = document.getElementById('recToggleIcon');
        if (content) {
            const isHidden = content.style.display === 'none' || !content.style.display;
            content.style.display = isHidden ? 'block' : 'none';
            if (icon) {
                icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
    app.restoreState();
    window.addEventListener('beforeunload', () => app.saveState());
});

