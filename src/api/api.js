
module.exports = {

  triviaQuestions: [],

  // get trivia questions from database and store them locally
  getTriviaQuestions: function() {
    console.log('getting trivia');

    return new Promise((resolve, reject) => {
      // if we have questions already, just return the next one, if not, grab them all again
      if (module.exports.triviaQuestions.length === 0) {
        return fetch(`https://dumpster.herokuapp.com/api/v1/trivia`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(result => result.json()).then(result => {
            if (result.success !== 'true') Promise.reject(result.message);
            // get out the trivia questions from the response
            module.exports.triviaQuestions = result.trivia;
            resolve(module.exports.triviaQuestions);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        resolve(module.exports.triviaQuestions);
      }
    });
  },
};
