import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { ORDER_HISTORY_TABS } from "../../config/constants";

const OrderBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  padding-bottom: 120px;
`;

const OrderContainer = styled.div`
  display: flex;
  background: #1c35bd;
  height: 42px;
`;

const OrderItem = styled.div`
  display: flex;
  height: 42px;
  cursor: pointer;
  font-size: 16px;
  color: #c1c1c1;
  padding-top: 10px;
  text-align: center;
  background: ${(props) => props.active && "#808080"};
  user-select: none;
`;

const StyledRow = styled.div`
  background: #f9fcff;
  border: 1px solid #d0ebff;
  border-radius: 4px;
  transition: 0.2s;
  color: #333;
  margin: -5px;
  padding: 10px 0;
  font-size: 14px;
  margin-bottom: 6px;
  margin-top: 6px;
`;

const LeftAligned = styled.div`
  text-align: left;
  text-align: -webkit-left;
`;

const RightAligned = styled.div`
  text-align: right;
  text-align: -webkit-right;
`;

const BorderTop = styled.div`
  border-top: 1px solid #e4e4e4;
`;

const OrderConatiner = ({ gamesList }) => {
  const [tabType, setTabType] = useState(ORDER_HISTORY_TABS[0].id);
  const gameRecords = !isEmpty(gamesList)
    ? gamesList.filter((item) => item.game === tabType)
    : [];

  return (
    <Fragment>
      <OrderContainer className="row m-0">
        {ORDER_HISTORY_TABS.map((tab, idx) => (
          <OrderItem
            key={tab.id + idx}
            className="col-4 px-3 cursor-pointer justify-content-center"
            onClick={() => setTabType(tab.id)}
            active={tabType === tab.id}
          >
            {tab.label}
          </OrderItem>
        ))}
      </OrderContainer>
      <OrderBodyWrapper>
        {!isEmpty(gameRecords) &&
          gameRecords.map((game) => (
            <div className="row m-0" key={game.sequenceNumber}>
              <div className="col-12 px-3">
                <StyledRow className="row fs-xs fw-400 mb-2 mt-2">
                  <LeftAligned className="col-6 pb-2 tf-16">
                    {game.sequenceNumber}
                  </LeftAligned>
                  <RightAligned className="col-6 pb-2 ">
                    {new Date(game.sequenceNumber * 600).toLocaleString()}
                  </RightAligned>
                  <LeftAligned className="col-3 pb-2 ">Select</LeftAligned>
                  <div className="col-2 pb-2">Point</div>
                  <div className="col-2 pb-2">Result</div>
                  <RightAligned className="col-5 pb-2">Amount</RightAligned>
                  <LeftAligned className="col-3 pt-2">
                    {game.betOption}
                  </LeftAligned>
                  <div className="col-2 pt-2">{game.betAmount}</div>
                  <div className="col-2 pt-2">{game.winnerOption}</div>
                  <RightAligned
                    className={`col-5 fs-xl fw-600 ${
                      game.isWon ? "text-success" : "text-danger"
                    }`}
                  >
                    {game.result}
                  </RightAligned>
                  <div className="col-12 pt-2">
                    <BorderTop className="row pt-2">
                      <LeftAligned className="col-6 ">{`Delivery: ${
                        game.isWon ? game.result : "0.00"
                      }`}</LeftAligned>
                      <RightAligned className="col-6 ">
                        {`Fee: ${
                          game.isWon ? game.betAmount - game.result : "0.00"
                        }`}
                      </RightAligned>
                    </BorderTop>
                  </div>
                </StyledRow>
              </div>
            </div>
          ))}
      </OrderBodyWrapper>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  gamesList: state.auth.gamesList,
});

export default connect(mapStateToProps)(OrderConatiner);
