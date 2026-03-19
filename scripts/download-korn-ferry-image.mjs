import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "public", "KornFerry");
const url = "https://framerusercontent.com/images/fhpJpnNdCCNEVXrjUiFPIMwV8.png?width=1200&height=627";
async function download() {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(res.status);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "korn-ferry.png"), buf);
  console.log("Saved:", path.join(dir, "korn-ferry.png"));
}
download();
