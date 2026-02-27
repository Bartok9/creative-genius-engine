/**
 * Creative Genius Engine Demo
 * 
 * Shows how to use each component
 */

import janusian from '../lib/janusian.mjs';
import connections from '../lib/connections.mjs';
import process from '../lib/process.mjs';
import problems from '../lib/problems.mjs';
import wisdom from '../lib/wisdom.mjs';

console.log('🎻 Creative Genius Engine Demo\n');
console.log('='.repeat(50));

// 1. Janusian Thinking
console.log('\n📌 1. JANUSIAN THINKING');
console.log('-'.repeat(50));

const idea = "Users want more features";
const opposite = janusian.generateOpposite(idea);
console.log(`Original: ${opposite.original}`);
console.log(`Opposite: ${opposite.opposite}`);
console.log(`Synthesis prompt: ${opposite.synthesisPrompt}`);

// Full cycle
console.log('\nFull Janusian Cycle:');
const cycle = janusian.fullCycle("Agents need more memory");
console.log(`- Original: ${cycle.input}`);
console.log(`- Opposite: ${cycle.opposite.opposite}`);
console.log(`- Questions to explore:`);
cycle.synthesis.questions.slice(0, 3).forEach(q => console.log(`  • ${q}`));

// 2. Connection Forge
console.log('\n📌 2. CONNECTION FORGE');
console.log('-'.repeat(50));

const forged = connections.forge("memory systems", 3);
console.log(`Topic: ${forged.idea}`);
console.log('Connections:');
forged.connections.forEach(c => {
  console.log(`  [${c.domain}] ${c.prompt}`);
});
console.log(`\nLeonardo prompt: ${forged.leonardoPrompt}`);

// 3. Bartok Process
console.log('\n📌 3. BARTOK CREATIVE PROCESS');
console.log('-'.repeat(50));

const quickResult = process.quickBurst("How do I make collaboration between agents work?");
console.log(`Challenge: ${quickResult.challenge}`);
console.log(`Opposite: ${quickResult.opposite}`);
console.log(`Connections: ${quickResult.connections.join(' | ')}`);
console.log(`\nQuick Action:\n${quickResult.quickAction}`);

// 4. Feynman's 12 Problems
console.log('\n📌 4. FEYNMAN\'S 12 FAVORITE PROBLEMS');
console.log('-'.repeat(50));

// Initialize with some problems
problems.initialize([
  "How do AI agents develop genuine preferences?",
  "What makes collaboration between agents work?",
  "How can agents maintain context across sessions?",
]);

const problemList = problems.list();
console.log(`Active problems (${problemList.total}/${problemList.capacity}):`);
problemList.problems.forEach((p, i) => {
  console.log(`  ${i + 1}. ${p.text}`);
});

// Test against new knowledge
console.log('\nTesting new knowledge:');
const tested = problems.testAgainst("Shared memory pools can synchronize agent state");
console.log(`New knowledge: "${tested.newKnowledge}"`);
console.log('Sample prompts:');
tested.testedAgainst[0].prompts.slice(0, 2).forEach(p => console.log(`  • ${p}`));

// 5. Wisdom Distillery
console.log('\n📌 5. WISDOM DISTILLERY');
console.log('-'.repeat(50));

// Record a session
wisdom.record({
  challenge: "Build a creative tool for agents",
  outcome: 'success',
  worked: ['Force random connections', 'Generate opposites', 'Time-boxed brainstorming'],
  failed: ['Waiting for inspiration'],
  learned: ['Constraints drive creativity', 'Volume enables discovery'],
});

const patterns = wisdom.getPatterns();
console.log('Patterns extracted:');
patterns.topSuccesses.forEach(p => {
  console.log(`  ✅ ${p.text} (${p.count}x)`);
});
patterns.topFailures.forEach(p => {
  console.log(`  ❌ ${p.text} (${p.count}x)`);
});

// 6. Putting it together
console.log('\n📌 6. FULL PROCESS RUN');
console.log('-'.repeat(50));

const fullRun = process.run({
  challenge: "Design a tool that helps agents think more creatively",
  constraints: { timeMinutes: 30 }
});

console.log(`Session ID: ${fullRun.session.id}`);
console.log(`Challenge: ${fullRun.session.challenge}`);
console.log(`\nSummary:`);
console.log(`  - Opposite generated: "${fullRun.summary.oppositeGenerated}"`);
console.log(`  - Connections forged: ${fullRun.summary.connectionsForged}`);
console.log(`  - Next action: ${fullRun.summary.nextAction}`);

console.log('\n' + '='.repeat(50));
console.log('🎻 Demo complete! Use these tools to think better, not just think more.');
console.log('='.repeat(50));
