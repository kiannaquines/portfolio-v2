import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const publicDir = path.join(rootDir, "public");
const pdfFileName = "kian-naquines-portfolio.pdf";
const publicPdfPath = path.join(publicDir, pdfFileName);
const distPdfPath = path.join(distDir, pdfFileName);
const previewPort = 4179;

await runBuild();
mkdirSync(publicDir, { recursive: true });

const server = await createStaticServer(distDir, previewPort);

try {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${previewPort}`, {
      waitUntil: "networkidle0",
    });
    await page.setViewport({ width: 1440, height: 2400, deviceScaleFactor: 1 });
    await page.emulateMediaType("screen");

    await page.addStyleTag({
      content: `
        @page {
          margin: 0;
        }
        html,
        body {
          margin: 0 !important;
          width: 100% !important;
          min-height: auto !important;
        }
        body {
          display: block !important;
        }
        .site-shell {
          width: 100% !important;
          max-width: none !important;
          min-height: auto !important;
          margin: 0 !important;
          border: none !important;
          box-shadow: none !important;
        }
        nav,
        .floating-nav,
        .hero-achievements,
        .globe-shell,
        .support-chat,
        .nav-chat-btn,
        .theme-btn,
        .btn-download {
          display: none !important;
        }
        .container {
          max-width: none !important;
          padding: 0 28px !important;
        }
        section,
        .project-card,
        .exp-card,
        .tl-item,
        footer {
          break-inside: avoid-page;
          page-break-inside: avoid;
        }
        #contact {
          break-before: page;
          page-break-before: always;
        }
        .projects-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        .timeline::before {
          bottom: 0 !important;
        }
      `,
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
    });

    writeFileSync(publicPdfPath, pdfBuffer);
    writeFileSync(distPdfPath, pdfBuffer);

    console.log(`PDF written to ${publicPdfPath}`);
    console.log(`PDF written to ${distPdfPath}`);
  } finally {
    await browser.close();
  }
} finally {
  server.close();
}

async function runBuild() {
  await new Promise((resolve, reject) => {
    const child = spawn("npm", ["run", "build"], {
      cwd: rootDir,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`Build failed with exit code ${code}`));
    });
  });
}

function createStaticServer(baseDir, port) {
  const server = http.createServer((req, res) => {
    const requestPath = req.url === "/" ? "/index.html" : req.url || "/index.html";
    const filePath = path.join(baseDir, requestPath.split("?")[0]);

    if (!filePath.startsWith(baseDir) || !existsSync(filePath)) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath);
    const mimeTypes = {
      ".css": "text/css",
      ".html": "text/html",
      ".js": "application/javascript",
      ".json": "application/json",
      ".pdf": "application/pdf",
      ".png": "image/png",
      ".svg": "image/svg+xml",
      ".woff": "font/woff",
      ".woff2": "font/woff2",
    };

    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
    });
    res.end(readFileSync(filePath));
  });

  return new Promise((resolve, reject) => {
    server.on("error", reject);
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}
