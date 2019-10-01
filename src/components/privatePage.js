import React, { Component } from "react";
import { authService } from "../services/AuthService";

export class PrivatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount = async () => {
    const user = await authService.getUser();
    this.setState({ user });
  };

  render() {
    return (
      <h1>

        {JSON.stringify(this.state.user)}
      </h1>
    );
  }
}
