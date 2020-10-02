import { print, prompt } from './prompt-print';
import { leaderBoard } from './leader-board';
import { rollDice } from './roll-a-dice';
import { isAccumulated, isAllAccumulated } from './is-accumulated';
import { IPlayer } from './interface';

let userInput: string;
let numberOfPlayers: number;
let pointsOfAccumulate: number;
let currentRank: number = 1;

// Ask user for number of players
userInput = prompt("Number of players (Number): ");
numberOfPlayers = parseInt(userInput)
if (isNaN(numberOfPlayers)) {
  throw new TypeError("Invalid Input: Failed to parse number")
}

// Ask user for points of accumulate
userInput = prompt("Points of accumulate (Number): ");
pointsOfAccumulate = parseInt(userInput);
if (isNaN(pointsOfAccumulate)) {
  throw new TypeError("Invalid Input: Failed to parse number")
}

// Initialize Players
let players: IPlayer[] = new Array(numberOfPlayers).fill({}).map((_, index) => {
  return {
    name: `Player-${index + 1}`,
    score: 0,
    rank: 0,
    lastRoll: 0,
    penalty: false
  }
})

// Shuffle Players
const orderOfPlayers = [...players].sort(() => 0.5 - Math.random())

print('table', players);

// Start Game
while (!isAllAccumulated(players, pointsOfAccumulate)) {
  players = orderOfPlayers.map(player => {
    let retry = false, repeat = false;
    if (isAccumulated(player, pointsOfAccumulate)) {
      print('log', `Skipping ${player.name}... Since he/she accumulated equals to or more than ${pointsOfAccumulate}`);
      return player;
    }
    if (player.penalty) {
      print('log', `Sorry ${player.name}! You are being skipped because of penalty`)
      player.penalty = false;
      return player;
    }
    do {
      userInput = prompt(`${player.name} its your turn (press ‘r’ to roll the dice): `);
      if (userInput === 'r') {
        const currentRoll = rollDice();
        print('log', currentRoll)
        if (currentRoll === 6) {
          repeat = true;
          print('log', 'You scored a 6! You gets extra roll...')
        } else repeat = false;
        if (player.lastRoll === 1 && currentRoll === 1) player.penalty = true;
        else player.penalty = false;
        player.score += currentRoll;
        player.lastRoll = currentRoll;
        if(player.score >= pointsOfAccumulate && !player.rank) {
          player.rank = currentRank;
          currentRank += 1;
        }
      }
      else {
        print('log', 'Wrong Input - Try Again....');
        retry = true;
      }
    } while (retry || repeat);
    print('table', leaderBoard(players));
    return player;
  })
}

// Final Score
print('log', `Congratulation!!! All players scored more than ${pointsOfAccumulate}`);
print('log', 'LEADERBOARD');
print('table', leaderBoard(players));