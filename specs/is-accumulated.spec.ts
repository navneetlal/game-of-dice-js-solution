import should from 'should';
import { isAccumulated, isAllAccumulated } from '../src/is-accumulated';

describe('Checks if score of ALL player is more than or equals to accumulated', () => {
  it('Should return true when all players score more than or equal to accumulated point', () => {
    const pointsOfAccumulation = 10;
    const randomPlayers = Array.from({ length: 10 }, () => {
      return {
        score: Math.floor(Math.random() * (20 - 10) + 10),
        name: '',
        rank: 0,
        lastRoll: 0,
        penalty: false
      }
    });
    const expectedResult = true;
    const actualResult = isAllAccumulated(randomPlayers, pointsOfAccumulation);
    actualResult.should.be.exactly(expectedResult);
  });

  it('Should return false when some players score more than or equal to accumulated point', () => {
    const pointsOfAccumulation = 10;
    let randomPlayers = Array.from({ length: 5 }, () => {
      return {
        score: Math.floor(Math.random() * (20 - 10) + 10),
        name: '',
        rank: 0,
        lastRoll: 0,
        penalty: false
      }
    });
    randomPlayers = randomPlayers.concat(randomPlayers, Array.from({ length: 5 }, () => {
      return {
        score: Math.floor(Math.random() * (10 - 0) + 0),
        name: '',
        rank: 0,
        lastRoll: 0,
        penalty: false
      }
    }))
    const expectedResult = false;
    const actualResult = isAllAccumulated(randomPlayers, pointsOfAccumulation);
    actualResult.should.be.exactly(expectedResult);
  });

  it('Should return false when all players score less than accumulated point', () => {
    const pointsOfAccumulation = 10;
    const randomPlayers = Array.from({ length: 10 }, () => {
      return {
        score: Math.floor(Math.random() * (9 - 0) + 0),
        name: '',
        rank: 0,
        lastRoll: 0,
        penalty: false
      }
    });
    const expectedResult = false;
    const actualResult = isAllAccumulated(randomPlayers, pointsOfAccumulation);
    actualResult.should.be.exactly(expectedResult);
  });
});

describe('Checks if score of a player is more than or equal to accumulated', () => {

  it('Should not return null', () => {
    const pointsOfAccumulation = 10;
    const randomPlayers = Array.from({ length: 10 }, () => {
      return {
        score: Math.floor(Math.random() * (20 - 10) + 10),
        name: '',
        rank: 0,
        lastRoll: 0,
        penalty: false
      }
    });

    const result = randomPlayers.map((player) => isAccumulated(player, pointsOfAccumulation));
    const actualResult = result.every((b: boolean) => b === true);

    should.exist(actualResult, 'The Random Value cannot be null');
  });

  it('Should return true when player score is more than accumulated point', () => {
    const pointsOfAccumulation = 10;
    const randomPlayers = Array.from({ length: 10 }, () => {
      return {
        score: Math.floor(Math.random() * (20 - 10) + 10),
        name: '',
        rank: 0,
        lastRoll: 0,
        penalty: false
      }
    });

    const result = randomPlayers.map((player) => isAccumulated(player, pointsOfAccumulation));

    const expectedResult = true;
    const actualResult = result.every((b: boolean) => b === true);
    actualResult.should.be.exactly(expectedResult);
  });

  it('Should return false when player score less than accumulated point', () => {
    const pointsOfAccumulation = 10;
    const randomPlayers = Array.from({ length: 10 }, () => {
      return {
        score: Math.floor(Math.random() * (20 - 8) + 8),
        name: '',
        rank: 0,
        lastRoll: 0,
        penalty: false
      }
    });

    const result = randomPlayers.map((player) => isAccumulated(player, pointsOfAccumulation));

    const expectedResult = false;
    const actualResult = result.every((b: boolean) => b === false);
    actualResult.should.be.exactly(expectedResult);
  });
});