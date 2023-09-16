import React from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import { COMMON_LABELS } from "../../config/constants";
import { StyledButton } from "../../pages/login/LoginForm";

const slideInFromBottom = keyframes`
0% { transform: translateY(100%)}
100% {transform: translateY(0)}
`;

const ModalWrapper = styled.div`
  height: auto;
  display: block;
  position: fixed;
  padding-bottom: 10px;
  border-radius: 10px 10px 0 0;
  background: #f5f5f5;
  box-shadow: 0 0 6px #909090;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: ${slideInFromBottom};
  max-width: 98%;
  user-select: none;
  @media only screen and (min-width: 768px) {
    max-width: 48%;
  }
`;

const ModalTitle = styled.span`
  height: 46px;
  line-height: 46px;
  font-weight: 400;
  font-size: 24px;
  border-radius: 20px;
  padding: 5px 15px;
  box-sizing: border-box;
  text-align: center;
  color: ${({ orderType, orderLeft, orderRight }) =>
    orderType === orderLeft
      ? "#da393f"
      : orderType === orderRight
      ? "#6298e8"
      : "#ffa33b"};
`;

const BalanceRow = styled.div`
  margin: 0 10px;
  height: 49px;
  line-height: 49px;
  border-radius: 12px;
  background: #e6e6e6;
`;

const BalanceColumn = styled.div`
  color: #383b45;
  font-size: 20px;
`;

const BalanceLabel = styled.input`
  font-size: 28px;
  color: #383b45;
  font-size: inherit;
  border: none; /* Remove the border */
  padding: 0 8px;
  box-sizing: border-box;
  background: transparent;
  vertical-align: middle;
  outline: none; /* Remove the default focus outline */
  width: 95%;
`;

const OrderBox = styled.div`
  color: rgb(102, 102, 102);
  width: 60px;
  display: inline-block;
  height: 38px;
  line-height: 38px;
  text-align: center;
  cursor: pointer;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 4px;
  font-size: 16px;
  margin-left: 2px;
  margin-right: 2px;
  border-bottom: 2px solid
    ${({ orderType, orderLeft, orderRight, active }) =>
      orderType === orderLeft && active
        ? "#da393f"
        : orderType === orderRight && active
        ? "#6298e8"
        : active && "#ffa33b"};
`;

const NumberBox = styled.div`
  color: rgb(102, 102, 102);
  width: 50px;
  display: inline-block;
  height: 38px;
  line-height: 38px;
  text-align: center;
  cursor: pointer;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 4px;
  font-size: 16px;
  margin-left: 2px;
  margin-right: 2px;
`;

const OrderAmountChip = styled.div`
  font-size: 28px;
  color: rgb(250, 60, 9);
  font-weight: 700;
`;

const OrderTotalAmount = styled.span`
  color: #ffa500;
  display: inline-flex;
  margin-left: 5px;
  font-size: 20px;
`;

const ButtonWrapper = styled.div`
  margin: auto;
  padding: 0 15px;
`;

const ConfirmButton = styled(StyledButton)`
  border: none;
  border-radius: 8px;
  height: 48px;
  line-height: 48px;
  font-size: 16px;
  width: 100%;
  background: #fa3c09;
  box-shadow: 0 0 10px rgba(218, 57, 63, 0.5);
`;

const OrderModal = ({
  balance,
  orderType,
  contract,
  setContract,
  onClickMinus1,
  onClickMinus5,
  onClickPlus1,
  onClickPlus5,
  onConfirm,
  numbers,
  orderLeft,
  orderRight,
  orderCenter,
  orderLeftTitle,
  orderRightTitle,
  orderCenterTitle,
  orderLeftColor,
  orderRightColor,
  orderCenterColor,
}) => {
  const contractMoneyList = [100, 500, 1000, 10000];
  const handleInputChange = (event) => {
    setContract(event.target.value);
  };
  return (
    <ModalWrapper>
      <div className="my-1">
        <ModalTitle
          orderType={orderType}
          orderLeft={orderLeft}
          orderRight={orderRight}
          orderCenter={orderCenter}
        >
          {orderType === orderLeft && orderLeftTitle}
          {orderType === orderRight && orderRightTitle}
          {orderType === orderCenter && orderCenterTitle}
        </ModalTitle>
        <BalanceRow className="row">
          <BalanceColumn className="text-left">
            {COMMON_LABELS.RUPEE_SYMBOL}
            <BalanceLabel
              type="text"
              value={contract}
              onChange={handleInputChange}
              maxLength={10}
              inputMode="numeric" 
            />
          </BalanceColumn>
          <BalanceColumn className="col-6 text-right"></BalanceColumn>
        </BalanceRow>
        <div className="row p-2  m-0">
          <div className="col-12 text-left mb-1 fs-sm fw-400">
            {COMMON_LABELS.CONTRACT_MONEY}
          </div>
          <div className="col-12 text-left fs-md">
            {contractMoneyList.map((money) => (
              <OrderBox
                key={`contract-money-${money}`}
                onClick={() => setContract(money)}
                active={money === contract}
                orderType={orderType}
                orderLeft={orderLeft}
                orderRight={orderRight}
                orderCenter={orderCenter}
                orderLeftColor={orderLeftColor}
                orderRightColor={orderRightColor}
                orderCenterColor={orderCenterColor}
              >
                {money}
              </OrderBox>
            ))}
          </div>
        </div>
        <div className="row p-2  m-0">
          <div className="col-12 text-left mb-1 fs-sm fw-400">
            {COMMON_LABELS.NUMBER}
          </div>
          <div className="col-5 text-left fs-md">
            <NumberBox onClick={onClickMinus5}>-5</NumberBox>
            <NumberBox onClick={onClickMinus1}>-1</NumberBox>
          </div>
          <div className="col-2 text-center">
            <OrderAmountChip>{numbers}</OrderAmountChip>
          </div>
          <div className="col-5 text-right fs-md">
            <NumberBox onClick={onClickPlus1}>+1</NumberBox>
            <NumberBox onClick={onClickPlus5}>+5</NumberBox>
          </div>
          <div
            className="col-8 mt-3 fs-md fw-400 text-left"
            style={{ fontSize: "26px" }}
          >
            {COMMON_LABELS.TOTAL_CONTRACT}
            <OrderTotalAmount>{contract * numbers}</OrderTotalAmount>
          </div>
        </div>
        <ButtonWrapper>
          <ConfirmButton
            style={
              orderType === orderLeft
                ? {
                    background: "#da393f",
                    boxShadow:
                      "0 0 10px rgba(218, 57, 63, 0.5), 0 0 20px rgba(218, 57, 63, 0.3)",
                  }
                : orderType === orderCenter
                ? {
                    background: "#d49427",
                    boxShadow:
                      "0 0 10px rgba(212, 148, 39, 0.5), 0 0 20px rgba(212, 148, 39, 0.3)",
                  }
                : {
                    background: "#6298e8",
                    boxShadow:
                      "0 0 10px rgba(98, 152, 232, 0.5), 0 0 20px rgba(98, 152, 232, 0.3)",
                  }
            }
            onClick={onConfirm}
            orderType={orderType}
            orderLeft={orderLeft}
            orderRight={orderRight}
            orderCenter={orderCenter}
          >
            Confirm
          </ConfirmButton>
        </ButtonWrapper>
      </div>
    </ModalWrapper>
  );
};

const mapStateToProps = (state) => ({
  balance: state.auth.balance,
});

export default connect(mapStateToProps)(OrderModal);
