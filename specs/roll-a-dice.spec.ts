import should from 'should';
import { rollDice } from '../src/roll-a-dice';

describe('Get Random Value', () => {
  it('Should not return null', () => {
    const randomValue = rollDice();
    should.exist(randomValue, 'The Random Value cannot be null');
  });

  it('Should return a random value between a range (1 && 6)', () => {
    const min = 1;
    const max = 6;

    const isInTheRange = (n: number) => (n >= min) && (n <= max);

    const randomValues = new Int32Array(10).fill(0).map(() => rollDice());

    const expectedResult = true;
    const actualResult = randomValues.every(isInTheRange);
    actualResult.should.be.exactly(expectedResult);
  });
});