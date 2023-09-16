import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { WIN_CASH_ENDPOINTS } from "../../config/endPoints";
import { COMMON_LABELS } from "../../config/constants";
import { RouteConfig } from "../../config/routeConfig";
import { postRequest } from "../../api/postRequest";
import Footer from "../../components/common/Footer/Footer.js";

import { Carousel } from "react-responsive-carousel";

const andarBahar = require("../../assets/game-page/AnB.jpg");
const dragonTigerGame = require("../../assets/game-page/dragon-tiger-game.png");
const luckySevensGame = require("../../assets/game-page/lucky-sevens.jpg");
const jetx = require("../../assets/game-page/jetx.png");
const ludo = require("../../assets/game-page/ludo.png");
const gameImgPH = require("../../assets/game-page/game-page-ph.png");
const wheelocity = require("../../assets/game-page/wheel.png");
const baccarat = require("../../assets/game-page/baccarat.jpg");
const blackJack = require("../../assets/game-page/black-jack.jpeg");

const carosuelPlaceholder = require("../../assets/images/carosuel_placeholder.jpg");
const banner1 = require("../../assets/banners/banner1.jpg");

const BodyWrapper = styled.div`
  margin: 0;
  width: 100%;
  height: calc(100vh - 128px);
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  color: rgb(93, 152, 192);
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
  }
`;

const BalanceWrapper = styled.div`
  background-color: #fff;
  text-align: left;
  height: 108px;
  color: rgb(102, 102, 102);
`;

const BalanceBody = styled.div`
  display: flex;
  color: #383b45;
  white-space: nowrap;
  text-align: left;
  align-items: center;
`;

const BalanceID = styled.div`
  color: #979797;
`;

const GameImgWrapper = styled.div`
  padding: 0;
  margin-top: 10px;
  background-size: cover;
  cursor: pointer;
  transition: transform 0.1s;
  box-shadow: 0 0 4px #d0d0d0;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 15px;
  height: 180px;
  width: 100%;
`;

const GameImg = styled(LazyLoadImage)`
  color: #d0d0d0;
  height: 100%;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  object-fit: cover;
  fit: cover;
`;

const onClickCarouselItem = () => {};
const CarouselImages = [
  { img: banner1, route: RouteConfig.luckySeven, enabled: true },
  { img: banner1, route: RouteConfig.luckySeven, enabled: true },
];

export const GameContainer = ({
  walletBalance,
  userId,
  setWalletBalance,
  userName,
}) => {
  const [walletSpinner, setWalletSpinner] = useState(false);
  const history = useHistory();
  const onClickSpinner = () => {
    setWalletSpinner(true);

    postRequest(WIN_CASH_ENDPOINTS.BALANCE, { userName: userName })
      .then((res) => setWalletBalance(res.data))
      .catch(() => {})
      .finally(() => setWalletSpinner(false));
  };
  const onClickAndarBahar = () => history.push(RouteConfig.andarBahar);
  return (
    <Fragment>
      <BodyWrapper>
        {walletBalance && (
          <BalanceWrapper className="row m-0 px-2 pt-2">
            <div className="col-6 mx-2 ">
              <div className="mt-2 fs-lg fw-500">{COMMON_LABELS.BALANCE}</div>
              <BalanceBody className=" d-flex fs-md fw-600">
                ₹<span className="fs-xl fw-700">{walletBalance}</span>
                <i
                  onClick={onClickSpinner}
                  className={`px-2 fa fa-refresh fs-xl cursor-pointer ${
                    walletSpinner ? "fa-spin" : ""
                  }`}
                />
              </BalanceBody>
              <BalanceID className="fs-md fw-400">
                {COMMON_LABELS.ID}
                {userId}
              </BalanceID>
            </div>
          </BalanceWrapper>
        )}

        <div className="d-flex px-1">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            showIndicators={false}
            autoPlay
            interval={4000}
            className="mx-2 my-3 px-2 cursor-pointer"
            onClickCarouselItem={onClickCarouselItem}
            showArrows={false}
          >
            {CarouselImages.map(({ img, route, enabled }, idx) => (
              <div
                key={"image-carosuel-" + idx}
                onClick={() => route && enabled && history.push(route)}
                className={`${enabled ? "" : "half-opacity no-events"}`}
              >
                <LazyLoadImage
                  src={img}
                  alt={"image-" + idx}
                  className="d-flex br-md"
                  effect="blur"
                  placeholderSrc={carosuelPlaceholder}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="row px-1 m-0 mb-3">
          <div className="col-6 px-2 d-flex">
            <GameImgWrapper>
              <GameImg
                src={andarBahar}
                alt={"andar-bahar"}
                className="d-flex"
                effect="blur"
                style={{ height: "180px", fit: "cover" }}
                placeholderSrc={gameImgPH}
                onClick={onClickAndarBahar}
              />
            </GameImgWrapper>
          </div>
          <div className="col-6 px-2 d-flex">
            <GameImgWrapper>
              <GameImg
                src={dragonTigerGame}
                alt={"wheel-o-city"}
                style={{ height: "180px", fit: "cover" }}
                className="d-flex"
                effect="blur"
                placeholderSrc={gameImgPH}
                onClick={() => history.push(RouteConfig.dragonTiger)}
              />
            </GameImgWrapper>
          </div>
          <div className="col-6 px-2 d-flex">
            <GameImgWrapper>
              <GameImg
                src={luckySevensGame}
                alt={"mine-sweeper"}
                className="d-flex"
                style={{ height: "180px", fit: "cover" }}
                effect="blur"
                placeholderSrc={gameImgPH}
                onClick={() => history.push(RouteConfig.luckySeven)}
              />
            </GameImgWrapper>
          </div>
          <div className="col-6 px-2 d-flex">
            <GameImgWrapper>
              <GameImg
                src={jetx}
                alt={"jetx"}
                className="d-flex"
                style={{ height: "180px", backgroundSize: "cover" }}
                effect="blur"
                placeholderSrc={gameImgPH}
              />
            </GameImgWrapper>
          </div>
          <div className="col-6 px-2 d-flex">
            <GameImgWrapper>
              <GameImg
                src={ludo}
                alt={"ludo"}
                style={{
                  height: "180px",
                  backgroundSize: "cover",
                  padding: "0px",
                }}
                className="d-flex"
                effect="blur"
                placeholderSrc={gameImgPH}
              />
            </GameImgWrapper>
          </div>
          <div className="col-6 px-2 d-flex">
            <GameImgWrapper>
              <GameImg
                src={wheelocity}
                alt={"wheel-o-city"}
                style={{ height: "180px", backgroundSize: "cover" }}
                className="d-flex"
                effect="blur"
                placeholderSrc={gameImgPH}
              />
            </GameImgWrapper>
          </div>
          <div className="col-6 px-2 d-flex">
            <GameImgWrapper>
              <GameImg
                src={baccarat}
                alt={"wheel-o-city"}
                style={{ height: "180px", backgroundSize: "cover" }}
                className="d-flex"
                effect="blur"
                placeholderSrc={gameImgPH}
              />
            </GameImgWrapper>
          </div>
          <div className="col-6 px-2 d-flex">
            <GameImgWrapper>
              <GameImg
                src={blackJack}
                alt={"black-jack"}
                style={{
                  height: "180px",
                  backgroundSize: "cover",
                  width: "180px",
                }}
                className="d-flex"
                effect="blur"
                placeholderSrc={gameImgPH}
              />
            </GameImgWrapper>
          </div>
        </div>
        <div style={{ height: "50px" }} />
      </BodyWrapper>
    </Fragment>
  );
};
