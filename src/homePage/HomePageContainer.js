import React from "react";
import SignCard from "../signs/SignCard";
import ResponsiveDrawer from "./styleComponents/ResponsiveDrawer";
import { connect } from "react-redux";
import UploadVideo from '../upload/UploadVideo'


class HomePageContainer extends React.Component {
	
	
	
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







	render() {
		
		return (
			<div>
			
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
