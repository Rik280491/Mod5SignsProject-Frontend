import React from 'react';
import API from './API/API'
import HomePageContainer from './homePage/HomePageContainer';
import Login from './login/Login'

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
        // this.logIn(json.username, json.token)
      console.log(json)
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
        {!this.state.username ? <Login logIn={this.logIn} /> : 
        <HomePageContainer signs={this.state.signs} />}
      </div>
    );
  }
  
}

export default App;
