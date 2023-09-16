import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { IconComponent, Icons } from "../elements/icon/Icon";
import { connect } from "react-redux";
import { FiRefreshCw } from "react-icons/fi";
import { postRequest } from "../../api";
import { WIN_CASH_ENDPOINTS } from "../../config/endPoints";
import { setWalletBalance } from "../../redux/auth";

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StickyContainer = styled.div`
  color: #fff;
  height: 64px;
  max-height: 64px;
  white-space: nowrap;
  background: rgb(28, 59, 106);
`;

const BalanceWrapper = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  padding-right: 10px;
  background-color: #132847;
  color: #fff;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  gap: 10px;
  user-select: none;
`;

const WalletWrapper = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  color: #000;
`;

const RefreshWrapper = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  color: #fff;
  padding-right: 8px;
  cursor: pointer;
  background-color: #132847;
`;

const RefreshButton = styled(FiRefreshCw)`
  height: 18px;
  width: 18px;
  max-width: 18px;
`;

const RefreshButtonAnimated = styled(RefreshButton)`
  animation-duration: 1s;
  animation-delay: 0;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: ${spinAnimation};
`;
var isFirstTime = true;

export const PostLoginTopNav = ({ balance, userName, setWalletBalance }) => {
  const [isLoading, setLoading] = useState(false);

  const onPageLoads = async () => {
    if (isFirstTime) {
      isFirstTime =false;
      setLoading(true);
      try {
        await postRequest(WIN_CASH_ENDPOINTS.GET_BALANCE, {
          userName: userName,
        }).then((resp) => {
          if (resp.isSuccessful) {
            setWalletBalance(resp.data);
          }
        });
      } catch {
      } finally {
        setLoading(false);
      }
      const timer = setTimeout(() => {
        setLoading(false);
      }, [2000]);
      return () => clearTimeout(timer);
    }
  };

  const onClickRefresh = async () => {
    setLoading(true);
    try {
      await postRequest(WIN_CASH_ENDPOINTS.GET_BALANCE, {
        userName: userName,
      }).then((resp) => {
        if (resp.isSuccessful) {
          setWalletBalance(resp.data);
        }
      });
    } catch {
    } finally {
      setLoading(false);
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, [2000]);
    return () => clearTimeout(timer);
  };
  window.addEventListener("load", onPageLoads());
  return (
    <StickyContainer className="fs-md">
      <div className="d-flex h-100 mx-3 align-items-center justify-content-between">
        <IconComponent
          iconType={Icons.crikbuzz}
          height="40px"
          width="80px"
          maxwidth="80px"
        />
        <div className="d-flex align-items-center">
          <BalanceWrapper>
            <IconComponent
              iconType={Icons.goldCoin}
              height="18px"
              width="18px"
              maxwidth="18px"
            />
            {balance}
          </BalanceWrapper>
          <RefreshWrapper onClick={onClickRefresh}>
            {isLoading ? <RefreshButtonAnimated /> : <RefreshButton />}
          </RefreshWrapper>
          <WalletWrapper>
            <IconComponent
              iconType={Icons.wallet}
              height="30px"
              width="30px"
              maxwidth="30px"
              className="vertical-align-middle"
              autoBg
            />
          </WalletWrapper>
        </div>
      </div>
    </StickyContainer>
  );
};

const mapStateToProps = (state) => ({
  balance: state.auth.balance,
  userName: state.auth.userName,
});

const mapDispatchToProps = {
  setWalletBalance: setWalletBalance,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostLoginTopNav);
