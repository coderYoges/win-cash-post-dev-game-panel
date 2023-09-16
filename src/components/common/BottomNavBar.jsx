import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { IconComponent, Icons } from "../elements/icon/Icon";
import { LoginPopUp } from "./LoginPopUp";
import { RouteConfig } from "../../config/routeConfig";
import { COMMON_LABELS } from "../../config/constants";

const StickyContainer = styled.div`
  display: flex;
  color: #fff;
  height: 64px;
  white-space: nowrap;
  background: #1c3b6a;
  max-height: 64px;
  margin: 0;
  background-color: #1c3b6a !important;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`;

const StyledNavColumn = styled.div`
  user-select: none;
  align-items: center;
  margin: auto;
  color: rgb(93, 152, 192);
`;

const BottomNavBarConnected = ({ loginStatus }) => {
  const [isModal, setModal] = useState(false);
  const closeModal = () => setModal(false);
  const onConfirmPopUp = () => {
    setModal(false);
    history.push(RouteConfig.login);
  };
  const history = useHistory();
  const onClickMine = () => {
    if (loginStatus) {
      setModal(false);
      history.push(RouteConfig.mine);
    } else {
      setModal(true);
    }
  };
  return (
    <Fragment>
      {isModal && (
        <LoginPopUp
          closeModal={closeModal}
          onConfirm={onConfirmPopUp}
          onExit={closeModal}
        />
      )}
      <StickyContainer className="fs-md row ">
        {loginStatus ? (
          <Fragment>
            <StyledNavColumn className="col-4">
              <IconComponent
                iconType={Icons.homePage}
                height="25px"
                width="25px"
                maxwidth="25px"
                onClick={() => history.push(RouteConfig.home)}
              />
              <div className="fs-xs fw-600">{COMMON_LABELS.HOME}</div>
            </StyledNavColumn>
            <StyledNavColumn className="col-4">
              <IconComponent
                iconType={Icons.gamePage}
                height="25px"
                width="25px"
                maxwidth="25px"
                onClick={() => history.push(RouteConfig.game)}
              />
              <div className="fs-xs fw-600">{COMMON_LABELS.GAME}</div>
            </StyledNavColumn>
            <StyledNavColumn className="col-4">
              <IconComponent
                iconType={Icons.profilePage}
                height="25px"
                width="25px"
                maxwidth="25px"
                onClick={onClickMine}
              />
              <div className="fs-xs fw-600">{COMMON_LABELS.MINE}</div>
            </StyledNavColumn>
          </Fragment>
        ) : (
          <Fragment>
            <StyledNavColumn className="col-6">
              <IconComponent
                iconType={Icons.homePage}
                height="25px"
                width="25px"
                maxwidth="25px"
                onClick={() => history.push(RouteConfig.home)}
              />
              <div className="fs-xs fw-600">{COMMON_LABELS.HOME}</div>
            </StyledNavColumn>

            <StyledNavColumn className="col-6">
              <IconComponent
                iconType={Icons.profilePage}
                height="25px"
                width="25px"
                maxwidth="25px"
                onClick={onClickMine}
              />
              <div className="fs-xs fw-600">{COMMON_LABELS.MINE}</div>
            </StyledNavColumn>
          </Fragment>
        )}
      </StickyContainer>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  loginStatus: state.auth.loginStatus,
});

export const BottomNavBar = connect(mapStateToProps)(BottomNavBarConnected);
