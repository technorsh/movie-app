import React from "react";
import { Button } from "reactstrap";
import styled from "styled-components";

const StyledButton = styled(Button)`
  &:hover {
    box-shadow: ${(props) => (props.shadow ? "5px 5px 18px #b0afab" : "none")};
  }
`;

export default function ButtonComponent({
  shadow,
  color,
  size,
  onClickHandler,
  block,
  children,
}) {
  return (
    <StyledButton
      shadow={shadow}
      color={color}
      size={size}
      block={block}
      onClick={onClickHandler}
    >
      {children}
    </StyledButton>
  );
}
