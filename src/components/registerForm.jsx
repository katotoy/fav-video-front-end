import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import http from "../utils";
import memberServices from "../services/member";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", call_sign: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    call_sign: Joi.string()
      .required()
      .label("Display Name")
  };

  doSubmit = async () => {
    try {
      const { data: jwt } = await memberServices.registerUser(this.state.data);
      http.loginWithJwt(jwt["access_token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("call_sign", "Display Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
