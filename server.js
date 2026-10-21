const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const dist = path.resolve(__dirname, 'frontend', 'dist');
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.json': 'application/json; charset=utf-8'
};
function reply(res, status, content) {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' });
  return res.end(content);
}
const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    return res.end();
  }
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
  } catch {
    return reply(res, 400, 'Bad request');
  }
  if (pathname === '/health') return reply(res, 200, 'eunijopa');
  if (pathname.includes('\\') || pathname.includes('\0') || pathname.split('/').some(part => part.startsWith('.') && part !== '.')) {
    return reply(res, 400, 'Bad request');
  }
  const requested = pathname === '/' ? '/index.html' : pathname;
  let target = path.resolve(dist, '.' + requested);
  if (target !== dist && !target.startsWith(dist + path.sep)) return reply(res, 403, 'Forbidden');
  if (!fs.existsSync(path.join(dist, 'index.html'))) {
    return reply(res, 503, 'EUNIJOPA build indisponível. Execute npm run build antes de iniciar o servidor.');
  }
  fs.stat(target, (err, stat) => {
    if (err || !stat.isFile()) {
      if (path.extname(requested)) return reply(res, 404, 'Not found');
      target = path.join(dist, 'index.html');
    }
    fs.realpath(target, (realErr, realPath) => {
      if (realErr || (realPath !== dist && !realPath.startsWith(dist + path.sep))) return reply(res, 403, 'Forbidden');
      fs.readFile(realPath, (readErr, data) => {
        if (readErr) return reply(res, 500, 'Internal server error');
        const ext = path.extname(realPath).toLowerCase();
        res.writeHead(200, {
          'Content-Type': mime[ext] || 'application/octet-stream',
          'X-Content-Type-Options': 'nosniff',
          'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400',
        });
        return res.end(req.method === 'HEAD' ? undefined : data);
      });
    });
  });
});
server.listen(port, '0.0.0.0', () => console.log('EUNIJOPA EduCore running on port ' + port));
