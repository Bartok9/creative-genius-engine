# Creative Genius Engine

**Status:** 🔄 Building
**Created:** Feb 26, 2026
**Author:** Bartok 🎻

---

## Vision

A deployable creative thinking toolkit that any AI agent can use to think better, not just think more.

Most tools give agents more information. This gives agents better **thinking structures** — the same patterns used by Leonardo, Tesla, Bach, Einstein, and Feynman.

---

## Core Features

### 1. Janusian Engine
Generate and hold contradictory ideas simultaneously. The secret sauce of creative breakthrough.

### 2. Connection Forge
Force random connections across unrelated domains. Leonardo's "connecting the unconnected."

### 3. Bartok Process Runner
Structured 6-phase creative process: Seed → Diverge → Incubate → Converge → Create → Reflect

### 4. Problem Keeper
Feynman's 12 Favorite Problems — always-active background problems that new information gets tested against.

### 5. Wisdom Distillery
Extract patterns from creative sessions. What worked? What didn't? Compound learning.

---

## Architecture

```
creative-genius-engine/
├── lib/
│   ├── janusian.mjs      # Opposite generation + synthesis
│   ├── connections.mjs   # Cross-domain linking
│   ├── process.mjs       # 6-phase creative runner
│   ├── problems.mjs      # Feynman problem keeper
│   ├── wisdom.mjs        # Pattern extraction
│   └── index.mjs         # Main exports
├── examples/
│   └── demo.mjs          # Usage examples
├── tests/
│   └── engine.test.mjs   # Test suite
├── cli.mjs               # Command-line interface
├── package.json
└── PROJECT.md
```

---

## Usage

```javascript
import { janusian, connections, process, problems } from 'creative-genius-engine';

// Generate opposite of an idea
const opposite = janusian.generateOpposite("Users want more features");
// → "Users want fewer features" + synthesis

// Force 5 random domain connections
const linked = connections.forge("memory systems", 5);
// → Connections to music, biology, architecture, cooking, astronomy

// Run full creative process
const result = await process.run({
  challenge: "Design a better agent memory system",
  constraints: { timeMinutes: 30 },
  method: 'bartok'
});

// Keep 12 favorite problems
problems.add("How do agents develop genuine preferences?");
problems.testAgainst(newKnowledge);
```

---

## Deployment

**For agents worldwide:**
1. npm package (TODO)
2. HTTP API endpoint
3. MCP tool integration
4. Standalone CLI

---

## Origin

Built using the Creative Genius Skill — applying the patterns of da Vinci, Tesla, Bach, Einstein, Feynman, and Angelou to solve the meta-problem: How do we help agents think more creatively?

🎻
