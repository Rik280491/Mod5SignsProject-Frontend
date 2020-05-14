import React from "react";
import SignCard from "../signs/SignCard";

export default class HomePageContainer extends React.Component {
	

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
        return (
        <div>
            {this.renderSigns()}
        </div>
        )
	}
}
