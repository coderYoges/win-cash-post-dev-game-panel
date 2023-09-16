import React from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import { useHistory } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IconComponent, Icons } from "../../components/elements/icon/Icon";
import { RouteConfig } from "../../config/routeConfig";
import Footer from "../../components/common/Footer/Footer.js";
const banner1 = require("../../assets/banners/banner1.jpg");
const banner2 = require("../../assets/banners/banner2.jpg");
const banner3 = require("../../assets/banners/banner3.jpg");
const banner4 = require("../../assets/banners/banner4.jpg");
const banner5 = require("../../assets/banners/banner5.jpg");

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

const ImageWrapper = styled(LazyLoadImage)`
  color: #d0d0d0;
  height: 100%;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`;

const carosuelPlaceholder = require("../../assets/images/carosuel_placeholder.jpg");

const CarouselImages = [
  { img: banner1, route: null, enabled: true },
  { img: banner2, route: null, enabled: true },
  { img: banner3, route: null, enabled: true },
  { img: banner4, route: null, enabled: true },
  { img: banner5, route: null, enabled: true },
];

export const HomeContainer = () => {
  const history = useHistory();
  const onClickCarouselItem = () => {};
  return (
    <BodyWrapper className="fs-md fw-600">
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
           key={"image-carousel-" + idx}
           onClick={() => route && enabled && history.push(route)}
           className={`${enabled ? "" : "half-opacity no-events"}`}
           style={{
             height: "200px",        
             overflow: "hidden",     
           }}
         >
           <LazyLoadImage
             src={img}
             alt={"image-" + idx}
             className="d-flex br-md"
             effect="blur"
             placeholderSrc={carosuelPlaceholder}
             style={{
               objectFit: "cover",   
               width: "100%",        
               height: "200px",     
             }}
           />
         </div>
       ))}
     </Carousel>

      <div className="d-flex my-1 mx-2 px-1">
        <IconComponent
          height="40px"
          width="60px"
          maxwidth="60px"
          iconType={Icons.joystick}
          className="align-middle"
        />
        <span className=" d-flex align-self-center pt-1">Original ranger</span>
      </div>
      {CarouselImages.map((item, idx) => (
        <div
          className="d-flex mx-2 my-3 px-2 cursor-pointer"
          key={"image-" + idx}
        >
          <ImageWrapper
            src={item.img}
            alt={"image-" + idx}
            className={`d-flex br-mds ${
              !item.enabled ? "half-opacity" : ""
            } rounded`}
            loading="lazy"
            effect="blur"
            placeholderSrc={carosuelPlaceholder}
            onClick={() => item.route && history.push(item.route)}
          />
        </div>
      ))}
      <Footer />
      <div style={{"height": "60px"}}></div>
    </BodyWrapper>
  );
};
