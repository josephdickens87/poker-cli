const vorpal = require('vorpal')();
const { createVerify } = require('crypto');
const fs = require('fs');
const { get } = require('http');
const path = require('path');
const chalk = require('chalk')
const getPreflopStrategy = require('./preflop')
const getBoard = require('./postflop')

let holeCards = null, board = null, turn = null, river = null, position = null, file = null;

vorpal
  .delimiter('poker-cli$')
  .show();    

vorpal
  .command('h <holeCards> <position>',  'pass hole cards as argument')
  .action(function(args, _cb) {
    holeCards = args.holeCards;
    position = args.position
    // getPreflopStrategy(this)
    getBoard(this)
  });

// update position to be 0-5 (all positions in 6 handed), correleate strategy for IP and OOP based on position of 2 players  
// todo finish preflop strategy
// todo finish postflop strategy after  
