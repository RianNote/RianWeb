import React, { Component } from "react";
import { connect } from "react-redux";
import MockListComponentBox from "./MockListComponentBox.js";
import Mock from "../MOCK_DATA.js";
import Infinite from "react-infinite";
import "./MockInfinite.css"
class MockDataTimeline extends Component {
  constructor(props) {
    super(props);
    const MockList = Mock.map((data, index) => (
      <MockListComponentBox
        key={index}
        title={data.title}
        final_modified_at={data.final_modified_at}
        snippet={data.snippet}
        tag={data.tag}
      />
    )); 
    this.state = {
      List: MockList,
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
        containerHeight={this.state.browserSize}
        elementHeight={150}
        timeScrollStateLastsForAfterUserScrolls={0}
      >
        {this.state.List}
      </Infinite>
    );
  }
}

export default MockDataTimeline;
