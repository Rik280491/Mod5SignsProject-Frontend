import React from 'react';
import API from './API/API'
import HomePageContainer from './homePage/HomePageContainer';
import Login from './login/Login'
import Signup from './signup/Signup'
import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      signs: [],
      username: null,
      
    }
  }
  
  componentDidMount(){
    this.checkToken();
    API.get().then(signData => this.setState({
      signs: signData
    }))
  }

  checkToken = () => {
    if (localStorage.token) {
      API.validate(localStorage.token).then((json) =>
        this.logIn(json.username, json.token)
      
      );
    }
  };

  logIn = (username, token) => {
    this.setState({
      username,
    });

    localStorage.token = token;
  };
  
  render(){
    return (
      <div >
        {!this.state.username ?  <>
            <Route
              exact
              path="/sign-up"
              component={() => (
                <Signup logIn={this.logIn} />
              )}
            />
            <Route
              exact
              path="/log-in"
              component={() => <Login logIn={this.logIn} />}
            />
          </> : 
        <HomePageContainer signs={this.state.signs} />}
      </div>
    );
  }
  
}

export default App;
