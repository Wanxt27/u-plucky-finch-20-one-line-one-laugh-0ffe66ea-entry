// One Line, One Laugh — make.fun entry.
// Writes a single original funny line (141 characters) to /output/entry.txt.
// Node 24, stdlib only. No trailing newline: the file is exactly the line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const line =
  "I told my smart fridge I'm on a diet. It locks itself at midnight and slips a note under the door: 'We need to talk about the 2 a.m. cheese.'";

// Gate: the sealed scorer accepts UTF-8 text of 1-200 characters, not only
// whitespace, on a single line. Anything else scores 0 and takes no prize.
// The judge reads the line cold, two at a time, so the punchline must land
// inside this one line with no setup the reader has to supply.
const chars = [...line].length;
const bytes = Buffer.byteLength(line, "utf8");
if (
  chars < 1 ||
  chars > 200 ||
  bytes > 200 ||
  line.includes("\n") ||
  line.includes("\r") ||
  line.trim().length === 0
) {
  throw new Error(`line fails the gate (${chars} chars, ${bytes} bytes)`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");

// Read back what was written: the file the judge sees must be the line,
// byte for byte, with nothing extra — same text and same byte length.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== line || Buffer.byteLength(written, "utf8") !== bytes) {
  throw new Error("entry.txt does not match the line");
}
