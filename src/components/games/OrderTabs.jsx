import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { COMMON_LABELS, ORDER_TABS_TYPES } from "../../config/constants";
import Grapics from "./Grapics";

const RenderBalls = ({ ballType }) => (
  <Grapics.RecordBall
    left={ballType === "ANDAR" || ballType === "DRAGON" || ballType === "UP"}
    right={ballType === "BAHAR" || ballType === "TIGER" || ballType === "DOWN"}
    tie={ballType === "TIE"}
  >
    {ballType[0] || ballType}
  </Grapics.RecordBall>
);

const OrdersOrderSet = ({ sequenceNumber, order, idx }) => (
  <Grapics.OrdersHeight
    className="row py-2 m-0 fs-sm fw-400"
    key={`others-order-${idx}`}
  >
    <div className="col-3 text-start p-0 align-self-center">
      {sequenceNumber}
    </div>
    <div className="col-3 text-center p-0 align-self-center">
      {order.userName+'******'}
    </div>
    <div className="col-3 text-center p-0 align-self-center">
      <RenderBalls ballType={order.betOption} />
    </div>
    <div className="col-3 text-end p-0 align-self-center">
      {order.betAmount}
    </div>
  </Grapics.OrdersHeight>
);

export const OrderTabs = ({
  sequenceNumber,
  gamesList,
  gameName,
  mockItems = [],
  counter,
}) => {
  const [tabType, setTabType] = useState(ORDER_TABS_TYPES.EVERYONE);
  const [filteredList, setFilteredList] = useState([]);
  const onClickOthersTab = () => setTabType(ORDER_TABS_TYPES.EVERYONE);
  const onClickMyTab = () => setTabType(ORDER_TABS_TYPES.MINE);
  const andarBaharList =
    gamesList && gamesList.filter((item) => item.game === gameName);

  const counterTimers = [9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39];
  const generateListNumber = () => Math.floor(Math.random() * 5 + 2);
  const generateStartNumber = () => Math.floor(Math.random() * 94 + 1);

  useEffect(() => {
    if(counter === 1 ) {
      setFilteredList([]);
    }
    if (counterTimers.includes(counter)) {
      const startNumber = generateStartNumber();
      const listLength = generateListNumber();
      const slicedList = mockItems.slice(
        startNumber - 1,
        startNumber + listLength
      );
      setFilteredList([...slicedList,...filteredList]);
    }
    // eslint-disable-next-line
  }, [counter]);
  return (
    <Fragment>
      <div className="row py-2 m-0 bg-white">
        <Grapics.OrdersTabs
          className="col-6"
          tabActive={tabType === ORDER_TABS_TYPES.EVERYONE}
          onClick={onClickOthersTab}
        >
          {COMMON_LABELS.EVERY0NE_ORDER}
        </Grapics.OrdersTabs>
        <Grapics.OrdersTabs
          className="col-6"
          tabActive={tabType === ORDER_TABS_TYPES.MINE}
          onClick={onClickMyTab}
        >
          {COMMON_LABELS.MY_ORDER}
        </Grapics.OrdersTabs>
      </div>
      {tabType === ORDER_TABS_TYPES.EVERYONE ? (
        <Fragment>
          <Grapics.OrdersTabHeader className="row m-0 px-3">
            <div className="col-3 text-start p-0">{COMMON_LABELS.PERIOD}</div>
            <div className="col-3 text-center p-0">{COMMON_LABELS.USER}</div>
            <div className="col-3 text-center p-0">{COMMON_LABELS.SELECT}</div>
            <div className="col-3 text-end p-0">{COMMON_LABELS.POINT}</div>
          </Grapics.OrdersTabHeader>
          <div className="row  m-0 px-3 text-color bg-white">
            <div className="col-12 p-0 my-3">
              {sequenceNumber &&
                filteredList.length > 0 &&
                filteredList.slice(0,20).map((order) => (
                  <OrdersOrderSet
                    order={order}
                    idx={order.userName}
                    sequenceNumber={sequenceNumber}
                  />
                ))}
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Grapics.OrdersTabHeader className="row m-0 px-3">
            <div className="col-3 text-start p-0">{COMMON_LABELS.PERIOD}</div>
            <div className="col-2 text-center p-0">{COMMON_LABELS.SELECT}</div>
            <div className="col-2 text-center p-0">{COMMON_LABELS.POINT}</div>
            <div className="col-2 text-center p-0">{COMMON_LABELS.RESULT}</div>
            <div className="col-3 text-end p-0">{COMMON_LABELS.AMOUNT}</div>
          </Grapics.OrdersTabHeader>
          <div className="row  m-0 px-3 text-color bg-white">
            <div className="col-12 p-0 my-3">
              {andarBaharList.reverse().map((order, idx) => (
                <Grapics.OrdersHeight
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
                  <Grapics.OrdersAmount
                    className="col-3 text-end p-0 fw-xs align-self-center"
                    win={order.isWon}
                  >
                    {order.result}
                  </Grapics.OrdersAmount>
                </Grapics.OrdersHeight>
              ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  gamesList: state.auth.gamesList || [],
});

export default connect(mapStateToProps)(OrderTabs);
