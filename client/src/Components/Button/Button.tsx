import React from "react";
import { styled } from "styled-components";
import Loader from "../Loader";

type ButtonProps = {
  children: any;
  loading?: boolean;
  onClick?: () => void;
  variant: "contained" | "outlined" | "text" | "icon-button";
  size: "sm" | "md" | "lg";
  type: "primary" | "secondary";
  fullWidth?: boolean;
  disabled?: boolean;
};

const sizes = {
  sm: {
    padding: "4px 12px",
    fontSize: "12px",
    borderRadius: "4px",
  },
  md: {
    padding: "12px 16px",
    fontSize: "12px",
    borderRadius: "4px",
  },
  lg: {
    padding: "16px 24px",
    fontSize: "12px",
    borderRadius: "6px",
  },
};

const variants = {
  primary: {
    background: "#cbcbcb",
    contrast: "#f00",
  },
  secondary: {
    border: "#cbcbcb",
    contrast: "#f00",
  },
};

const ContainedButton = styled.button<any>`
    padding: ${(props) => props.padding};
    width: ${(props) => (props?.fullWidth ? "100%" : null)}
    font-size: ${(props) => props.fontSize};
    background: ${(props) => props.theme.colors[props.type]}
    color: white;
    border-radius: ${(props) => props.borderRadius}
`;

const OutlinedButton = styled.button<any>`
    padding: ${(props) => props.padding};
    width: ${(props) => (props?.fullWidth ? "100%" : null)}
    font-size: ${(props) => props.fontSize};
    border: 2px solid ${(props) => props.theme.colors[props.type]}
    color: white;
    border-radius: ${(props) => props.borderRadius}
`;

const Button: React.FC<ButtonProps> = ({
  variant,
  type,
  size,
  onClick,
  loading,
  children,
}) => {
  if (variant === "contained") {
    return (
      <ContainedButton {...sizes[size]} type={type} onClick={onClick}>
        {loading ? <Loader size={size} variant="primary" /> : null}
        {children}
      </ContainedButton>
    );
  }

  if (variant === "outlined") {
    return (
      <OutlinedButton {...sizes[size]} type={type} onClick={onClick}>
        {loading ? <Loader size={size} variant="primary" /> : null}
        {children}
      </OutlinedButton>
    );
  }

  if (variant === "icon-button") {
    return (
      <ContainedButton {...sizes[size]} type={type} onClick={onClick}>
        {loading ? <Loader size={size} variant="primary" /> : null}
        {children}
      </ContainedButton>
    );
  }

  return null;
};

export default Button;
