import React, { Fragment } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import { useHistory } from "react-router";
import { PreLoginTopNav } from "../../components/common/PreLoginTopNav";
import PostLoginTopNav from "../../components/common/PostLoginTopNav";
import { BottomNavBar } from "../../components/common/BottomNavBar";
import { HomeContainer } from "./HomeContainer";
import { RouteConfig } from "../../config/routeConfig";

const HomePage = ({ isUserLoggedIn, balance }) => {
  const history = useHistory();

  return (
    
    <Fragment>
      {isUserLoggedIn ? (
        <PostLoginTopNav />
      ) : (
        <PreLoginTopNav onLogin={() => history.push(RouteConfig.login)} />
      )}

      <div className="main-content">
        <HomeContainer />
      </div>

      <BottomNavBar />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isUserLoggedIn: get(state, "auth.loginStatus"),
  balance: state.auth.balance,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
