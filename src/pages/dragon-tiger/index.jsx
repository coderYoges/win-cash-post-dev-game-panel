import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
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
} from "../../redux/dragon-tiger";
import { setWalletBalance } from "../../redux/auth";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { WIN_CASH_ENDPOINTS } from "../../config/endPoints";
import { postRequest } from "../../api";
import { DRAGON_TIGER_RULES } from "../../config/rules";
import { DRAGON_TIGER_LABELS, ERROR_MESSAGES } from "../../config/constants";
import { RouteConfig } from "../../config/routeConfig";

const DragonTiger = ({
  setBets,
  sequenceNumber,
  userName,
  setWalletBalance,
  balance,
  loginStatus,
  betAmount,
  betOption,
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
  const [orderType, setOrderType] = useState("DRAGON");
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
  }, [resetState, resetPreviousRecords]);
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

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
      toast.warn(ERROR_MESSAGES.LOW_BALANCE, { autoClose: 2000 });
    } else {
      if (numbers * contract > 99) {
        closeOrderModal();
        var resp = await postRequest(WIN_CASH_ENDPOINTS.DRAGON_TIGER_SET_BETS, {
          betOption: orderType,
          userName: userName,
          betAmount: numbers * contract,
          sequenceNumber: sequenceNumber,
          totalBetType:
            orderType === "TIGER"
              ? "totalTiger"
              : orderType === "DRAGON"
              ? "totalDragon"
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
          ruleTitle={DRAGON_TIGER_RULES.TITLE}
          rulesList={DRAGON_TIGER_RULES.LIST}
          rulesPoints={DRAGON_TIGER_RULES.POINTS}
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
          orderLeft={"DRAGON"}
          orderRight={"TIGER"}
          orderCenter={"TIE"}
          orderLeftTitle={DRAGON_TIGER_LABELS.JOIN_DRAGON}
          orderRightTitle={DRAGON_TIGER_LABELS.JOIN_TIGER}
          orderCenterTitle={DRAGON_TIGER_LABELS.JOIN_TIE}
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
          orderLeft={"DRAGON"}
          orderRight={"TIGER"}
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
  sequenceNumber: state.dragonTiger.sequenceNumber,
  userName: state.auth.userName,
  betOption: state.dragonTiger.betOption,
  betAmount: state.dragonTiger.betAmount,
  balance: state.auth.balance,
  loginStatus: state.auth.loginStatus,
  winnerOption: state.dragonTiger.winnerOption,
  isWon: state.dragonTiger.isWon,
  result: state.dragonTiger.result,
});

const mapDispatchToProps = {
  setBets: setBets,
  setWalletBalance: setWalletBalance,
  resetState: resetState,
  resetPreviousRecords: resetPreviousRecords,
};

export default connect(mapStateToProps, mapDispatchToProps)(DragonTiger);
