import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  cursor: pointer;
  user-select: none;
  text-align: center;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 5px;
  background: linear-gradient(-180deg, #f72424 0%, #bb1c00 100%);
  color: #fff;
  border-color: linear-gradient(-180deg, #f72424 0%, #bb1c00 100%);
  padding: 6px;
`;

const ButtonComponent = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export { ButtonComponent };
