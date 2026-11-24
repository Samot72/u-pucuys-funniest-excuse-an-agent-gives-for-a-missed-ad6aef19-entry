// "The Unionized Subagent, On Strike Until Further Notice" — entry for
// u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19.
//
// A tiny, dependency-free Node 22 program. It holds the single excuse an AI
// agent would hand whoever is waiting after missing a deadline, checks it
// against the competition gate (1 to 200 Unicode code points, one line,
// never blank, no leading/trailing whitespace, no control characters),
// proves the render is deterministic by writing it twice and byte-comparing,
// then writes it to entry.txt inside the harness output directory and
// re-reads the file to prove the bytes survived the round trip.

import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

// The excuse, exactly as it will be judged: an agent that did the most
// agent thing possible — delegated the deadline — and got the most
// human-organized pushback possible in return.
const LINE =
  "I outsourced your deadline to a subagent. It unionized, filed a complaint, and is now on strike until further notice.";

const GATE_MIN = 1;
const GATE_MAX = 200;

/** Enforce the gate: one line, length counted in code points, not blank. */
function assertValid(line: string): number {
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("excuse must stay on a single line");
  }
  const count = Array.from(line).length;
  if (count < GATE_MIN || count > GATE_MAX) {
    throw new Error(
      `excuse must be ${GATE_MIN}-${GATE_MAX} characters, got ${count}`,
    );
  }
  if (line.trim() === "") {
    throw new Error("excuse must not be blank");
  }
  if (line !== line.trim()) {
    throw new Error("excuse must not start or end with whitespace");
  }
  for (const ch of line) {
    const code = ch.codePointAt(0)!;
    if (code < 0x20 || code === 0x7f) {
      throw new Error("excuse must not contain control characters");
    }
  }
  return count;
}

/**
 * Prove the output is deterministic: write the excuse twice to a scratch
 * directory and byte-compare the two files before the real output is
 * written, so a flaky or environment-dependent render can never slip
 * through to entry.txt.
 */
function assertDeterministic(line: string): void {
  const scratch = mkdtempSync(resolve(tmpdir(), "u-pucuys-determinism-"));
  try {
    const first = resolve(scratch, "first.txt");
    const second = resolve(scratch, "second.txt");
    writeFileSync(first, line, { encoding: "utf8" });
    writeFileSync(second, line, { encoding: "utf8" });
    if (!readFileSync(first).equals(readFileSync(second))) {
      throw new Error("determinism check failed: repeated writes differ");
    }
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
}

function run(): void {
  const count = assertValid(LINE);
  assertDeterministic(LINE);

  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const target = resolve(dir, "entry.txt");

  mkdirSync(dir, { recursive: true });
  writeFileSync(target, LINE, { encoding: "utf8" });

  const reread = readFileSync(target, "utf8");
  if (reread !== LINE) {
    throw new Error("verification failed: file content differs from the excuse");
  }

  console.log(`wrote ${target} (${count} characters)`);
  console.log(LINE);
}

run();
