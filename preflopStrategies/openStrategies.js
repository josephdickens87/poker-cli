const chalk = require("chalk");
const earlyPositionHandChart = require('./handCharts')

const getOpeningStrategy = (holeCards, position) => {
  const holeCardsArray = holeCards.split('')

  if(holeCardsArray[1] === holeCardsArray[3]){
    holeCards = `${holeCardsArray[0]}${holeCardsArray[2]}s`
  } else {
    holeCards = `${holeCardsArray[0]}${holeCardsArray[2]}`
  }

  switch (position) {
    case 0:
      if(randomNumber = Math.floor(Math.random() * 100) + 1 <= earlyPositionHandChart.get(holeCards)){
        return true
      }
      break;
  
    default:
      break;
  }
  console.log(chalk.bgRed.bold('FOLD'))
  return false
};

module.exports = getOpeningStrategy;
