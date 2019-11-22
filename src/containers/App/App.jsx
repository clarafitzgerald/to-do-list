import React, { Component } from "react";
import "./App.module.scss";
import Tasks from "../Tasks";
import CreateTask from "../../components/CreateTask";

class App extends Component {
  state = { user: null };

  render() {
    return (
      <>
        <CreateTask />
        <Tasks />
      </>
    );
  }
}

export default App;
