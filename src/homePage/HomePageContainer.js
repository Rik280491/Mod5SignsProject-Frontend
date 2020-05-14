import React from "react";
import SignCard from "../signs/SignCard";
import ResponsiveDrawer from './styleComponents/ResponsiveDrawer'
import { connect } from 'react-redux'

class HomePageContainer extends React.Component {
	

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

	render() {
		console.log(this.props)
        return (
        <div>
            <ResponsiveDrawer />
            {this.renderSigns()}
        </div>
        )
	}
}

const mapStateToProps = state => {
    return {
		signs: state.signs
		
    }
}

export default connect(mapStateToProps, null)(HomePageContainer);