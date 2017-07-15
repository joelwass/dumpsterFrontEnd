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

  // update the state of the trivia where id = the id passed in
  _updateTrivia = async (index) => {
    try {
      let updateResult = await API.updateTriviaQuestion();
      console.log(updateResult);
    } catch (e) {
      console.log(e);
    }
  }

  _inputPass = (pass) => {
    console.log(pass);
    this.setState({ password: pass });
  }

  _inputEmail = (email) => {
    console.log(email);
    this.setState({ email });
  }

  _login = async () => {
    try {
      const loginResult = await API.login({ email: this.state.email, password: this.state.password });
      if (!loginResult.success) alert('incorrect password');
      if (loginResult.success) this._fetchTrivia();
    } catch (e) {
      console.log(e);
    }
  }

  _updateTriviaQuestionProperty = (index, value, property) => {
    let trivia = this.state.trivia;
    let currentTriviaQuestion = trivia[index];
    currentTriviaQuestion[property] = value;
    trivia[index] = currentTriviaQuestion;
    this.setState({ trivia });
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
                onChange={ (e) => this._updateTriviaQuestionProperty(i, e.target.value, 'question') }
                style={{ width: '80%'}}/>
              <br />
              <input
                value={ item.answer }
                onChange={ (e) => this._updateTriviaQuestionProperty(i, e.target.value, 'answer') }/>
              <input
                value={ item.incAnswer1 }
                onChange={ (e) => this._updateTriviaQuestionProperty(i, e.target.value, 'incAnswer1') }/>
              <input
                value={ item.incAnswer2 }
                onChange={ (e) => this._updateTriviaQuestionProperty(i, e.target.value, 'incAnswer2') }/>
              <input
                value={ item.incAnswer3 }
                onChange={ (e) => this._updateTriviaQuestionProperty(i, e.target.value, 'incAnswer3') }/>
              <button
                onClick={ () => this._updateTrivia(i) }>
                Update
              </button>
            </div>
          )
        })
      )
    }
  }

  // delete button will fire, ope no delete route yet
  // update button will send to update endpoint with the questions input fields.

  render() {
    if (!this.state.isReady) {
      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to the Dumpster Trivia Admin</h2>
          </div>
          Email:
          <input type="text"
                 style={{ width: '40%' }}
                 onChange={ (e) => this._inputEmail(e.target.value) }/>
          <br />
          Password:
          <input type="text"
            style={{ width: '40%' }}
            onChange={ (e) => this._inputPass(e.target.value) }/>
          <br />
          <button
            onClick={ () => this._login() }>
            Login
          </button>
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
