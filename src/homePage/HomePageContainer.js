import React from "react";
import SignCard from "../signs/SignCard";
import ResponsiveDrawer from "./styleComponents/ResponsiveDrawer";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UploadVideo from '../upload/UploadVideo'
import SearchSigns from '../search/SearchSigns'


class HomePageContainer extends React.Component {
	constructor(){
		super()
		this.state = {
			drawerOption: ""
		}
	}
	
	
	renderSigns = () => {
		return this.props.signs.map((sign, index) => {
			return (
				<SignCard
					key={index}
					name={sign.name}
					// refactor to videos[i] when implementing multiple videos option
					videoURL={sign.videos[0].video_url}
					id={sign.id}
					sign={sign}
				/>
			);
		});
	};

	toggleUpload = () => {
		this.setState({
			drawerOption: "upload"
		})
		
	}

	

	render() {
		console.log(this.props);
		return (
			<div>
				<ResponsiveDrawer toggleUpload={this.Upload}/>
				{this.state.drawerOption === "upload" ? 
				   <UploadVideo /> :
				 
				   this.renderSigns()  
				   }
				
				
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		signs: state.signs,
	};
};

export default connect(mapStateToProps, null)(HomePageContainer);
