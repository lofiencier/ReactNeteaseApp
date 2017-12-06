import React from "react";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
import Test from "../pages/test";
import Search from "../pages/Search";
import Login from "../pages/login";
import Playlist from "../pages/Playlist";
import Album from "../pages/Album";
import IndexPage from "../pages/index";
import Header from "../components/Header";
import Playbox from "../components/Playbox";
import FM from "../components/FM";
export class Routers extends React.Component {
  render() {
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
          </Switch>
        </main>
      </HashRouter>
    );
  }
}
