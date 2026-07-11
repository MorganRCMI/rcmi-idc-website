# Deployment Guide - RCMI IDC Website (web_cleanup)

This guide explains how to deploy the cleaned-up RCMI IDC website to various platforms.

---

## 🚀 Quick Start

### Local Testing
```bash
cd web_cleanup

# Python 3
python -m http.server 8000

# Node.js
npx http-server

# Then open: http://localhost:8000
```

---

## 📤 Deployment Options

### Option 1: GitHub Pages (Recommended)

#### Step 1: Create GitHub Repository
```bash
cd web_cleanup
git init
git add .
git commit -m "Initial commit: RCMI IDC website (cleaned up version)"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rcmi-web-cleanup.git
git push -u origin main
```

#### Step 2: Enable GitHub Pages
1. Go to repository Settings
2. Navigate to Pages (left sidebar)
3. Set Source to `main` branch and `/root` directory
4. Save

**Result**: Site available at `https://YOUR_USERNAME.github.io/rcmi-web-cleanup/`

---

### Option 2: Netlify (Simple & Free)

#### Step 1: Connect Repository
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect GitHub account
4. Select repository

#### Step 2: Configure Build
- Build command: (leave empty - no build needed)
- Publish directory: `web_cleanup` (or `/` if web_cleanup is root)
- Click Deploy

**Result**: Site automatically deploys on every push

---

### Option 3: Traditional Web Server (Apache/Nginx)

#### Copy Files
```bash
# Copy web_cleanup folder to web server
scp -r web_cleanup/ user@server.com:/var/www/html/rcmi

# Or using SFTP
# Upload entire web_cleanup folder to public_html
```

#### Configure Web Server (Apache)

**.htaccess** (place in web_cleanup root):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Route all requests to index.html for SPA-like behavior (if needed)
  # RewriteCond %{REQUEST_FILENAME} !-f
  # RewriteCond %{REQUEST_FILENAME} !-d
  # RewriteRule ^ index.html [QSA,L]
  
  # Enable compression
  <IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/xml
  </IfModule>
  
  # Cache static assets
  <IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
  </IfModule>
</IfModule>
```

---

### Option 4: Docker Deployment

#### Dockerfile
```dockerfile
FROM nginx:alpine

# Copy website
COPY web_cleanup /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf
```nginx
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;

  # Cache static assets
  location ~* \.(css|js|png|jpg|jpeg|gif|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # Serve index.html for routes
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

#### Deploy
```bash
docker build -t rcmi-web .
docker run -d -p 80:80 rcmi-web
```

---

### Option 5: AWS S3 + CloudFront

#### Upload Files
```bash
aws s3 sync web_cleanup/ s3://your-bucket-name/

# Make files public
aws s3 sync s3://your-bucket-name/ s3://your-bucket-name/ --acl public-read
```

#### Enable Static Website Hosting
1. S3 Bucket → Properties
2. Static website hosting → Enable
3. Index document: `index.html`
4. Error document: `index.html`

#### CloudFront Distribution
1. Create new distribution
2. Origin: S3 bucket
3. Default root object: `index.html`
4. Add custom domain (optional)

---

## 🔐 Security Checklist

Before deploying:

- ✅ Update analytics code (if used)
- ✅ Update email addresses in contact pages
- ✅ Remove development comments from JavaScript
- ✅ Add HTTPS (most hosts provide free SSL)
- ✅ Set up security headers:

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 📊 Performance Optimization

### Minify Files (Optional, not required but recommended)

```bash
# Install tools
npm install -g cssnano terser

# Minify CSS
cssnano src/styles/*.css > src/styles/all.min.css

# Minify JS
terser src/js/*.js > src/js/all.min.js
```

Then link minified versions in HTML:
```html
<link rel="stylesheet" href="src/styles/all.min.css">
<script src="src/js/all.min.js"></script>
```

### Current Performance Metrics
- Total CSS: ~25 KB (easily gzips to 4 KB)
- Total JS: ~20 KB (easily gzips to 6 KB)
- HTML: ~50 KB total across all pages
- **All files gzipped: ~15 KB**

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./web_cleanup
        cname: rcmi-idc.morgan.edu  # Optional: custom domain
```

---

## 🌐 Custom Domain Setup

### GitHub Pages + Custom Domain
1. Create `CNAME` file in `web_cleanup/`:
```
rcmi-idc.morgan.edu
```

2. Update DNS records:
```
Type: CNAME
Name: rcmi-idc
Value: your-username.github.io
```

3. Enable HTTPS in GitHub Pages settings

---

## 📝 Updating Content

### Update CSV Data
Simply replace files in `data/`:
- `data/faculty.csv`
- `data/research.csv`
- `data/publications.csv`

Changes automatically reflect on next page load.

### Update Images
Replace/add images in `img/faculty/` folder.

### Update Text Content
Edit HTML files directly (no build step required).

---

## 🆘 Troubleshooting

### Pages show 404 on GitHub Pages

**Problem**: Routes like `/faculty.html` show 404

**Solution**: Ensure files are named correctly and paths are relative

```html
<!-- ✅ Correct -->
<a href="faculty.html">Faculty</a>

<!-- ❌ Wrong -->
<a href="/faculty.html">Faculty</a>
```

### CSS/JS not loading

**Problem**: Styles or scripts don't appear

**Solution**: Clear cache (Ctrl+Shift+Delete) and check paths:

```html
<!-- All paths relative to HTML location -->
<link rel="stylesheet" href="src/styles/global.css">
<script src="src/js/main.js"></script>
```

### Data not loading

**Problem**: Faculty/research data doesn't show

**Solution**: Check CSV files are in `data/` folder and CSV format matches expected headers

---

## 📈 Monitoring

### Set Up Analytics (Optional)

Add to `<head>` of all pages:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## ✅ Pre-Deployment Checklist

- [ ] All links work locally
- [ ] Images load correctly
- [ ] CSV data displays properly
- [ ] Mobile responsiveness tested
- [ ] Navigation menu works on mobile
- [ ] No console errors in DevTools
- [ ] Page titles are accurate
- [ ] Meta descriptions updated
- [ ] Email links are correct
- [ ] All pages have proper 404 handling

---

## 🎉 Success!

Once deployed, your website is live and:
- ✅ Has zero external dependencies
- ✅ Loads in <1 second
- ✅ Works on all devices
- ✅ Is easy to maintain
- ✅ Is easy to update

For questions, check the main **README.md** file.
