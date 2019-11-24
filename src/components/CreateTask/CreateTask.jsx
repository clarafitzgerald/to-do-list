import React, { Component } from "react";
import styles from "./CreateTask.module.scss";
import { firestore } from "../../firebase";

class CreateTask extends Component {
  state = { title: "", description: "" };

  setTitle = event => {
    this.setState({ title: event.target.value });
  };

  setDescription = event => {
    this.setState({ description: event.target.value });
  };
  rerender = () => {
    this.props.getTasks();
    this.setState({ title: "", description: "" });
  };
  handleSubmit = () => {
    this.state.title !== "" && this.state.description !== ""
      ? firestore
          .collection("Tasks")
          .doc()
          .set({
            title: this.state.title,
            description: this.state.description,
            status: 0,
            datePosted: new Date()
          })
          .then(() => {
            this.rerender();
          })
          .catch(err => console.log(err))
      : console.log("insufficient data entered");
  };

  render() {
    return (
      <section className={styles.createTask}>
        <p>
          <strong>Title</strong>
        </p>
        <input onChange={this.setTitle} value={this.state.title} type="text" />
        <p>Description</p>
        <input
          onChange={this.setDescription}
          value={this.state.description}
          type="text"
        />
        <button onClick={this.handleSubmit}>submit</button>
      </section>
    );
  }
}

export default CreateTask;
