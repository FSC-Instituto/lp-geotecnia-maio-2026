const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const normalizedRoot = path.resolve(root);
const port = Number(process.env.PORT || 4176);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".mp4": "video/mp4"
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

    res.writeHead(200, { "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Página de obrigado rodando em http://localhost:${port}`);
});
