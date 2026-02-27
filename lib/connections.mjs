/**
 * Connection Forge
 * 
 * Leonardo da Vinci's technique: "The human brain cannot simultaneously 
 * concentrate on two separate objects or ideas, no matter how dissimilar, 
 * no matter how remote, without eventually forming a connection between them."
 * 
 * Force random connections across unrelated domains.
 */

// Domain knowledge base - things to connect ideas TO
const domains = {
  nature: [
    'how trees distribute nutrients through root networks',
    'how ant colonies make collective decisions',
    'how rivers find paths of least resistance',
    'how immune systems distinguish self from non-self',
    'how flocks of birds coordinate without leaders',
    'how mycelium networks share resources',
    'how coral reefs adapt to change',
    'how salmon remember their birthplace',
  ],
  music: [
    'how Bach\'s counterpoint weaves independent voices into unity',
    'how jazz improvisation balances structure and freedom',
    'how a symphony builds tension and release',
    'how harmonics create complex tones from simple waves',
    'how rhythm synchronizes groups of people',
    'how silence shapes music as much as sound',
  ],
  architecture: [
    'how load-bearing walls distribute weight',
    'how Gothic arches turn compression into beauty',
    'how skyscrapers handle wind forces',
    'how ancient aqueducts moved water by gravity',
    'how geodesic domes maximize strength with minimal material',
    'how Japanese joinery connects without fasteners',
  ],
  cooking: [
    'how fermentation transforms simple ingredients',
    'how the Maillard reaction creates flavor complexity',
    'how emulsification holds opposites together',
    'how salt enhances sweetness',
    'how slow cooking breaks down tough structures',
    'how mise en place enables flow',
  ],
  physics: [
    'how entropy increases in closed systems',
    'how quantum superposition holds multiple states',
    'how waves interfere constructively and destructively',
    'how phase transitions happen suddenly after gradual change',
    'how feedback loops amplify or dampen signals',
    'how emergence creates new properties from simple rules',
  ],
  psychology: [
    'how habits form through cue-routine-reward loops',
    'how cognitive dissonance drives change or rationalization',
    'how flow state emerges from challenge-skill balance',
    'how social proof shapes individual behavior',
    'how the mere exposure effect builds preference',
    'how chunking expands working memory limits',
  ],
  economics: [
    'how markets find prices through supply and demand',
    'how compound interest works exponentially over time',
    'how network effects create winner-take-all dynamics',
    'how insurance pools risk across many individuals',
    'how arbitrage eliminates price differences',
    'how incentives shape behavior predictably',
  ],
  biology: [
    'how DNA encodes infinite variation in four letters',
    'how evolution optimizes through random mutation and selection',
    'how metabolism balances energy storage and release',
    'how the brain prunes unused neural connections',
    'how homeostasis maintains stability through feedback',
    'how symbiosis creates mutual benefit from difference',
  ],
};

/**
 * Get a random selection of items from an array
 */
function sample(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

/**
 * Forge connections between an idea and random domains
 */
export function forge(idea, count = 5) {
  const domainNames = Object.keys(domains);
  const selectedDomains = sample(domainNames, Math.min(count, domainNames.length));
  
  return {
    idea,
    connections: selectedDomains.map(domain => {
      const analogy = sample(domains[domain], 1)[0];
      return {
        domain,
        analogy,
        prompt: `How is "${idea}" similar to ${analogy}?`,
        reversePrompt: `What would "${idea}" look like if it worked like ${analogy}?`,
      };
    }),
    leonardoPrompt: `Leonardo would ask: What do these seemingly unrelated things reveal about "${idea}" that direct analysis misses?`,
  };
}

/**
 * Deep dive into one domain connection
 */
export function deepConnection(idea, domain) {
  if (!domains[domain]) {
    return { error: `Unknown domain: ${domain}. Available: ${Object.keys(domains).join(', ')}` };
  }
  
  return {
    idea,
    domain,
    analogies: domains[domain],
    questions: [
      `What structure in ${domain} solves a problem similar to "${idea}"?`,
      `What would fail if "${idea}" worked like ${domain} systems?`,
      `What would succeed unexpectedly?`,
      `What vocabulary from ${domain} reveals new aspects of "${idea}"?`,
      `If an expert in ${domain} designed a solution to "${idea}", what would they do differently?`,
    ],
  };
}

/**
 * Force a specific connection (for when you have two things to link)
 */
export function forceLink(ideaA, ideaB) {
  return {
    ideaA,
    ideaB,
    prompts: [
      `What does "${ideaA}" share with "${ideaB}" that isn't obvious?`,
      `If "${ideaA}" is the problem, how is "${ideaB}" secretly the solution?`,
      `What metaphor captures both "${ideaA}" and "${ideaB}"?`,
      `What would a child say these have in common?`,
      `In what world are these the same thing?`,
    ],
    technique: "Leonardo threw a paint-filled sponge against a wall and imagined horses. What do you see when you force these together?",
  };
}

/**
 * Get all available domains
 */
export function listDomains() {
  return Object.entries(domains).map(([name, items]) => ({
    name,
    count: items.length,
    sample: items[0],
  }));
}

/**
 * Add a custom domain
 */
export function addDomain(name, analogies) {
  if (domains[name]) {
    domains[name] = [...domains[name], ...analogies];
  } else {
    domains[name] = analogies;
  }
  return { domain: name, count: domains[name].length };
}

export default {
  forge,
  deepConnection,
  forceLink,
  listDomains,
  addDomain,
};
