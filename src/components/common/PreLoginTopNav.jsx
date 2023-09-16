import styles from "./Common.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";


import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { IconComponent, Icons } from "../elements/icon/Icon";
import { COMMON_LABELS } from "../../config/constants";
import { LoginPopUp } from "./LoginPopUp";

const StickyContainer = styled.div`
  color: #fff;
  height: 64px;
  max-height: 64px;
  white-space: nowrap;
  background: rgb(28, 59, 106);
`;

export const PreLoginTopNav = (props) => {
  const [isModal, setModal] = useState(false);
  const closeModal = () => setModal(false);
  const onConfirm = () => {
    setModal(false);
    props.onLogin();
  };

  return (
    <Fragment>
      {isModal && (
        <LoginPopUp
          closeModal={closeModal}
          onConfirm={onConfirm}
          onExit={closeModal}
        />
      )}
      <StickyContainer className="fs-md">
        <div className="d-flex h-100 mx-3 align-items-center justify-content-between">
          <IconComponent
            iconType={Icons.crikbuzz}
            height="40px"
            width="80px"
            maxwidth="80px"
          />
          <div className="d-flex">
          <div className={styles.subHeaderButton} onClick={() => setModal(true)}>
            <button
              className={styles.btn}
              style={{ marginRight: "5px", cursor: "pointer" }}
            >
              {COMMON_LABELS.LOGIN}
            </button>
            <FontAwesomeIcon
              icon={faSignInAlt}
              style={{ fontSize: "12px", cursor: "pointer" }}
            />
          </div>
        </div>
        </div>
      </StickyContainer>
    </Fragment>
  );
};
