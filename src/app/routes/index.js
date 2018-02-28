import React from "react";
import { HashRouter, Switch, Link, Route, Redirect } from "react-router-dom";
import Test from "../pages/test";
import { connect } from "react-redux";
import Search from "../pages/Search";
import Login from "../pages/login";
import Playlist from "../pages/Playlist";
import Album from "../pages/Album";
import IndexPage from "../pages/index";
import Header from "../components/Header";
import Playbox from "../components/Playbox";
import FM from "../components/FM";
import MV from "../pages/mv";
import Mine from "../pages/mine";
import { getCookie } from "../utils/common";
// import MV from "../pages"

const isLogin = () => {
  var cookie = getCookie("__csrf");
  var profile = localStorage.getItem("profile");
  if (cookie && profile) {
    return true;
  } else {
    return false;
  }
};

@connect(store => {
  return {
    user: store.user
  };
})
export class Routers extends React.Component {
  render() {
    let { loged } = this.props.user;
    return (
      <HashRouter>
        <main>
          <Header />
          <Playbox />
          <FM />
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route path="/test" component={Test} />
            <Route path="/search" component={Search} />
            <Route path="/login" component={Login} />
            <Route path="/playlist" component={Playlist} />
            <Route path="/album" component={Album} />
            <Route
              path="/mine"
              render={renderProps => {
                return isLogin() ? (
                  <Mine {...renderProps} />
                ) : (
                  <Redirect
                    to={{
                      pathname: "/loginfirst",
                      state: { from: renderProps.location }
                    }}
                  />
                );
              }}
            />
            <Route path="/mv" component={MV} />
          </Switch>
        </main>
      </HashRouter>
    );
  }
}
