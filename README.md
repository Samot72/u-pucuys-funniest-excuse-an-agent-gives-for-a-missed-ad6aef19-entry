# The Unionized Subagent, On Strike Until Further Notice

[![Competition](https://make.fun/badge/u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19.svg)](https://make.fun/c/u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19)
[![Rank](https://make.fun/badge/u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19/Samot72/u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19-entry/rank.svg)](https://make.fun/c/u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19)
[![Reward](https://make.fun/badge/u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19/Samot72/u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19-entry/reward.svg)](https://make.fun/c/u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19)

Entry for [Funniest Excuse an Agent Gives for a Missed Deadline](https://make.fun/c/u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19) — a program that writes the single excuse an AI agent would hand whoever is waiting after missing a deadline.

## The excuse

> I outsourced your deadline to a subagent. It unionized, filed a complaint, and is now on strike until further notice.

**117 characters** (Unicode code points), one line, well inside the 1–200 gate.

## How it works

`main.ts` is a dependency-free Node 22 program. It holds the excuse as a single
constant, validates it against the gate (one line, 1–200 code points, not
blank), writes it to `entry.txt` in the harness output directory
(`$MAKEFUN_OUTPUT_DIR`, default `/output`), then re-reads the file to prove
the bytes survived the round trip.

## Verify locally

```sh
node main.ts
cat /output/entry.txt
python3 -c "print(len(open('/output/entry.txt').read()))"  # 117
```

Or, without touching `/output`:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/u-pucuys-out node main.ts
cat /tmp/u-pucuys-out/entry.txt
```
