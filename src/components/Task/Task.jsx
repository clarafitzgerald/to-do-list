import React, { Component } from "react";
import styles from "./Task.module.scss";

class Task extends Component {
  state = {};
  render() {
    return (
      <section className={styles.task}>
        <p>
          <strong>{this.props.taskData.title}</strong>
        </p>
        <section className={styles.content}>
          <p>{this.props.taskData.description}</p>
          <p>{this.props.taskData.status}</p>
        </section>
      </section>
    );
  }
}

export default Task;
