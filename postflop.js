const fs = require('fs');
const chalk = require('chalk')

const getRiver = (v) => {
  v.prompt({
    type: 'input',
    name: 'river',
    message: "what's the river? ",
    },
    function(result){
      if (result.river) {
        river = result.river;
        v.log(holeCards, position, board, turn, river, file === null)
      }
  });
} 

const getTurn = (v) => {
  v.prompt({
    type: 'input',
    name: 'turn',
    message: "what's the turn? ",
    },
    function(result){
      if (result.turn) {
        turn = result.turn;
        getRiver(v)
      }
  });
}    

const getBoard = (v) => {
  v.prompt({
    type: 'input',
    name: 'board',
    message: "what's the board? ",
    },
    function(result){
      if (result.board)
        board = result.board;
        loadSolution(v)
  });
}

const loadSolution = (v) => {
  fs.readFile(`./files/${board}.json`, "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    file = JSON.parse(jsonString);
    getStrategy(v)
  });
}

const getStrategy = (v) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const strategies = file.strategy.actions;
  const oopPercentages = file.strategy.strategy[`${holeCards}`];
  if(position === 0) {
    const map = new Map()
    for(let [index, strategy] of strategies.entries()){
      const percentage = Math.round(oopPercentages[index] * 100)
      map.set(strategy, percentage)
      // v.log(`${strategy}: ${percentage}`)
    }
    const res = [...map].sort((a,b) => b[1] - a[1])

    for(let result of res){
      const choice = result[0];
      const probability = result[1];
      if(probability > randomNumber) {
        v.log(chalk.green(`${choice}: ${probability}`))
        break;
      }
    }
  } else {
    v.prompt({
      type: 'list',
      name: 'villainAction',
      message: "What did villain Do?",
      choices: strategies
      },
      function(result){
        if (result.villainAction){
          const villain = result.villainAction;
          const ipStrategies = file.childrens[`${villain}`].strategy.actions;
          const ipPercentages = file.childrens[`${villain}`].strategy.strategy[`${holeCards}`];
          for(let [index, strategy] of ipStrategies.entries()){
          v.log(`${strategy}: ${Math.round(ipPercentages[index] * 100)}`)
          }
          v.log(randomNumber)
        }
    })
  }
}

module.exports = getBoard;