import React from "react";
import styled, { keyframes } from "styled-components";
import { FaTimes } from "react-icons/fa";

const dropAnimation = keyframes`
0% { opacity: 0; transform: translateY(-200px);}
100% {opacity: 1; transform: translateY(0);}
`;

const PopUpContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1006;
  opacity: 1;
  transition: opacity 0.3s ease;
`;

const StyledPopUp = styled.div`
  width: 95%;
  max-width: 700px;
  background: linear-gradient(#adb3ff 0%, #567aff 100%);
  padding: 10px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  position: relative;
  border-radius: 15px;
  transform: translateY(-200px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  animation-name: ${dropAnimation};
  animation-duration: 0.3s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
`;

const PopUpClose = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  transform: rotate(45deg);
  cursor: pointer;
  color: rgb(103, 103, 103);
  rotate: 46deg;
`;

const StyledTitle = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 50px;
  text-align: center;
  color: white;
`;

const StyledBreak = styled.hr`
  color: white;
  height: 2px;
  width: 100%;
  background-color: white;
  border: none;
`;

const StyledText = styled.span`
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  margin-bottom: 10px;
  text-align: center;
  color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StyledBtn = styled.button`
  width: 140px;
  max-width: 35%;
  padding: 5px 10px;
  display: flex;
  height: 34px;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-radius: 5px;
  border: none;
  outline: none;
  font-weight: 600;
  cursor: pointer;
`;

const ConfirmBtn = styled(StyledBtn)`
  background-color: white;
  font-weight: 700;
  color: black;
`;

const ExitBtn = styled(StyledBtn)`
  background-color: transparent;
  border: 1.5px solid white;
  color: white;
`;

export const LoginPopUp = ({ closeModal, onConfirm, onExit }) => {
  return (
    <PopUpContainer>
      <StyledPopUp>
        <PopUpClose onClick={closeModal}>
          <FaTimes />
        </PopUpClose>
        <StyledTitle>Non-Gambling Territories.</StyledTitle>
        <StyledBreak />
        <div></div>
        <StyledText>
          Connecting to our site from non-gambling countries, it will be User's
          responsibility to ensure that their use of the service is lawful.
        </StyledText>
        <div></div>
        <StyledText style={{ fontSize: "16px" }}>
          Underage gambling is prohibited.
        </StyledText>
        <StyledBreak />
        <div></div>
        <StyledText>
          Please confirm if you are 18 years old and above as of today.
        </StyledText>
        <br />
        <ButtonContainer>
          <ConfirmBtn onClick={onConfirm}>Confirm</ConfirmBtn>
          <ExitBtn onClick={onExit}>Exit</ExitBtn>
        </ButtonContainer>
      </StyledPopUp>
    </PopUpContainer>
  );
};
