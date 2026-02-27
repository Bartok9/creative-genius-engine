/**
 * Wisdom Distillery
 * 
 * Extract patterns from creative sessions.
 * What worked? What didn't? Compound learning.
 * 
 * "The creative adult is the child who survived." — Ursula K. Le Guin
 */

// In-memory session storage
let sessions = [];
let patterns = [];

/**
 * Record a creative session outcome
 */
export function record(session) {
  const entry = {
    id: `wisdom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    recordedAt: new Date().toISOString(),
    challenge: session.challenge,
    approach: session.approach || 'bartok',
    outcome: session.outcome || 'unknown',
    worked: session.worked || [],
    failed: session.failed || [],
    learned: session.learned || [],
    wouldChange: session.wouldChange || [],
    tags: session.tags || [],
  };
  
  sessions.push(entry);
  
  // Extract potential patterns
  const newPatterns = extractPatterns(entry);
  
  return {
    recorded: entry,
    totalSessions: sessions.length,
    patternsFound: newPatterns.length,
    newPatterns,
  };
}

/**
 * Extract patterns from a session
 */
function extractPatterns(session) {
  const found = [];
  
  // Pattern: Something that worked multiple times
  session.worked.forEach(item => {
    const existing = patterns.find(p => 
      p.type === 'success' && similarity(p.text, item) > 0.7
    );
    
    if (existing) {
      existing.count++;
      existing.lastSeen = new Date().toISOString();
    } else {
      const pattern = {
        id: `pat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        type: 'success',
        text: item,
        count: 1,
        firstSeen: new Date().toISOString(),
        lastSeen: new Date().toISOString(),
        contexts: [session.challenge],
      };
      patterns.push(pattern);
      found.push(pattern);
    }
  });
  
  // Pattern: Something that failed
  session.failed.forEach(item => {
    const existing = patterns.find(p => 
      p.type === 'failure' && similarity(p.text, item) > 0.7
    );
    
    if (existing) {
      existing.count++;
      existing.lastSeen = new Date().toISOString();
    } else {
      const pattern = {
        id: `pat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        type: 'failure',
        text: item,
        count: 1,
        firstSeen: new Date().toISOString(),
        lastSeen: new Date().toISOString(),
        contexts: [session.challenge],
      };
      patterns.push(pattern);
      found.push(pattern);
    }
  });
  
  return found;
}

/**
 * Simple text similarity (word overlap)
 */
function similarity(a, b) {
  const wordsA = a.toLowerCase().split(/\s+/);
  const wordsB = b.toLowerCase().split(/\s+/);
  const intersection = wordsA.filter(w => wordsB.includes(w));
  const union = [...new Set([...wordsA, ...wordsB])];
  return intersection.length / union.length;
}

/**
 * Get patterns sorted by count
 */
export function getPatterns(type = null) {
  let filtered = patterns;
  if (type) {
    filtered = patterns.filter(p => p.type === type);
  }
  
  return {
    patterns: filtered.sort((a, b) => b.count - a.count),
    total: filtered.length,
    topSuccesses: patterns.filter(p => p.type === 'success').sort((a, b) => b.count - a.count).slice(0, 5),
    topFailures: patterns.filter(p => p.type === 'failure').sort((a, b) => b.count - a.count).slice(0, 5),
  };
}

/**
 * Get advice based on patterns
 */
export function advise(challenge) {
  const successPatterns = patterns.filter(p => p.type === 'success' && p.count >= 2);
  const failurePatterns = patterns.filter(p => p.type === 'failure' && p.count >= 2);
  
  return {
    challenge,
    advice: {
      try: successPatterns.length > 0 
        ? successPatterns.map(p => `${p.text} (worked ${p.count}x)`)
        : ['No strong success patterns yet. Experiment and record!'],
      avoid: failurePatterns.length > 0
        ? failurePatterns.map(p => `${p.text} (failed ${p.count}x)`)
        : ['No failure patterns recorded yet.'],
    },
    meta: "These patterns are extracted from recorded sessions. The more you record, the better the advice.",
  };
}

/**
 * Distill learnings into principles
 */
export function distill() {
  const principles = [];
  
  // Principle from repeated successes
  const topSuccesses = patterns
    .filter(p => p.type === 'success' && p.count >= 3)
    .sort((a, b) => b.count - a.count);
    
  topSuccesses.forEach(p => {
    principles.push({
      type: 'do',
      principle: p.text,
      evidence: `Worked in ${p.count} sessions`,
      contexts: p.contexts,
    });
  });
  
  // Anti-principles from repeated failures
  const topFailures = patterns
    .filter(p => p.type === 'failure' && p.count >= 3)
    .sort((a, b) => b.count - a.count);
    
  topFailures.forEach(p => {
    principles.push({
      type: 'avoid',
      principle: p.text,
      evidence: `Failed in ${p.count} sessions`,
      contexts: p.contexts,
    });
  });
  
  return {
    principles,
    totalSessions: sessions.length,
    totalPatterns: patterns.length,
    quote: "Wisdom is knowledge plus experience, distilled.",
  };
}

/**
 * Export all wisdom
 */
export function exportWisdom() {
  return {
    exportedAt: new Date().toISOString(),
    sessions,
    patterns,
    principles: distill().principles,
    version: '1.0.0',
  };
}

/**
 * Import wisdom
 */
export function importWisdom(data) {
  if (!data.sessions || !data.patterns) {
    return { error: 'Invalid wisdom data' };
  }
  sessions = data.sessions;
  patterns = data.patterns;
  return {
    imported: true,
    sessions: sessions.length,
    patterns: patterns.length,
  };
}

/**
 * Clear all wisdom
 */
export function clear() {
  const counts = { sessions: sessions.length, patterns: patterns.length };
  sessions = [];
  patterns = [];
  return { cleared: counts };
}

export default {
  record,
  getPatterns,
  advise,
  distill,
  exportWisdom,
  importWisdom,
  clear,
};
