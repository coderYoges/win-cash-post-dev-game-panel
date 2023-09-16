import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import { MineHeaderPage } from "./MineHeaderPage";
import { BottomNavBar } from "../../components/common/BottomNavBar";
import MineContainer from "./MineContainer";
import MineModal from "./MineModal";
import MinePasswordPopUp from "./MinePasswordPopUp";
import { ToastContainer } from "react-toastify";

const MinePage = (props) => {
  const [isModal, setModal] = useState(false);
  const [passwordPopUp, setPasswordPopUp] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  const openPassword = () => setPasswordPopUp(true);
  const closePassword = () => setPasswordPopUp(false);

  return (
    <Fragment>
      {isModal && <MineModal closeModal={closeModal} />}
      {passwordPopUp && <MinePasswordPopUp closeModal={closePassword} />}
      <ToastContainer limit={1} />
      <div className={isModal || passwordPopUp ? "half-opacity" : ""}>
        <MineHeaderPage
          {...props}
          openModal={openModal}
          openPassword={openPassword}
        />
        <MineContainer {...props} />
        <BottomNavBar />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userName: get(state, "auth.userName"),
  userId: get(state, "auth.userId"),
  isUserLoggedIn: get(state, "auth.loginStatus"),
  walletBalance: get(state, "auth.walletBalance"),
});

export default connect(mapStateToProps)(MinePage);
