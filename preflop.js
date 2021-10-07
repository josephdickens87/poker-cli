const chalk = require("chalk");
const getOpeningStrategy = require('./preflopStrategies/openStrategies')

let villainResponse = null;

const getPreflopStrategy = (v, holeCards, position) => {

  v.prompt(
    {
      type: "list",
      name: "preflopAction",
      message: "What's the sitch?",
      choices: ["Open", "Facing a raise"],
    },
    (result) => {
      if (result.preflopAction === 'Open' && getOpeningStrategy(holeCards, position)) {
        v.prompt({
          type: "list",
          name: "vilainResponse",
          message: "Did Villain Call, Fold, Raise?",
          choices: ["Call", "Fold", "Raise"],
        }, (result) => {
          if(result.vilainResponse === 'Call' || result.vilainResponse === 'Raise') {
            villainResponse = result.vilainResponse
            heroOpens(v, position)
          } else {
            console.log(chalk.green.bold('Villain Folds, you Win!'))
          }
        });
      }
    }
  );
};

const heroOpens = (v, position) => {
  v.prompt({
    type: 'list',
    name: 'villainPosition',
    message: 'What is villains pisition?',
    choices: ['0','1','2','3','4','5'].filter(elem => elem != position),
  }, (result) => {
    if(result.villainPosition && villainResponse === 'Call'){
      v.log(chalk.white.bold('vallain calls!'))
      // move to post flop strategy
    }
    if(result.villainPosition && villainResponse === 'Raise'){
      // villain 3 bet, continue preflop strategy
      villainThreeBets(v)
    }
  })
}

const villainThreeBets = (v) => {
  
}

module.exports = getPreflopStrategy;