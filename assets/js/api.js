// Auto-detect base URL — works on localhost/CineMatch AND EC2 root (/)
const BASE_URL = (() => {
    const path = window.location.pathname;
    const match = path.match(/^(\/CineMatch)/i);
    return match ? match[1] + '/backend' : 'backend';
})();

async function apiRegister(name, email, password) {
    try {
        const res = await fetch(`${BASE_URL}/auth.php?action=register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json().catch(() => ({ message: `HTTP ${res.status} Server Error` }));
        if (!res.ok) throw new Error(data && data.message ? data.message : "Registration failed.");
        return data;
    } catch (e) {
        return { error: true, message: e.message || "Registration failed." };
    }
}

async function apiLogin(email, password) {
    try {
        const res = await fetch(`${BASE_URL}/auth.php?action=login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json().catch(() => ({ message: `HTTP ${res.status} Server Error` }));
        if (!res.ok) throw new Error(data && data.message ? data.message : "Invalid email or password.");
        return data;
    } catch (e) {
        return { error: true, message: e.message || "Invalid email or password." };
    }
}

async function apiForgotPassword(email) {
    try {
        const res = await fetch(`${BASE_URL}/auth.php?action=forgot`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await res.json().catch(() => ({ message: `HTTP ${res.status} Server Error` }));
        if (!res.ok) throw new Error(data && data.message ? data.message : "Password reset failed.");
        return data;
    } catch (e) {
        return { error: true, message: e.message || "Password reset failed." };
    }
}

async function apiResetPasswordWithToken(token, newPassword) {
    try {
        const res = await fetch(`${BASE_URL}/auth.php?action=reset_token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword })
        });
        const data = await res.json().catch(() => ({ message: `HTTP ${res.status} Server Error` }));
        if (!res.ok) throw new Error(data && data.message ? data.message : "Reset token failed.");
        return data;
    } catch (e) {
        return { error: true, message: e.message || "Reset token failed." };
    }
}

async function apiGetMovies() {
    try {
        const res = await fetch(`${BASE_URL}/movies.php?action=all&t=${new Date().getTime()}`);
        if (!res.ok) return { error: true, message: `HTTP ${res.status}` };
        const text = await res.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            return { error: true, message: `JSON Error: ${e.message}. Data: ${text.substring(0, 50)}` };
        }
    } catch (e) {
        return { error: true, message: `Fetch Error: ${e.message}` };
    }
}

async function apiSearchMovies(query) {
    try {
        const res = await fetch(`${BASE_URL}/movies.php?action=search&q=${encodeURIComponent(query)}`);
        return await res.json();
    } catch { return []; }
}

async function apiGetMovie(id) {
    try {
        const res = await fetch(`${BASE_URL}/movies.php?action=detail&id=${id}`);
        return await res.json();
    } catch { return null; }
}

async function apiGetWatchlist(userId) {
    try {
        const res = await fetch(`${BASE_URL}/watchlist.php?action=all&user_id=${userId}`);
        return await res.json();
    } catch { return []; }
}

async function apiAddToWatchlist(userId, movieId) {
    if (!userId) {
        if (typeof UI !== 'undefined' && UI.showToast) UI.showToast("Please log in first to manage your watchlist!", "error");
        if (typeof UI !== 'undefined' && UI.showAuthAlert) UI.showAuthAlert('Watchlist');
        return { error: true, message: "Please log in first to manage your watchlist." };
    }
    try {
        const res = await fetch(`${BASE_URL}/watchlist.php?action=add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, movie_id: movieId })
        });
        const data = await res.json();
        return data;
    } catch (e) {
        return { error: true, message: e.message };
    }
}

async function apiRemoveFromWatchlist(userId, movieId) {
    if (!userId) {
        if (typeof UI !== 'undefined' && UI.showToast) UI.showToast("Please log in first!", "error");
        if (typeof UI !== 'undefined' && UI.showAuthAlert) UI.showAuthAlert('Watchlist');
        return { error: true, message: "Please log in first." };
    }
    try {
        const res = await fetch(`${BASE_URL}/watchlist.php?action=remove`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, movie_id: movieId })
        });
        const data = await res.json();
        return data;
    } catch (e) {
        return { error: true, message: e.message };
    }
}

async function apiGetReviews(movieId) {
    try {
        const res = await fetch(`${BASE_URL}/reviews.php?action=movie&movie_id=${movieId}`);
        return await res.json();
    } catch { return []; }
}

async function apiAddReview(userId, movieId, comment, rating) {
    if (!userId) {
        if (typeof UI !== 'undefined' && UI.showToast) UI.showToast("Please log in first to post a review!", "error");
        if (typeof UI !== 'undefined' && UI.showAuthAlert) UI.showAuthAlert('Ratings & Reviews');
        return { error: true, message: "Please log in first to post a review." };
    }
    try {
        const res = await fetch(`${BASE_URL}/reviews.php?action=add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, movie_id: movieId, comment: comment, rating: rating })
        });
        const data = await res.json();
        return data;
    } catch (e) {
        return { error: true, message: e.message };
    }
}

async function apiUpdateReview(userId, movieId, comment, rating) {
    if (!userId) {
        if (typeof UI !== 'undefined' && UI.showToast) UI.showToast("Please log in first to update your review!", "error");
        if (typeof UI !== 'undefined' && UI.showAuthAlert) UI.showAuthAlert('Ratings & Reviews');
        return { error: true, message: "Please log in first to update your review." };
    }
    try {
        const res = await fetch(`${BASE_URL}/reviews.php?action=update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, movie_id: movieId, comment: comment, rating: rating })
        });
        const data = await res.json();
        return data;
    } catch (e) {
        return { error: true, message: e.message };
    }
}

async function apiDeleteReview(userId, movieId) {
    try {
        const res = await fetch(`${BASE_URL}/reviews.php?action=delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, movie_id: movieId })
        });
        const data = await res.json();
        return data;
    } catch (e) {
        return { error: true, message: e.message };
    }
}

async function apiGetTopRatedMovies() {
    try {
        const res = await fetch(`${BASE_URL}/movies.php?action=top_rated`);
        return await res.json();
    } catch { return []; }
}

async function apiDiscoverMovies(genre = '', language = '', sort = 'popularity.desc') {
    try {
        const res = await fetch(`${BASE_URL}/movies.php?action=discover&genre=${genre}&language=${language}&sort=${sort}`);
        return await res.json();
    } catch { return []; }
}

async function apiGetMovieTrailers(movieId) {
    try {
        const res = await fetch(`${BASE_URL}/movies.php?action=trailers&id=${movieId}`);
        return await res.json();
    } catch { return []; }
}

async function apiGetActorDetails(actorId) {
    try {
        const res = await fetch(`${BASE_URL}/movies.php?action=actor&id=${actorId}`);
        return await res.json();
    } catch { return null; }
}

async function apiGetActor(actorId) {
    return await apiGetActorDetails(actorId);
}
