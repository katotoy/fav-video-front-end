import { Component } from "react";
import http from "../utils";

export class Logout extends Component {
  componentDidMount() {
    http.logout();

    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
