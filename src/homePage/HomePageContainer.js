import React from "react";
import SignCard from "../signs/SignCard";
import { connect } from "react-redux";

function HomePageContainer(props) {
	const { signs } = props;

	const renderSigns = () => {
		return signs.map((sign, index) => {
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

	return (
		<div>
			<h1 className="title">Hear Together</h1>

			{renderSigns()}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		signs: state.signs,
	};
};

export default connect(mapStateToProps, null)(HomePageContainer);
