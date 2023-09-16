import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import { StyledButton } from "../../pages/login/LoginForm";

const slideInFromBottom = keyframes`
0% { transform: translateY(100%)}
100% {transform: translateY(0)}
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
  z-index: 999;
  animation-duration: 0.4s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: ${slideInFromBottom};
  max-width: 98%;
  @media only screen and (min-width: 768px) {
    max-width: 48%;
  }
`;

const ModalTitle = styled.span`
  background: rgb(28, 59, 106);
  color: #fff;
  border-radius: 20px;
  padding: 5px 15px;
  box-shadow: 0 0 6px #0093ff;
  font-size: 20px;
  box-sizing: border-box;
  text-align: center;
`;

const ModalBody = styled.div`
  max-height: 360px;
  overflow-x: none;
  overflow-y: auto;
  margin-bottom: 60px;
  color: #383b45;
  margin: 10px;
  height: 360px;
  padding-left: 10px;
  padding-right: 10px;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const StyledDiscList = styled.ul`
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 32px;
`;

const ButtonWrapper = styled.div`
  margin: auto;
  padding: 0 15px;
`;

export const RuleModal = ({ closeModal, ruleTitle, rulesList, rulesPoints }) => {
  return (
    <ModalWrapper>
      <div className="my-3">
        <ModalTitle className="">{ruleTitle}</ModalTitle>
        <ModalBody className=" mt-2 pb-2 px-3">
          {rulesList.map((rule, idx) => (
            <Fragment key={`andarBaharRule${idx}`}>
              <div className="text-justify fs-md fw-400 pt-3">{rule}</div>
            </Fragment>
          ))}

          <div className="d-flex text-justify fs-xs fw-400">
            <StyledDiscList>
              {rulesPoints.map((point, idx) => {
                return (
                  <li className="pt-1" key={`andarBaharRulePoint${idx}`}>
                    {point}
                  </li>
                );
              })}
            </StyledDiscList>
          </div>
        </ModalBody>
        <ButtonWrapper>
          <ConfirmButton onClick={closeModal}>
            I GOT IT
          </ConfirmButton>
        </ButtonWrapper>
      </div>
    </ModalWrapper>
  );
};
