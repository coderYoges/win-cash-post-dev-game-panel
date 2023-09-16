import styled, { keyframes } from "styled-components";
import { recordsScreenSize } from "../../config/constants";

const slideinfromright = keyframes`
0% { transform: translateX(127%)}
100% {transform: translateX(0)}
`;

const slideinfromleft = keyframes`
0% { transform: translateX(-127%)}
100% {transform: translateX(0)}
`;

const slideInFromBottom = keyframes`
0% { transform: translateY(10%)}
100% {transform: translateX(0)}
`;

const slideinfrombottom = keyframes`
0% { transform: translateY(100%)}
100% {transform: translateX(0)}
`;

const slideinfromtop = keyframes`
0% { transform: translateY(-200%)}
100% {transform: translateX(0)}
`;

const slideinfromrightwithzoom = keyframes`
0% { transform: translateX(127%) scale(1,1)}
100% {transform: translateX(0) scale(1.2,1.2)}
`;

const slideinfromleftwithzoom = keyframes`
0% { transform: translateX(-127%) scale(1,1)}
100% {transform: translateX(0) scale(1.2,1.2)}
`;

const GameContainer = styled.div`
  background: #0760a1;
  margin: 0;
  display: block;
  width: 100%;
  height: calc(100vh - 64px);
  overflow-y: auto;
  color: #fff;
  overflow-x: hidden;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
  }
  user-select: none;
`;

const CountDowm = styled.span`
  display: inline-block;
  text-align: center;
  background-color: rgb(241, 243, 255);
  border-bottom: 4px solid #cdd4ff;
  padding: 0 4px;
  color: #383b45;
  font-size: 24px;
  font-weight: 500;
  font-family: sans-serif;
  margin: 0 2px;
  height: 32px;
  width: 26px;
  line-height: 32px;
  border-radius: 4px;
`;

const TopCardContainer = styled.div`
  display: flex;
  height: 128px;
  width: 96px;
  border-radius: 12px;
  background: #ffdec3;
  margin-top: 15px;
  transition: 0.5s;
  margin-left: auto;
  margin-right: auto;
`;

const TopCardPH = styled.img`
  height: 128px;
  width: 96px;
  border-radius: 12px;
`;

const TopCardImg = styled.img`
background: #fff;
border: 2px outset #a1ceff;
height: 128px;
width: 96px;
border-radius: 12px;
left:${(props) => props.locateCard + "px"}
transition: 0.5s;
animation-duration: 0.5s;
animation-timing-function: ease-out;
animation-delay: 0s;
animation-iteration-count: 1;
animation-direction: normal;
animation-fill-mode: none;
animation-play-state: running;
animation-name: ${slideinfrombottom};
`;

const GameCardContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  color: #fff;
  display: block;
  text-align: center;
  -webkit-user-select: none;
`;

const GameCardImg = styled.img`
  background: #fff;
  border: 2px outset #a1ceff;
  height: 128px;
  width: 96px;
  border-radius: 12px;
  margin-top: 15px;
  transition: 0.5s;
`;

const BulkCardSingle = styled.img`
  position: absolute;
  left: 0;
  right: 0;
  height: 122px;
  width: 96px;
  margin: auto;
  z-index: 99;
  vertical-align: middle;
  border-style: none;
  box-sizing: border-box;
  overflow-clip-margin: content-box;
  overflow: clip;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: ${slideInFromBottom};
`;

const BulkCards = styled.img`
  background: transparent;
  width: 115px;
  height: 164px;
  margin-top: 0;
  border-radius: 12px;
`;

const CommonGameImg = styled.img`
  background: #fff;
  border: ${(props) =>
    props.card === props.selectedCard
      ? "3px outset  #fd7e14"
      : "2px outset #a1ceff"};
  position: absolute;
  height: 128px;
  width: 96px;
  left: 0;
  z-index: 999;
  transition: 0.2s;
  border-radius: 12px;
  vertical-align: middle;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
  animation-iteration-count: 1;
  animation-delay: 0.1s;
  margin-top: ${(props) => props.gap};
  animation-direction: normal;
  animation-fill-mode: backwards;
`;

const AndarCard = styled(CommonGameImg)`
  animation-name: ${(props) =>
    props.card === props.selectedCard
      ? slideinfromrightwithzoom
      : slideinfromright};
`;

const BaharCard = styled(CommonGameImg)`
  animation-name: ${(props) =>
    props.card === props.selectedCard
      ? slideinfromleftwithzoom
      : slideinfromleft};
`;

const OrderContainer = styled.div`
  line-height: 24px;
  height: 55px;
  border-radius: 6px;
  color: ${(props) => (props.disabled ? "#41729e" : "#f8f8ff")};
  white-space: nowrap;
  transition-duration: 0.1s;
  transition-timing-function: ease;
  transition-delay: 0s;
  transition-property: transform;
  margin: 2px;
  cursor: pointer;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); 
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  ${({ left, right, tie, theme, disabled }) => {
    if (disabled) return `background: ${theme.colors.gameDisabled}`;
    else if (left) return `background: ${theme.colors.gameRed}`;
    else if (right) return `background: ${theme.colors.gameBlue}`;
    else if (tie)
      return `background:  ${theme.colors.gameAmber}`;
    else return `background: ${theme.colors.gamePending}`;
  }}
`;

const OrderLabel = styled.div`
  line-height: 56px;
  font-weight: 500;
`;

const OrderHint = styled.div`
  margin-top: 15px;
  line-height: 12px;
  font-size: 14px;
  color: #979797;
`;

const RecordContainer = styled.div`
  height: 292px;
  background: #fff;
  border-bottom: 16px solid #ededed;
`;

const RecordHeader = styled.div`
  box-shadow: 0px -3px 4px 0px #6e6e6e30;
  border-bottom: 3px solid #1e88e5;
  color: #383b45;
  border-radius: 6px 6px 0 0;
  height: 48px;
  white-space: nowrap;
  line-height: 48px;
  transition: 0.2s;
  overflow: hidden;
  font-size: 18px;
  background: #fff;
  font-weight: 700;
  margin-top: -5px;
  user-select: none;
`;

const RecordBody = styled.div`
  height: 230px;
  align-content: baseline;
  margin: 0;
  font-size: 16px;
  flex-wrap: wrap;
`;

const RecordTitle = styled.div`
  font-size: 18px;
  color: #383b45;
  text-align: left;
`;

const RecordMore = styled.div`
  cursor: pointer;
  color: #979797;
  font-size: 14px;
  text-align: right;
  user-select: none;
`;

const RecordBallsContainer = styled.div`
  width: 10%;
  padding: 1px;
  display: grid;
  justify-content: center;
  @media ${recordsScreenSize.minwidth0} {
    transform: scale(0.8);
  }
  @media ${recordsScreenSize.minWidth320} {
    transform: scale(0.86);
  }
  @media ${recordsScreenSize.minWidth340} {
    transform: scale(0.92);
  }
  @media ${recordsScreenSize.minWidth360} {
    transform: scale(1);
  }
  @media ${recordsScreenSize.minWidth380} {
    transform: scale(1.05);
  }
  @media ${recordsScreenSize.minWidth400} {
    transform: scale(1.1);
  }
  @media ${recordsScreenSize.minWidth420} {
    transform: scale(1.15);
  }
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
  ${({ left, right, tie, theme }) => {
    if (left) return `background: ${theme.colors.gameRed}`;
    else if (right) return `background: ${theme.colors.gameBlue}`;
    else if (tie)
      return `background:  ${theme.colors.gameAmber}`;
    else return `background: ${theme.colors.gamePending}`;
  }}
`;

export const RecordNumber = styled.div`
  margin: auto;
  font-size: 13px;
  color: #515151;
  font-weight: 600;
`;

const OrdersTabs = styled.div`
  box-shadow: 0px -3px 4px 0px #6e6e6e30;
  border-bottom: ${({ tabActive }) => (tabActive ? "3px solid #1e88e5" : "")};
  color: #383b45;
  border-radius: 6px 6px 0 0;
  height: 48px;
  white-space: nowrap;
  line-height: 48px;
  transition: 0.2s;
  cursor: pointer;
  overflow: hidden;
  font-size: 18px;
  margin-top: -10px;
  font-weight: 600;
`;

const LoadingSpinner = styled.div`
  position: absolute;
  margin: auto;
  left: calc(50% - 40px);
  z-index: 1040;
  bottom: 50%;
`;

const OrdersTabHeader = styled.div`
  color: #666;
  background: #fff;
`;

const OrdersHeight = styled.div`
  transition: 0.5s;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: ${slideinfromtop};
  height: 40px;
`;

const OrdersAmount = styled.div`
  color: ${(props) => (props.win ? "#00c282" : "#fa3c09")};
`;

const GameCardName = styled.div`
  position: relative;
  box-sizing: border-box;
  color: #fff;
  display: block;
  -webkit-user-select: none;
  font-size: 24px;
  font-weight: 600;
  font-family: "Lugrasimo", cursive;
`;

const Grapics = {
  GameContainer,
  CountDowm,
  TopCardContainer,
  TopCardPH,
  TopCardImg,
  GameCardContainer,
  GameCardImg,
  BulkCardSingle,
  BulkCards,
  AndarCard,
  BaharCard,
  OrderContainer,
  OrderLabel,
  OrderHint,
  RecordContainer,
  RecordHeader,
  RecordBody,
  RecordTitle,
  RecordMore,
  RecordBallsContainer,
  RecordBall,
  RecordNumber,
  LoadingSpinner,
  OrdersTabHeader,
  OrdersTabs,
  OrdersHeight,
  OrdersAmount,
  GameCardName,
};

export default Grapics;
