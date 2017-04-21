import React, { Component } from "react";
import CreatePlan from "./CreatePlan";
import InboxPlans from "./InboxPlans";
import "./CalendarInbox.css";

export default class CalendarInbox extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="CalendarInbox">
				<CreatePlan />
				<InboxPlans />
			</div>
		);
	}
}
