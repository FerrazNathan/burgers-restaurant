import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.svg`
  animation: ${rotate} 1.4s linear infinite;
  width: 48px;
  height: 48px;
  position: relative;

  .spinnerStop {
    stop-color: blue;
  }

  .path {
    stroke-dasharray: 170;
    stroke-dashoffset: 20;
    stroke-width: 4px;
  }
`;

export const Circle = styled.circle`
  stroke-width: 4px;
`;