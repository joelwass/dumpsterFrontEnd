import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import API from '../../api/api';

class App extends Component {

  state = {
    isReady: false,
    trivia: [],
  }

  componentWillMount() {

  }

  _fetchTrivia = async () => {
    try {
      const trivia = await API.getTriviaQuestions();
      this.setState({ trivia, isReady: true });
    } catch (e) {
      console.log(e);
    }
  }

  // make new
  _addTrivia = () => {
    console.log(this.state);
  }

  // send delete request to api, and remove the row with the id passed in from the table
  _deleteTrivia = (id) => {
    console.log(id);
  }

  // update the state of the trivia where id = the id passed in
  _updateTrivia = (id) => {
    console.log(id);
  }

  _updateTriviaQuestion = (id) => {
    console.log(id);
  }

  _updateTriviaAnswer = (id) => {
    console.log(id);
  }

  _updateTriviaIncAnswer1 = (id) => {
    console.log(id);
  }

  _updateTriviaIncAnswer2 = (id) => {
    console.log(id);
  }

  _updateTriviaIncAnswer3 = (id) => {
    console.log(id);
  }

  _inputPass = (pass) => {
    console.log(pass);
    if (pass === 'dumpsterPass') this._fetchTrivia();
  }


  _triviaView = () => {
    if (this.state.trivia) {
      return (
        this.state.trivia.map((item, i) => {
          return (
            <div className="triviaRow" key={ i } style={{ width: '100%', marginTop: '15px', marginBottom: '10px' }}>
              <label htmlFor="idLabel">Question: { item.id } </label>
              <input
                value={ item.question }
                onChange={ () => this._updateTriviaQuestion(item.id) }
                style={{ width: '80%'}}/>
              <br />
              <input
                value={ item.answer }
                onChange={ () => this._updateTriviaAnswer(item.id) }/>
              <input
                value={ item.incAnswer1 }
                onChange={ () => this._updateTriviaIncAnswer1(item.id) }/>
              <input
                value={ item.incAnswer2 }
                onChange={ () => this._updateTriviaIncAnswer2(item.id) }/>
              <input
                value={ item.incAnswer3 }
                onChange={ () => this._updateTriviaIncAnswer3(item.id) }/>
              <button
                onClick={ () => this._deleteTrivia(item.id) }>
                Delete
              </button>
              <button
                onClick={ () => this._updateTrivia(item.id) }>
                Update
              </button>
            </div>
          )
        })
      )
    }
  }


  // make loading page
  // if trivia is undefined, then show the loading page
  // otherwise map over this.state.trivia and show a row with all info, question, answer, incAnswer1, incAnswer2, incAnswer3 and delete button
  // delete button will fire, ope no delete route yet
  // update button will send to update endpoint with the questions input fields.

  // have series of inputs at the top of the page regardless of getting trivia, that will post to createTrivia with input fields

  render() {
    if (!this.state.isReady) {
      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to the Dumpster Trivia Admin</h2>
          </div>

          Password:
          <input type="text"
            style={{ width: '80%' }}
            onChange={ (e) => this._inputPass(e.target.value) }/>
        </div>
      )
    }

    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the Dumpster Trivia Admin</h2>
        </div>

        <div className="inputTrivia" style={{ marginBottom: '40px', marginTop: '10px' }}>
          <label htmlFor="newQuestionLabel">New Question: </label>
          <input
            style={{ width: '80%'}}
            onChange={ (e) => this.setState({ newTriviaQuestion: e.target.value }) }/>
          <br />
          Answer: <input
            style={{ width: '60%'}}
            onChange={ (e) => this.setState({ newTriviaAnswer: e.target.value }) }/>
          <br />
          IncAnswer1: <input
            style={{ width: '60%'}}
            onChange={ (e) => this.setState({ newTriviaIncAnswer1: e.target.value }) }/>
          <br />
          IncAnswer2: <input
            style={{ width: '60%'}}
            onChange={ (e) => this.setState({ newTriviaIncAnswer2: e.target.value }) }/>
          <br />
          IncAnswer3: <input
            style={{ width: '60%'}}
            onChange={ (e) => this.setState({ newTriviaIncAnswer3: e.target.value }) }/>
          <br />
          Category: <input
            style={{ width: '60%'}}
            onChange={ (e) => this.setState({ newTriviaCategory: e.target.value }) }/>
          <br />
          <button
            onClick={ () => this._addTrivia() }>
            Add
          </button>
        </div>

        { this._triviaView() }

      </div>
    );
  }

}

export default App;
