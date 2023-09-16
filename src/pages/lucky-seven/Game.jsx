import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";
import Graphics from "../../components/games/Grapics";
import { WIN_CASH_ENDPOINTS } from "../../config/endPoints";
import { COMMON_LABELS, LUCKY_SEVEN_LABELS } from "../../config/constants";
import { postRequest, getRequest } from "../../api";
import OrderTabs from "../../components/games/OrderTabs";
import {
  setSequence,
  setPreRecords,
  setResults,
  resetState,
  resetPreviousRecords,
  setBets,
} from "../../redux/lucky-seven";
import { setGamesList } from "../../redux/auth";
import { LUCKY_SEVEN_OTHER_ORDERS } from "../../config/mocks";
const bulkCardFlip = require("../../assets/andar-bahar/bulk_card_flip.png");

const up7Card = require("../../assets/dragon-tiger/drm/up7.png");
const lucky7Card = require("../../assets/dragon-tiger/drm/lucky7.png");
const down7Card = require("../../assets/dragon-tiger/drm/down7.png");

const totalCards = {
  card1: require("../../assets/game-cards/images/ace_of_hearts.png"),
  card2: require("../../assets/game-cards/images/2_of_spades.png"),
  card3: require("../../assets/game-cards/images/3_of_clubs.png"),
  card4: require("../../assets/game-cards/images/4_of_diamonds.png"),
  card5: require("../../assets/game-cards/images/5_of_hearts.png"),
  card6: require("../../assets/game-cards/images/6_of_spades.png"),
  card7: require("../../assets/game-cards/images/7_of_clubs.png"),
  card8: require("../../assets/game-cards/images/8_of_diamonds.png"),
  card9: require("../../assets/game-cards/images/9_of_hearts.png"),
  card10: require("../../assets/game-cards/images/10_of_spades.png"),
  card11: require("../../assets/game-cards/images/jack_of_clubs.png"),
  card12: require("../../assets/game-cards/images/queen_of_diamonds.png"),
  card13: require("../../assets/game-cards/images/king_of_hearts.png"),
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

const zoominoutsinglefeatured = keyframes`
  0% {transform: scale(1,1)}
  50% {transform: scale(1.2,1.2);}
  100% {transform: scale(1,1);}
`;

const slideinfromBottomleft = keyframes`
0% { transform: translate(-127%, 90%)}
100% {transform: translate(0, 0)}
`;

const slideinfromBottom = keyframes`
0% { transform: translate(0, 90%)}
100% {transform: translate(0, 0)}
`;

const CardImg = styled.img`
  background: #fff;
  border: 2px outset #a1ceff;
  height: 128px;
  width: 96px;
  border-radius: 12px;
`;

const SwipeCardImg = styled.img`
  background: #fff;
  border: 2px outset #a1ceff;
  height: 128px;
  width: 96px;
  border-radius: 8px;
  margin-top: 38px;
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
  -webkit-animation: ${spin} 1s linear infinite;
  animation: ${spin} 1s linear infinite;
  transform-style: preserve-3d;
`;

const UpSwipeCard = styled(SwipeCardImg)`
  animation-name: ${slideinfromBottomright};
  box-shadow: #ff5f1f 0px 0px 3px 3px;
`;

const DownSwipeCard = styled(SwipeCardImg)`
  animation-name: ${slideinfromBottomleft};
  box-shadow: #1b03a3 0px 0px 3px 3px;
`;

const TieSwipeCard = styled(SwipeCardImg)`
  animation-name: ${slideinfromBottom};
  box-shadow: #ffa33b 0px 0px 3px 3px;
`;

const GameCardContainerWithBgUp = styled.div`
  color: #fff;
  display: block;
  -webkit-user-select: none;
  height: 200px;
  border-radius: 8px;
  border: 2px solid #ffd700;
  background: white;
  background-image: url(${up7Card});
  background-size: cover;
  background-position: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5); 
`;

const GameCardContainerWithBgDown = styled.div`
  color: #fff;
  display: block;
  -webkit-user-select: none;
  height: 200px;
  border-radius: 8px;
  border: 2px solid #ffd700;
  background: white;
  background-image: url(${down7Card});
  background-size: cover;
  background-position: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5); 
`;

const GameCardContainerWithBgLucky = styled.div`
  color: #fff;
  display: block;
  -webkit-user-select: none;
  height: 200px;
  border-radius: 8px;
  border: 2px solid #ffd700;
  background: white;
  background-image: url(${lucky7Card});
  background-size: cover;
  background-position: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5); 
`;

// const ResultCardImg = styled.img`
//   background: #fff;
//   border: 2px outset #a1ceff;
//   height: 128px;
//   width: 96px;
//   border-radius: 8px;
//   margin-top: 38px;
//   -webkit-animation: ${zoominoutsinglefeatured} 1s forwards infinite;
//   animation: ${zoominoutsinglefeatured} 1s forwards infinite;
//   transform-style: preserve-3d;
// `;

const ResultCardImg = styled.img`
  background: #fff;
  border: 2px outset #a1ceff;
  height: 128px;
  width: 96px;
  border-radius: 8px;
  margin-top: 38px;
  transform-style: preserve-3d;
`;

const UpResultCard = styled(ResultCardImg)`
  box-shadow: #ff5f1f 0px 0px 3px 3px;
`;

const DownResultCard = styled(ResultCardImg)`
  box-shadow: #1b03a3 0px 0px 3px 3px;
`;

const TieResultCard = styled(ResultCardImg)`
  box-shadow: #ffa33b 0px 0px 3px 3px;
`;

const Game = ({
  closeModal,
  userName,
  sequenceNumber,
  setSequence,
  setPreRecords,
  previousRecords,
  setResults,
  winnerCard,
  setOrderType,
  openModal,
  openResult,
  closeResult,
  setGamesList,
  resetState,
  resetPreviousRecords,
  winnerOption,
  setBets,
  betAmount,
  betOption,
}) => {
  const [counter, setCounter] = useState(0);

  const fetchSequenceNumber = async () => {
    try {
      const resp = await getRequest(WIN_CASH_ENDPOINTS.LUCKY_SEVEN_SEQUENCE);
      await setSequence(resp.data[0]);
    } catch (e) {}
  };

  const fetchLucky7Games = async () => {
    try {
      await resetPreviousRecords();
      const resp = await getRequest(WIN_CASH_ENDPOINTS.LUCKY_SEVEN_GAMES);
      await setPreRecords(resp.data.reverse());
    } catch (e) {}
  };

  const fetchLucky7Results = async () => {
    try {
      const resp = await postRequest(WIN_CASH_ENDPOINTS.LUCKY_SEVEN_RESULT, {
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
      await fetchLucky7Games();
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
      fetchLucky7Games();
    }
    if (counter === 38) {
      closeModal();
    }
    if (counter === 47) {
      // toast.info("Waiting for the result", { autoClose: 5000 });
    }

    if (counter === 54) {
      fetchLucky7Results();
    }
    if (counter === 59) {
      betAmount && betOption && betOption !== "audience" && openResult();
    }

    if (!sequenceNumber && isEmpty(previousRecords)) {
      console.log("Lucky Seven Initial state");
      getInitialGameDetails();
      fetchLucky7Games();
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
    <Graphics.GameContainer
      data-bs-spy="scroll"
      data-bs-offset="0"
      className="scrollspy-example"
      tabindex="0"
    >
      <div
        style={{
          background:
            "radial-gradient(rgb(0, 128, 128), darkcyan, rgb(0, 64, 64))",
          height: "82%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Game Header Part */}
        <div className="row pt-4 px-3 m-0" onClick={closeModal}>
          <div className="col-6 text-left px-3 no-wrap">
            <div className="mb-2 fs-xs">{COMMON_LABELS.PERIOD}</div>
            <div className="mb-2 fs-xl">{sequenceNumber || "Not Started"}</div>
          </div>
          <div className="col-6 text-right no-wrap">
            <div className="mb-2 fs-xs">{COMMON_LABELS.COUNT_DOWN}</div>
            <div className="mb-2 fs-xl">
              <Graphics.CountDowm>{COMMON_LABELS.ZERO}</Graphics.CountDowm>
              <Graphics.CountDowm>{COMMON_LABELS.ZERO}</Graphics.CountDowm>
              {COMMON_LABELS.SEMICOLON}
              <Graphics.CountDowm>{secondsTensCount}</Graphics.CountDowm>
              <Graphics.CountDowm>{secondsOnesCount}</Graphics.CountDowm>
            </div>
          </div>
        </div>
        {/* Game Main Card Part */}
        <div className="row flex pt-2 my-4 mx-2 px-0" onClick={closeModal}>
          <div className="col-4 flex align-items-center justify-content-center px-1">
            <GameCardContainerWithBgUp>
              {counter === 56 && winnerOption === "UP" && (
                <UpSwipeCard src={totalCards[winnerCard]} alt="up-card" />
              )}
              {counter > 56 && winnerOption === "UP" && (
                <UpResultCard
                  src={totalCards[winnerCard]}
                  alt="winner-up-card"
                />
              )}
            </GameCardContainerWithBgUp>
          </div>
          <div className="col-4 flex align-items-center justify-content-center px-1">
            <GameCardContainerWithBgLucky>
              {counter === 56 && winnerOption === "TIE" && (
                <TieSwipeCard src={totalCards[winnerCard]} alt="lucky7-card" />
              )}
              {counter > 56 && winnerOption === "TIE" && (
                <TieResultCard
                  src={totalCards[winnerCard]}
                  alt="winner-tie-card"
                />
              )}
            </GameCardContainerWithBgLucky>
          </div>
          <div className="col-4 flex align-items-center justify-content-center px-1">
            <GameCardContainerWithBgDown>
              {counter === 56 && winnerOption === "DOWN" && (
                <DownSwipeCard src={totalCards[winnerCard]} alt="down-card" />
              )}
              {counter > 56 && winnerOption === "DOWN" && (
                <DownResultCard
                  src={totalCards[winnerCard]}
                  alt="winner-down-card"
                />
              )}
            </GameCardContainerWithBgDown>
          </div>
        </div>
        {/* Game Functional Card Parts*/}
        <div className="row pt-2 m-0 px-3" onClick={closeModal}>
          <div className="col-4 px-0" />
          <div className="col-4  d-flex justify-content-center align-items-center px-0">
            <Graphics.GameCardContainer className="min-card-height">
              {counter < 55 && (
                <SpinCardImg
                  src={bulkCardFlip}
                  alt="center-spinning-card"
                  className="mb-2"
                />
              )}
              {counter === 55 && (
                <CardImg src={totalCards[winnerCard]} alt="winner-card" />
              )}
            </Graphics.GameCardContainer>
          </div>

          <div className="col-4 px-0" />
        </div>
        {/* Game Place order Parts */}
        <div className="row my-4 pb-3 mx-3">
          <div className="col-4 px-0">
            <Graphics.OrderContainer
              left
              disabled={
                counter > labelDisabledTimer || counter < 5 || !sequenceNumber
              }
            >
              <Graphics.OrderLabel onClick={() => setOrderModal("UP")}>
                {"JOIN UP"}
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
                {"TIE"}
              </Graphics.OrderLabel>
              <Graphics.OrderHint>{COMMON_LABELS.RATIO_TIE}</Graphics.OrderHint>
            </Graphics.OrderContainer>
          </div>
          <div className="col-4 px-0">
            <Graphics.OrderContainer
              right
              disabled={
                counter > labelDisabledTimer || counter < 5 || !sequenceNumber
              }
            >
              <Graphics.OrderLabel onClick={() => setOrderModal("DOWN")}>
                {"JOIN DOWN"}
              </Graphics.OrderLabel>

              <Graphics.OrderHint>
                {COMMON_LABELS.RATIO_HALF}
              </Graphics.OrderHint>
            </Graphics.OrderContainer>
          </div>
        </div>{" "}
      </div>

      {/* Game Records Secion */}
      <Graphics.RecordContainer className="row">
        <Graphics.RecordHeader className="col-12">
          {COMMON_LABELS.RECORD}
        </Graphics.RecordHeader>
        <Graphics.RecordBody className="row d-flex m-0 px-3">
          <Graphics.RecordTitle className="col-8 my-2 pl-0 pb-2">
            {LUCKY_SEVEN_LABELS.RECORDS}
          </Graphics.RecordTitle>
          <div className="col-12">
            <div className="row">
              {previousRecords.map((record) => (
                <Graphics.RecordBallsContainer
                  className="mb-2"
                  key={record.sequenceNumber}
                >
                  <Graphics.RecordBall
                    right={record.winnerOption === "DOWN"}
                    left={record.winnerOption === "UP"}
                    tie={record.winnerOption === "TIE"}
                  >
                    <div>
                      {record && record.winnerOption
                        ? record.winnerOption[0]
                        : "?"}
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
        gameName="luckyseven"
        mockItems={LUCKY_SEVEN_OTHER_ORDERS}
        counter={counter}
      />
    </Graphics.GameContainer>
  );
};

const mapStateToProps = (state) => ({
  sequenceNumber: state.luckySeven.sequenceNumber,
  previousRecords: state.luckySeven.previousRecords,
  userName: state.auth.userName,
  winnerCard: state.luckySeven.winnerCard,
  winnerOption: state.luckySeven.winnerOption,
  betAmount: state.luckySeven.betAmount,
  betOption: state.luckySeven.betOption,
  playersList: state.luckySeven.playersList,
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
