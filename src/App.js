import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import http from "./utils";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import Logout from "./components/logout";
import Gallery from "./components/gallery";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import VideoDetail from "./components/videoDetail";
import MyShare from "./components/myShare";
import ViewVideo from "./components/viewVideo";
import Profile from "./components/profile";

import CtxProvider from "./services/myProvider";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  render() {
    const userID = http.getCurrentUser();
    return (
      <React.Fragment>
        <CtxProvider>
          <NavBar userID={userID} />
          <div className="container">
            <ToastContainer />
            <Switch>
              <Route path="/login" component={LoginForm} />
              <Route path="/sign_up" component={RegisterForm} />
              <Route path="/video_detail/:videoID" component={VideoDetail} />
              <Route path="/video_detail" component={VideoDetail} />
              <Route path="/view_video/:videoID" component={ViewVideo} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/myshare" component={MyShare} />
              <Route path="/profile" component={Profile} />
              <Route path="/logout" component={Logout} />
              <Redirect from="/" exact to="/gallery" />
              <Redirect from="*" to="/" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </CtxProvider>
      </React.Fragment>
    );
  }
}

export default App;
