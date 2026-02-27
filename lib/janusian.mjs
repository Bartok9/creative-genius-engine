/**
 * Janusian Engine
 * 
 * Named after Janus, the two-faced Roman god.
 * Core creative technique: conceive and utilize opposite or contradictory ideas simultaneously.
 * 
 * Used by: Einstein (relativity), Picasso (cubism), Bach (counterpoint)
 */

// Patterns for generating opposites
const oppositePatterns = [
  { pattern: /^(.*) want(?:s)? more (.*)$/i, transform: (m) => `${m[1]} want fewer ${m[2]}` },
  { pattern: /^(.*) need(?:s)? (.*)$/i, transform: (m) => `${m[1]} must avoid ${m[2]}` },
  { pattern: /^(.*) should (.*)$/i, transform: (m) => `${m[1]} should NOT ${m[2]}` },
  { pattern: /^(.*) is (.*)$/i, transform: (m) => `${m[1]} is NOT ${m[2]}` },
  { pattern: /^(.*) always (.*)$/i, transform: (m) => `${m[1]} never ${m[2]}` },
  { pattern: /^(.*) best (.*)$/i, transform: (m) => `${m[1]} worst ${m[2]}` },
  { pattern: /^add (.*)$/i, transform: (m) => `remove ${m[1]}` },
  { pattern: /^increase (.*)$/i, transform: (m) => `decrease ${m[1]}` },
  { pattern: /^build (.*)$/i, transform: (m) => `destroy ${m[1]}` },
  { pattern: /^fast (.*)$/i, transform: (m) => `slow ${m[1]}` },
  { pattern: /^simple (.*)$/i, transform: (m) => `complex ${m[1]}` },
  { pattern: /^centralize (.*)$/i, transform: (m) => `decentralize ${m[1]}` },
];

// Dialectical synthesis prompts
const synthesisPrompts = [
  "What if both the original AND its opposite are true simultaneously?",
  "What context would make each perspective valid?",
  "What emerges from the tension between these opposites?",
  "What third option transcends this binary?",
  "What does holding both ideas reveal that neither shows alone?",
];

/**
 * Generate the opposite of an idea
 */
export function generateOpposite(idea) {
  const trimmed = idea.trim();
  
  // Try pattern-based transformation
  for (const { pattern, transform } of oppositePatterns) {
    const match = trimmed.match(pattern);
    if (match) {
      return {
        original: trimmed,
        opposite: transform(match),
        method: 'pattern',
        synthesisPrompt: synthesisPrompts[Math.floor(Math.random() * synthesisPrompts.length)],
      };
    }
  }
  
  // Fallback: structural negation
  const opposite = trimmed.startsWith('Not ') 
    ? trimmed.slice(4)
    : `Not: ${trimmed}`;
    
  return {
    original: trimmed,
    opposite,
    method: 'negation',
    synthesisPrompt: synthesisPrompts[Math.floor(Math.random() * synthesisPrompts.length)],
  };
}

/**
 * Generate multiple opposites using different frames
 */
export function generateMultipleOpposites(idea, count = 5) {
  const frames = [
    { name: 'scale', transform: (i) => `What if this applied to 1 person instead of millions? (or vice versa)` },
    { name: 'time', transform: (i) => `What if this was true 100 years ago? 100 years from now?` },
    { name: 'actor', transform: (i) => `What if the subject and object were reversed?` },
    { name: 'value', transform: (i) => `What if what seems bad about this is actually good?` },
    { name: 'constraint', transform: (i) => `What if resources were unlimited? Or completely constrained?` },
  ];
  
  const primary = generateOpposite(idea);
  const alternatives = frames.slice(0, count - 1).map(f => ({
    frame: f.name,
    question: f.transform(idea),
  }));
  
  return {
    primary,
    alternatives,
  };
}

/**
 * Janusian synthesis — hold both ideas, extract insight
 */
export function synthesize(original, opposite) {
  return {
    thesis: original,
    antithesis: opposite,
    questions: [
      `Under what conditions is "${original}" true?`,
      `Under what conditions is "${opposite}" true?`,
      "What hidden assumption makes these seem contradictory?",
      "What new possibility emerges from accepting both?",
      "What would someone who believed both simultaneously do differently?",
    ],
    prompt: `The creative breakthrough often lies not in choosing between "${original}" and "${opposite}", but in finding what transcends both.`,
  };
}

/**
 * Full Janusian thinking cycle
 */
export function fullCycle(idea) {
  const step1 = generateOpposite(idea);
  const step2 = synthesize(step1.original, step1.opposite);
  const step3 = generateMultipleOpposites(idea, 5);
  
  return {
    input: idea,
    opposite: step1,
    synthesis: step2,
    multiframe: step3,
    nextAction: "Pick the most provocative question from synthesis, answer it, then generate the opposite of THAT answer.",
  };
}

export default {
  generateOpposite,
  generateMultipleOpposites,
  synthesize,
  fullCycle,
};
