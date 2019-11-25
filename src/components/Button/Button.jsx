import React from "react";
import styles from "./Button.module.scss";

class Button extends React.Component {
  render() {
    return (
      <button
        className={styles.button}
        onClick={this.props.onClick}
        style={this.props.styling}
      >
        {this.props.text}
      </button>
    );
  }
}

export default Button;
