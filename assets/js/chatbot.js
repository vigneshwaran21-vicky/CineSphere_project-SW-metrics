/* CineSphere AI - Smart Conversational Movie Assistant */
const CineBot = {
    isOpen: false,

    init() {
        if (!document.getElementById('cinebotTrigger')) {
            this.injectWidgetDOM();
            this.bindEvents();
            this.sendWelcomeMessage();
        }
    },

    injectWidgetDOM() {
        // Floating trigger button
        const trigger = document.createElement('div');
        trigger.id = 'cinebotTrigger';
        trigger.className = 'cinebot-trigger';
        trigger.title = 'Ask CineSphere AI Assistant';
        trigger.innerHTML = `
            <div class="cinebot-pulse"></div>
            <i class="fas fa-robot cinebot-icon"></i>
            <span class="cinebot-badge">AI</span>
        `;
        document.body.appendChild(trigger);

        // Chat Drawer Modal
        const drawer = document.createElement('div');
        drawer.id = 'cinebotDrawer';
        drawer.className = 'cinebot-drawer glass-card';
        drawer.innerHTML = `
            <div class="cinebot-header">
                <div class="cinebot-header-info">
                    <div class="cinebot-avatar"><i class="fas fa-robot"></i></div>
                    <div>
                        <h4 class="cinebot-title">CineSphere AI</h4>
                        <span class="cinebot-status"><span class="cinebot-status-dot"></span> Active &bull; TMDB</span>
                    </div>
                </div>
                <div class="cinebot-header-actions">
                    <button class="cinebot-action-btn" title="Clear Chat" onclick="CineBot.clearChat()"><i class="fas fa-trash-alt"></i></button>
                    <button class="cinebot-action-btn" title="Close" onclick="CineBot.toggle()">&times;</button>
                </div>
            </div>

            <div class="cinebot-body" id="cinebotMessages">
                <!-- Chat messages injected here -->
            </div>

            <div class="cinebot-pills-bar" id="cinebotPills">
                <button class="cinebot-pill" onclick="CineBot.handlePillClick('🍿 Trending Movies')">🍿 Trending</button>
                <button class="cinebot-pill" onclick="CineBot.handlePillClick('🤖 Best Sci-Fi Movies')">🤖 Sci-Fi</button>
                <button class="cinebot-pill" onclick="CineBot.handlePillClick('🌐 Japanese & Asian Cinema')">🌐 Languages</button>
                <button class="cinebot-pill" onclick="CineBot.handlePillClick('🔥 Top Action Movies')">🔥 Action</button>
            </div>

            <form class="cinebot-footer" id="cinebotForm" onsubmit="CineBot.handleSubmit(event)">
                <input type="text" id="cinebotInput" placeholder="Ask CineSphere AI for movie recommendations, languages, or downloads..." autocomplete="off">
                <button type="submit" class="cinebot-send-btn" id="cinebotSendBtn"><i class="fas fa-paper-plane"></i></button>
            </form>
        `;
        document.body.appendChild(drawer);
    },

    bindEvents() {
        const trigger = document.getElementById('cinebotTrigger');
        if (trigger) trigger.addEventListener('click', () => this.toggle());
    },

    toggle() {
        this.isOpen = !this.isOpen;
        const drawer = document.getElementById('cinebotDrawer');
        const trigger = document.getElementById('cinebotTrigger');
        if (drawer) drawer.classList.toggle('active', this.isOpen);
        if (trigger) trigger.classList.toggle('active', this.isOpen);
        if (this.isOpen) {
            setTimeout(() => {
                const input = document.getElementById('cinebotInput');
                if (input) input.focus();
            }, 300);
        }
    },

    sendWelcomeMessage() {
        const messages = document.getElementById('cinebotMessages');
        if (!messages || messages.children.length > 0) return;

        this.appendBotMessage(`
            Hello! 👋 I'm **CineSphere AI**, your intelligent movie assistant.
            \nI can recommend trending movies, find trailers, filter by language or genre, and answer cinema questions.
            \nHow can I help you today?
        `);
    },

    appendUserMessage(text) {
        const messages = document.getElementById('cinebotMessages');
        const msgDiv = document.createElement('div');
        msgDiv.className = 'cinebot-msg user';
        msgDiv.innerHTML = `
            <div class="cinebot-msg-content">${this.escapeHTML(text)}</div>
        `;
        messages.appendChild(msgDiv);
        this.scrollToBottom();
    },

    appendBotMessage(htmlContent) {
        const messages = document.getElementById('cinebotMessages');
        const msgDiv = document.createElement('div');
        msgDiv.className = 'cinebot-msg bot';
        msgDiv.innerHTML = `
            <div class="cinebot-avatar-sm"><i class="fas fa-robot"></i></div>
            <div class="cinebot-msg-content">${this.formatMarkdown(htmlContent)}</div>
        `;
        messages.appendChild(msgDiv);
        this.scrollToBottom();
    },

    showTyping() {
        const messages = document.getElementById('cinebotMessages');
        const typing = document.createElement('div');
        typing.id = 'cinebotTyping';
        typing.className = 'cinebot-msg bot typing';
        typing.innerHTML = `
            <div class="cinebot-avatar-sm"><i class="fas fa-robot"></i></div>
            <div class="cinebot-typing-dots">
                <span></span><span></span><span></span>
            </div>
        `;
        messages.appendChild(typing);
        this.scrollToBottom();
    },

    hideTyping() {
        const typing = document.getElementById('cinebotTyping');
        if (typing) typing.remove();
    },

    handlePillClick(text) {
        document.getElementById('cinebotInput').value = text;
        this.processUserInput(text);
    },

    handleSubmit(e) {
        e.preventDefault();
        const input = document.getElementById('cinebotInput');
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        this.processUserInput(text);
    },

    async processUserInput(text) {
        this.appendUserMessage(text);
        this.showTyping();

        const lower = text.toLowerCase().trim();
        const cleanWords = lower.replace(/[^\w\s]/gi, '').trim().split(/\s+/);

        // 1. General Greetings Intent vs 'Hi' Movie
        if (lower === 'hi' || lower === 'hi!' || (cleanWords.length === 1 && cleanWords[0] === 'hi')) {
            setTimeout(() => {
                this.hideTyping();
                this.appendBotMessage(`
                    Hello! 👋 I'm **CineSphere AI**, your intelligent cinema assistant.
                    \nAre you looking for cinema recommendations, or searching for the movie **'Hi' / 'Hi Nanna'** (released in Tamil/Telugu)?
                    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px;">
                        <button class="cinebot-pill" onclick="CineBot.handlePillClick('Hi Nanna')">🎬 'Hi' Movie</button>
                        <button class="cinebot-pill" onclick="CineBot.handlePillClick('Tamil movies')">🌐 Tamil Movies</button>
                        <button class="cinebot-pill" onclick="CineBot.handlePillClick('🍿 Trending Movies')">🍿 Trending</button>
                    </div>
                `);
            }, 350);
            return;
        }

        const greetingWords = ['hello', 'hey', 'greetings', 'hola', 'namaste', 'good morning', 'good evening', 'hi there', 'sup', 'yo'];
        if (greetingWords.includes(lower) || (cleanWords.length === 1 && greetingWords.includes(cleanWords[0]))) {
            setTimeout(() => {
                this.hideTyping();
                this.appendBotMessage(`
                    Hello! 👋 I'm **CineSphere AI**, your intelligent cinema assistant.
                    \nI can answer questions or help you find great movies and trailers.
                    \nWhat kind of movies do you feel like watching today?
                `);
            }, 400);
            return;
        }

        // 2. General Knowledge Q&A Engine
        const generalAnswers = {
            'ai': '🤖 **Artificial Intelligence (AI)** refers to computer systems engineered to perform tasks that typically require human intelligence, such as visual perception, natural language processing, decision-making, and machine learning.',
            'chatgpt': '💡 **ChatGPT** is an AI language model developed by OpenAI that processes and generates human-like text based on natural language prompts.',
            'quantum': '⚛️ **Quantum Computing** leverages principles of quantum mechanics (like superposition and entanglement) to solve complex computational problems exponentially faster than classical supercomputers.',
            'html': '💻 **HTML (HyperText Markup Language)** is the standard markup language used to structure web content and pages across the internet.',
            'css': '🎨 **CSS (Cascading Style Sheets)** is used to style and layout web pages — including colors, fonts, glassmorphism, flexbox, grid, and responsive animations.',
            'javascript': '⚡ **JavaScript (JS)** is a dynamic programming language that enables interactive web functionality, API fetching, real-time UI updates, and web applications.',
            'joke': '😄 **Here is a quick joke for you:**\n*Why do programmers prefer dark mode?*\nBecause light attracts bugs! 🐛',
            'einstein': '🧠 **Albert Einstein** (1879–1955) was a legendary theoretical physicist who developed the theory of relativity (E=mc²), revolutionizing our understanding of space, time, and gravity.',
            'capital of france': '🇫🇷 The capital of France is **Paris**, known globally for its art, fashion, gastronomy, and the Eiffel Tower.',
            'capital of india': '🇮🇳 The capital of India is **New Delhi**, the political seat of the world\'s largest democracy.',
            'capital of usa': '🇺🇸 The capital of the United States is **Washington, D.C.**',
            'nolan': '🎬 **Christopher Nolan** is an acclaimed director known for mind-bending films like *Inception*, *Interstellar*, *The Dark Knight*, and *Oppenheimer*.',
            'marvel': '🦸 **Marvel Studios** is famous for the Marvel Cinematic Universe (MCU), bringing iconic superheroes like Iron Man, Captain America, Thor, and Spider-Man to cinema screens worldwide.'
        };

        for (let [qKey, aAns] of Object.entries(generalAnswers)) {
            if (lower.includes(qKey)) {
                setTimeout(() => {
                    this.hideTyping();
                    this.appendBotMessage(aAns);
                }, 400);
                return;
            }
        }

        // Math evaluator (e.g. "what is 25 * 4" or "calc 100 / 5")
        const mathMatch = lower.match(/(?:what is|calculate|calc)?\s*(\d+\s*[\+\-\*\/]\s*\d+)/i);
        if (mathMatch) {
            try {
                const expr = mathMatch[1];
                const res = Function('"use strict";return (' + expr + ')')();
                setTimeout(() => {
                    this.hideTyping();
                    this.appendBotMessage(`🧮 **Calculation Result:**\n\`${expr}\` = **${res}**`);
                }, 300);
                return;
            } catch(e) {}
        }

        // 3. Website Identity & Help Intent
        if (lower.includes('who are you') || lower.includes('what is cinesphere') || lower.includes('what can you do') || lower.includes('help')) {
            setTimeout(() => {
                this.hideTyping();
                this.appendBotMessage(`
                    🎬 **Welcome to CineSphere**!
                    \nI am your **AI Cinema Assistant**:
                    \n1. **Movie Recommendations**: Ask for any genre, actor, or mood (e.g., *"Best Sci-Fi Movies"* or *"Action movies"*).
                    \n2. **Language Discovery**: Search for movies in Hindi, Tamil, Telugu, Japanese anime, Korean, and English.
                    \n3. **Trailers & Info**: View movie details, ratings, and instant HD trailers!
                `);
            }, 400);
            return;
        }

        // 4. Explicit Language Intent
        const langMap = {
            'japanese': { name: 'JAPANESE ANIME', code: 'ja' },
            'anime': { name: 'JAPANESE ANIME', code: 'ja' },
            'japan': { name: 'JAPANESE', code: 'ja' },
            'hindi': { name: 'HINDI', code: 'hi' },
            'bollywood': { name: 'HINDI (BOLLYWOOD)', code: 'hi' },
            'tamil': { name: 'TAMIL', code: 'ta' },
            'telugu': { name: 'TELUGU', code: 'te' },
            'spanish': { name: 'SPANISH', code: 'es' },
            'french': { name: 'FRENCH', code: 'fr' },
            'korean': { name: 'KOREAN', code: 'ko' },
            'german': { name: 'GERMAN', code: 'de' },
            'english': { name: 'ENGLISH', code: 'en' }
        };
        
        let foundLang = null;
        let matchedLangKey = '';
        for (let [key, val] of Object.entries(langMap)) {
            if (cleanWords.includes(key) || lower.includes(key)) {
                foundLang = val;
                matchedLangKey = key;
                break;
            }
        }

        // Check if query is just a language request (e.g. "tamil movies") or contains a specific title (e.g. "hi in tamil", "hi movie tamil")
        const strippedQuery = lower
            .replace(new RegExp('\\b' + matchedLangKey + '\\b', 'gi'), '')
            .replace(/\b(movies?|movives?|films?|cinemas?|padams?|padangals?|in|the|best|top|show|find|search|for|watch|download|trailer)\b/gi, '')
            .trim();

        if (foundLang && strippedQuery.length === 0) {
            const movies = typeof apiDiscoverMovies === 'function' ? await apiDiscoverMovies('', foundLang.code, 'popularity.desc') : [];
            this.hideTyping();
            if (movies && movies.length > 0) {
                this.renderMovieRecommendationList(`🌐 Top **${foundLang.name}** Movies:`, movies.slice(0, 4));
            } else {
                this.appendBotMessage(`Sorry, no ${foundLang.name} movies found at the moment. Try searching for specific titles!`);
            }
            return;
        }

        // 5. Genre Intent
        const genreMap = {
            'sci-fi': '878', 'scifi': '878', 'science fiction': '878',
            'action': '28', 'comedy': '35', 'horror': '27',
            'animation': '16', 'drama': '18', 'romance': '10749', 'adventure': '12'
        };
        
        let foundGenreId = null;
        let foundGenreName = '';
        for (let [gName, gId] of Object.entries(genreMap)) {
            if (lower.includes(gName)) {
                foundGenreId = gId;
                foundGenreName = gName.toUpperCase();
                break;
            }
        }

        if (foundGenreId && strippedQuery.length === 0) {
            const movies = typeof apiDiscoverMovies === 'function' ? await apiDiscoverMovies(foundGenreId, '', 'popularity.desc') : [];
            this.hideTyping();
            if (movies && movies.length > 0) {
                this.renderMovieRecommendationList(`🎬 Top **${foundGenreName}** Movies:`, movies.slice(0, 4));
            } else {
                this.appendBotMessage(`No ${foundGenreName} movies found right now.`);
            }
            return;
        }

        // 6. Default Live Movie & Knowledge Search Fallback
        const cleanSearch = text
            .replace(/\b(i\s+need|i\s+want|can\s+you\s+give|can\s+you\s+find|can\s+you\s+show|give\s+me|find\s+me|show\s+me|tell\s+me\s+about|looking\s+for|search\s+for|search|find|movies?|movives?|films?|cinemas?|padams?|padangals?|in\s+tamil|in\s+telugu|in\s+hindi|in\s+english|watch|download|trailer|please)\b/gi, '')
            .replace(/[^\w\s:]/gi, '')
            .trim();
        const searchQuery = cleanSearch.length > 0 ? cleanSearch : text;

        const searchResults = typeof apiSearchMovies === 'function' ? await apiSearchMovies(searchQuery) : [];
        this.hideTyping();

        if (searchResults && searchResults.length > 0) {
            const isHi = searchQuery.toLowerCase() === 'hi' || lower.includes('hi movie') || lower.includes('hi movive') || lower.includes('need hi');
            const header = isHi ?
                `🎬 Results for **"Hi"** (including Tamil release & *"Hi Nanna"*):` :
                `🔍 Results for "${this.escapeHTML(searchQuery)}":`;
            this.renderMovieRecommendationList(header, searchResults.slice(0, 4));
        } else {
            this.appendBotMessage(`
                🤖 **CineSphere AI Response:**
                \nI searched for **"${this.escapeHTML(text)}"**. While I couldn't find an exact movie match in the catalog, I can help you discover movies by genre or language!
                \nTry asking for *"Trending movies"*, *"Best Sci-Fi"*, or *"Tamil movies"*!
            `);
        }
    },

    renderMovieRecommendationList(titleHeader, movies) {
        let html = `${titleHeader}<div class="cinebot-cards-grid">`;
        movies.forEach(m => {
            html += `
                <div class="cinebot-card">
                    <img src="${m.image_url}" alt="${m.title}">
                    <div class="cinebot-card-info">
                        <h5>${this.escapeHTML(m.title)}</h5>
                        <span>⭐ ${m.rating}/10 &bull; ${m.original_language || 'EN'} &bull; ${m.release_date ? m.release_date.split('-')[0] : 'N/A'}</span>
                        <div class="cinebot-card-actions">
                            <a href="movie-details.html?id=${m.id}" class="btn btn-primary btn-xs"><i class="fas fa-info-circle"></i> Details</a>
                            <button class="btn btn-outline btn-xs" onclick="CineBot.previewTrailer('${m.id}', '${this.escapeHTML(m.title.replace(/'/g, "\\'"))}')"><i class="fas fa-video"></i> Trailer</button>
                        </div>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
        this.appendBotMessage(html);
    },

    async previewTrailer(movieId, title) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            if (typeof UI !== 'undefined' && UI.showAuthAlert) UI.showAuthAlert('Watch HD Trailers');
            return;
        }

        const trailers = typeof apiGetMovieTrailers === 'function' ? await apiGetMovieTrailers(movieId) : [];
        if (trailers && trailers.length > 0) {
            if (typeof UI !== 'undefined' && UI.openTrailerModal) {
                UI.openTrailerModal(trailers[0].key, title);
            }
        } else {
            if (typeof UI !== 'undefined' && UI.showToast) {
                UI.showToast('No HD trailer available for this movie.', 'info');
            }
        }
    },

    clearChat() {
        document.getElementById('cinebotMessages').innerHTML = '';
        this.sendWelcomeMessage();
    },

    scrollToBottom() {
        const messages = document.getElementById('cinebotMessages');
        if (messages) messages.scrollTop = messages.scrollHeight;
    },

    escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    },

    formatMarkdown(text) {
        if (!text) return '';
        return String(text)
            .split(/\\n|\n/)
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
    }
};

window.CineBot = CineBot;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CineBot.init());
} else {
    CineBot.init();
}
