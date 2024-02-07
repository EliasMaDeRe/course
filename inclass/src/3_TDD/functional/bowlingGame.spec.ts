import { Game, createBowlingGame } from "./bowlingGame";

describe('Test Bowling Game Functional', () => {

  let game: Game
  beforeEach(() =>{
    game = createBowlingGame()
  })

  it('Should roll a gutter game', () => {

    game = rollMany(game,20,0)

    expect(game.getScore()).toBe(0)
  })

  it('Should roll all ones', () => {

    game = rollMany(game,20,1);

    expect(game.getScore()).toBe(20)
  })

  it('Should roll a spare', () => {

    game = rollSpare(game);
    game = game.roll(3)

    game = rollMany(game,17,0)

    expect(game.getScore()).toBe(16)
  })

  it('Should roll a strike', () => {

    game = rollStrike(game);
    game = game.roll(3)
    game = game.roll(3)

    game = rollMany(game,16,0)

    expect(game.getScore()).toBe(22)
  })

  it('Should roll a perfect game', () => {

    game = rollMany(game,12,10)

    expect(game.getScore()).toBe(300)
  })

});

function rollSpare(game: Game) {
  game = game.roll(5)
  game = game.roll(5)
  return game
}

function rollStrike(game: Game) {
  game = game.roll(10);
  return game
}

function rollMany(game: Game, rolls: number, pins: number) {
  for (let i = 0; i < rolls; ++i) {
    game = game.roll(pins)
  }
  return game
}
