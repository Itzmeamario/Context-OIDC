import React from "react";
import { Link } from "react-router-dom";
import { authService } from "../../services/AuthService";
import { connect } from "react-redux";
import { updateUser } from "../../redux/actionCreators";

export const HeaderButtons = connect(
  state => ({ user: state.user }),
  { updateUser }
)(({ user, updateUser }) => {
  let button = user ? (
    <button onClick={() => authService.signoutPopup(updateUser)}>Log out POP UP!</button>
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
});
