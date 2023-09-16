import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { RouteConfig } from "../config/routeConfig";
import HomePage from "./home";
import LoginPage from "./login";
import GamePage from "./game";
import MinePage from "./mine";
import AndarBahar from "./andar-bahar";
import DragonTiger from "./dragon-tiger";
import LuckySeven from "./lucky-seven";
import Orderhistory from "./orderhistory";
import FinancialDetail from "./financial-detail";
import ActivityLog from "./activity-log";
import PasswordHistory from './password-history';

const MainPage = ({ isAuthenticated, ...props }) => {
  return (
    <Switch>
      <Route exact path={RouteConfig.initial}>
        <Redirect to={RouteConfig.home} />
      </Route>
      <Route exact path={RouteConfig.home}>
        <HomePage {...props} />
      </Route>
      <Route exact path={RouteConfig.login}>
        <LoginPage {...props} />
      </Route>
      <Route exact path={RouteConfig.game}>
        {isAuthenticated ? (
          <GamePage {...props} />
        ) : (
          <Redirect to={RouteConfig.login} />
        )}
      </Route>
      <Route exact path={RouteConfig.mine}>
        {isAuthenticated ? (
          <MinePage {...props} />
        ) : (
          <Redirect to={RouteConfig.login} />
        )}
      </Route>
      <Route exact path={RouteConfig.andarBahar}>
        {isAuthenticated ? (
          <AndarBahar {...props} />
        ) : (
          <Redirect to={RouteConfig.login} />
        )}
      </Route>
      <Route exact path={RouteConfig.dragonTiger}>
        {isAuthenticated ? (
          <DragonTiger {...props} />
        ) : (
          <Redirect to={RouteConfig.login} />
        )}
      </Route>
      <Route exact path={RouteConfig.luckySeven}>
        {isAuthenticated ? (
          <LuckySeven {...props} />
        ) : (
          <Redirect to={RouteConfig.login} />
        )}
      </Route>
      <Route exact path={RouteConfig.order}>
        {isAuthenticated ? (
          <Orderhistory {...props} />
        ) : (
          <Redirect to={RouteConfig.login} />
        )}
      </Route>
      <Route exact path={RouteConfig.finDetail}>
        {isAuthenticated ? (
          <FinancialDetail {...props} />
        ) : (
          <Redirect to={RouteConfig.login} />
        )}
      </Route>
      <Route exact path={RouteConfig.activity}>
        {isAuthenticated ? (
          <ActivityLog {...props} />
        ) : (
          <Redirect to={RouteConfig.login} />
        )}
      </Route>
      <Route exact path={RouteConfig.changePassword}>
        {isAuthenticated ? (
          <ActivityLog {...props} />
        ) : (
          <PasswordHistory {...props} />
        )}
      </Route>
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.loginStatus,
});

export const Main = connect(mapStateToProps)(MainPage);
