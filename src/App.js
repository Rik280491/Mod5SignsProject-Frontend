import React from 'react';
import API from './API/API'
import HomePageContainer from './homePage/HomePageContainer';
import Login from './login/Login'
import Signup from './signup/Signup'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";



class App extends React.Component {
  constructor(){
    super()
    
  }
  
  componentDidMount(){
    this.checkToken();
    API.get().then(this.props.getSigns)
  }

  checkToken = () => {
    if (localStorage.token) {
      API.validate(localStorage.token).then((json) =>
        this.logIn(json.username, json.token)
      
      );
    }
  };

  logIn = (username, token) => {
    this.props.getUsername(username)

    localStorage.token = token;
  };
  
  render(){
    console.log(this.props)
    return (
      <div >
        {!this.props.username ?  <>
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
        <HomePageContainer  />}
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    username: state.username


  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSigns: (signs) => dispatch({ type: "GET_SIGNS", payload: { signs } }),
    getUsername: (username) => dispatch({type: "USERNAME", payload:  {username}})
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(App);
// use withRouter
