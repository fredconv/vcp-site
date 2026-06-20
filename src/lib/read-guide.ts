import fs from "fs";
import path from "path";

const GUIDE_PATH = path.join(process.cwd(), "docs/GUIDE-COMITE-SHEETS.md");

export function getComiteGuideMarkdown(): string {
  return fs.readFileSync(GUIDE_PATH, "utf-8");
}
