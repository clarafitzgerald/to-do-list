import React from "react";
import styles from "./App.module.scss";
import Tasks from "../Tasks";
import firebase, { provider } from "../../firebase";
import Button from "../../components/Button";
import { firestore } from "../../firebase";

/*{ Users can
  90%+ test code coverage}*/

class App extends React.Component {
  state = {
    user: null,
    numImages: 0,
    rotation: 0,
    filter: [],
    tasks: [],
    searchText: ""
  };
  getTasks = () => {
    firestore
      .collection("Tasks")
      .orderBy("status", "asc")
      .get()
      .then(querySnapshot => {
        const tasks = querySnapshot.docs.map(doc => {
          return { ...doc.data(), docId: doc.id };
        });
        let filteredTasks = tasks.filter(
          task =>
            (task.status === false && this.state.filter === "Incomplete") ||
            (task.status === true && this.state.filter === "Complete") ||
            this.state.filter.length < 1
        );

        let searchFilteredTasks = filteredTasks.filter(
          task =>
            task.title
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase()) ||
            task.description
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase)
        );
        this.setState({
          tasks: searchFilteredTasks
        });
      });
  };

  setSearchText = event => {
    this.setState({ searchText: event.target.value });
    this.getTasks();
  };

  signIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        this.setState({ user: user });
      })
      .catch(error => console.log(error));
  };

  signInDefault = () => {
    this.setState({
      user: {
        displayName: "Unknown User"
      }
    });
  };

  alterFilters = filterVal => {
    this.setState({
      filter: this.state.filter === filterVal ? [] : filterVal
    });
    this.getTasks();
  };

  render() {
    let completeStyle =
      this.state.filter === "Complete" ? { backgroundColor: "#56bc8a" } : null;
    let incompleteStyle =
      this.state.filter === "Incomplete"
        ? { backgroundColor: "#56bc8a" }
        : null;
    let html =
      this.state.user != null ? (
        <>
          <div className={styles.filters}>
            <Button
              onClick={() => this.alterFilters("Complete")}
              text="Complete"
              styling={completeStyle}
            />
            <Button
              onClick={() => this.alterFilters("Incomplete")}
              text="Incomplete"
              styling={incompleteStyle}
            />
            <input
              value={this.state.searchText}
              placeholder="Search..."
              className={styles.search}
              onChange={this.setSearchText}
            />
          </div>
          <Tasks
            filter={this.state.filter}
            getTasks={this.getTasks}
            tasks={this.state.tasks}
          />
        </>
      ) : (
        <section className={styles.logIn}>
          <h1> You have to log in to access this website. </h1>
          <section>
            <div>
              <Button
                onClick={this.signInDefault}
                text="Enter as default user"
              />
            </div>
            <div>
              <Button onClick={this.signIn} text="Sign in" />
            </div>
          </section>
        </section>
      );

    return <>{html}</>;
  }
}

export default App;
