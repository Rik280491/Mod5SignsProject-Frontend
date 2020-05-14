import React from "react";
import API from "./API/API";
import HomePageContainer from "./homePage/HomePageContainer";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import UploadVideo from "./upload/UploadVideo"
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Redirect } from 'react-router';


class App extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
		this.checkToken();
		API.get().then(this.props.getSigns);
	}

	checkToken = () => {
		if (localStorage.token) {
			API.validate(localStorage.token).then((json) =>
				this.logIn(json.username, json.token)
			);
		}
	};

	logIn = (username, token) => {
		this.props.getUsername(username);

    localStorage.token = token;
    
	};

	render() {
		console.log(this.props);
		return (
		
      
      <Router>
      <div>
      
      <Route exact path='/home' render={routerProps => <HomePageContainer {...routerProps} />} />      
      <Route exact path="/signup" render={(props) => <Signup {...props} logIn={this.logIn}/>}/>
      <Route exact path="/login" render={(props) => <Login {...props} logIn={this.logIn} />} />
    <Route exact path="/upload" render={(props) => <UploadVideo {...props} />}/>
			</div>
      </Router>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		username: state.username,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getSigns: (signs) => dispatch({ type: "GET_SIGNS", payload: { signs } }),
		getUsername: (username) =>
			dispatch({ type: "USERNAME", payload: { username } }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))

