import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { IconComponent, Icons } from "../../components/elements/icon/Icon";
import { RouteConfig } from "../../config/routeConfig";
import { ORDER_LABELS } from "../../config/constants";

const StickyContainer = styled.div`
  background: ${(props) => props.theme.colors.primary};
  color: #fff;
  height: 64px;
  line-height: 64px;
  white-space: nowrap;
  margin: 0;
`;

export const TopContainer = () => {
  const history = useHistory();
  return (
    <StickyContainer className="fs-md row d-flex sticky-top">
      <div className="col-8 d-flex align-items-center">
        <IconComponent
          iconType={Icons.backBtn}
          onClick={() => {
            history.push(RouteConfig.mine);
          }}
          height="18px"
          width="32px"
          maxwidth="32px"
        />
        <div className="d-inline-block fs-lg fw-500 mx-2">
          {ORDER_LABELS.TITLE}
        </div>
      </div>
    </StickyContainer>
  );
};
