import React from "react";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
import Test from "../pages/test";
import NoMatch from "../pages/NoMatch";
import Search from "../pages/Search";
import Playbox from "../pages/Playbox";
import Login from "../pages/login";
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
          </Switch>
        </main>
      </HashRouter>
    );
  }
}
const IndexPage = () => (
  <h2>
    <Link to="/search">搜索</Link>
    <br />
    <Link to="/test">测试</Link>
    <br />
    <Link to="/playbox">播放盒子</Link>
    <br />
    <Link to="/login">登录</Link>
  </h2>
);
