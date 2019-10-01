import React from "react";
import { connect } from "react-redux";

export const PrivatePage = connect(state => ({ user: state.user }))(
  ({ user }) => {
    return <h1>{JSON.stringify(user)}</h1>;
  }
);
