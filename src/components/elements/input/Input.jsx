import React from "react";
import styled from "styled-components";

const InputType = {
  telephone: "tel",
  password: "password"
};

const BorderType = {
  noBorder: "none",
};

const StyledInput = styled.input`
  display: inline-block;
  border: ${(props) => props.borderType};
  background: none;
  font-size: 18px;
  transition: 0.1s;
  height: fit-content;
  padding: 10px;
  font-weight: 400;
  -webkit-user-select: none;
  user-select: none;
  outline: ${(props) => props.borderType};
  width: 75%;
`;

const eventRestrict = (e) => e.preventDefault();

const InputComponent = (props) => {
  return (
    <StyledInput
      type={props.inputType}
      maxLength={props.maxLength}
      placeholder={props.placeholder}
      autoComplete="off"
      autoCorrect="false"
      onPaste={eventRestrict}
      onCopy={eventRestrict}
      {...props}
    />
  );
};

export { InputComponent, InputType, BorderType };
