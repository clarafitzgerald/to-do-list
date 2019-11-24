import React from "react";
import styles from "./Button.module.scss";

class Login extends React.Component {
  render() {
    return (
      <button className={styles.button} onClick={this.props.onClick}>
        {this.props.text}
      </button>
    );
  }
}

export default Login;
