import React, { Component } from "react";
import { Consumer } from "../services/myProvider";
import { isEmpty, formatDate } from "../utils";

class Profile extends Component {
  state = {};

  getStyle = () => {
    return {
      backgroundColor: "#e6f0ff",
      margin: "20px",
      border: "solid black 1px"
    };
  };

  displayProfile = context => {
    if (isEmpty(context.state.memberProfile)) return;

    const {
      member_id,
      email,
      call_sign,
      join_date
    } = context.state.memberProfile;

    console.log(context.state.memberProfile);
    return (
      <table className="table">
        <tbody>
          <tr>
            <td>Member ID</td>
            <td>{member_id}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td>Date Joined</td>
            <td>{formatDate(join_date)}</td>
          </tr>
          <tr>
            <td>Display Name</td>
            <td>{call_sign}</td>
          </tr>
        </tbody>
      </table>
    );
  };
  render() {
    return (
      <div className="container" style={this.getStyle()}>
        <h4 className="text-center">Member's Profile</h4>
        <Consumer>{context => this.displayProfile(context)}</Consumer>
      </div>
    );
  }
}

export default Profile;
