import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.argv[2] || 8790);
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml",
  ".png": "image/png", ".txt": "text/plain; charset=utf-8",
};
const publicFiles = new Set(["index.html", "styles.css", "app.js", "site.config.js", "assets/favicon.svg"]);

createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname); }
  catch { response.writeHead(400).end("Bad request"); return; }
  const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);
  const target = resolve(root, relativePath);
  if (!publicFiles.has(relativePath) || !target.startsWith(root + sep)) {
    response.writeHead(404).end("Not found");
    return;
  }
  try {
    const content = await readFile(target);
    response.writeHead(200, {
      "Content-Type": types[extname(target)] || "application/octet-stream",
      "Content-Length": content.length,
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch { response.writeHead(404).end("Not found"); }
}).listen(port, "127.0.0.1", () => {
  console.log(`Umesh Sharda’s website is ready at http://localhost:${port}`);
}).on("error", (error) => {
  console.error(error.code === "EADDRINUSE" ? `Port ${port} is busy. Try: node server.mjs ${port + 1}` : error.message);
  process.exitCode = 1;
});
