import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { isEmpty } from "lodash";

const TransactionWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  padding-bottom: 80px;
`;

const TransactionListContainer = styled.div`
  height: auto;
  padding: 5px 0;
  background: #f9fcff;
  border: 1px solid #d0ebff;
  border-radius: 4px;
  transaction: 0.2s;
  margin-bottom: 6px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TransactionTitle = styled.div`
  font-size: 14px;
  color: #383b45;
  font-weight: 600;
`;

const TransactionItemTime = styled.div`
  font-size: 12px;
  font-weight: 400;
`;

const PasswordList = ({ passwordHistory }) => (
  <TransactionWrapper>
    <div className="row m-0">
      <div className="col-12 px-3 mt-2">
        <TransactionListContainer className="row m-0">
          <TransactionTitle className="col-1 text-center">
            Serial
          </TransactionTitle>
          <TransactionTitle className="col-5 text-center">
            Date and Time
          </TransactionTitle>
          <TransactionTitle className="col-3 text-center">
            Platform
          </TransactionTitle>
          <TransactionTitle className="col-3 text-center">
            Browser
          </TransactionTitle>
        </TransactionListContainer>
      </div>
    </div>
    {!isEmpty(passwordHistory) &&
      passwordHistory.map((item, idx) => (
        <div className="row m-0" key={item.loginTime}>
          <div className="col-12 px-3 mt-2">
            <TransactionListContainer className="row m-0">
              <TransactionItemTime className="col-1 text-center">
                {idx + 1}
              </TransactionItemTime>

              <TransactionItemTime className=" col-5 text-center">
                {new Date(item.loginTime).toLocaleString()}
              </TransactionItemTime>
              <TransactionItemTime className="col-3 text-center">
                {item.userPlatform || "unknown"}
              </TransactionItemTime>
              <TransactionItemTime className="col-3 text-center">
                {item.userBrowser || "unknown"}
              </TransactionItemTime>
            </TransactionListContainer>
          </div>
        </div>
      ))}
  </TransactionWrapper>
);

const mapStateToProps = (state) => ({
    passwordHistory: state.auth.passwordHistory,
});

export default connect(mapStateToProps)(PasswordList);
