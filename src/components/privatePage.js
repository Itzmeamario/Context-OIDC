import React, { Component } from "react";

export class PrivatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount = async () => {
    const user = await this.props.getUser();
    this.setState({user})
  }

  render() {
    return (
      <h1>
        HI! {JSON.stringify(this.state.user)}
      </h1>
    );
  }
}
