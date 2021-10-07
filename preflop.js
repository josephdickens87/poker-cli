const chalk = require("chalk");

const getPreflopStrategy = (v) => {
  v.prompt(
    {
      type: "list",
      name: "preflopAction",
      message: "What's the sitch?",
      choices: ["Open", "Facing a raise"],
    },
    function (result) {
      if (result.preflopAction === 'Open') {
        v.prompt({
          type: "list",
          name: "threeBet",
          message: "Did Villain 3 bet?",
          choices: ["Yes", "No"],
        }, function (result) {
          if(result.threeBet === 'Yes') {
            v.prompt({
              type: 'list',
              name: '4bet',
              message: 'Did Villain 4 bet?',
              choices: ['yes', 'no'],
            }, function (result) {
              if(result === 'yes') {
                // do something
              } else {
                // do something if no 4 bet
              }
            })
          }
        });
      } else {
        // if facing raise, i call, raise, or fold.
      }
    }
  );
};

module.exports = getPreflopStrategy;