import React from "react";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
import Test from "../pages/test";
import NoMatch from "../pages/NoMatch";
import Search from "../pages/Search";
import Playbox from "../pages/Playbox";
import Login from "../pages/login";
import Playlist from "../pages/Playlist";
import Album from "../pages/Album";
import IndexPage from "../pages/index";
export class Routers extends React.Component {
  render() {
    return (
      <HashRouter>
        <main>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route path="/test" component={Test} />
            <Route path="/search" component={Search} />
            <Route path="/playbox" component={Playbox} />
            <Route path="/login" component={Login} />
            <Route path="/playlist" component={Playlist} />
            <Route path="/album" component={Album} />
          </Switch>
        </main>
      </HashRouter>
    );
  }
}
