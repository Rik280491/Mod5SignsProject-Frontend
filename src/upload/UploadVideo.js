import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../login/Login";
import Signup from "../signup/Signup";

class UploadVideo extends React.Component {
	render() {
		console.log(this.props);
		return (
			<div>
				<h1>
					To upload a video please <Link to="/login"> log in </Link> or
					<Link to="/signup"> Sign Up </Link>
                    
				</h1>
			</div>

			//

			
		);
	}
}
const mapStateToProps = (state) => {
	return {
		username: state.username,
	};
};

export default connect(mapStateToProps, null)(UploadVideo);
