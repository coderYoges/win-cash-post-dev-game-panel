import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { IconComponent, Icons } from "../../components/elements/icon/Icon";
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

const TransactionItemName = styled.div`
  font-size: 14px;
  color: #383b45;
  font-weight: 600;
`;

const TransactionItemTime = styled.div`
  font-size: 12px;
  font-weight: 400;
`;

const TransactionAmount = styled.div`
  color: ${(props) => (props.isCredit ? "#00c282" : "#ff0000")};
`;

const Transactionlist = ({ financeList }) => (
  <TransactionWrapper>
    {!isEmpty(financeList) &&
      financeList.map((item) => (
        <div className="row m-0" key={item.dateAndTime}>
          <div className="col-12 px-3 mt-2">
            <TransactionListContainer className="row m-0">
              <div className="col-2 p-0 m-0">
                <IconComponent
                  iconType={Icons.finDetail}
                  height="30px"
                  width="30px"
                  minwidth="30px"
                />
              </div>
              <div className="col-6">
                <div className="row m-0">
                  <TransactionItemName className="col-12 text-left">
                    {item.description}
                  </TransactionItemName>
                  <TransactionItemTime className="col-12 pt-1 text-left">
                    {new Date(item.dateAndTime).toLocaleString()}
                  </TransactionItemTime>
                </div>
              </div>
              <TransactionAmount
                className="col-4 fw-600 fs-lg text-right"
                isCredit={item.isCredit}
              >
                {`${item.isCredit ? "+" : "-"} ${item.amount}`}
              </TransactionAmount>
            </TransactionListContainer>
          </div>
        </div>
      ))}
  </TransactionWrapper>
);

const mapStateToProps = (state) => ({
  financeList: state.auth.financialDetails,
});

export default connect(mapStateToProps)(Transactionlist);
