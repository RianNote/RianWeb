import React, { Component } from "react";

export default class InboxPlans extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="InboxPlans">
				<div className="InboxPlansHeader">
					할 일
				</div>
				<div className="InboxPlansBody" />
			</div>
		);
	}
}
