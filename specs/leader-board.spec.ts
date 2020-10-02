import should from 'should';
import { leaderBoard } from '../src/leader-board';

describe('Get Leader Board', () => {
  const randomPlayers = Array.from({ length: 10 }, () => {
    return { score: Math.floor(Math.random() * Math.floor(100)) }
  });

  it('Should not return null', () => {
    const randomValue = leaderBoard(randomPlayers);
    should.exist(randomValue, 'The Random Value cannot be null');
  });

  it('Should return a sorted array based on score', () => {
    const expectedResult = true;
    const actualResult = leaderBoard(randomPlayers).every((player, index, players) => {
      return !index || players[index - 1].score >= player.score;
    });
    actualResult.should.be.exactly(expectedResult);
  });
});