import "../styles/Profile.scss";
import React from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { logout } from "../actions/auth";
function Profile({ logout, auth: { loading, user } }) {
  console.log(loading, user);
  return (
    <div className="container">
      <h1 className="my-5">My Profile</h1>
      {!loading && user ? (
        <div className="profile">
          <div className="profile-top my-5">
            <div className="img">
              <button className="btn">
                <i className="far fa-edit"></i>
              </button>
              <img src={user.image} alt={`User ${user.username}`} />
            </div>
            <div>
              <h3>{user.username}</h3>
              <p>Kitchenstories member</p>
            </div>
            <div>
              <button className="btn">
                Setting <i className="fas fa-cog"></i>
              </button>
              <button className="btn" onClick={logout}>
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
          <div className="profile-main">
            <Tabs
              defaultActiveKey="likedRecipes"
              id="profile-tabs"
              transition={false}
            >
              <Tab eventKey="myRecipes" title="My Recipes ">
                <div className="inner-tab">
                  <h1>My Recipes</h1>
                </div>
              </Tab>
              <Tab eventKey="savedRecipes" title="Saved">
                <div className="inner-tab">
                  <h1>Saved</h1>
                </div>
              </Tab>
              <Tab eventKey="likedRecipes" title="Liked">
                <div className="inner-tab">
                  <h1>liked recipes</h1>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Profile);
