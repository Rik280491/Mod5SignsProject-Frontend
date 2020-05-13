import React from "react";
import SignCard from "../signs/SignCard";

export default class HomePageContainer extends React.Component {
	

	renderSigns = () => {
		return this.props.signs.map((sign, index) => {
			return (
				<SignCard
					key={index}
					name={sign.name}
					videoURL={sign.video_url}
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
