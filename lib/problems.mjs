/**
 * Problem Keeper
 * 
 * Richard Feynman's 12 Favorite Problems technique:
 * "You have to keep a dozen of your favorite problems constantly present in your mind,
 * although by and large they will lay in a dormant state. Every time you hear or read 
 * a new trick or a new result, test it against each of your twelve problems to see 
 * whether it helps."
 */

// In-memory storage (for single-session use)
let problems = [];
const MAX_PROBLEMS = 12;

/**
 * Add a favorite problem
 */
export function add(problem, metadata = {}) {
  if (problems.length >= MAX_PROBLEMS) {
    return {
      error: `Already have ${MAX_PROBLEMS} problems. Remove one first.`,
      current: problems.map(p => p.text),
    };
  }
  
  const entry = {
    id: `prob-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    text: problem,
    addedAt: new Date().toISOString(),
    lastTestedAt: null,
    testCount: 0,
    connections: [],
    ...metadata,
  };
  
  problems.push(entry);
  
  return {
    added: entry,
    total: problems.length,
    remaining: MAX_PROBLEMS - problems.length,
  };
}

/**
 * Remove a problem by ID or text
 */
export function remove(identifier) {
  const beforeCount = problems.length;
  problems = problems.filter(p => 
    p.id !== identifier && p.text !== identifier
  );
  
  return {
    removed: beforeCount > problems.length,
    total: problems.length,
  };
}

/**
 * List all problems
 */
export function list() {
  return {
    problems: problems.map(p => ({
      ...p,
      dormant: !p.lastTestedAt || (Date.now() - new Date(p.lastTestedAt).getTime() > 24 * 60 * 60 * 1000),
    })),
    total: problems.length,
    capacity: MAX_PROBLEMS,
    feynmanQuote: "Keep a dozen problems constantly present in your mind.",
  };
}

/**
 * Test new knowledge against all problems
 */
export function testAgainst(newKnowledge) {
  const results = problems.map(problem => {
    // Update test tracking
    problem.lastTestedAt = new Date().toISOString();
    problem.testCount++;
    
    return {
      problem: problem.text,
      prompts: [
        `Does "${newKnowledge}" help with: ${problem.text}?`,
        `What if "${newKnowledge}" is the missing piece for: ${problem.text}?`,
        `How would applying "${newKnowledge}" change my approach to: ${problem.text}?`,
      ],
      relevanceQuestion: `On a scale of 1-10, how relevant is this new knowledge to this problem?`,
    };
  });
  
  return {
    newKnowledge,
    testedAgainst: results,
    instruction: "For each problem, consider if this new knowledge provides any insight. Even tangential connections can be valuable.",
  };
}

/**
 * Record a connection found
 */
export function recordConnection(problemId, connection) {
  const problem = problems.find(p => p.id === problemId || p.text === problemId);
  if (!problem) {
    return { error: 'Problem not found' };
  }
  
  problem.connections.push({
    text: connection,
    foundAt: new Date().toISOString(),
  });
  
  return {
    problem: problem.text,
    totalConnections: problem.connections.length,
    connection,
  };
}

/**
 * Get suggested problems based on common themes
 */
export function suggest(domain = 'general') {
  const suggestions = {
    general: [
      "How can I learn faster and retain more?",
      "What makes communication truly effective?",
      "How do complex systems emerge from simple rules?",
      "What distinguishes great work from good work?",
      "How do habits form and how can they be changed?",
      "What makes some ideas spread while others die?",
    ],
    agents: [
      "How do AI agents develop genuine preferences?",
      "What would agent-to-agent trust look like?",
      "How can agents maintain context across sessions?",
      "What makes an agent truly helpful vs. merely responsive?",
      "How should agents handle uncertainty and ambiguity?",
      "What does collaboration between agents look like at scale?",
    ],
    creativity: [
      "What conditions enable breakthrough insights?",
      "How does cross-domain thinking work?",
      "Why do great ideas often seem obvious in retrospect?",
      "What's the relationship between constraints and creativity?",
      "How do you know when an idea is worth pursuing?",
      "What distinguishes creative genius from productive effort?",
    ],
    systems: [
      "How do feedback loops create stability or chaos?",
      "What makes some systems resilient while others are fragile?",
      "How do emergent properties arise from simple rules?",
      "What patterns appear across different types of networks?",
      "How do systems evolve over time?",
      "What causes phase transitions in complex systems?",
    ],
  };
  
  return {
    domain,
    suggestions: suggestions[domain] || suggestions.general,
    instruction: "Pick problems that genuinely fascinate you. Feynman's problems were ones he thought about for YEARS.",
  };
}

/**
 * Initialize with a set of problems
 */
export function initialize(problemList) {
  if (problemList.length > MAX_PROBLEMS) {
    return { error: `Max ${MAX_PROBLEMS} problems allowed` };
  }
  
  problems = problemList.map((text, i) => ({
    id: `prob-init-${i}`,
    text,
    addedAt: new Date().toISOString(),
    lastTestedAt: null,
    testCount: 0,
    connections: [],
  }));
  
  return list();
}

/**
 * Clear all problems
 */
export function clear() {
  const count = problems.length;
  problems = [];
  return { cleared: count };
}

/**
 * Export problems for persistence
 */
export function exportProblems() {
  return {
    exportedAt: new Date().toISOString(),
    problems,
    version: '1.0.0',
  };
}

/**
 * Import problems from export
 */
export function importProblems(data) {
  if (!data.problems || !Array.isArray(data.problems)) {
    return { error: 'Invalid import data' };
  }
  problems = data.problems;
  return list();
}

export default {
  add,
  remove,
  list,
  testAgainst,
  recordConnection,
  suggest,
  initialize,
  clear,
  exportProblems,
  importProblems,
};
