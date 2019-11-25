import React, { Component } from "react";
import styles from "./Task.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { firestore } from "../../firebase";

class Task extends Component {
  state = {
    isTitleEditActive: false,
    title: "",
    isDescriptionEditActive: false,
    description: ""
  };
  changeStatus = () => {
    firestore
      .collection("Tasks")
      .doc(this.props.taskData.docId)
      .update({
        status: !this.props.taskData.status
      })
      .then(this.props.getTasks())
      .catch(err => console.log(err));
  };

  deleteTask = () => {
    firestore
      .collection("Tasks")
      .doc(this.props.taskData.docId)
      .delete()
      .then(() => this.props.getTasks())
      .catch(err => console.log(err));
  };

  startEditingTitle = () => {
    this.state.isTitleEditActive
      ? this.updateTitle()
      : this.setState({
          isTitleEditActive: !this.state.isTitleEditActive,
          title: this.props.taskData.title
        });
  };

  startEditingDescription = () => {
    this.state.isDescriptionEditActive
      ? this.updateDescription()
      : this.setState({
          isDescriptionEditActive: !this.state.isDescriptionEditActive,
          description: this.props.taskData.description
        });
  };

  getTasksAndCloseTitleEdit = () => {
    this.props.getTasks();
    this.setState({ isTitleEditActive: !this.state.isTitleEditActive });
  };

  getTasksAndCloseDescriptionEdit = () => {
    this.props.getTasks();
    this.setState({
      isDescriptionEditActive: !this.state.isDescriptionEditActive
    });
  };

  updateTitle = () => {
    firestore
      .collection("Tasks")
      .doc(this.props.taskData.docId)
      .update({ title: this.state.title })
      .then(() => this.getTasksAndCloseTitleEdit())
      .catch(err => console.log(err));
  };
  updateDescription = () => {
    firestore
      .collection("Tasks")
      .doc(this.props.taskData.docId)
      .update({ description: this.state.description })
      .then(() => this.getTasksAndCloseDescriptionEdit())
      .catch(err => console.log(err));
  };

  setTitle = event => {
    this.setState({ title: event.target.value });
  };

  setDescription = event => {
    this.setState({ description: event.target.value });
  };

  render() {
    const renderCheckbox = this.props.taskData.status ? (
      <FontAwesomeIcon
        id="checkCircle"
        icon={faCheckCircle}
        onClick={this.changeStatus}
      />
    ) : (
      <FontAwesomeIcon
        id="circle"
        icon={faCircle}
        onClick={this.changeStatus}
      />
    );

    const conditionalStyling = this.props.taskData.status
      ? styles.completedTask
      : styles.incompleteTask;

    const titleOrtitleInput = this.state.isTitleEditActive ? (
      <input onChange={this.setTitle} value={this.state.title} type="text" />
    ) : (
      <strong>{this.props.taskData.title}</strong>
    );

    const descriptionOrdescriptionInput = this.state.isDescriptionEditActive ? (
      <input
        onChange={this.setDescription}
        value={this.state.description}
        type="text"
      />
    ) : (
      <p>{this.props.taskData.description}</p>
    );
    return (
      <section className={`${styles.task} ${conditionalStyling}`}>
        <section className={styles.upperLine}>
          <p>
            {titleOrtitleInput}
            <i>
              <FontAwesomeIcon icon={faPen} onClick={this.startEditingTitle} />
            </i>
          </p>

          <div>
            <i>
              <FontAwesomeIcon icon={faTimes} onClick={this.deleteTask} />
            </i>
          </div>
        </section>
        <section className={styles.content}>
          <div>
            {descriptionOrdescriptionInput}
            <i>
              <FontAwesomeIcon
                icon={faPen}
                onClick={this.startEditingDescription}
              />
            </i>
          </div>
          <i>{renderCheckbox}</i>
        </section>
      </section>
    );
  }
}

export default Task;
