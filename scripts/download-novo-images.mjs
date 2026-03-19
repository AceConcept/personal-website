/**
 * One-time script: downloads Novo images from atencium-ui.com/novo into public/Novo.
 * Run: node scripts/download-novo-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");
const novoDir = path.join(publicDir, "Novo");

const urls = [
  "https://framerusercontent.com/images/q6Z5iKwbaFbrPTkq6IcZt0XATI.png?width=2048&height=1648",
  "https://framerusercontent.com/images/Exhq00oupWE3gUMrJd23Wv8nNN8.png?width=2048&height=1648",
  "https://framerusercontent.com/images/s0LaIVM9dmHOFEW3o7RyKZLsakM.png?width=2048&height=1648",
  "https://framerusercontent.com/images/9eHHbfS3sOSfTZIwqBIZTARGWg.png?width=2048&height=1648",
  "https://framerusercontent.com/images/Kq4378iFPekS5xZvpxwxdXLqKQ.png?width=2452&height=1973",
];

async function download(url, filePath) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${url} => ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, buf);
  console.log("Saved:", filePath);
}

async function main() {
  for (let i = 0; i < urls.length; i++) {
    try {
      await download(urls[i], path.join(novoDir, `novo-${i + 1}.png`));
    } catch (e) {
      console.error("Failed", urls[i], e.message);
    }
  }
  console.log("Done.");
}

main();
