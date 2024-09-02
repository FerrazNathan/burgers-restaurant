import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const ComponentLoading = styled.div`
  &.with-description {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    & span {
      color: ${(props) => props.theme.colors.status.alert};
      font-weight: 700;
    }
  }
`

export const Loader = styled.svg`
  animation: ${rotate} 1.4s linear infinite;
  width: 100px;
  height: 100px;
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
  stroke: ${(props) => props.theme.colors.status.alert};
`;