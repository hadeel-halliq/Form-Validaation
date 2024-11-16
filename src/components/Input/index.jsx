import { Component } from "react";
import "./Style.css";

export default class Input extends Component {
  render() {
    let { type, id, forHtml, label, value, onChange, typeName } = this.props;
    return (
      <>
        {typeName !== "check" ? (
          <div className="inputClass">
            <label htmlFor={forHtml}>{label}</label>
            <input type={type} id={id} value={value} onChange={onChange} />
          </div>
        ) : (
          <div>
            <input type={type} id={id} value={value} onChange={onChange} />
            <label htmlFor={forHtml}>{label}</label>
          </div>
        )}
        
      </>
    );
  }
}
