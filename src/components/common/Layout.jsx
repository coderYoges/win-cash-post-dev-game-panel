import React from "react";
import styled from "styled-components";
const backgroundImg = require("../../assets/images/background.jpg");

const LayoutContainer = styled.div`
  display: block;
  height: 100vh;
  width: 100vw;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

const LayoutRow = styled.div`
  place-content: center;
  justify-content: center;
`;

const LayoutColumn = styled.div`
  background-color: #fff;
  text-align: center;
  position: fixed;
  overflow: hidden;
`;

const LayoutPage = (props) => {
  return (
    <LayoutContainer>
      <section className="container-fluid px-3">
        <LayoutRow className="row d-flex px-3">
          <LayoutColumn className="col-md-6 h-100 px-0">
            {props.children}
          </LayoutColumn>
        </LayoutRow>
      </section>
    </LayoutContainer>
  );
};

export const Layout = LayoutPage;
