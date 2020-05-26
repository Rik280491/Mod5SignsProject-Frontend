import React from "react";
import API from "./API/API";
import HomePageContainer from "./homePage/HomePageContainer";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import UploadVideo from "./upload/UploadVideo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ResponsiveDrawer from "./homePage/styleComponents/ResponsiveDrawer";
import UserVideos from "./userUploads/UserVideos";
import CircularProgress from "@material-ui/core/CircularProgress";

class App extends React.Component {
	state = {
		isLoading: true,
	};

	componentDidMount() {
		this.checkToken();
		API.get()
			.then(this.props.getSigns)
			.then(() =>
				this.setState({
					isLoading: false,
				})
			);
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
		this.props.history.push("/upload");
	};

	logOut = () => {
		this.props.logOutUser();
		localStorage.removeItem("token");
	};

	render() {
		return (
			<>
				{/* { this.state.isLoading ? <CircularProgress /> : null} */}

				<ResponsiveDrawer logIn={this.logIn} logOut={this.logOut} />

				<div>
					<Route
						exact
						path="/"
						render={(props) => <HomePageContainer {...props} />}
					/>
					<Route
						exact
						path="/signup"
						render={(props) => <Signup {...props} logIn={this.logIn} />}
					/>
					<Route
						exact
						path="/login"
						render={(props) => <Login {...props} logIn={this.logIn} />}
					/>
					<Route
						exact
						path="/upload"
						render={(props) => <UploadVideo {...props} />}
					/>
					<Route
						exact
						path="/user-uploads"
						render={(props) => <UserVideos {...props} />}
					/>
				</div>
			</>
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
		logOutUser: () => dispatch({ type: "LOGOUTUSER" }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
