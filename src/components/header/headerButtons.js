import React, { Component } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../services/AuthService";

export class HeaderButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount = async () => {
    const user = await authService.getUser();
    this.setState({ user });
  }

  render() {
    let button =  this.state.user ? (
      <button onClick={authService.signoutPopup}>Log out POP UP!</button>
    ) : (
      <button onClick={authService.signinPopup}>Log in POP UP!</button>
    );
    return (
      <div>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/public">Public</Link>
        </div>
        <div>
          <Link to="/private">Private</Link>
        </div>
        {button}
      </div>
    );
  }
}
