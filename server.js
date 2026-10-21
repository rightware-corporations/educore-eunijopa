const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function safePath(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const requested = clean === '/' ? '/index.html' : clean === '/portal' || clean === '/portal/' ? '/portal.html' : clean;
  const full = path.normalize(path.join(root, requested));
  return full.startsWith(root) ? full : null;
}

function serveEncodedAsset(urlPath, res) {
  if (!urlPath.startsWith('/assets/') || !urlPath.endsWith('.webp')) return false;
  const name = path.basename(urlPath, '.webp');
  const encodedPath = path.join(root, 'assets-src', name + '.b64');
  if (!fs.existsSync(encodedPath)) return false;

  try {
    const encoded = fs.readFileSync(encodedPath, 'utf8').replace(/\s+/g, '');
    const data = Buffer.from(encoded, 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/webp',
      'Content-Length': data.length,
      'Cache-Control': 'public, max-age=86400'
    });
    res.end(data);
    return true;
  } catch {
    return false;
  }
}

http.createServer((req, res) => {
  const rawUrl = req.url || '/';
  const cleanUrl = decodeURIComponent(rawUrl.split('?')[0]);
  const file = safePath(rawUrl);
  if (!file) {
    res.writeHead(400);
    return res.end('Bad request');
  }

  fs.stat(file, (err, stat) => {
    let target = file;
    if (!err && stat.isDirectory()) target = path.join(file, 'index.html');

    fs.readFile(target, (readErr, data) => {
      if (readErr) {
        if (serveEncodedAsset(cleanUrl, res)) return;
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Not found');
      }
      res.writeHead(200, {
        'Content-Type': mime[path.extname(target).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': path.extname(target) === '.html' ? 'no-cache' : 'public, max-age=86400'
      });
      res.end(data);
    });
  });
}).listen(port, '0.0.0.0', () => {
  console.log(`EUNIJOPA EduCore MVP listening on ${port}`);
});
