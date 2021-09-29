const vorpal = require('vorpal')();
let holeCards = null, board = null, turn = null, river = null;

vorpal
  .delimiter('poker-cli$')
  .show();    

vorpal
  .command('hc <holeCards>', 'pass hole cards as argument')
  .action(function(args, _cb) {
    holeCards = args.holeCards;
    getBoard(this)
  });

const getRiver = (v) => {
  v.prompt({
    type: 'input',
    name: 'river',
    message: "what's the river? ",
    },
    function(result){
      if (result.river) {
        river = result.river;
        v.log(holeCards, board, turn, river)
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
        getTurn(v)
  });
}  