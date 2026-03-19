/**
 * One-time script: downloads Slai images from atencium-ui.com/slai.io
 * into public/Slai/WebDesign, public/Slai/Code Editor, public/Slai/Dashboard.
 * Run: node scripts/download-slai-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

const images = {
  WebDesign: [
    { url: "https://framerusercontent.com/images/rprKYNmiwWFwMR3Bo2AyHXBcdGU.png?width=2048&height=1536", name: "web-1.png" },
    { url: "https://framerusercontent.com/images/uNSp7BDNoQakzrEPz2bCNTFZxac.png?width=1024&height=682", name: "web-2.png" },
  ],
  "Code Editor": [
    { url: "https://framerusercontent.com/images/Si4ZCnO4bpyvyoayf5aojnKG8xI.png?width=2048&height=1648", name: "code-editor-1.png" },
    { url: "https://framerusercontent.com/images/6rUc2sn5qYlUh2xSY4sKZa9QeuY.png?width=3700&height=2977", name: "code-editor-2.png" },
    { url: "https://framerusercontent.com/images/Uk3QT4rKrgDmqPLRUf7MSLW7JM.png?width=2048&height=1648", name: "code-editor-3.png" },
  ],
  Dashboard: [
    { url: "https://framerusercontent.com/images/bn9paNupFuEo1nL4teyYRiz8.png?width=2048&height=1536", name: "dashboard-1.png" },
    { url: "https://framerusercontent.com/images/zWmj7k2GnKkSE74GgEVy8WquQho.png?width=2048&height=1536", name: "dashboard-2.png" },
    { url: "https://framerusercontent.com/images/iaN3UB92bpEwUIPdseCXUsDA8Ds.png?width=3700&height=2977", name: "dashboard-3.png" },
  ],
};

async function download(url, filePath) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${url} => ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, buf);
  console.log("Saved:", filePath);
}

async function main() {
  const base = path.join(publicDir, "Slai");
  for (const [folder, list] of Object.entries(images)) {
    const dir = path.join(base, folder);
    for (const { url, name } of list) {
      try {
        await download(url, path.join(dir, name));
      } catch (e) {
        console.error("Failed", url, e.message);
      }
    }
  }
  console.log("Done.");
}

main();
