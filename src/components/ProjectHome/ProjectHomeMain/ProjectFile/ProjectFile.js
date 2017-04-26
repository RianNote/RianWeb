import React, { Component } from "react";
import classNames from "classnames";
import ComponentBox from './ComponentBox'
import "./ComponentStyle.css"

export default class ProjectFile extends Component {
	constructor(props) {
		super(props);
		console.log(this.props.Data)
		var { Data } = this.props
		const List = Data.map((data, index) => (
	      <ComponentBox
	      	key={index}
	        filename={data.filename}
	        tag={data.tag}
	        date={data.date}
	      />
	    )); 
	    this.state = {
	      List: List,
	      browserSize: window.innerHeight - 70
	    };
	    window.addEventListener("resize", () => {
	      // console.log(window.innerHeight);
	      this.setState((prevState, props) => {
	        return {
	          browserSize: window.innerHeight - 70
	        };
	      });
	    });
	}

	render() {
		return (
			<Infinite
		        className="Infinite-Box"
		        containerHeight={200}
		        // containerHeight={this.state.browserSize}
		        elementHeight={150}
		        timeScrollStateLastsForAfterUserScrolls={0}
      		>
      	  		{this.state.List}
      		</Infinite>
		)
	}

}