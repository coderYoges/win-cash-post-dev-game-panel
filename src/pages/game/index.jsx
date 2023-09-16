import React, { Fragment } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { get } from "lodash";
import { PreLoginTopNav } from "../../components/common/PreLoginTopNav";
import PostLoginTopNav from "../../components/common/PostLoginTopNav";
import { BottomNavBar } from "../../components/common/BottomNavBar";
import { GameContainer } from "./GameContainer";
import { RouteConfig } from "../../config/routeConfig";
import { setWalletBalance } from "../../redux/auth";

const GamePage = (props) => {
  const history = useHistory();

  return (
    <Fragment>
      {props.isUserLoggedIn ? (
        <PostLoginTopNav />
      ) : (
        <PreLoginTopNav onLogin={() => history.push(RouteConfig.login)} />
      )}
      <GameContainer {...props} />
      <BottomNavBar />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isUserLoggedIn: get(state, "auth.loginStatus"),
  walletBalance: get(state, "auth.walletBalance"),
  userId: get(state, "auth.userId"),
  userName: get(state, "auth.userName"),
});

const mapDispatchToProps = {
  setWalletBalance: setWalletBalance,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
