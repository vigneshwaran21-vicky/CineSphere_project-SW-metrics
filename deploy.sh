#!/bin/bash
# ============================================================
# CineSphere EC2 Deploy Script
# Run: bash /var/www/html/CineSphere/deploy.sh
# Or after chmod +x: ./deploy.sh
# ============================================================

set -e
SITE_DIR="/var/www/html/CineSphere"
WEB_ROOT="/var/www/html"

echo "🎬 CineSphere Deploy Starting..."

# ── 1. Pull latest code from GitHub ─────────────────────────
cd "$SITE_DIR" 2>/dev/null || cd "$WEB_ROOT"
git config --global --add safe.directory "$SITE_DIR" 2>/dev/null || true
git config --global --add safe.directory "*" 2>/dev/null || true
git reset --hard HEAD 2>/dev/null || true
git clean -fd 2>/dev/null || true
git fetch origin main -q
git reset --hard origin/main -q
git clean -fd
echo "✅ Code pulled from GitHub"

# ── 2. Fix Apache DocumentRoot (idempotent) ──────────────────
CURRENT_ROOT=$(grep "DocumentRoot" /etc/apache2/sites-enabled/000-default.conf | awk '{print $2}')
if [ "$CURRENT_ROOT" != "$SITE_DIR" ]; then
    sudo sed -i "s|DocumentRoot $CURRENT_ROOT|DocumentRoot $SITE_DIR|" /etc/apache2/sites-enabled/000-default.conf
    echo "✅ Apache DocumentRoot set to $SITE_DIR"
else
    echo "✅ Apache DocumentRoot already correct"
fi

# ── 3. Copy assets to web root (fallback for old index.html) ─
if [ -d "$WEB_ROOT/assets" ]; then
    sudo rm -rf "$WEB_ROOT/assets"
fi
sudo cp -r "$SITE_DIR/assets" "$WEB_ROOT/assets"
echo "✅ Assets synced to web root"

# ── 4. Set correct permissions ───────────────────────────────
sudo chown -R www-data:www-data "$SITE_DIR"
sudo chmod -R 755 "$SITE_DIR"
sudo chmod 644 "$SITE_DIR/backend"/*.php
echo "✅ Permissions set"

# ── 5. Restart Apache ────────────────────────────────────────
sudo systemctl restart apache2
echo "✅ Apache restarted"

# ── 6. Quick smoke test ──────────────────────────────────────
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost/backend/movies.php?action=all")
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Movies API: OK (HTTP 200)"
else
    echo "⚠️  Movies API returned HTTP $HTTP_CODE — check backend/movies.php"
fi

echo ""
echo "🚀 Deploy complete! Visit: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null || echo 'YOUR-EC2-IP')"
