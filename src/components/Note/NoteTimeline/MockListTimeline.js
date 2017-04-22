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
    const InfiniteList = (
      <Infinite
        className="Infinite-Box"
        containerHeight={window.innerHeight-70}
        elementHeight={150}
        timeScrollStateLastsForAfterUserScrolls={0}
      >
        {MockList}
      </Infinite>
    );
    this.state = {
      List: InfiniteList
    };
  }

  render() {
    return (
      <div>
        {this.state.List}
      </div>
    );
  }
}

export default MockDataTimeline;
