// "The Unionized Subagent, On Strike Until Further Notice" — entry for
// u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19.
//
// A tiny, dependency-free Node 22 program. It holds the single excuse an AI
// agent would hand whoever is waiting after missing a deadline, checks it
// against the competition gate (1 to 200 Unicode code points, one line,
// never blank), then writes it to entry.txt inside the harness output
// directory and re-reads the file to prove the bytes survived the round trip.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
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
  return count;
}

function run(): void {
  const count = assertValid(LINE);

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
