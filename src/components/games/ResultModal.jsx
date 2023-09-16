import React from "react";
import styled, { keyframes } from "styled-components";
import { StyledButton } from "../../pages/login/LoginForm";
import { COMMON_LABELS } from "../../config/constants";

const fadein = keyframes`
0% { opacity: 0}
50% {opacity : 0.5}
100% { opacity: 1}
`;

const ModalWrapper = styled.div`
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1025;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  padding: 10px;
  overflow: none;
  max-height: 100vh;
  margin-left: 0 !important;
  margin-right: 0 !important;
  width: 100% !important;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: ${fadein};
`;

const StyledModal = styled.div`
  margin: auto;
  width: 360px;
  background: #fff;
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 60%) 0px 0px 5px 2px;
`;

const ResultHeader = styled.div`
  font-size: 42px;
  color: ${(props) => (props.type === "W" ? "#fff" : "#cecece")};
  padding: 0 15px;
  background: ${(props) => (props.type === "W" ? "#da393f" : "#a9a9a9")};
  font-weight: 800;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const RecordBall = styled.div`
  color: white;
  text-align: center;
  border-radius: 50%;
  width: 28px;
  display: inline-block;
  line-height: 28px;
  height: 28px;
  box-shadow: rgb(0 0 0 / 40%) 0px 0px 5px;
  font-size: 16px;
  ${({ orderLeft, orderRight, theme, betOption }) => {
    if (orderLeft === betOption) return `background: ${theme.colors.gameRed}`;
    else if (orderRight === betOption)
      return `background: ${theme.colors.gameBlue}`;
    else
      return `background-image: linear-gradient(90deg, ${theme.colors.gameRed} 50%, ${theme.colors.gameBlue} 50%)`;
  }}
`;

const ResultSlot = styled.div`
  color: white;
  text-align: center;
  border-radius: 50%;
  width: 80px;
  display: inline-block;
  line-height: 80px;
  height: 80px;
  box-shadow: rgb(0 0 0 / 40%) 0px 0px 5px;
  font-size: 45px;
  color: #fff;
  font-weight: 600;
  ${({ orderLeft, orderRight, theme, winnerOption }) => {
    if (orderLeft === winnerOption)
      return `background: ${theme.colors.gameRed}`;
    else if (orderRight === winnerOption)
      return `background: ${theme.colors.gameBlue}`;
    else
      return `background-image: linear-gradient(90deg, ${theme.colors.gameRed} 50%, ${theme.colors.gameBlue} 50%)`;
  }}
`;

const SelectionBox = styled.div`
  background: #f0f8ff;
  border: 1px solid #add8e6;
  border-radius: 4px;
  color: #383b45;
  width: 92%;
  padding: 12px;
`;

const ResultAmount = styled.div`
  color: ${(props) => (props.type === "W" ? "#269f37" : "#da393f")};
`;

export const ResultModal = ({
  closeModal,
  sequenceNumber,
  betAmount,
  betOption,
  winnerOption,
  isWon,
  result,
  orderLeft,
  orderRight,
}) => {
  return (
    <ModalWrapper>
      <div className="d-flex align-middle">
        <StyledModal className="fs-sm">
          <div className="row m-0 justify-content-center">
            <ResultHeader
              className="col-12"
              type={isWon ? "W" : result ? "L" : "S"}
            >
              {isWon
                ? COMMON_LABELS.USER_WON
                : result
                ? COMMON_LABELS.USER_LOSS
                : COMMON_LABELS.GAME_RESULT}
            </ResultHeader>
            <ResultSlot
              className="col-12 my-3"
              winnerOption={winnerOption}
              orderLeft={orderLeft}
              orderRight={orderRight}
            >
              {winnerOption[0] || winnerOption}
            </ResultSlot>
            <div className="col-12 d-flex justify-content-between fs-md fw-500 m-0 p-4 ">
              <div className="">{COMMON_LABELS.PERIOD}</div>
              <div className="">{sequenceNumber}</div>
            </div>
            {result !== 0 && (
              <SelectionBox>
                <div className="d-flex py-2 justify-content-between align-items-center">
                  <div className="fs-xs fw-400">{COMMON_LABELS.SELECT}</div>
                  <RecordBall
                    betOption={betOption}
                    orderLeft={orderLeft}
                    orderRight={orderRight}
                  >
                    {betOption[0] || betOption}
                  </RecordBall>
                </div>
                <div className="d-flex py-2 justify-content-between align-items-center">
                  <div className="fs-xs fw-400">{COMMON_LABELS.POINT}</div>
                  <div className="fs-md fw-500">{betAmount}</div>
                </div>
                <div className="d-flex py-2 justify-content-between align-items-center">
                  <div className="text-left fs-xs fw-400">
                    {COMMON_LABELS.AMOUNT}
                  </div>
                  <ResultAmount
                    className="fs-xl fw-700"
                    type={isWon ? "W" : "L"}
                  >
                    {`${isWon ? "+" : "-"}${result}`}
                  </ResultAmount>
                </div>
              </SelectionBox>
            )}

            <div>
              <StyledButton
                className="fs-lg fw-600 cursor-pointer my-3"
                onClick={closeModal}
              >
                {COMMON_LABELS.CLOSE}
              </StyledButton>
            </div>
          </div>
        </StyledModal>
      </div>
    </ModalWrapper>
  );
};
