const base_url = 'http://localhost:3000';

module.exports = {

  triviaQuestions: [],
  auth: '',

  // get trivia questions from database and store them locally
  getTriviaQuestions: function() {
    console.log('getting trivia');

    return new Promise((resolve, reject) => {
      // if we have questions already, just return the next one, if not, grab them all again
      if (module.exports.triviaQuestions.length === 0) {
        return fetch(`${base_url}/api/v1/trivia`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Auth': module.exports.auth,
          },
        }).then(result => result.json()).then(result => {
          if (result.success !== true) reject(result);
          // get out the trivia questions from the response
          module.exports.triviaQuestions = result.trivia;
          resolve(module.exports.triviaQuestions);
        }).catch(err => {
          reject(err);
        });
      } else {
        resolve(module.exports.triviaQuestions);
      }
    });
  },

  updateTriviaQuestion: function(body) {
    console.log('updating trivia id:', body.id);

    return new Promise((resolve, reject) => {
      // send update request
      return fetch(`${base_url}/api/v1/trivia`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Auth': module.exports.auth,
        },
        body: JSON.stringify(body),
      }).then(result => result.json()).then(result => {
        if (result.success !== true) reject(result);
        resolve(result);
      }).catch(err => {
        reject(err);
      })
    })
  },

  login: function(body) {
    console.log('logging in');

    return new Promise((resolve, reject) => {
      return fetch(`${base_url}/api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then(result =>  result.json()).then(result => {
        if (result.success) {
          // set the refresh token to use for future requests
          module.exports.auth = result.refreshToken;
        }
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    })
  },
};
