import React, { Component } from "react";
import Task from "../../components/Task";
import { firestore } from "../../firebase";

class Tasks extends Component {
  state = { tasks: [] };

  getTasks = () => {
    firestore
      .collection("Tasks")
      .get()
      .then(querySnapshot => {
        const tasks = querySnapshot.docs.map(doc => {
          return { ...doc.data(), docId: doc.id };
        });
        this.setState({
          tasks
        });
      });
  };
  componentDidMount() {
    this.getTasks();
  }
  render() {
    return (
      <>
        <main>
          {this.state.tasks.map(task => (
            <Task taskData={task} key={task.docId} getTasks={this.getTasks} />
          ))}
        </main>
      </>
    );
  }
}

export default Tasks;
