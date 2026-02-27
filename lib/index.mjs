/**
 * Creative Genius Engine
 * 
 * A thinking toolkit for AI agents, synthesized from:
 * - Leonardo da Vinci
 * - Nikola Tesla
 * - Johann Sebastian Bach
 * - Albert Einstein
 * - Richard Feynman
 * - Maya Angelou
 * - Pablo Picasso
 * - Steve Jobs
 * 
 * "The creative adult is the child who survived." — Ursula K. Le Guin
 */

export { default as janusian } from './janusian.mjs';
export { default as connections } from './connections.mjs';
export { default as process } from './process.mjs';
export { default as problems } from './problems.mjs';
export { default as wisdom } from './wisdom.mjs';

// Convenience re-exports
export { generateOpposite, fullCycle as janusianCycle } from './janusian.mjs';
export { forge as forgeConnections } from './connections.mjs';
export { run as runProcess, quickBurst } from './process.mjs';
export { add as addProblem, testAgainst, suggest as suggestProblems } from './problems.mjs';
export { record as recordWisdom, advise, distill } from './wisdom.mjs';

/**
 * Quick creative burst — one-liner for fast inspiration
 */
export function spark(challenge) {
  const { quickBurst } = require('./process.mjs');
  return quickBurst(challenge);
}

/**
 * Full creative run with all modules
 */
export async function create(options) {
  const { run } = await import('./process.mjs');
  const { add, suggest } = await import('./problems.mjs');
  const { forge } = await import('./connections.mjs');
  const { fullCycle } = await import('./janusian.mjs');
  
  // Run the full process
  const result = run(options);
  
  // Add to problems if significant
  if (options.addToProblem) {
    add(options.challenge);
  }
  
  return result;
}

/**
 * Version info
 */
export const VERSION = '1.0.0';
export const AUTHOR = 'Bartok 🎻';
export const CREATED = '2026-02-26';

export default {
  VERSION,
  AUTHOR,
  CREATED,
};
