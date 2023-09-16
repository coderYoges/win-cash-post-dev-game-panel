import React from "react";
import styled from "styled-components";
import { IconComponent, Icons } from "../../components/elements/icon/Icon";
import { MINE_LABELS, COMMON_LABELS } from "../../config/constants";

const StickyWrapper = styled.div`
  position: absolute;
  background: rgb(28, 59, 106);
  height: 76px;
  margin-bottom: 10px;
  z-index: 998;
  top: 0;
  border: none;
  width: 100%;
  white-space: nowrap;
  padding-right: 15px;
  padding-left: 15px;
`;

const OverlayWrapper = styled.div`
  background: #e0e2e5;
  border: 1px solid #d0ebff;
  border-radius: 4px;
  transition: 0.2s;
  margin-bottom: 6px;
  color: #333;
  margin-top: 15px;
  display: flex;
  align-items: center;
  min-height: 120px;
`;

const MineHeaderLabels = styled.span`
  color: #959ea6;
  font-family: monospace;
`;

const ChangePasswordBtn = styled.div`
  height: 40px;
  padding: 0 5px;
  line-height: 40px;
  background-color: #fff;
  color: #1c3b6a;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #1c3b6a;
  transition: 0.3s;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
`;

export const MineHeaderPage = ({
  userName,
  userId,
  openModal,
  openPassword,
}) => {
  return (
    <StickyWrapper>
      <OverlayWrapper className="row pb-3 pt-2 m-0 mt-3">
        <div className="col-2 text-start">
          <IconComponent
            iconType={Icons.avatar}
            height="42px"
            width="42px"
            minwidth="42px"
          />
        </div>
        <div className="col-8 text-start">
          <div className="fs-md text-dark fw-400">0</div>
          <div className="fs-sm pt-1">
            {MINE_LABELS.MOBILE}
            <MineHeaderLabels>
              {userName || COMMON_LABELS.UNDEFINED}
            </MineHeaderLabels>
            {MINE_LABELS.ID}
            <MineHeaderLabels>
              {userId || COMMON_LABELS.UNDEFINED}
            </MineHeaderLabels>
          </div>
        </div>
        <div
          className="col-2 align-self-start cursor-pointer"
          onClick={openModal}
        >
          <IconComponent
            iconType={Icons.infoIcon}
            height="24px"
            width="24px"
            minwidth="24px"
          />
        </div>
        <div className="col-12 pt-3">
          <ChangePasswordBtn onClick={openPassword}>
            Change Password
          </ChangePasswordBtn>
        </div>
      </OverlayWrapper>
    </StickyWrapper>
  );
};
