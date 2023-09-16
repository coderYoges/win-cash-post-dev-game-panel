import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { postRequest } from "../../api";
import { WIN_CASH_ENDPOINTS } from "../../config/endPoints";
import { setGamesList } from "../../redux/auth";
import { TopContainer } from "./TopContainer";
import Transactionlist from "./TransactionList";

const FinancialDetail = ({ userName, setGamesList }) => {
  const fetchUserDetails = async () => {
    try {
      const resp = await postRequest(WIN_CASH_ENDPOINTS.GET_USER, {
        userName: userName,
      });
      await setGamesList(resp.data);
    } catch (e) {}
  };
  useEffect(() => {
    fetchUserDetails();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <TopContainer />
      <Transactionlist />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userName: state.auth.userName,
});

const mapDispatchToProps = {
  setGamesList: setGamesList,
};

export default connect(mapStateToProps, mapDispatchToProps)(FinancialDetail);
