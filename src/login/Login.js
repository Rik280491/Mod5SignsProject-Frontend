import React from "react";
import API from "../API/API";
import LoginForm from "./styleComponents/LoginForm";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: "",
		};
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();

		API.logIn(this.state).then((json) => {
			if (json.error) {
				alert("The username and/or password is incorrect");
			} else {
				this.props.logIn(json.username, json.token);
			}
		});
	};

	render() {
		console.log(this.props);
		return (
			<div>
				<LoginForm
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
				/>
			</div>
		);
	}
}

export default withRouter(Login);
