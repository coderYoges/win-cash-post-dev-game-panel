import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { TopNavBar } from "../../components/games/TopNavBar";

import CustomToast from "../../components/common/CustomToast/CustomToast";

import { RuleModal } from "../../components/games/RuleModal";
import OrderModal from "../../components/games/OrderModal";
import { ResultModal } from "../../components/games/ResultModal";
import { LoginPopUp } from "../../components/common/LoginPopUp";
import Game from "./Game";

import {
  setBets,
  resetState,
  resetPreviousRecords,
} from "../../redux/andar-bahar";
import { setWalletBalance } from "../../redux/auth";
import { useHistory } from "react-router";
import { postRequest } from "../../api";
import { WIN_CASH_ENDPOINTS } from "../../config/endPoints";
import { ANDAR_BAHAR_RULES } from "../../config/rules";
import { ANDAR_BAHAR_LABELS, ERROR_MESSAGES } from "../../config/constants";
import { RouteConfig } from "../../config/routeConfig";

const AndarBahar = ({
  setBets,
  sequenceNumber,
  userName,
  betOption,
  betAmount,
  setWalletBalance,
  balance,
  loginStatus,
  winnerOption,
  isWon,
  result,
  resetState,
  resetPreviousRecords,
}) => {
  const [isRulesActive, setRulesActive] = useState(false);
  const [isOrderActive, setOrderActive] = useState(false);
  const [isResultActive, setResultActive] = useState(false);
  const [isLoginModal, setLoginModal] = useState(false);
  const [orderType, setOrderType] = useState("ANDAR");
  const [contract, setContract] = useState(100);
  const [numbers, setNumbers] = useState(1);

  const openRulesModal = () => setRulesActive(true);
  const closeRulesModal = () => setRulesActive(false);
  const openOrderModal = () => {
    setOrderActive(true);
  };
  const closeOrderModal = () => setOrderActive(false);
  const openResultModal = () => setResultActive(true);
  const closeResultModal = () => setResultActive(false);

  const history = useHistory();

  const closeLoginModal = () => setLoginModal(false);
  const onConfirmLogin = () => {
    setLoginModal(false);
    history.push(RouteConfig.login);
  };

  useEffect(() => {
    resetState();
    resetPreviousRecords();
    // eslint-disable-next-line
  }, []);

  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const onClickMinus5 = () => {
    numbers > 5 ? setNumbers(numbers - 5) : setNumbers(1);
  };
  const onClickMinus1 = () => {
    numbers > 1 ? setNumbers(numbers - 1) : setNumbers(1);
  };
  const onClickPlus1 = () => setNumbers(numbers + 1);
  const onClickPlus5 = () => setNumbers(numbers + 5);

  const onConfirm = async () => {
    if (!loginStatus) {
      closeOrderModal();
      setLoginModal(true);
    } else if (balance < numbers * contract) {
      toast.warn(ERROR_MESSAGES.LOW_BALANCE, { autoClose: 2000 });
    } else {
      if (numbers * contract > 99) {
        closeOrderModal();

        var resp = await postRequest(WIN_CASH_ENDPOINTS.ANDAR_BAHAR_SET_BETS, {
          betOption: orderType,
          userName: userName,
          betAmount: numbers * contract,
          sequenceNumber: sequenceNumber,
          totalBetType:
            orderType === "ANDAR"
              ? "totalAndar"
              : orderType === "BAHAR"
              ? "totalBahar"
              : "totalTie",
        });
        if (resp.isSuccessful) {
          await setWalletBalance(balance - numbers * contract);
          await setBets({
            betAmount: numbers * contract,
            betOption: orderType,
          });
          handleShowToast();
        } else {
          toast.warn(ERROR_MESSAGES.WRONG, { autoClose: 2000 });
        }
        setTimeout(() => {
          setNumbers(1);
          setContract(100);
        }, 2200);
      } else {
        toast.warn(ERROR_MESSAGES.MINIMUM_BET, { autoClose: 2000 });
        return;
      }
    }
  };

  return (
    <Fragment>
      <ToastContainer limit={3} />
      {showToast && (
        <CustomToast message={numbers * contract + " Successfully"} />
      )}
      <TopNavBar
        openModal={openRulesModal}
        gameName={ANDAR_BAHAR_LABELS.GAME}
        style={{
          background: "radial-gradient(rgb(43, 102, 67), rgb(16, 47, 28))",
        }}
      />
      {isLoginModal && (
        <LoginPopUp
          closeModal={closeLoginModal}
          onConfirm={onConfirmLogin}
          onExit={closeLoginModal}
        />
      )}
      {isRulesActive && (
        <RuleModal
          closeModal={closeRulesModal}
          ruleTitle={ANDAR_BAHAR_RULES.TITLE}
          rulesList={ANDAR_BAHAR_RULES.LIST}
          rulesPoints={ANDAR_BAHAR_RULES.POINTS}
        />
      )}
      {isOrderActive && (
        <OrderModal
          orderType={orderType}
          contract={contract}
          setContract={setContract}
          onClickMinus5={onClickMinus5}
          onClickMinus1={onClickMinus1}
          onClickPlus1={onClickPlus1}
          onClickPlus5={onClickPlus5}
          onConfirm={onConfirm}
          numbers={numbers}
          orderLeft={"ANDAR"}
          orderRight={"BAHAR"}
          orderCenter={"TIE"}
          orderLeftTitle={ANDAR_BAHAR_LABELS.JOIN_ANDAR}
          orderRightTitle={ANDAR_BAHAR_LABELS.JOIN_BAHAR}
          orderCenterTitle={ANDAR_BAHAR_LABELS.JOIN_TIE}
        />
      )}
      {isResultActive && (
        <ResultModal
          closeModal={closeResultModal}
          sequenceNumber={sequenceNumber}
          betAmount={betAmount}
          betOption={betOption}
          winnerOption={winnerOption}
          isWon={isWon}
          result={result}
          orderLeft={"ANDAR"}
          orderRight={"BAHAR"}
          orderCenter={"TIE"}
        />
      )}
      <Game
        openModal={openOrderModal}
        closeModal={closeOrderModal}
        setOrderType={setOrderType}
        contract={contract}
        numbers={numbers}
        openResult={openResultModal}
        closeResult={closeResultModal}
        isResultActive={isResultActive}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  sequenceNumber: state.andarBahar.sequenceNumber,
  userName: state.auth.userName,
  betOption: state.andarBahar.betOption,
  betAmount: state.andarBahar.betAmount,
  balance: state.auth.balance,
  loginStatus: state.auth.loginStatus,
  winnerOption: state.andarBahar.winnerOption,
  isWon: state.andarBahar.isWon,
  result: state.andarBahar.result,
});

const mapDispatchToProps = {
  setBets: setBets,
  setWalletBalance: setWalletBalance,
  resetState: resetState,
  resetPreviousRecords: resetPreviousRecords,
};

export default connect(mapStateToProps, mapDispatchToProps)(AndarBahar);
