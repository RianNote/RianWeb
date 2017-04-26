import React, { Component } from "react";
import { connect } from "react-redux";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import createBrowserHistory from "history/createBrowserHistory";
const history = createBrowserHistory();

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

/*----------  ACTIONS  ----------*/
// import {
//   userCheckAuth,
//   userSignUp,
//   userLogIn,
//   userLogOut,
//   userRegisterEmail,
//   userAddProject
// } from "../../actions/UserActions";
// import {
//   projectPost,
//   projectDetach,
//   projectLinkMakeOrExtend
// } from "../../actions/ProjectActions";
/*============================
=            RIAN            =
============================*/
import Header from "./Header/HeaderContainer";
import Body from "./Body/BodyContainer";

import "./Rian.css";

@DragDropContext(HTML5Backend)
@connect(mapState)
export default class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const { mode } = this.props.Mode;
    return ( 
      <Router history={history}>
        <div className={`app-${mode}`}>
          <Header />
          <Body />
        </div>
      </Router>
    );
  }
}

function mapState(state) {
  return {
    User: state.User,
    Project: state.Project,
    Mode: state.Mode
  };
}

