import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
// import { toast } from "react-toastify";
import { isEmpty } from "lodash";
import Grapics from "../../components/games/Grapics";
import { getRequest, postRequest } from "../../api";
import { WIN_CASH_ENDPOINTS } from "../../config/endPoints";
import { ANDAR_BAHAR_LABELS, COMMON_LABELS } from "../../config/constants";
import {
  setSequence,
  resetState,
  setPreRecords,
  setResults,
  resetPreviousRecords,
  setBets,
} from "../../redux/andar-bahar";
import { setGamesList } from "../../redux/auth";
import { getAnBCardsWithTimers } from "../../utils/andarBahar";
import OrderTabs from "../../components/games/OrderTabs";
import { ANDAR_BAHAR_OTHER_ORDERS } from "../../config/mocks";

const cardPlaceholder = require("../../assets/andar-bahar/card-placeholder.png");
const andarPlaceholder = require("../../assets/andar-bahar/andar_placeholder.png");
const baharPlaceholder = require("../../assets/andar-bahar/bahar_placeholder.png");
const bulkCardPlaceholder = require("../../assets/andar-bahar/bulk_card_placeholder.png");

const totalCards = {
  card2S: require("../../assets/game-cards/images/2_of_spades.png"),
  card2H: require("../../assets/game-cards/images/2_of_hearts.png"),
  card2D: require("../../assets/game-cards/images/2_of_diamonds.png"),
  card2C: require("../../assets/game-cards/images/2_of_clubs.png"),

  card3S: require("../../assets/game-cards/images/3_of_spades.png"),
  card3H: require("../../assets/game-cards/images/3_of_hearts.png"),
  card3D: require("../../assets/game-cards/images/3_of_diamonds.png"),
  card3C: require("../../assets/game-cards/images/3_of_clubs.png"),

  card4S: require("../../assets/game-cards/images/4_of_spades.png"),
  card4H: require("../../assets/game-cards/images/4_of_hearts.png"),
  card4D: require("../../assets/game-cards/images/4_of_diamonds.png"),
  card4C: require("../../assets/game-cards/images/4_of_clubs.png"),

  card5S: require("../../assets/game-cards/images/5_of_spades.png"),
  card5H: require("../../assets/game-cards/images/5_of_hearts.png"),
  card5D: require("../../assets/game-cards/images/5_of_diamonds.png"),
  card5C: require("../../assets/game-cards/images/5_of_clubs.png"),

  card6S: require("../../assets/game-cards/images/6_of_spades.png"),
  card6H: require("../../assets/game-cards/images/6_of_hearts.png"),
  card6D: require("../../assets/game-cards/images/6_of_diamonds.png"),
  card6C: require("../../assets/game-cards/images/6_of_clubs.png"),

  card7S: require("../../assets/game-cards/images/7_of_spades.png"),
  card7H: require("../../assets/game-cards/images/7_of_hearts.png"),
  card7D: require("../../assets/game-cards/images/7_of_diamonds.png"),
  card7C: require("../../assets/game-cards/images/7_of_clubs.png"),

  card8S: require("../../assets/game-cards/images/8_of_spades.png"),
  card8H: require("../../assets/game-cards/images/8_of_hearts.png"),
  card8D: require("../../assets/game-cards/images/8_of_diamonds.png"),
  card8C: require("../../assets/game-cards/images/8_of_clubs.png"),

  card9S: require("../../assets/game-cards/images/9_of_spades.png"),
  card9H: require("../../assets/game-cards/images/9_of_hearts.png"),
  card9D: require("../../assets/game-cards/images/9_of_diamonds.png"),
  card9C: require("../../assets/game-cards/images/9_of_clubs.png"),

  card10S: require("../../assets/game-cards/images/10_of_spades.png"),
  card10H: require("../../assets/game-cards/images/10_of_hearts.png"),
  card10D: require("../../assets/game-cards/images/10_of_diamonds.png"),
  card10C: require("../../assets/game-cards/images/10_of_clubs.png"),
};

const Game = ({
  systemCard,
  setSequence,
  sequenceNumber,
  resetState,
  openModal,
  closeModal,
  setOrderType,
  cardsList = [],
  setResults,
  previousRecords,
  setPreRecords,
  openResult,
  closeResult,
  userName,
  setGamesList,
  resetPreviousRecords,
  setBets,
  betAmount,
  betOption,
}) => {
  const [counter, setCounter] = useState(0);

  const fetchSequenceNumber = async () => {
    try {
      const resp = await getRequest(WIN_CASH_ENDPOINTS.ANDAR_BAHAR_SEQUENCE);
      await setSequence(resp.data[0]);
    } catch (e) {}
  };

  const fetchAnBGames = async () => {
    try {
      await resetPreviousRecords();
      const resp = await getRequest(WIN_CASH_ENDPOINTS.ANDAR_BAHAR_GAMES);
      await setPreRecords(resp.data.reverse());
    } catch (e) {}
  };

  const fetchAnBResults = async () => {
    try {
      const resp = await postRequest(WIN_CASH_ENDPOINTS.ANDAR_BAHAR_RESULT, {
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
      await fetchAnBGames();
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
      fetchAnBGames();
    }
    if (counter === 30) {
      closeModal();
    }
    if (counter === 47) {
      // toast.info("Waiting for the result", { autoClose: 5000 });
    }
    if (counter === 53) {
      fetchAnBResults();
    }
    if (counter === 59) {
      betAmount && betOption && betOption !== "audience" && openResult();
    }

    if (!sequenceNumber && isEmpty(previousRecords)) {
      console.log("Andar bahar Initial state");
      setBets({ betAmount: 100, betOption: "audience" });
      getInitialGameDetails();
      fetchAnBGames();
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

  const assertedCardList = cardsList.length > 0 && getAnBCardsWithTimers(cardsList);
  const secondsTensCount =
    counter > 0 && counter < 46 ? parseInt((45 - counter) / 10) : 0;
  const secondsOnesCount =
    counter > 0 && counter < 46 ? parseInt((45 - counter) % 10) : 0;
  const labelDisabledTimer = 30;

  return (
    <Grapics.GameContainer
      data-bs-spy="scroll"
      data-bs-offset="0"
      className="scrollspy-example"
      tabindex="0"
    >
      {" "}
      <div
        style={{
          background: "radial-gradient(rgb(43, 102, 67), rgb(16, 47, 28))",
          height: "72%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Game Header Part */}
        <div className="row pt-4 px-3 m-0" onClick={closeModal}>
          <div className="col-6 text-left px-3 no-wrap">
            <div className="mb-2 fs-xs">{COMMON_LABELS.PERIOD}</div>
            <div className="mb-2 fs-xl">{sequenceNumber || "Loading"}</div>
          </div>
          <div className="col-6 text-right px-3 no-wrap">
            <div className="mb-2 fs-xs">{COMMON_LABELS.COUNT_DOWN}</div>
            <div className="mb-2 fs-xl">
              <Grapics.CountDowm>{COMMON_LABELS.ZERO}</Grapics.CountDowm>
              <Grapics.CountDowm>{COMMON_LABELS.ZERO}</Grapics.CountDowm>
              {COMMON_LABELS.SEMICOLON}
              <Grapics.CountDowm>{secondsTensCount}</Grapics.CountDowm>
              <Grapics.CountDowm>{secondsOnesCount}</Grapics.CountDowm>
            </div>
          </div>
        </div>
        {/* Game Main Card Part */}
        <div className="row pt-2 px-3 m-0" onClick={closeModal}>
          <div className="col-4" />
          <div className="col-4 mb-3">
            <Grapics.TopCardContainer>
              {systemCard ? (
                <Grapics.TopCardImg
                  src={totalCards[systemCard]}
                  alt="card-entered"
                />
              ) : (
                <Grapics.TopCardPH src={cardPlaceholder} alt="placeholder" />
              )}
            </Grapics.TopCardContainer>
          </div>
          <div className="col-4" />
        </div>

        {/* Game Functional Card Parts*/}
        <div className="row pt-2 m-0 px-3" onClick={closeModal}>
          <div className="col-4 d-flex justify-content-end align-items-center px-0">
            <Grapics.GameCardContainer>
              <Grapics.GameCardImg
                src={andarPlaceholder}
                alt="andar-card-placeholder"
              />

              {assertedCardList?.andarCards?.map((andar, idx) => {
                const gap = 15 - (idx + 1) * 3 + "px";
                return andar.timer < counter ? (
                  <Grapics.AndarCard
                    src={totalCards[andar.card]}
                    alt="andar-card"
                    key={"andar-card-" + idx}
                    gap={gap}
                    card={andar.card}
                    selectedCard={systemCard}
                  />
                ) : (
                  <Fragment key={"andar-card-" + idx} />
                );
              })}
            </Grapics.GameCardContainer>
          </div>

          <div className="col-4  d-flex justify-content-center align-items-center px-0">
            <Grapics.GameCardContainer>
              <Grapics.BulkCards
                src={bulkCardPlaceholder}
                alt="bulk card placeholder"
              />
            </Grapics.GameCardContainer>
          </div>

          <div className="col-4  d-flex justify-content-start align-items-center px-0">
            <Grapics.GameCardContainer>
              <Grapics.GameCardImg
                src={baharPlaceholder}
                alt="bahar card placeholder"
              />

              {assertedCardList?.baharCards?.map((bahar, idx) => {
                const gap = 15 - (idx + 1) * 3 + "px";
                return bahar.timer < counter ? (
                  <Grapics.BaharCard
                    src={totalCards[bahar.card]}
                    alt="bahar-card"
                    key={"bahar-card-" + idx}
                    gap={gap}
                    card={bahar.card}
                    selectedCard={systemCard}
                  />
                ) : (
                  <Fragment key={"bahar-card-" + idx} />
                );
              })}
            </Grapics.GameCardContainer>
          </div>
        </div>

        {/* Game Place order Parts */}
        <div className="row my-4 pb-3 mx-3">
          <div className="col-4  px-0">
            <Grapics.OrderContainer
              left
              disabled={
                counter > labelDisabledTimer || counter < 5 || !sequenceNumber
              }
            >
              <Grapics.OrderLabel onClick={() => setOrderModal("ANDAR")}>
                {ANDAR_BAHAR_LABELS.ORDER_ANDAR}
              </Grapics.OrderLabel>
              <Grapics.OrderHint>{COMMON_LABELS.RATIO_HALF}</Grapics.OrderHint>
            </Grapics.OrderContainer>
          </div>
          <div className="col-4 px-0">
            <Grapics.OrderContainer
              tie
              disabled={
                counter > labelDisabledTimer || counter < 5 || !sequenceNumber
              }
            >
              <Grapics.OrderLabel onClick={() => setOrderModal("TIE")}>
                {ANDAR_BAHAR_LABELS.ORDER_TIE}
              </Grapics.OrderLabel>
              <Grapics.OrderHint>{COMMON_LABELS.RATIO_TIE}</Grapics.OrderHint>
            </Grapics.OrderContainer>
          </div>
          <div className="col-4 px-0">
            <Grapics.OrderContainer
              right
              disabled={
                counter > labelDisabledTimer || counter < 5 || !sequenceNumber
              }
            >
              <Grapics.OrderLabel onClick={() => setOrderModal("BAHAR")}>
                {ANDAR_BAHAR_LABELS.ORDER_BAHAR}
              </Grapics.OrderLabel>
              <Grapics.OrderHint>{COMMON_LABELS.RATIO_HALF}</Grapics.OrderHint>
            </Grapics.OrderContainer>
          </div>
        </div>
      </div>
      {/* Game Records Secion */}
      <Grapics.RecordContainer className="row">
        <Grapics.RecordHeader className="col-12">
          {COMMON_LABELS.RECORD}
        </Grapics.RecordHeader>
        <Grapics.RecordBody className="row d-flex m-0 px-3">
          <Grapics.RecordTitle className="col-8 my-2 pl-0 pb-2">
            {ANDAR_BAHAR_LABELS.RECORDS}
          </Grapics.RecordTitle>
          <div className="col-12">
            <div className="row">
              {previousRecords.map((record) => (
                <Grapics.RecordBallsContainer
                  className="mb-2"
                  key={record.sequenceNumber}
                >
                  <Grapics.RecordBall
                    left={record.winnerOption === "ANDAR"}
                    right={record.winnerOption === "BAHAR"}
                    tie={record.winnerOption === "TIE"}
                  >
                    <div>
                      {record.winnerOption ? record.winnerOption[0] : "?"}
                    </div>
                  </Grapics.RecordBall>
                  <Grapics.RecordNumber>
                    {String(record.sequenceNumber % 1000).padStart(3, "0")}
                  </Grapics.RecordNumber>
                </Grapics.RecordBallsContainer>
              ))}
            </div>
          </div>
          <div className="col-12 my-4 "></div>
        </Grapics.RecordBody>
      </Grapics.RecordContainer>
      {/* Orders Tab section */}
      <OrderTabs
        sequenceNumber={sequenceNumber}
        gameName="andarbahar"
        mockItems={ANDAR_BAHAR_OTHER_ORDERS}
        counter={counter}
      />
    </Grapics.GameContainer>
  );
};

const mapStateToProps = (state) => ({
  systemCard: state.andarBahar.systemCard,
  sequenceNumber: state.andarBahar.sequenceNumber,
  cardsList: state.andarBahar.cardsList,
  userName: state.auth.userName,
  previousRecords: state.andarBahar.previousRecords,
  betAmount: state.andarBahar.betAmount,
  betOption: state.andarBahar.betOption,
  playersList: state.andarBahar.playersList,
});

const mapDispatchToProps = {
  setSequence: setSequence,
  resetState: resetState,
  setPreRecords: setPreRecords,
  setResults: setResults,
  setGamesList: setGamesList,
  resetPreviousRecords: resetPreviousRecords,
  setBets: setBets,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
