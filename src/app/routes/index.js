import React from "react";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
import Test from "../pages/test";
import NoMatch from "../pages/NoMatch";
import Search from "../pages/Search";

export class Routers extends React.Component {
  render() {
    return (
      <HashRouter>
        <main>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route path="/test" component={Test} />
            <Route path="/search" component={Search} />
          </Switch>
        </main>
      </HashRouter>
    );
  }
}
const IndexPage = () => <h1>this is homepage</h1>;
