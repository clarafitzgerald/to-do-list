import React, { Component } from "react";
import Task from "../../components/Task";
import CreateTask from "../../components/CreateTask";

class Tasks extends Component {
  state = { tasks: [] };

  componentDidMount() {
    this.props.getTasks();
  }
  render() {
    return (
      <>
        <main>
          <CreateTask getTasks={this.props.getTasks} />
          {this.props.tasks.map(task => (
            <Task
              taskData={task}
              key={task.docId}
              getTasks={this.props.getTasks}
            />
          ))}
        </main>
      </>
    );
  }
}

export default Tasks;
