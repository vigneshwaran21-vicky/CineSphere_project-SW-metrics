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
        const cleanMsg = (message && message !== 'undefined' && String(message).trim() !== '') 
            ? message 
            : (type === 'error' ? 'An error occurred. Please check input.' : 'Action completed.');

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
            <span>${cleanMsg}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    },

    showAuthAlert(feature) {
        let modal = document.getElementById('authAlertModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'authAlertModal';
            modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10005; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center;';
            document.body.appendChild(modal);
        }
        modal.innerHTML = `
            <div class="glass-card" style="width: 90%; max-width: 380px; padding: 32px 25px; text-align: center; position: relative; border: 1px solid rgba(245,197,24,0.4); box-shadow: 0 25px 60px rgba(0,0,0,0.9); animation: modalFadeIn 0.3s ease;">
                <button onclick="document.getElementById('authAlertModal').style.display='none'" style="position: absolute; top: 15px; right: 20px; background: none; border: none; color: #fff; font-size: 24px; cursor: pointer;">&times;</button>
                <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(245,197,24,0.15); color: var(--primary-color); display: inline-flex; align-items: center; justify-content: center; margin: 0 auto 18px auto;">
                    <i class="fas fa-lock fa-2x"></i>
                </div>
                <h3 style="margin-bottom: 10px; font-size: 22px; color: #fff; font-weight:700;">Login Required</h3>
                <p style="color: #ccc; margin-bottom: 24px; font-size: 14px; line-height: 1.5;">You must log in first to use <strong>${feature}</strong>.</p>
                <div style="display: flex; justify-content: center;">
                    <a href="login.html" class="btn btn-primary" style="width: 100%; text-align: center; justify-content: center; padding: 12px; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fas fa-sign-in-alt"></i> Log In Now</a>
                </div>
            </div>
        `;
        modal.style.display = 'flex';
    },

    async openActorModal(id) {
        let modal = document.getElementById('actorModal');
        let content = document.getElementById('actorModalContent');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'actorModal';
            modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; background: rgba(0,0,0,0.85); backdrop-filter: blur(15px); display: flex; align-items: center; justify-content: center; opacity: 1; pointer-events: all; padding: 20px;';
            modal.innerHTML = `
                <div style="width: 100%; max-width: 650px; background: #161616; border-radius: 20px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 25px 60px rgba(0,0,0,0.9); padding: 25px; position: relative;">
                    <button onclick="UI.closeActorModal()" style="position: absolute; top: 15px; right: 20px; background: rgba(255,255,255,0.1); border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center;">&times;</button>
                    <div id="actorModalContent"></div>
                </div>
            `;
            document.body.appendChild(modal);
            modal.onclick = (e) => {
                if (e.target === modal) this.closeActorModal();
            };
            content = document.getElementById('actorModalContent');
        } else {
            modal.style.display = 'flex';
            modal.style.opacity = '1';
            modal.style.pointerEvents = 'all';
        }
        
        content.innerHTML = '<div style="text-align:center; padding: 40px;"><i class="fas fa-spinner fa-spin fa-2x text-primary"></i><p style="margin-top:10px; color:#aaa;">Loading Actor Profile...</p></div>';
        
        const fetchFn = (typeof apiGetActorDetails !== 'undefined') ? apiGetActorDetails : ((typeof apiGetActor !== 'undefined') ? apiGetActor : null);
        if (!fetchFn) {
            content.innerHTML = '<p class="text-danger" style="text-align:center; padding: 30px;">API script missing.</p>';
            return;
        }

        const actor = await fetchFn(id);
        if (!actor || actor.error || actor.message) {
            content.innerHTML = '<p class="text-danger" style="text-align:center; padding: 30px;">Failed to load actor profile details.</p>';
            return;
        }
        
        let moviesHtml = '';
        if (actor.movies && actor.movies.length > 0) {
            moviesHtml = `
                <h3 style="margin-top: 15px; font-size: 18px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">Known For</h3>
                <div class="movie-grid" style="grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; margin-top: 15px;">
                    ${actor.movies.map(m => `
                        <div class="movie-card" style="cursor:pointer;" onclick="window.location.href='movie-details.html?id=${m.id}'">
                            <img src="${m.image_url}" style="width: 100%; border-radius: 8px;">
                            <h4 style="font-size: 12px; text-align: center; margin-top: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${(m.title||'').replace(/'/g, "\\'")}">${m.title}</h4>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        content.innerHTML = `
            <div style="display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap;">
                <img src="${actor.profile_url}" alt="${actor.name}" style="width: 150px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
                <div style="flex: 1; min-width: 250px;">
                    <h2 style="margin: 0 0 10px 0; font-size: 24px; color: var(--primary-color);">${actor.name}</h2>
                    <span class="badge" style="background: rgba(255,255,255,0.1); margin-bottom: 15px; display: inline-block;">${actor.known_for_department || 'Acting'}</span>
                    <p style="font-size: 13px; line-height: 1.6; color: #ccc; max-height: 150px; overflow-y: auto; padding-right: 10px;">
                        ${actor.biography || 'No biography available.'}
                    </p>
                </div>
            </div>
            ${moviesHtml}
        `;
    },

    openTrailerModal(youtubeKey, title, langCode) {
        let modal = document.getElementById('trailerModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'trailerModal';
            modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; background: rgba(0,0,0,0.9); backdrop-filter: blur(15px); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; pointer-events: none; padding: 20px;';
            
            modal.innerHTML = `
                <div style="width: 100%; max-width: 900px; background: #141414; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 25px 50px rgba(0,0,0,0.8);">
                    <div style="padding: 15px 20px; background: #1f1f1f; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <h3 id="trailerModalTitle" style="margin: 0; font-size: 16px; color: var(--primary-color); font-weight: 600; display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-film"></i> Official Trailer
                        </h3>
                        <button onclick="UI.closeTrailerModal()" style="background: rgba(255,255,255,0.1); border: none; color: #fff; font-size: 24px; cursor: pointer; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; line-height: 1; z-index: 10001;">&times;</button>
                    </div>
                    <div style="position: relative; width: 100%; padding-bottom: 56.25%; background: #000;">
                        <iframe id="trailerIframe" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            modal.onclick = (e) => {
                if (e.target === modal) this.closeTrailerModal();
            };
        }

        const titleEl = document.getElementById('trailerModalTitle');
        const iframeEl = document.getElementById('trailerIframe');
        
        const langNames = {
            'ta': 'Tamil', 'hi': 'Hindi', 'te': 'Telugu', 'es': 'Spanish',
            'fr': 'French', 'ja': 'Japanese', 'ko': 'Korean', 'de': 'German',
            'ml': 'Malayalam', 'kn': 'Kannada', 'mr': 'Marathi', 'bn': 'Bengali',
            'pa': 'Punjabi', 'gu': 'Gujarati', 'ur': 'Urdu', 'it': 'Italian',
            'ru': 'Russian', 'zh': 'Chinese', 'ar': 'Arabic', 'pt': 'Portuguese',
            'tr': 'Turkish', 'pl': 'Polish', 'nl': 'Dutch', 'sv': 'Swedish',
            'vi': 'Vietnamese', 'th': 'Thai', 'en': 'English'
        };
        const activeLang = typeof app !== 'undefined' ? app.selectedLanguage : (langCode || '');
        const langSuffix = langNames[activeLang] || activeLang || '';

        if (titleEl) titleEl.innerHTML = `<i class="fas fa-film"></i> ${title || 'Movie'} ${langSuffix ? '(' + langSuffix + ')' : ''} - Official Trailer`;
        
        let embedSrc = '';
        if (youtubeKey && youtubeKey !== 'YoHD9XEInc0' && !langSuffix) {
            embedSrc = `https://www.youtube-nocookie.com/embed/${youtubeKey}?autoplay=1&rel=0`;
        } else {
            const query = (title || 'Movie') + ' ' + (langSuffix ? langSuffix + ' ' : '') + 'official trailer';
            embedSrc = `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(query)}&autoplay=1`;
        }
        if (iframeEl) iframeEl.src = embedSrc;

        modal.style.pointerEvents = 'all';
        modal.style.opacity = '1';
    },

    closeTrailerModal() {
        ['trailerModal', 'trailerPlayerModal'].forEach(id => {
            const modal = document.getElementById(id);
            if (modal) {
                const iframe = modal.querySelector('iframe');
                if (iframe) iframe.src = '';
                modal.style.opacity = '0';
                modal.style.pointerEvents = 'none';
            }
        });
    },

    async openMovieDetailsModal(movieId) {
        let modal = document.getElementById('movieDetailsPopoutModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'movieDetailsPopoutModal';
            modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; background: rgba(0,0,0,0.85); backdrop-filter: blur(15px); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; pointer-events: none; padding: 20px;';
            modal.innerHTML = `
                <div id="moviePopoutContent" style="width: 100%; max-width: 850px; max-height: 90vh; overflow-y: auto; background: #161616; border-radius: 20px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 25px 60px rgba(0,0,0,0.9); position: relative;">
                </div>
            `;
            document.body.appendChild(modal);
            modal.onclick = (e) => {
                if (e.target === modal) this.closeMovieDetailsModal();
            };
        }

        const container = document.getElementById('moviePopoutContent');
        container.innerHTML = '<div style="text-align:center; padding: 60px;"><i class="fas fa-spinner fa-spin fa-3x text-primary"></i><p style="margin-top:15px; color:#aaa;">Loading Movie Details...</p></div>';
        
        modal.style.pointerEvents = 'all';
        modal.style.opacity = '1';

        const movie = await apiGetMovie(movieId);
        if (!movie || movie.error || movie.message) {
            container.innerHTML = `
                <div style="padding: 40px; text-align: center;">
                    <button onclick="UI.closeMovieDetailsModal()" style="position: absolute; top: 15px; right: 20px; background: none; border: none; color: #fff; font-size: 28px; cursor: pointer;">&times;</button>
                    <p class="text-danger">Failed to load details for this movie.</p>
                </div>
            `;
            return;
        }

        const safeTitle = (movie.title || 'Movie').replace(/'/g, "\\'");
        const bgUrl = movie.backdrop_url || movie.image_url;

        let castHtml = '';
        if (Array.isArray(movie.cast) && movie.cast.length > 0) {
            castHtml = `
                <div style="margin-top: 15px;">
                    <h4 style="font-size: 14px; color: #aaa; margin-bottom: 8px;">Top Cast:</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                        ${movie.cast.map(c => {
                            const name = typeof c === 'object' ? c.name : c;
                            const id = typeof c === 'object' ? c.id : c;
                            return `<span class="badge glass-card" onclick="UI.openActorModal('${id}')" style="cursor:pointer; font-size: 12px; padding: 5px 10px;"><i class="fas fa-user"></i> ${name}</span>`;
                        }).join('')}
                    </div>
                </div>
            `;
        }

        container.innerHTML = `
            <div style="position: relative; height: 260px; background-image: linear-gradient(rgba(0,0,0,0.3), #161616), url('${bgUrl}'); background-size: cover; background-position: center; border-radius: 20px 20px 0 0; padding: 20px; display: flex; align-items: flex-end;">
                <button onclick="UI.closeMovieDetailsModal()" style="position: absolute; top: 15px; right: 20px; background: rgba(0,0,0,0.6); border: none; color: #fff; width: 36px; height: 36px; border-radius: 50%; font-size: 22px; cursor: pointer; display: flex; align-items: center; justify-content: center;">&times;</button>
                <div style="display: flex; gap: 20px; align-items: flex-end; transform: translateY(40px);">
                    <img src="${movie.image_url}" alt="${movie.title}" style="width: 140px; height: 200px; object-fit: cover; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.8); border: 2px solid rgba(255,255,255,0.1);">
                    <div>
                        <span class="badge badge-primary" style="margin-bottom: 6px;">★ ${movie.rating}/10</span>
                        <h2 style="margin: 0; font-size: 26px; font-weight: 800; color: #fff;">${movie.title}</h2>
                        <p style="margin: 4px 0 0 0; color: #aaa; font-size: 13px;">${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'} &bull; ${movie.genre || 'Feature Film'}</p>
                    </div>
                </div>
            </div>
            <div style="padding: 60px 25px 25px 25px;">
                <p style="font-size: 14px; line-height: 1.6; color: #ddd; margin-bottom: 20px;">
                    ${movie.description}
                </p>
                ${castHtml}
                <div style="display: flex; gap: 12px; margin-top: 25px; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="app.playTrailerDirect('${movie.id}', '${safeTitle}')"><i class="fas fa-play"></i> Watch Trailer</button>
                    <a href="movie-details.html?id=${movie.id}" class="btn btn-outline"><i class="fas fa-external-link-alt"></i> Open Full Page & Reviews</a>
                </div>
            </div>
        `;
    },

    closeMovieDetailsModal() {
        const modal = document.getElementById('movieDetailsPopoutModal');
        if (modal) {
            modal.style.opacity = '0';
            modal.style.pointerEvents = 'none';
        }
    },

    openWorldLanguageModal() {
        let modal = document.getElementById('worldLangModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'worldLangModal';
            modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; background: rgba(0,0,0,0.85); backdrop-filter: blur(20px); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; pointer-events: none; padding: 20px;';
            
            const languages = [
                { code: 'en', name: 'English' }, { code: 'hi', name: 'Hindi' }, { code: 'ta', name: 'Tamil' },
                { code: 'te', name: 'Telugu' }, { code: 'ml', name: 'Malayalam' }, { code: 'kn', name: 'Kannada' },
                { code: 'mr', name: 'Marathi' }, { code: 'bn', name: 'Bengali' }, { code: 'pa', name: 'Punjabi' },
                { code: 'gu', name: 'Gujarati' }, { code: 'ur', name: 'Urdu' }, { code: 'es', name: 'Spanish' },
                { code: 'fr', name: 'French' }, { code: 'ja', name: 'Japanese (Anime)' }, { code: 'ko', name: 'Korean' },
                { code: 'de', name: 'German' }, { code: 'it', name: 'Italian' }, { code: 'ru', name: 'Russian' },
                { code: 'zh', name: 'Chinese / Mandarin' }, { code: 'ar', name: 'Arabic' }, { code: 'pt', name: 'Portuguese' },
                { code: 'tr', name: 'Turkish' }, { code: 'pl', name: 'Polish' }, { code: 'nl', name: 'Dutch' },
                { code: 'sv', name: 'Swedish' }, { code: 'vi', name: 'Vietnamese' }, { code: 'th', name: 'Thai' },
                { code: 'id', name: 'Indonesian' }, { code: 'tl', name: 'Tagalog / Filipino' }, { code: 'el', name: 'Greek' },
                { code: 'he', name: 'Hebrew' }, { code: 'cs', name: 'Czech' }, { code: 'hu', name: 'Hungarian' },
                { code: 'ro', name: 'Romanian' }, { code: 'uk', name: 'Ukrainian' }, { code: 'da', name: 'Danish' },
                { code: 'no', name: 'Norwegian' }, { code: 'fi', name: 'Finnish' }, { code: 'fa', name: 'Persian / Farsi' },
                { code: 'sw', name: 'Swahili' }
            ];

            modal.innerHTML = `
                <div style="width: 100%; max-width: 650px; max-height: 85vh; background: #161616; border-radius: 20px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 25px 60px rgba(0,0,0,0.9); padding: 25px; display: flex; flex-direction: column; gap: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px;">
                        <h3 style="margin: 0; font-size: 20px; color: var(--primary-color); display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-globe"></i> World Languages Catalog
                        </h3>
                        <button onclick="UI.closeWorldLanguageModal()" style="background: none; border: none; color: #fff; font-size: 26px; cursor: pointer;">&times;</button>
                    </div>
                    <div style="position: relative;">
                        <i class="fas fa-search" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #888;"></i>
                        <input type="text" id="langModalSearchInput" placeholder="Search world languages (e.g. Italian, Malayalam, Spanish, Korean)..." style="width: 100%; padding: 12px 14px 12px 40px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; color: #fff; outline: none; font-size: 14px;">
                    </div>
                    <div id="langGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px; overflow-y: auto; max-height: 380px; padding-right: 5px;">
                        ${languages.map(l => `
                            <button onclick="UI.selectLanguageFromModal('${l.code}', '${l.name}')" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 10px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; text-align: left; transition: all 0.2s ease; display: flex; align-items: center; gap: 8px;" onmouseenter="this.style.background='rgba(245,197,24,0.2)'" onmouseleave="this.style.background='rgba(255,255,255,0.05)'">
                                <i class="fas fa-language text-primary"></i> ${l.name}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            modal.onclick = (e) => {
                if (e.target === modal) this.closeWorldLanguageModal();
            };

            const searchInput = document.getElementById('langModalSearchInput');
            const langGrid = document.getElementById('langGrid');
            if (searchInput && langGrid) {
                searchInput.addEventListener('input', (e) => {
                    const q = e.target.value.toLowerCase().trim();
                    const buttons = langGrid.querySelectorAll('button');
                    buttons.forEach(btn => {
                        const txt = btn.textContent.toLowerCase();
                        btn.style.display = txt.includes(q) ? 'flex' : 'none';
                    });
                });
            }
        }

        modal.style.pointerEvents = 'all';
        modal.style.opacity = '1';
    },

    closeWorldLanguageModal() {
        const modal = document.getElementById('worldLangModal');
        if (modal) {
            modal.style.opacity = '0';
            modal.style.pointerEvents = 'none';
        }
    },

    selectLanguageFromModal(code, name) {
        this.closeWorldLanguageModal();
        if (typeof app !== 'undefined') {
            app.selectedLanguage = code;
            const filters = document.querySelectorAll('.language-hybrid-input, #languageFilter');
            filters.forEach(f => f.value = name);
            app.handleFilterChange();
            this.showToast(`Filtered movies by ${name}`, 'info');
        }
    },

    openQuickSetupModal() {
        let modal = document.getElementById('quickSetupModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'quickSetupModal';
            modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; background: rgba(0,0,0,0.95); backdrop-filter: blur(20px); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; pointer-events: none; padding: 20px;';
            
            modal.innerHTML = `
                <div style="width: 100%; max-width: 650px; background: #141414; border-radius: 20px; border: 1px solid rgba(245,197,24,0.3); box-shadow: 0 25px 60px rgba(0,0,0,0.9); padding: 30px; text-align: center; position: relative;">
                    <h2 style="color: var(--primary-color); margin: 0 0 10px 0; font-size: 26px;">
                        <i class="fas fa-magic"></i> Welcome to CineMatch!
                    </h2>
                    <p style="color: #bbb; font-size: 15px; margin-bottom: 25px;">To give you the perfect movie night, please select up to 3 genres you love.</p>
                    
                    <div id="setupGenres" style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 30px;">
                        <button class="btn btn-outline genre-toggle" data-genre="Action" onclick="UI.toggleSetupGenre(this)"><i class="fas fa-bolt"></i> Action</button>
                        <button class="btn btn-outline genre-toggle" data-genre="Sci-Fi" onclick="UI.toggleSetupGenre(this)"><i class="fas fa-atom"></i> Sci-Fi</button>
                        <button class="btn btn-outline genre-toggle" data-genre="Comedy" onclick="UI.toggleSetupGenre(this)"><i class="fas fa-laugh"></i> Comedy</button>
                        <button class="btn btn-outline genre-toggle" data-genre="Romance" onclick="UI.toggleSetupGenre(this)"><i class="fas fa-heart"></i> Romance</button>
                        <button class="btn btn-outline genre-toggle" data-genre="Horror" onclick="UI.toggleSetupGenre(this)"><i class="fas fa-ghost"></i> Horror</button>
                        <button class="btn btn-outline genre-toggle" data-genre="Drama" onclick="UI.toggleSetupGenre(this)"><i class="fas fa-theater-masks"></i> Drama</button>
                        <button class="btn btn-outline genre-toggle" data-genre="Animation" onclick="UI.toggleSetupGenre(this)"><i class="fas fa-magic"></i> Animation</button>
                    </div>

                    <button onclick="UI.completeQuickSetup()" class="btn btn-primary" style="width: 100%; font-size: 16px; padding: 12px;"><i class="fas fa-check"></i> Start Discovering</button>
                </div>
            `;
            document.body.appendChild(modal);
        }

        document.querySelectorAll('.genre-toggle').forEach(btn => {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline');
            btn.style.color = '#fff';
            btn.dataset.selected = 'false';
        });

        setTimeout(() => {
            modal.style.pointerEvents = 'all';
            modal.style.opacity = '1';
        }, 50);
    },

    toggleSetupGenre(btn) {
        const isSelected = btn.dataset.selected === 'true';
        if (isSelected) {
            btn.dataset.selected = 'false';
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline');
            btn.style.color = '#fff';
        } else {
            const selectedCount = document.querySelectorAll('.genre-toggle[data-selected="true"]').length;
            if (selectedCount >= 3) {
                UI.showToast('You can only select up to 3 genres', 'warning');
                return;
            }
            btn.dataset.selected = 'true';
            btn.classList.remove('btn-outline');
            btn.classList.add('btn-primary');
            btn.style.color = '#000';
        }
    },

    completeQuickSetup() {
        const selected = Array.from(document.querySelectorAll('.genre-toggle[data-selected="true"]')).map(btn => btn.dataset.genre);
        
        if (selected.length > 0) {
            let prefs = { topGenres: selected, topLanguages: ['EN'] };
            localStorage.setItem('cinematch_user_prefs', JSON.stringify(prefs));
            let history = [];
            selected.forEach((g, i) => {
                history.push({ id: 1000 + i, title: 'Setup Movie ' + i, genre: g, language: 'EN', timestamp: Date.now() });
            });
            localStorage.setItem('cinematch_watch_history', JSON.stringify(history));
        }

        localStorage.setItem('cinematch_setup_completed', 'true');
        
        const modal = document.getElementById('quickSetupModal');
        if (modal) {
            modal.style.opacity = '0';
            modal.style.pointerEvents = 'none';
        }
        
        UI.showToast('Profile setup complete! Finding your matches...', 'success');
        if (typeof app !== 'undefined' && app.renderHomePage) {
            app.renderHomePage();
        }
    },

    openRouletteModal() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            if (typeof UI !== 'undefined' && UI.showAuthAlert) UI.showAuthAlert('AI Cinema Roulette');
            return;
        }
        let modal = document.getElementById('rouletteModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'rouletteModal';
            modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; background: rgba(0,0,0,0.88); backdrop-filter: blur(20px); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; pointer-events: none; padding: 20px;';
            
            modal.innerHTML = `
                <div style="width: 100%; max-width: 650px; background: #141414; border-radius: 20px; border: 1px solid rgba(245,197,24,0.3); box-shadow: 0 25px 60px rgba(0,0,0,0.9); padding: 25px; text-align: center; position: relative;">
                    <button onclick="UI.closeRouletteModal()" style="position: absolute; top: 15px; right: 20px; background: rgba(255,255,255,0.1); border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center;">&times;</button>
                    <h2 style="color: var(--primary-color); margin: 0 0 8px 0; font-size: 22px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <i class="fas fa-dice text-primary"></i> CineMatch AI Cinema Roulette
                    </h2>
                    <p style="color: #bbb; font-size: 13px; margin-bottom: 20px;">Can't decide what film to watch? Pick a vibe or spin the wheel for an instant AI recommendation!</p>
                    
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 25px;">
                        <button onclick="UI.spinRoulette('28')" class="btn btn-outline btn-xs" style="border-color: rgba(255,255,255,0.2); color: #fff;"><i class="fas fa-bolt text-primary"></i> Action</button>
                        <button onclick="UI.spinRoulette('878')" class="btn btn-outline btn-xs" style="border-color: rgba(255,255,255,0.2); color: #fff;"><i class="fas fa-atom text-primary"></i> Sci-Fi</button>
                        <button onclick="UI.spinRoulette('35')" class="btn btn-outline btn-xs" style="border-color: rgba(255,255,255,0.2); color: #fff;"><i class="fas fa-laugh text-primary"></i> Comedy</button>
                        <button onclick="UI.spinRoulette('10749')" class="btn btn-outline btn-xs" style="border-color: rgba(255,255,255,0.2); color: #fff;"><i class="fas fa-heart text-primary"></i> Romance</button>
                        <button onclick="UI.spinRoulette('27')" class="btn btn-outline btn-xs" style="border-color: rgba(255,255,255,0.2); color: #fff;"><i class="fas fa-ghost text-primary"></i> Horror</button>
                        <button onclick="UI.spinRoulette('')" class="btn btn-primary btn-xs" style="background: var(--primary-color); color: #000; font-weight: 700;"><i class="fas fa-random"></i> Surprise Me!</button>
                    </div>

                    <div id="rouletteResult" style="min-height: 200px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.03); border-radius: 14px; padding: 20px; border: 1px dashed rgba(255,255,255,0.1);">
                        <p style="color: #777; font-size: 14px;">Select a vibe above to spin the Cinema Reel!</p>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            modal.onclick = (e) => {
                if (e.target === modal) this.closeRouletteModal();
            };
        }

        modal.style.pointerEvents = 'all';
        modal.style.opacity = '1';
        this.spinRoulette('');
    },

    closeRouletteModal() {
        const modal = document.getElementById('rouletteModal');
        if (modal) {
            modal.style.opacity = '0';
            modal.style.pointerEvents = 'none';
        }
    },

    async spinRoulette(genre = '') {
        const container = document.getElementById('rouletteResult');
        if (!container) return;

        container.innerHTML = `
            <div style="text-align: center; padding: 30px;">
                <i class="fas fa-compact-disc fa-spin fa-3x text-primary" style="margin-bottom: 12px;"></i>
                <p style="color: #ccc; font-size: 14px; font-weight: 600;">Spinning the AI Cinema Wheel...</p>
            </div>
        `;

        const movies = await apiDiscoverMovies(genre, '', 'popularity.desc');
        if (!movies || movies.length === 0) {
            container.innerHTML = '<p class="text-muted">No movies found for this vibe.</p>';
            return;
        }

        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        const safeTitle = (randomMovie.title || 'Movie').replace(/'/g, "\\'");

        setTimeout(() => {
            container.innerHTML = `
                <div style="display: flex; gap: 20px; align-items: center; text-align: left; width: 100%; flex-wrap: wrap;">
                    <img src="${randomMovie.image_url}" alt="${randomMovie.title}" style="width: 110px; height: 160px; object-fit: cover; border-radius: 10px; box-shadow: 0 8px 20px rgba(0,0,0,0.8);">
                    <div style="flex: 1; min-width: 220px;">
                        <span class="badge badge-primary" style="margin-bottom: 6px;">★ ${randomMovie.rating}/10 &bull; ${randomMovie.genre || 'Cinema'}</span>
                        <h3 style="margin: 0 0 6px 0; color: #fff; font-size: 20px; font-weight: 700;">${randomMovie.title}</h3>
                        <p style="color: #aaa; font-size: 12px; line-height: 1.5; margin-bottom: 14px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                            ${randomMovie.description}
                        </p>
                        <div style="display: flex; gap: 8px;">
                            <button onclick="UI.closeRouletteModal(); app.playTrailerDirect('${randomMovie.id}', '${safeTitle}');" class="btn btn-primary btn-xs"><i class="fas fa-play"></i> Watch Trailer</button>
                            <a href="movie-details.html?id=${randomMovie.id}" class="btn btn-outline btn-xs"><i class="fas fa-info-circle"></i> Details</a>
                        </div>
                    </div>
                </div>
            `;
        }, 600);
    }
};
