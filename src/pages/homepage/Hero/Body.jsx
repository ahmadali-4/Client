import React from "react";
import "../Hero/Hero.css";

function Body() {
  return (
    <div id="home-body">
      <h2 id="home-body-heading">Welcome To CUI ChatHub</h2>
      <p className="home-body-span">
        where you can belong to a school club, a gaming group or a worldwide art
        community.
      </p>
      <div>
        <button className="login-btn">
          <a href="/auth/login">Login</a>
        </button>
        <button className="login-btn">
          <a href="/auth/register">SignUp</a>
        </button>
      </div>
    </div>
  );
}

export default Body;
