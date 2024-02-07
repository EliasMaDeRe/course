/* Remember that all your functions have to respect the functional programming rules:
 *  - 🔥 Pure functions and side effects 
 *  - 🔥 First class functions & higher order functions
 *  - 🔥 Immutability ⚠️
 *  - 🔥 Composition 
 *
 * See more info here: 
 * https://www.learningjournal.guru/courses/scala/scala-programming-foundation/elements-of-functional-programming-1/
 * 
 * I'm putting a warning in Immutability to remember you that every time you try
 * to change the state var... just be carefull...⚠️
 */

type State = { pins:number[] }
const INITIAL_STATE: State = { pins: [] }

export const createBowlingGame = (state: State = INITIAL_STATE) => Object.freeze({
  roll: (pins: number) => roll(state,pins),
  getScore: () => getScore(state),
})

const roll = (state: State, pins:number) =>{
  return createBowlingGame({pins: [...state.pins,pins] })
}

const getScore = ( { pins } : State) => {
  const FRAMES = 10
  let score = 0
  let firstRoll = 0

  for (let i = 0; i < FRAMES; ++i,firstRoll+=2){
    if(isStrike(pins,firstRoll)){
      score += scoreForStrike(pins, firstRoll--)
    }else{
      if(isSpare(pins, firstRoll)){
        score += scoreForSpare(pins, firstRoll)
      }else{
        score += scoreForFrame(pins, firstRoll)
      }
    }
  }

  return score;

}



const scoreForFrame = (pins: number[], firstRoll: number) => {
  return pins[firstRoll] + pins[firstRoll + 1];
};

const scoreForSpare = (pins: number[], firstRoll: number) => {
  return 10 + pins[firstRoll + 2];
};

const scoreForStrike = (pins: number[], firstRoll: number) => {
  return 10 + pins[firstRoll + 1] + pins[firstRoll + 2];
};

const isSpare = (pins: number[], firstRoll: number) => {
  return pins[firstRoll] + pins[firstRoll + 1] == 10;
};

const isStrike = (pins: number[], firstRoll: number) => {
  return pins[firstRoll] == 10;
};

export type Game = ReturnType<typeof createBowlingGame>

//const myOtherFunction = (...) => {...}