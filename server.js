const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname);
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
const routes = { '/': '/index.html', '/portal': '/portal.html', '/portal/': '/portal.html' };

function safePath(rawUrl) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(rawUrl, 'http://localhost').pathname);
  } catch {
    return null;
  }
  if (pathname.includes('\\') || pathname.includes('\0')) return null;
  const requested = routes[pathname] || pathname;
  const resolved = path.resolve(root, '.' + requested);
  if (resolved !== root && !resolved.startsWith(root + path.sep)) return null;
  return resolved;
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    return res.end();
  }
  const file = safePath(req.url || '/');
  if (!file) {
    res.writeHead(400);
    return res.end('Bad request');
  }
  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end(req.method === 'HEAD' ? undefined : 'Not found');
    }
    fs.realpath(file, (realErr, realPath) => {
      if (realErr || (realPath !== root && !realPath.startsWith(root + path.sep))) {
        res.writeHead(403);
        return res.end();
      }
      fs.readFile(realPath, (readErr, data) => {
        if (readErr) {
          res.writeHead(500);
          return res.end();
        }
        res.writeHead(200, {
          'Content-Type': mime[path.extname(realPath).toLowerCase()] || 'application/octet-stream',
          'Cache-Control': path.extname(realPath) === '.html' ? 'no-cache' : 'public, max-age=86400',
          'X-Content-Type-Options': 'nosniff'
        });
        res.end(req.method === 'HEAD' ? undefined : data);
      });
    });
  });
});
server.listen(port, '0.0.0.0', () => console.log(`EUNIJOPA EduCore MVP listening on ${port}`));
