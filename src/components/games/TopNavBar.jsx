import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { IconComponent, Icons } from "../../components/elements/icon/Icon";
import { RouteConfig } from "../../config/routeConfig";
import { LUCKY_SEVEN_LABELS } from "../../config/constants";
import { DRAGON_TIGER_LABELS, ERROR_MESSAGES } from "../../config/constants";
import { ANDAR_BAHAR_LABELS } from "../../config/constants";

const StickyContainer = styled.div`
  color: #fff;
  height: 64px;
  max-height: 64px;
  white-space: nowrap;
  background: rgb(28, 59, 106);
  margin: 0;
`;

export const TopNavBar = ({ openModal, gameName }) => {
  const history = useHistory();
  const goToHome = () => history.goBack();
  return (
    <StickyContainer
      className="row d-flex sticky-top"
      style={{
        background:
          gameName === DRAGON_TIGER_LABELS.GAME
            ? "transparent"
            : gameName === ANDAR_BAHAR_LABELS.GAME
            ? "radial-gradient(rgb(43, 102, 67), rgb(16, 47, 28))"
            : gameName === LUCKY_SEVEN_LABELS.GAME
            ? "radial-gradient(rgb(0, 80, 80), #003333, rgb(0, 32, 32))"
            : null,
      }}
    >
      <div className="col-4 d-flex align-items-center">
        <IconComponent
          iconType={Icons.backBtn}
          onClick={goToHome}
          height="18px"
          width="32px"
          maxwidth="32px"
        />
      </div>
      <div className="col-4 d-flex align-items-center justify-content-center fs-xl fw-700">
        {gameName === "Dragon Tiger" ? " " : gameName}
      </div>
      <div
        className="col-4 d-flex align-items-center justify-content-end"
        role="button"
        onClick={openModal}
      >
        Rule
      </div>
    </StickyContainer>
  );
};
