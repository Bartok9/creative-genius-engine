#!/usr/bin/env node

/**
 * Creative Genius Engine CLI
 * 
 * Usage:
 *   node cli.mjs spark "Your challenge here"
 *   node cli.mjs opposite "Your idea here"
 *   node cli.mjs connect "Your topic" 5
 *   node cli.mjs process "Your challenge"
 *   node cli.mjs problems list
 *   node cli.mjs problems add "Your problem"
 *   node cli.mjs problems test "New knowledge"
 */

import janusian from './lib/janusian.mjs';
import connections from './lib/connections.mjs';
import creativeProcess from './lib/process.mjs';
import problems from './lib/problems.mjs';
import wisdom from './lib/wisdom.mjs';

const args = globalThis.process?.argv?.slice(2) || [];
const command = args[0];
const input = args.slice(1).join(' ');

function printJSON(obj) {
  console.log(JSON.stringify(obj, null, 2));
}

function printHelp() {
  console.log(`
Creative Genius Engine CLI
===========================

Commands:
  spark <challenge>        Quick creative burst
  opposite <idea>          Generate the opposite of an idea
  janusian <idea>          Full Janusian thinking cycle
  connect <topic> [count]  Forge random domain connections
  process <challenge>      Run full Bartok Creative Process

  problems list            List your 12 favorite problems
  problems add <problem>   Add a problem
  problems remove <id>     Remove a problem
  problems test <knowledge> Test new knowledge against all problems
  problems suggest [domain] Get problem suggestions

  wisdom record            Record a session outcome (interactive)
  wisdom patterns          View extracted patterns
  wisdom advise <challenge> Get advice based on patterns
  wisdom distill           Distill learnings into principles

  help                     Show this help

Examples:
  node cli.mjs spark "How do I make my AI agent more creative?"
  node cli.mjs opposite "Users want more features"
  node cli.mjs connect "memory systems" 5
  node cli.mjs problems add "How do agents develop preferences?"
  
🎻 Built by Bartok, synthesized from Leonardo, Tesla, Bach, Feynman, and more.
`);
}

async function main() {
  if (!command || command === 'help') {
    printHelp();
    return;
  }
  
  switch (command) {
    case 'spark':
      if (!input) {
        console.error('Usage: spark <challenge>');
        return;
      }
      printJSON(creativeProcess.quickBurst(input));
      break;
      
    case 'opposite':
      if (!input) {
        console.error('Usage: opposite <idea>');
        return;
      }
      printJSON(janusian.generateOpposite(input));
      break;
      
    case 'janusian':
      if (!input) {
        console.error('Usage: janusian <idea>');
        return;
      }
      printJSON(janusian.fullCycle(input));
      break;
      
    case 'connect':
      const [topic, ...rest] = args.slice(1);
      const count = parseInt(rest[0]) || 5;
      if (!topic) {
        console.error('Usage: connect <topic> [count]');
        return;
      }
      printJSON(connections.forge(topic, count));
      break;
      
    case 'process':
      if (!input) {
        console.error('Usage: process <challenge>');
        return;
      }
      printJSON(creativeProcess.run({ challenge: input }));
      break;
      
    case 'problems':
      const subcommand = args[1];
      const subinput = args.slice(2).join(' ');
      
      switch (subcommand) {
        case 'list':
          printJSON(problems.list());
          break;
        case 'add':
          if (!subinput) {
            console.error('Usage: problems add <problem>');
            return;
          }
          printJSON(problems.add(subinput));
          break;
        case 'remove':
          if (!subinput) {
            console.error('Usage: problems remove <id>');
            return;
          }
          printJSON(problems.remove(subinput));
          break;
        case 'test':
          if (!subinput) {
            console.error('Usage: problems test <knowledge>');
            return;
          }
          printJSON(problems.testAgainst(subinput));
          break;
        case 'suggest':
          printJSON(problems.suggest(subinput || 'general'));
          break;
        default:
          console.error('Unknown problems subcommand. Use: list, add, remove, test, suggest');
      }
      break;
      
    case 'wisdom':
      const wisdomSub = args[1];
      const wisdomInput = args.slice(2).join(' ');
      
      switch (wisdomSub) {
        case 'patterns':
          printJSON(wisdom.getPatterns());
          break;
        case 'advise':
          if (!wisdomInput) {
            console.error('Usage: wisdom advise <challenge>');
            return;
          }
          printJSON(wisdom.advise(wisdomInput));
          break;
        case 'distill':
          printJSON(wisdom.distill());
          break;
        case 'record':
          console.log('Recording requires interactive input. Use the library directly.');
          break;
        default:
          console.error('Unknown wisdom subcommand. Use: patterns, advise, distill, record');
      }
      break;
      
    default:
      console.error(`Unknown command: ${command}`);
      printHelp();
  }
}

main().catch(console.error);
