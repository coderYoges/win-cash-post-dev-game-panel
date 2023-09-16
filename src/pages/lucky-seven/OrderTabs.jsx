import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { ANDAR_BAHAR_LABELS, AnB_TABS_TYPE } from "../../config/constants";
import { OthersOrderList } from "./mockItems";
import AnB from "../andar-bahar/Grapics";

const RenderBalls = ({ ballType }) => (
  <AnB.RecordBall andar={ballType === "TIGER"} bahar={ballType === "DRAGON"}>
    {ballType === "TIGER"
      ? "T"
      : ballType === "DRAGON"
      ? "D"
      : ballType === "TIE"
      ? "T"
      : "?"}
  </AnB.RecordBall>
);

const OrderTabs = ({ sequenceNumber, gamesList = [] }) => {
  const [tabType, setTabType] = useState(AnB_TABS_TYPE.EVERYONE);
  const onClickOthersTab = () => setTabType(AnB_TABS_TYPE.EVERYONE);
  const onClickMyTab = () => setTabType(AnB_TABS_TYPE.MY);
  const dragonTigerList = gamesList.filter(
    (item) => item.game === "dragontiger"
  );
  return (
    <Fragment>
      <div className="row py-2 m-0 bg-white">
        <AnB.OrdersTabs
          className="col-6"
          tabActive={tabType === AnB_TABS_TYPE.EVERYONE}
          onClick={onClickOthersTab}
        >
          {ANDAR_BAHAR_LABELS.EVERY0NE_ORDER}
        </AnB.OrdersTabs>
        <AnB.OrdersTabs
          className="col-6"
          tabActive={tabType === AnB_TABS_TYPE.MY}
          onClick={onClickMyTab}
        >
          {ANDAR_BAHAR_LABELS.MY_ORDER}
        </AnB.OrdersTabs>
      </div>
      {tabType === AnB_TABS_TYPE.EVERYONE ? (
        <Fragment>
          <AnB.OrdersTabHeader className="row m-0 px-3">
            <div className="col-3 text-start p-0">
              {ANDAR_BAHAR_LABELS.PERIOD}
            </div>
            <div className="col-3 text-center p-0">
              {ANDAR_BAHAR_LABELS.USER}
            </div>
            <div className="col-3 text-center p-0">
              {ANDAR_BAHAR_LABELS.SELECT}
            </div>
            <div className="col-3 text-end p-0">{ANDAR_BAHAR_LABELS.POINT}</div>
          </AnB.OrdersTabHeader>
          <div className="row  m-0 px-3 text-color bg-white">
            <div className="col-12 p-0 my-3">
              {OthersOrderList.map((order, idx) => (
                <AnB.OrdersHeight
                  className="row py-2 m-0 fs-sm fw-400"
                  key={`others-order-${idx}`}
                >
                  <div className="col-3 text-start p-0  align-self-center">
                    {sequenceNumber}
                  </div>
                  <div className="col-3 text-center p-0  align-self-center">
                    {order.userName}
                  </div>
                  <div className="col-3 text-center p-0  align-self-center">
                    <RenderBalls ballType={order.placedSlot} />
                  </div>
                  <div className="col-3 text-end p-0  align-self-center">
                    {order.amount}
                  </div>
                </AnB.OrdersHeight>
              ))}
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <AnB.OrdersTabHeader className="row m-0 px-3">
            <div className="col-3 text-start p-0">
              {ANDAR_BAHAR_LABELS.PERIOD}
            </div>
            <div className="col-2 text-center p-0">
              {ANDAR_BAHAR_LABELS.SELECT}
            </div>
            <div className="col-2 text-center p-0">
              {ANDAR_BAHAR_LABELS.POINT}
            </div>
            <div className="col-2 text-center p-0">
              {ANDAR_BAHAR_LABELS.RESULT}
            </div>
            <div className="col-3 text-end p-0">
              {ANDAR_BAHAR_LABELS.AMOUNT}
            </div>
          </AnB.OrdersTabHeader>
          <div className="row  m-0 px-3 text-color bg-white">
            <div className="col-12 p-0 my-3">
              {dragonTigerList.map((order, idx) => (
                <AnB.OrdersHeight
                  className="row py-2 m-0 fs-sm fw-400"
                  key={`mine-order-${idx}`}
                >
                  <div className="col-3 text-start p-0 align-self-center">
                    {order.sequenceNumber}
                  </div>
                  <div className="col-2 text-center p-0 align-self-center">
                    <RenderBalls ballType={order.betOption} />
                  </div>
                  <div className="col-2 text-center p-0 align-self-center">
                    {order.betAmount}
                  </div>
                  <div className="col-2 text-center p-0 align-self-center">
                    <RenderBalls ballType={order.winnerOption} />
                  </div>
                  <AnB.OrdersAmount
                    className="col-3 text-end p-0 fw-xs align-self-center"
                    win={order.isWon}
                  >
                    {order.result}
                  </AnB.OrdersAmount>
                </AnB.OrdersHeight>
              ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  gamesList: state.auth.gamesList,
});

export default connect(mapStateToProps)(OrderTabs);
