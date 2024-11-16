import { Component } from "react";
import Input from "../Input";
import Container from "../Container";
import "./Style.css";
import Button from "../Button";
import { boolean, object, ref, string } from "yup";

const initialData = {
  name: "hadeel",
  email: "hadeelhalliq@gmail.com",
  password: "gghh33",
  repeatpassword: "gghh33",
  isCheck: true,
};

const defaults = {
  name: "",
  email: "",
  password: "",
  repeatpassword: "",
  isCheck: "",
};

export default class Form extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    repeatpassword: "",
    isCheck: false,
    myData: initialData,
  };

  schema = object().shape({
    name: string()
      .min(6, "Name must be 6 chara at lest")
      .max(16, "Max length of name is 16 chara")
      .lowercase("Name ust be inlowercass")
      .required("Name is Require"),
    email: string().email().required(),
    password: string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one digit")
      .matches(/[\W_]/, "Password must contain at least one special character")
      .required("Password is required"),
    repeatpassword: string()
      .oneOf([ref("password"), null], "Passwords must match")
      .required("Repeat Password is required"),
    isCheck: boolean().oneOf([true]).required(),
  });

  handleChange = (e) => {
    let { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleCheck = (e) => {
    this.setState({ isCheck: e.target.checked });
  };

  handleSaved = () => {
    this.setState((prevState) => ({
      name: prevState.myData.name,
      email: prevState.myData.email,
      password: prevState.myData.password,
      repeatpassword: prevState.myData.repeatpassword,
      isCheck: prevState.myData.isCheck,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.schema
      .validate(
        {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          repeatpassword: this.state.repeatpassword,
        },
        { abortEarly: false }
      )
      .then(() => {
        console.log("valied");
        this.setState((prevState) => ({
          myData: {
            name: prevState.name,
            email: prevState.email,
            password: prevState.password,
            repeatpassword: prevState.repeatpassword,
            isCheck: prevState.isCheck,
          },
          ...defaults,
        }));
      })
      .catch((e) => console.log(e.errors));
  };

  render() {
    return (
      <>
        <Container>
          <form onSubmit={this.handleSubmit}>
            <Input
              type={"text"}
              id={"name"}
              forHtml={"name"}
              label={"Name: "}
              value={this.state.name}
              onChange={this.handleChange}
            />
            <Input
              type={"email"}
              id={"email"}
              forHtml={"email"}
              label={"Email: "}
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Input
              type={"password"}
              id={"password"}
              forHtml={"password"}
              label={"Password: "}
              value={this.state.password}
              onChange={this.handleChange}
            />
            <Input
              type={"password"}
              id={"repeatpassword"}
              forHtml={"repeatpassword"}
              label={"Repeat-Password: "}
              value={this.state.repeatpassword}
              onChange={this.handleChange}
            />
            <Input
              type={"checkbox"}
              id={"checked"}
              forHtml={"checked"}
              label={"I agree "}
              value={this.state.isCheck}
              onChange={this.handleCheck}
              typeName={"check"}
            />
            <div className="buttonContainer">
              <Button name={"Submit"} type={"submit"} />
              <Button
                name={"Saved Values"}
                type={"button"}
                handleSaved={this.handleSaved}
              />
            </div>
          </form>
        </Container>
      </>
    );
  }
}
