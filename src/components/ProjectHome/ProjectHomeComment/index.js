import React, { Component } from "react";
import classNames from "classnames";
import ComponentBox from './ComponentBox'
import Infinite from "react-infinite";
import "./ComponentStyle.css"


export default class ProjectComment extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.Data)
    var { Data } = this.props
    const List = Data.map((data, index) => (
        <ComponentBox
          key={index}
          name={data.name}
          tagging={data.tagging}
          date={data.date}
          file={data.file}
          content={data.content}
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
            className="right Infinite-Box"
            containerHeight={this.state.browserSize}
            elementHeight={150}
            timeScrollStateLastsForAfterUserScrolls={0}
          >
              {this.state.List}
          </Infinite>
    )
  }

}