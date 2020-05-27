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
					videoArr={sign.videos}
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
		
		return (
			<div>
				<ResponsiveDrawer toggleUpload={this.Upload}/>
				{this.state.drawerOption === "upload" ? 
				   <UploadVideo /> :
				   <>
				   <h1 className="title">Hear Together</h1>

				   {this.renderSigns()}  
				   </>
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
