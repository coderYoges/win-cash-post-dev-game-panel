import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { TopNavBar } from "../../components/games/TopNavBar";
import { RuleModal } from "../../components/games/RuleModal";
import OrderModal from "../../components/games/OrderModal";
import { ResultModal } from "../../components/games/ResultModal";
import { LoginPopUp } from "../../components/common/LoginPopUp";
import Game from "./Game";

import CustomToast from "../../components/common/CustomToast/CustomToast";

import {
  setBets,
  resetState,
  resetPreviousRecords,
} from "../../redux/lucky-seven";
import { setWalletBalance } from "../../redux/auth";
import { useHistory } from "react-router";
import { postRequest } from "../../api";
import { WIN_CASH_ENDPOINTS } from "../../config/endPoints";
import { LUCKY_SEVEN_RULES } from "../../config/rules";
import { LUCKY_SEVEN_LABELS, ERROR_MESSAGES } from "../../config/constants";
import { RouteConfig } from "../../config/routeConfig";

const LuckySeven = ({
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
  tier1Parent,
  tier2Parent,
  tier3Parent,
}) => {
  const [isRulesActive, setRulesActive] = useState(false);
  const [isOrderActive, setOrderActive] = useState(false);
  const [isResultActive, setResultActive] = useState(false);
  const [isLoginModal, setLoginModal] = useState(false);
  const [orderType, setOrderType] = useState("UP");
  const [contract, setContract] = useState(100);
  const [numbers, setNumbers] = useState(1);

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

  const openRulesModal = () => setRulesActive(true);
  const closeRulesModal = () => setRulesActive(false);
  const openOrderModal = () => setOrderActive(true);
  const closeOrderModal = () => setOrderActive(false);
  const openResultModal = () => setResultActive(true);
  const closeResultModal = () => setResultActive(false);

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
      toast.warn("Balance is too low!!!", { autoClose: 2000 });
    } else {
      if (numbers * contract > 99) {
        closeOrderModal();

        var resp = await postRequest(WIN_CASH_ENDPOINTS.LUCKY_SEVEN_SET_BETS, {
          betOption: orderType,
          userName: userName,
          betAmount: numbers * contract,
          sequenceNumber: sequenceNumber,
          totalBetType:
            orderType === "UP"
              ? "totalUp"
              : orderType === "DOWN"
              ? "totalDown"
              : "totalTie",
          tier1Parent: tier1Parent,
          tier2Parent: tier2Parent,
          tier3Parent: tier3Parent,
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
        gameName={LUCKY_SEVEN_LABELS.GAME}
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
          ruleTitle={LUCKY_SEVEN_RULES.TITLE}
          rulesList={LUCKY_SEVEN_RULES.LIST}
          rulesPoints={LUCKY_SEVEN_RULES.POINTS}
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
          orderLeft={"UP"}
          orderRight={"DOWN"}
          orderCenter={"TIE"}
          orderLeftTitle={LUCKY_SEVEN_LABELS.JOIN_UP}
          orderRightTitle={LUCKY_SEVEN_LABELS.JOIN_DOWN}
          orderCenterTitle={LUCKY_SEVEN_LABELS.JOIN_TIE}
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
          orderLeft={"UP"}
          orderRight={"DOWN"}
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
  sequenceNumber: state.luckySeven.sequenceNumber,
  userName: state.auth.userName,
  betOption: state.luckySeven.betOption,
  betAmount: state.luckySeven.betAmount,
  balance: state.auth.balance,
  loginStatus: state.auth.loginStatus,
  winnerOption: state.luckySeven.winnerOption,
  isWon: state.luckySeven.isWon,
  result: state.luckySeven.result,
  tier1Parent: state.auth.tier1Parent,
  tier2Parent: state.auth.tier2Parent,
  tier3Parent: state.auth.tier3Parent,
});

const mapDispatchToProps = {
  setBets: setBets,
  setWalletBalance: setWalletBalance,
  resetState: resetState,
  resetPreviousRecords: resetPreviousRecords,
};

export default connect(mapStateToProps, mapDispatchToProps)(LuckySeven);
