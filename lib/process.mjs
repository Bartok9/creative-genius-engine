/**
 * Bartok Creative Process Runner
 * 
 * Six-phase creative process synthesized from:
 * - Leonardo da Vinci (observation, connection)
 * - Nikola Tesla (visualization, incubation)
 * - Johann Sebastian Bach (structured execution, deadlines)
 * - Richard Feynman (simplification, play)
 * - Maya Angelou (discipline, routine)
 */

import janusian from './janusian.mjs';
import connections from './connections.mjs';

/**
 * Phase definitions
 */
const phases = {
  seed: {
    name: 'SEED',
    duration: '0-5 minutes',
    source: 'Leonardo (Curiosità) + Feynman (12 Problems)',
    steps: [
      'Encounter the challenge',
      'Question the question — is this the right framing?',
      'Check against active problems',
      'Identify hidden assumptions',
    ],
    prompts: [
      "What am I REALLY trying to solve here?",
      "What would I do if this problem didn't exist?",
      "Who else has faced something similar?",
    ],
  },
  
  diverge: {
    name: 'DIVERGE',
    duration: '5-20 minutes',
    source: 'Leonardo (Connessione) + Janusian Thinking',
    steps: [
      'Force 5 random domain connections',
      'Generate the opposite',
      'Steal shamelessly — who solved this?',
      'Document ALL ideas, no filtering',
    ],
    prompts: [
      "What would this look like in [random domain]?",
      "If the obvious answer is X, what's NOT-X?",
      "What would Leonardo sketch in his notebook?",
    ],
  },
  
  incubate: {
    name: 'INCUBATE',
    duration: 'variable',
    source: 'Tesla (Background Processing)',
    steps: [
      'State the problem clearly',
      'Step away deliberately',
      'Work on something unrelated',
      'Return with fresh perspective',
    ],
    prompts: [
      "What would Tesla visualize while walking?",
      "If I slept on this, what would I dream?",
      "What's my subconscious already working on?",
    ],
  },
  
  converge: {
    name: 'CONVERGE',
    duration: '10-30 minutes',
    source: 'Bach (Structure) + Jobs (Simplification)',
    steps: [
      'Select the strongest idea',
      'Simplify ruthlessly — can a child understand?',
      'Structure the execution',
      'Set hard constraints',
    ],
    prompts: [
      "What would Bach's weekly cantata version look like?",
      "If I had to ship in 1 hour, what would I cut?",
      "What's the 80/20 — which 20% delivers 80% of value?",
    ],
  },
  
  create: {
    name: 'CREATE',
    duration: 'variable',
    source: 'Angelou (Discipline) + Picasso (Volume)',
    steps: [
      'Show up and do the work',
      'Create the first version FAST',
      'Iterate in public',
      'Document what you learned',
    ],
    prompts: [
      "Angelou did 5 hours daily. What's my commitment?",
      "Picasso made 50,000+ works. What's my volume target?",
      "Don't wait for inspiration — what would I do if I just started NOW?",
    ],
  },
  
  reflect: {
    name: 'REFLECT',
    duration: '5-10 minutes',
    source: 'Tesla (Evening Review) + Feynman (Anti-Fooling)',
    steps: [
      'What worked?',
      'What failed?',
      'What would I do differently?',
      'What does this enable next?',
    ],
    prompts: [
      "Tesla reviewed each evening. What's my insight from today?",
      "Feynman: Am I fooling myself about something?",
      "What pattern here applies to other problems?",
    ],
  },
};

/**
 * Create a session state
 */
function createSession(challenge, options = {}) {
  return {
    id: `cge-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    challenge,
    startedAt: new Date().toISOString(),
    currentPhase: 'seed',
    options,
    artifacts: {
      seed: null,
      diverge: null,
      incubate: null,
      converge: null,
      create: null,
      reflect: null,
    },
    notes: [],
  };
}

/**
 * Run a specific phase
 */
function runPhase(session, phaseName, input = {}) {
  const phase = phases[phaseName];
  if (!phase) {
    return { error: `Unknown phase: ${phaseName}` };
  }
  
  const output = {
    phase: phaseName,
    config: phase,
    input,
    timestamp: new Date().toISOString(),
  };
  
  // Phase-specific logic
  switch (phaseName) {
    case 'seed':
      output.questions = [
        `Challenge: ${session.challenge}`,
        `Reframe: What would happen if I solved the OPPOSITE problem?`,
        `Assumption check: What am I taking for granted?`,
      ];
      output.opposite = janusian.generateOpposite(session.challenge);
      break;
      
    case 'diverge':
      output.connections = connections.forge(session.challenge, 5);
      output.janusian = janusian.fullCycle(session.challenge);
      output.stealFrom = [
        'Search: Who solved something similar in a different domain?',
        'Search: What academic research exists on this topic?',
        'Search: What failed attempts can I learn from?',
      ];
      break;
      
    case 'incubate':
      output.instruction = "Step away. The subconscious needs time.";
      output.alternatives = [
        'Take a walk',
        'Work on something unrelated',
        'Sleep on it',
        'Explain the problem to someone else',
        'Do something physical',
      ];
      output.teslaQuote = "I may go on for months or years with the idea in the back of my head.";
      break;
      
    case 'converge':
      output.prompts = [
        `From diverge phase: What's the STRONGEST idea?`,
        `Simplify: Explain it in one sentence a child would understand`,
        `Constraint: What's the minimum viable version?`,
        `Bach's test: Could I do this every week for years?`,
      ];
      output.structure = {
        what: input.selectedIdea || '(select from diverge)',
        why: input.rationale || '(why this over others)',
        how: input.steps || '(concrete steps)',
        when: input.deadline || '(hard deadline)',
      };
      break;
      
    case 'create':
      output.mantra = "Don't wait for inspiration. Show up and do the work.";
      output.angelouRule = "5 hours daily, even when it's going poorly";
      output.picassoRule = "Volume enables discovery — create more";
      output.firstStep = input.firstStep || "(What's the VERY FIRST action?)";
      break;
      
    case 'reflect':
      output.questions = {
        worked: input.worked || '(What succeeded?)',
        failed: input.failed || '(What didn\'t work?)',
        different: input.different || '(What would you change?)',
        enables: input.enables || '(What\'s now possible?)',
        pattern: input.pattern || '(What generalizes to other problems?)',
      };
      output.feynmanCheck = "The first principle is that you must not fool yourself — and you are the easiest person to fool.";
      break;
  }
  
  session.artifacts[phaseName] = output;
  session.currentPhase = phaseName;
  
  return output;
}

/**
 * Run the full process
 */
export function run(options = {}) {
  const { challenge, constraints = {} } = options;
  
  if (!challenge) {
    return { error: 'Challenge is required' };
  }
  
  const session = createSession(challenge, constraints);
  
  // Run each phase
  const results = {
    session,
    phases: {},
  };
  
  for (const phaseName of Object.keys(phases)) {
    results.phases[phaseName] = runPhase(session, phaseName);
  }
  
  results.summary = {
    challenge,
    oppositeGenerated: results.phases.seed.opposite.opposite,
    connectionsForged: results.phases.diverge.connections.connections.length,
    nextAction: "Pick the strongest idea from DIVERGE, refine in CONVERGE, then CREATE.",
  };
  
  return results;
}

/**
 * Get phase information
 */
export function getPhase(phaseName) {
  return phases[phaseName] || { error: `Unknown phase: ${phaseName}` };
}

/**
 * List all phases
 */
export function listPhases() {
  return Object.entries(phases).map(([name, config]) => ({
    name,
    displayName: config.name,
    duration: config.duration,
    source: config.source,
    stepCount: config.steps.length,
  }));
}

/**
 * Quick creative burst (compressed version)
 */
export function quickBurst(challenge) {
  const opp = janusian.generateOpposite(challenge);
  const conn = connections.forge(challenge, 3);
  
  return {
    challenge,
    opposite: opp.opposite,
    synthesis: opp.synthesisPrompt,
    connections: conn.connections.map(c => c.prompt),
    quickAction: `
1. The opposite of your challenge is: "${opp.opposite}"
2. What if BOTH are true?
3. Connect to: ${conn.connections.map(c => c.domain).join(', ')}
4. Pick the most provocative insight. Build from there.
    `.trim(),
  };
}

export default {
  run,
  runPhase,
  getPhase,
  listPhases,
  createSession,
  quickBurst,
};
