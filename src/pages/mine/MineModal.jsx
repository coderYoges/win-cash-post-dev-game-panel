import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const BalaceModal = styled.div`
  background: #fff;
  color: #262626;
  width: 296px;
  padding: 0;
  text-align: justify;
  box-shadow: 0 0 10px #898989;
  border-radius: 6px;
  top: 40%;
  position: absolute;
  transition: 0.2s;
  z-index: 1099;
  left: calc(50% - 148px);
`;

const BalanceHeaderContainer = styled.div`
  background: #e0e0e0;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 6px 6px 0 0;
`;

const MineModal = ({ closeModal, balance, bonus, wager, hold }) => {
  return (
    <BalaceModal>
      <BalanceHeaderContainer className="d-flex justify-content-between">
        <div className="fw-500 fs-md">Balance Information</div>
        <div onClick={closeModal} className="cursor-pointer">
          <span className="fw-600">x</span>
        </div>
      </BalanceHeaderContainer>
      <div className="p-3 fs-md">
        <div className="d-flex justify-content-between mt-1">
          <div>Available Balance:</div>
          <div>{`₹ ${balance}`}</div>
        </div>
        <div className="d-flex justify-content-between mt-1">
          <div>Available Bonus:</div>
          <div>{`₹ ${bonus}`}</div>
        </div>
        <div className="d-flex justify-content-between mt-1">
          <div>Wagering Remaining:</div>
          <div>{`₹ ${wager}`}</div>
        </div>
        <div className="d-flex justify-content-between mt-1">
          <div>Balance Hold:</div>
          <div>{`₹ ${hold}`}</div>
        </div>
      </div>
    </BalaceModal>
  );
};

const mapStateToProps = (state) => ({
  balance: state.auth.balance || "0.00",
  bonus: state.auth.bonus || "0.00",
  wager: state.auth.wager || "0.00",
  hold: state.auth.hold || "0.00",
});

export default connect(mapStateToProps)(MineModal);
