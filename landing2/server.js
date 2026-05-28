const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const normalizedRoot = path.resolve(root);
const port = Number(process.env.PORT || 4175);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  const filePath = path.resolve(root, `.${urlPath === "/" ? "/index.html" : urlPath}`);

  if (!filePath.startsWith(normalizedRoot)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": types[ext] || "application/octet-stream",
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable"
    });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Instituto FSC rodando em http://localhost:${port}`);
});
