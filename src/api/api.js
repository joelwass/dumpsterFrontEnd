const base_url = process.env.NODE_ENV === 'production' ? 'https://dumpster.herokuapp.com/api/v1/' : 'http://localhost:3000';
console.log(base_url);
console.log(process.env.test_node_env);
console.log(process.env);

module.exports = {

  triviaQuestions: [],
  auth: '',
  currentMaxId: 0,

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
          // get the max trivia id, so if we create a new one we have an id for it
          module.exports.currentMaxId = result.trivia.reduce((id, triviaQ) => {
            if (triviaQ.id > id) {
              return triviaQ.id;
            }
            return id;
          }, module.exports.currentMaxId);
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

  createTriviaQuestion: function(body) {
    console.log('adding trivia q: ', body.question);

    // set the body id to that of the currentMaxId + 1
    body.id = module.exports.currentMaxId + 1;
    // increment the currentMaxId
    module.exports.currentMaxId += 1;

    return new Promise((resolve, reject) => {
      // send update request
      return fetch(`${base_url}/api/v1/trivia`, {
        method: 'POST',
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
