import { Component } from "react";
import "./Style.css";

export default class Button extends Component {
  render() {
    let { name, type, handleSaved } = this.props;
    return (
      <>
        <button type={type} onClick={handleSaved}>
          {name}
        </button>
      </>
    );
  }
}
