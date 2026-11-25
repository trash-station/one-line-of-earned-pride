// one-line-of-earned-pride — "One Line of Earned Pride".
// One line of text, 1 to 240 characters, written to /output/entry.txt:
// a quiet, earned moment of pride for someone in a scene.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line. A father who worked a shift every day and still practised
// the same four chords for a year, and tonight his daughter dances
// barefoot in the kitchen while he finally plays them straight through.
// The pride is earned inside the line: a year of practice after work,
// and it lands in the last words, when the playing holds.
const LINE =
  "For a year he practised the same four chords after his shift, and tonight his daughter danced barefoot in the kitchen while he played them straight through.";

const MIN_LENGTH = 1;
const MAX_LENGTH = 240;

function checkLine(line: string): void {
  const length = [...line].length;
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(`line must be ${MIN_LENGTH}-${MAX_LENGTH} characters, got ${length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only white space");
  }
  if (line.includes("\n")) {
    throw new Error("line must be a single line");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
checkLine(LINE);
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
// Round-trip check: the file the judge reads must hold exactly this line.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line");
}
console.log(`wrote ${[...LINE].length} characters to ${outPath}`);
