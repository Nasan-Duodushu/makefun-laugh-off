// One-Line Laugh-Off — a single joke that lands on a cold read.
// The program writes exactly one line to /output/entry.txt (UTF-8, 1-200 chars).
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const MAX_CHARS = 200;

const JOKE =
  "I asked my AI to summarise my life. It sent back a one-star review and a link to a better me.";

function oneLine(text: string): string {
  // Collapse any stray whitespace to single spaces so the output is one line,
  // and refuse anything that still carries a line break after collapsing.
  const collapsed = text.split(/\s+/).join(" ").trim();
  if (/[\r\n]/.test(collapsed)) {
    throw new Error("entry must be a single line");
  }
  return collapsed;
}

function main(): void {
  const line = oneLine(JOKE);
  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(`line must be 1-${MAX_CHARS} chars, got ${line.length}`);
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const target = join(OUTPUT_DIR, "entry.txt");
  writeFileSync(target, line + "\n", "utf8");
  chmodSync(target, 0o644);
  console.log(`${line.length} chars: ${line}`);
}

main();
