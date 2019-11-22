import React, { Component } from "react";
import styles from "./CreateTask.module.scss";
import { firestore } from "../../firebase";

class CreateTask extends Component {
  state = { inputText: "", title: "", description: "" };

  setTitleInput = event => {
    this.setState({ title: event.target.value });
  };

  setDescInput = event => {
    this.setState({ description: event.target.value });
  };
  handleSubmit = () => {
    firestore
      .collection("Tasks")
      .doc()
      .set({
        title: this.state.title,
        description: this.state.description,
        status: "incomplete"
      })
      .then(console.log("sent"))
      .catch(console.log("not sent"));
  };

  render() {
    console.log(this.state.title, this.state.description);
    return (
      <section className={styles.createTask}>
        <p>
          <strong>Title</strong>
        </p>
        <input
          onChange={this.setTitleInput}
          value={this.titleInput}
          type="text"
        />
        <p>Description</p>
        <input
          onChange={this.setDescInput}
          value={this.descInput}
          type="text"
        />
        <button onClick={this.handleSubmit}>submit</button>
      </section>
    );
  }
}

export default CreateTask;
