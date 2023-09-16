import React from "react";
import styled from "styled-components";

const crikbuzz = require("../../../assets/icons/cricbuzz.png");
const joystick = require("../../../assets/icons/joystick.png");
const homeIcon = require("../../../assets/icons/home_page.png");
const gameIcon = require("../../../assets/icons/game_page.png");
const ProfileIcon = require("../../../assets/icons/profile_page.png");
const closeIcon = require("../../../assets/icons/close.png");
const backButton = require("../../../assets/icons/back_button.png");
const mobileIcon = require("../../../assets/icons/cell.png");
const lockIcon = require("../../../assets/icons/lock.png");
const refreshIcon = require("../../../assets/icons/refresh.png");
const goldCoinIcon = require("../../../assets/icons/img_gold.png");
const walletIcon = require("../../../assets/icons/btn_wallet.png");
const avatar = require("../../../assets/icons/avatar.png");
const infoIcon = require("../../../assets/icons/info.png");
const orderIcon = require("../../../assets/icons/orderIcon.png");
const finDetailIcon = require("../../../assets/icons/fdetail.png");
const download = require("../../../assets/icons/down.png");
const followUs = require("../../../assets/icons/telegram.png");
const support = require("../../../assets/icons/support.png");
const complaints = require("../../../assets/icons/comp.png");
const forwardIcon = require("../../../assets/icons/arrowRight.png");



const Icons = {
  crikbuzz: crikbuzz,
  joystick: joystick,
  homePage: homeIcon,
  gamePage: gameIcon,
  profilePage: ProfileIcon,
  close: closeIcon,
  backBtn: backButton,
  mobIcon: mobileIcon,
  lockIcon: lockIcon,
  avatar: avatar,
  refresh: refreshIcon,
  goldCoin: goldCoinIcon,
  wallet: walletIcon,
  infoIcon: infoIcon,
  orderIcon: orderIcon,
  finDetail: finDetailIcon,
  download: download,
  followUs: followUs,
  support: support,
  complaints: complaints,
  forwardIcon: forwardIcon
};

const IconWrapper = styled.span`
  display: inline-flex;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  min-width: ${(props) => props.maxwidth};
  background-image: url(${(props) => props.iconType});
  background-repeat: no-repeat;
  background-position: center;
  -webkit-background-size: ${(props) => (props.autoBg ? "auto" : "contain")};
  -moz-background-size: ${(props) => (props.autoBg ? "auto" : "contain")};
  -o-background-size: ${(props) => (props.autoBg ? "auto" : "contain")};
  background-size: ${(props) => (props.autoBg ? "auto" : "contain")};
  cursor: pointer;
  vertical-align: middle;
  text-align: center;
`;

const IconComponent = (props) => {
  return <IconWrapper {...props} className={props.className} />;
};

export { IconComponent, Icons };
