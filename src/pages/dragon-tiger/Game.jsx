import React, { Fragment, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import Graphics from "../../components/games/Grapics";
import { WIN_CASH_ENDPOINTS } from "../../config/endPoints";
import { DRAGON_TIGER_LABELS, COMMON_LABELS } from "../../config/constants";
import { postRequest, getRequest } from "../../api";
import OrderTabs from "../../components/games/OrderTabs";
import { TopNavBar } from "../../components/games/TopNavBar";
import { DRAGON_TIGER_RULES } from "../../config/rules";
import { RuleModal } from "../../components/games/RuleModal";

import {
  setSequence,
  setPreRecords,
  setResults,
  resetState,
  resetPreviousRecords,
  setBets,
} from "../../redux/dragon-tiger";
import { setGamesList } from "../../redux/auth";
// import { toast } from "react-toastify";
import { DRAGON_TIGER_OTHER_ORDERS } from "../../config/mocks";
const background = require("../../assets/dragon-tiger/background.jpg");

const dragonCard = require("../../assets/dragon-tiger/dragon-card.png");
const tigerCard = require("../../assets/dragon-tiger/tiger-card.png");
const bulkCardPlaceholder = require("../../assets/andar-bahar/bulk_card_placeholder.png");

const totalCards = {
  card1: require("../../assets/game-cards/images/ace_of_diamonds.png"),
  card2: require("../../assets/game-cards/images/2_of_clubs.png"),
  card3: require("../../assets/game-cards/images/3_of_hearts.png"),
  card4: require("../../assets/game-cards/images/4_of_spades.png"),
  card5: require("../../assets/game-cards/images/5_of_diamonds.png"),
  card6: require("../../assets/game-cards/images/6_of_clubs.png"),
  card7: require("../../assets/game-cards/images//7_of_hearts.png"),
  card8: require("../../assets/game-cards/images/8_of_spades.png"),
  card9: require("../../assets/game-cards/images/9_of_diamonds.png"),
};

const spin = keyframes`
  100% {
    transform: rotateY(360deg);
  }
`;
const slideinfromBottomright = keyframes`
0% { transform: translate(127%,90%)}
100% {transform: translate(0,0)}
`;

const slideinfromBottomleft = keyframes`
0% { transform: translate(-127%, 90%)}
100% {transform: translate(0, 0)}
`;

const GameCardContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  color: #fff;
  display: block;
  -webkit-user-select: none;
  padding: 20px 0;
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

const SwipeCardImg = styled.img`
  background: #fff;
  border: 2px outset #a1ceff;
  height: 128px;
  width: 96px;
  border-radius: 12px;
  margin-top: 15px;
  animation-duration: 0.8s;
  animation-timing-function: ease-out;
  animation-iteration-count: 1;
  animation-delay: 0.2 s;
  animation-direction: normal;
  animation-fill-mode: backwards;
`;

const SpinCardImg = styled.img`
  background: #fff;
  border: 2px outset #a1ceff;
  height: 128px;
  width: 96px;
  border-radius: 12px;
  margin-top: 15px;
  -webkit-animation: ${spin} 1s linear infinite;
  animation: ${spin} 1s linear infinite;
  transform-style: preserve-3d;
`;

const ElephantSwipeCard = styled(SwipeCardImg)`
  animation-name: ${slideinfromBottomright};
  box-shadow: #ff5f1f 0px 0px 3px 3px;
`;

const TigerSwipeCard = styled(SwipeCardImg)`
  animation-name: ${slideinfromBottomleft};
  box-shadow: #1b03a3 0px 0px 3px 3px;
`;

const ElephantSpinCard = styled(SpinCardImg)`
  box-shadow: #ff5f1f 0px 0px 3px 3px;
`;

const TigerSpinCard = styled(SpinCardImg)`
  box-shadow: #1b03a3 0px 0px 3px 3px;
`;

// const goldenGlowAnimation = keyframes`
// 0%, 100% {
//   box-shadow: 0 0 6px #ffd700, 0 0 12px #ffd700, 0 0 18px #ffd700;
// }
// 25% {
//   box-shadow: 0 0 12px #ffd700, 0 0 18px #ffd700, 0 0 24px #ffd700;
// }
// 50% {
//   box-shadow: 0 0 18px #ffd700, 0 0 24px #ffd700, 0 0 30px #ffd700;
// }
// 75% {
//   box-shadow: 0 0 24px #ffd700, 0 0 30px #ffd700, 0 0 36px #ffd700;
// }
// `;

// const ResultCardImg = styled.img`
//   background: #fff;
//   border: 2px outset #a1ceff;
//   height: 128px;
//   width: 96px;
//   border-radius: 12px;
//   margin-top: 15px;
//   animation: ${goldenGlowAnimation} 2s ease-in-out infinite;
//   transform-style: preserve-3d;
// `;

const ResultCardImg = styled.img`
  background: #fff;
  border: 2px outset #a1ceff;
  height: 128px;
  width: 96px;
  border-radius: 12px;
  margin-top: 15px;
  transform-style: preserve-3d;
`;

const ElephantResultCard = styled(ResultCardImg)`
  box-shadow: #ff5f1f 0px 0px 3px 3px;
  ${({ handleSuccess }) =>
    !handleSuccess &&
    `
  -webkit-animation: none;
  animation: none;
  `}
`;

const TigerResultCard = styled(ResultCardImg)`
  box-shadow: #1b03a3 0px 0px 3px 3px;
  ${({ handleSuccess }) =>
    !handleSuccess &&
    `
-webkit-animation: none;
animation: none;
`}
`;

const Game = ({
  closeModal,
  userName,
  sequenceNumber,
  setSequence,
  setPreRecords,
  previousRecords,
  setResults,
  cardsList,
  setOrderType,
  openModal,
  openResult,
  closeResult,
  setGamesList,
  resetState,
  resetPreviousRecords,
  betAmount,
  betOption,
  winnerOption,
}) => {
  const [isRulesActive, setRulesActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const openRulesModal = () => setRulesActive(true);
  const closeRulesModal = () => setRulesActive(false);

  const fetchSequenceNumber = async () => {
    try {
      const resp = await getRequest(WIN_CASH_ENDPOINTS.DRAGON_TIGER_SEQUENCE);
      await setSequence(resp.data[0]);
    } catch (e) {}
  };

  const fetchDnTGames = async () => {
    try {
      await resetPreviousRecords();
      const resp = await getRequest(WIN_CASH_ENDPOINTS.DRAGON_TIGER_GAMES);
      await setPreRecords(resp.data.reverse());
    } catch (e) {}
  };

  const fetchDnTResults = async () => {
    try {
      const resp = await postRequest(WIN_CASH_ENDPOINTS.DRAGON_TIGER_RESULT, {
        sequenceNumber: sequenceNumber,
        userName: userName,
      });
      await setResults(resp.data);
    } catch (e) {}
  };

  const fetchUserDetails = async () => {
    try {
      const resp = await postRequest(WIN_CASH_ENDPOINTS.GET_USER, {
        userName: userName,
      });
      await setGamesList(resp.data);
    } catch (e) {}
  };

  const getInitialGameDetails = async () => {
    try {
      await fetchSequenceNumber();
      await fetchDnTGames();
    } catch (e) {}
  };

  useEffect(() => {
    if (counter === 1) {
      closeResult();
      resetState();
      setSequence("");
    }
    if (counter === 3) {
      fetchSequenceNumber();
    }
    if (counter === 5) {
      fetchUserDetails();
      fetchDnTGames();
    }
    if (counter === 38) {
      closeModal();
    }
    if (counter === 47) {
      // toast.info("Waiting for the result", { autoClose: 5000 });
    }

    if (counter === 54) {
      fetchDnTResults();
    }
    if (counter === 59) {
      betAmount && betOption && betOption !== "audience" && openResult();
    }
    if (!sequenceNumber && isEmpty(previousRecords)) {
      console.log("Dragon Tiger Initial state");
      getInitialGameDetails();
      fetchDnTGames();
      setBets({ betAmount: 100, betOption: "audience" });
    }
    // eslint-disable-next-line
  }, [counter]);

  useEffect(() => {
    try {
      const intervalTime = setInterval(async () => {
        let newUTCTime = new Date();
        const gmtExtraMins =
          newUTCTime.getMinutes() - newUTCTime.getTimezoneOffset();
        newUTCTime.setMinutes(gmtExtraMins);
        let currentTimeInSec = Math.floor(newUTCTime.valueOf() / 1000);

        if (currentTimeInSec % 60 !== 0) {
          setCounter(currentTimeInSec % 60);
        }
      }, [1000]);
      return () => clearInterval(intervalTime);
    } catch (e) {}

    // eslint-disable-next-line
  }, []);

  const setOrderModal = (type) => {
    setOrderType(type);
    openModal();
  };

  const secondsTensCount =
    counter > 0 && counter < 55 ? parseInt((54 - counter) / 10) : 0;
  const secondsOnesCount =
    counter > 0 && counter < 55 ? parseInt((54 - counter) % 10) : 0;
  const labelDisabledTimer = 38;

  return (
    <Fragment>
      {isRulesActive && (
        <RuleModal
          closeModal={closeRulesModal}
          ruleTitle={DRAGON_TIGER_RULES.TITLE}
          rulesList={DRAGON_TIGER_RULES.LIST}
          rulesPoints={DRAGON_TIGER_RULES.POINTS}
        />
      )}
      <Graphics.GameContainer
        data-bs-spy="scroll"
        data-bs-offset="0"
        className="scrollspy-example"
        tabindex="0"
      >
        <div
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "100% auto",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="row flex pt-2 m-0"
            onClick={closeModal}
            style={{ height: "18.5vh" }}
          >
            <TopNavBar
              openModal={openRulesModal}
              gameName={DRAGON_TIGER_LABELS.GAME}
            />

            <GameCardContainer className="col-4 flex align-items-center">
              {counter === 3 && (
                <ElephantSwipeCard
                  src={dragonCard}
                  alt="andar-card-placeholder"
                  className="mb-2"
                />
              )}
              {counter > 3 && counter < 56 && (
                <ElephantSpinCard
                  src={dragonCard}
                  alt="andar-card-placeholder"
                  className="mb-2"
                />
              )}
              {counter > 55 && counter < 59 && (
                <ElephantResultCard
                  src={totalCards[cardsList.dragonCard]}
                  alt="andar-card-placeholder"
                  className="mb-2"
                  handleSuccess={winnerOption === "DRAGON"}
                />
              )}
            </GameCardContainer>

            <GameCardContainer className="col-4 flex align-items-center"></GameCardContainer>
            <GameCardContainer className="col-4 flex align-items-center">
              {counter === 3 && (
                <TigerSwipeCard
                  src={tigerCard}
                  alt="andar-card-placeholder"
                  className="mb-2"
                />
              )}
              {counter > 3 && counter < 57 && (
                <TigerSpinCard
                  src={tigerCard}
                  alt="andar-card-placeholder"
                  className="mb-2"
                />
              )}
              {counter > 56 && counter < 59 && (
                <TigerResultCard
                  src={totalCards[cardsList.tigerCard]}
                  alt="andar-card-placeholder"
                  className="mb-2"
                  handleSuccess={winnerOption === "TIGER"}
                />
              )}
            </GameCardContainer>
          </div>
          <div style={{ height: "65px" }}></div>

          {/* Game Main Card Name Part */}
          <div className="row flex m-0">
            <GameCardName className="col-4 flex align-items-center"></GameCardName>
            <GameCardName className="col-4 flex align-items-center" />
            <GameCardName className="col-4 flex align-items-center"></GameCardName>
          </div>

          {/* Game Functional Card Parts*/}
          <div className="row pt-2 m-0 px-3" onClick={closeModal}>
            <div className="col-4 px-0" />
            <div className="col-4  d-flex justify-content-center align-items-center px-0">
              <Graphics.GameCardContainer>
                <Graphics.BulkCards
                  src={bulkCardPlaceholder}
                  alt="bulk card placeholder"
                />
              </Graphics.GameCardContainer>
            </div>

            <div className="col-4 px-0" />
          </div>

          {/* Game Place order Parts */}
          <div className="row my-4 pb-3 mx-3">
            <div className="col-4  px-0">
              <Graphics.OrderContainer
                left
                disabled={
                  counter > labelDisabledTimer || counter < 5 || !sequenceNumber
                }
              >
                <Graphics.OrderLabel onClick={() => setOrderModal("DRAGON")}>
                  {DRAGON_TIGER_LABELS.ORDER_DRAGOAN}
                </Graphics.OrderLabel>
                <Graphics.OrderHint>
                  {COMMON_LABELS.RATIO_HALF}
                </Graphics.OrderHint>
              </Graphics.OrderContainer>
            </div>
            <div className="col-4 px-0">
              <Graphics.OrderContainer
                tie
                disabled={
                  counter > labelDisabledTimer || counter < 5 || !sequenceNumber
                }
              >
                <Graphics.OrderLabel onClick={() => setOrderModal("TIE")}>
                  {DRAGON_TIGER_LABELS.ORDER_TIE}
                </Graphics.OrderLabel>
                <Graphics.OrderHint>
                  {COMMON_LABELS.RATIO_TIE}
                </Graphics.OrderHint>
              </Graphics.OrderContainer>
            </div>
            <div className="col-4 px-0">
              <Graphics.OrderContainer
                right
                disabled={
                  counter > labelDisabledTimer || counter < 5 || !sequenceNumber
                }
              >
                <Graphics.OrderLabel onClick={() => setOrderModal("TIGER")}>
                  {DRAGON_TIGER_LABELS.ORDER_TIGER}
                </Graphics.OrderLabel>

                <Graphics.OrderHint>
                  {COMMON_LABELS.RATIO_HALF}
                </Graphics.OrderHint>
              </Graphics.OrderContainer>
            </div>
          </div>

          <div className="row pt-0 px-3 m-0" onClick={closeModal}>
            <div className="col-6 text-left px-3 no-wrap">
              <div className="mb-2 fs-xl">
                {sequenceNumber || "Not Started"}
              </div>
            </div>
            <div className="col-6 text-right no-wrap">
              <div className="mb-2 fs-xl">
                <Graphics.CountDowm>{COMMON_LABELS.ZERO}</Graphics.CountDowm>
                <Graphics.CountDowm>{COMMON_LABELS.ZERO}</Graphics.CountDowm>
                {COMMON_LABELS.SEMICOLON}
                <Graphics.CountDowm>{secondsTensCount}</Graphics.CountDowm>
                <Graphics.CountDowm>{secondsOnesCount}</Graphics.CountDowm>
              </div>
            </div>
          </div>
          <div style={{ height: "30px" }}></div>
        </div>

        {/* Game Records Secion */}
        <Graphics.RecordContainer className="row">
          <Graphics.RecordHeader className="col-12">
            {COMMON_LABELS.RECORD}
          </Graphics.RecordHeader>
          <Graphics.RecordBody className="row d-flex m-0 px-3">
            <Graphics.RecordTitle className="col-8 my-2 pl-0 pb-2">
              {DRAGON_TIGER_LABELS.RECORDS}
            </Graphics.RecordTitle>
            <div className="col-12">
              <div className="row">
                {previousRecords.map((record) => (
                  <Graphics.RecordBallsContainer
                    className="mb-2"
                    key={record.sequenceNumber}
                  >
                    <Graphics.RecordBall
                      left={record.winnerOption === "DRAGON"}
                      right={record.winnerOption === "TIGER"}
                      tie={record.winnerOption === "TIE"}
                    >
                      <div>
                        {record.winnerOption ? record.winnerOption[0] : "?"}
                      </div>
                    </Graphics.RecordBall>
                    <Graphics.RecordNumber>
                      {String(record.sequenceNumber % 1000).padStart(3, "0")}
                    </Graphics.RecordNumber>
                  </Graphics.RecordBallsContainer>
                ))}
              </div>
            </div>
            <div className="col-12 my-4 "></div>
          </Graphics.RecordBody>
        </Graphics.RecordContainer>
        {/* Orders Tab section */}
        <OrderTabs
          sequenceNumber={sequenceNumber}
          gameName="dragontiger"
          mockItems={DRAGON_TIGER_OTHER_ORDERS}
          counter={counter}
        />
      </Graphics.GameContainer>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  sequenceNumber: state.dragonTiger.sequenceNumber,
  previousRecords: state.dragonTiger.previousRecords,
  userName: state.auth.userName,
  cardsList: state.dragonTiger.cardsList,
  betAmount: state.dragonTiger.betAmount,
  betOption: state.dragonTiger.betOption,
  playersList: state.dragonTiger.playersList,
  winnerOption: state.dragonTiger.winnerOption,
});

const mapDispatchToProps = {
  setSequence: setSequence,
  setPreRecords: setPreRecords,
  setResults: setResults,
  setGamesList: setGamesList,
  resetState: resetState,
  resetPreviousRecords: resetPreviousRecords,
  setBets: setBets,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
