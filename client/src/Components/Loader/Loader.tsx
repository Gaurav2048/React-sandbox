import React from "react";
import { styled } from "styled-components";

const LoaderSpan = styled.span<any>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => `${props.thickness} solid ${props.border}`};
  border-bottom-color: ${(props) => props.contrast};
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

type LoaderProps = {
  size: "sm" | "md" | "lg";
  variant: "primary" | "secondary";
};

const sizes = {
  sm: {
    width: "12px",
    height: "12px",
    thickness: "2px",
  },
  md: {
    width: "18px",
    height: "18px",
    thickness: "3px",
  },
  lg: {
    width: "24px",
    height: "24px",
    thickness: "4px",
  },
};

const variants = {
  primary: {
    border: "#cbcbcb",
    contrast: "#f00",
  },
  secondary: {
    border: "#cbcbcb",
    contrast: "#f00",
  },
};

const Loader: React.FC<LoaderProps> = ({ size, variant }) => {
  return <LoaderSpan {...sizes[size]} {...variants[variant]} />;
};

export default Loader;
