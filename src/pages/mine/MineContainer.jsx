import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { FiActivity } from "react-icons/fi";
import { MdHistory } from "react-icons/md";
import { IconComponent, Icons } from "../../components/elements/icon/Icon";
import { MINE_LABELS } from "../../config/constants";
import { RouteConfig } from "../../config/routeConfig";
import { resetAuth } from "../../redux/auth";
import { resetState as andarState } from "../../redux/andar-bahar";
import { resetState as dragonState } from "../../redux/dragon-tiger";
import { resetState as luckyState } from "../../redux/lucky-seven";
import { resetPreviousRecords as andarRecords } from "../../redux/andar-bahar";
import { resetPreviousRecords as dragonRecords } from "../../redux/dragon-tiger";
import { resetPreviousRecords as luckyRecords } from "../../redux/lucky-seven";

const BodyWrapper = styled.div`
  margin-top: 140px;
  width: 100%;
  height: calc(100vh - 184px);
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  color: rgb(93, 152, 192);
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
  }
`;

const CommonRow = styled.div`
  padding: 8px 16px;
  border-bottom: 16px solid #ededed;
  margin: 0;
  text-align: left;
`;

const CommonColumn = styled.div`
  border-bottom: 1px solid rgb(240, 240, 240);
  padding: 0 8px;
  color: rgb(102, 102, 102);
`;

const SignOutLabel = styled.div`
  color: rgb(102, 102, 102);
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
`;

const ActivityLogStyled = styled(FiActivity)`
  height: 28px;
  width: 28px;
  minwidth: 28px;
`;

const PasswordStyled = styled(MdHistory)`
  height: 28px;
  width: 28px;
  minwidth: 28px;
`;

const ForwardIconComp = () => (
  <CommonColumn className="col-1 py-3">
    <IconComponent
      iconType={Icons.forwardIcon}
      height="14px"
      width="20px"
      minwidth="20px"
    />
  </CommonColumn>
);

const MineContainer = ({
  resetAuth,
  andarState,
  andarRecords,
  dragonState,
  dragonRecords,
  luckyState,
  luckyRecords,
}) => {
  const history = useHistory();
  const signOut = async () => {
    await resetAuth();
    await andarState();
    await andarRecords();
    await dragonState();
    await dragonRecords();
    await luckyState();
    await luckyRecords();
    history.push(RouteConfig.initial);
  };
  const moveToOrder = () => {
    history.push(RouteConfig.order);
  };
  const moveToFinDetail = () => {
    history.push(RouteConfig.finDetail);
  };
  const moveToActivity = () => {
    history.push(RouteConfig.activity);
  };
  const moveToPassword = () => {
    history.push(RouteConfig.changePassword);
  };
  return (
    <BodyWrapper className="fs-md fw-600">
      <CommonRow className="row">
        <CommonColumn
          className="col-11 py-3 cursor-pointer"
          onClick={moveToOrder}
        >
          <IconComponent
            iconType={Icons.orderIcon}
            height="28px"
            width="28px"
            minwidth="28px"
          />
          <span className="mx-3 fs-md fw-400">{MINE_LABELS.ORDER_RECORD}</span>
        </CommonColumn>
        <ForwardIconComp onClick={moveToOrder} />
        <CommonColumn
          className="col-11 py-3 cursor-pointer"
          onClick={moveToFinDetail}
        >
          <IconComponent
            iconType={Icons.finDetail}
            height="28px"
            width="28px"
            minwidth="28px"
          />
          <span className="mx-3 fs-md fw-400">{MINE_LABELS.FIN_DETAILS}</span>
        </CommonColumn>
        <ForwardIconComp onClick={moveToFinDetail} />
      </CommonRow>
      <CommonRow className="row">
        <CommonColumn
          className="col-11 py-3 cursor-pointer"
          onClick={moveToActivity}
        >
          <ActivityLogStyled />
          <span className="mx-3 fs-md fw-400">{MINE_LABELS.ACTIVITY_LOG}</span>
        </CommonColumn>
        <ForwardIconComp onClick={moveToActivity} />
        <CommonColumn
          className="col-11 py-3 cursor-pointer"
          onClick={moveToPassword}
        >
          <PasswordStyled />
          <span className="mx-3 fs-md fw-400">
            {MINE_LABELS.PASSWORD_HISTORY}
          </span>
        </CommonColumn>
        <ForwardIconComp onClick={moveToPassword} />
        {/* <CommonColumn className="col-11 py-3">
          <IconComponent
            iconType={Icons.support}
            height="28px"
            width="28px"
            minwidth="28px"
          />
          <span className="mx-3 fs-md fw-400">{MINE_LABELS.SUPPORT}</span>
        </CommonColumn>
        <ForwardIconComp />
        <CommonColumn className="col-11 py-3 border-0">
          <IconComponent
            iconType={Icons.complaints}
            height="28px"
            width="28px"
            minwidth="28px"
          />
          <span className="mx-3 fs-md fw-400">{MINE_LABELS.COMPLAINTS}</span>
        </CommonColumn> 
        <ForwardIconComp />*/}
      </CommonRow>
      <div className="row mt-4">
        <SignOutLabel onClick={signOut} className="col-12 py-3">
          {MINE_LABELS.SIGN_OUT}
        </SignOutLabel>
      </div>
    </BodyWrapper>
  );
};

const mapDispatchToProps = {
  resetAuth: resetAuth,
  andarState: andarState,
  dragonState: dragonState,
  luckyState: luckyState,
  andarRecords: andarRecords,
  dragonRecords: dragonRecords,
  luckyRecords: luckyRecords,
};

export default connect(null, mapDispatchToProps)(MineContainer);
