import styled, { css } from 'styled-components';

interface IContainerHeaderProps {
  isActive: boolean;
}

interface ConatainerCartProps {
  isLoading: boolean;
  pageCart?: boolean;
}

interface ILinkMenuHeaderProps {
  showIconCart?: boolean;
}

export const ContainerHeader = styled.header`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: #4F372F;

  @media (max-width: 768px) {
    & span {
      height: 100px !important;
    }
  }

  & img {
    width: 100%;
    max-width: 1440px;
    object-fit: cover;
    object-position: center;  
  }
`;

export const ListMenuHeader = styled.ul<ILinkMenuHeaderProps>`
  ${({ showIconCart }) => css`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    font-size: 1.25rem;
    font-weight: 400;
    color: #FFF;
    font-family: 'Roboto', sans-serif;
    padding: 0;
    margin: 0.75rem auto;

    @media (max-width: 768px) {
      margin: 0.5rem auto;
    }

    ${showIconCart && css`
      @media (max-width: 400px) {
        margin: 0.8rem auto;
        margin-left: 0;
        font-size: 1rem;
      }
    `}    
  `}
`;

export const ItemMenuHeader = styled.li`
  list-style: none;
  width: 232px;  
  position: relative;
  text-align: center;

  @media (max-width: 768px) {
    width: 80px;  
  }
`

export const LinkMenuHeader = styled.a<IContainerHeaderProps>`
  ${({ isActive }) => css`
    width: 232px;
    position: relative;

    &:hover, &:focus, &:active {
      cursor: pointer;

      &:after {
        content: '';
        position: absolute;
        bottom: -12px;
        width: 150px;
        height: 2px;
        background: #FFF;
        left: -45px;
        transition: width 0.5s ease;
      }
    }

    ${isActive && css`
      &:after {
        content: '';
        position: absolute;
        bottom: -12px;
        width: 150px;
        height: 2px;
        background: #FFF;
        left: -45px;
        transition: width 0.5s ease;
      }
    `}

    @media(max-width: 768px) {
      width: 150px;

      &:hover, &:focus, &:active {
        cursor: pointer;

        &:after {
          display: none;
        }
      }

      ${isActive && css`
        &:after {
          display: none;
        }
      `}
    }
  `}
`

export const ContainerCart = styled.div<ConatainerCartProps>`
  ${({ isLoading, pageCart }) => css`
    position: absolute;
    top: 0.7rem;
    right: 1rem;
    display: flex;
    cursor: ${pageCart ? 'not-allowed' : 'pointer'};

    ${!isLoading && css`
      & span {
        border-radius: 50%;
        background: #ef0519;
        padding: 4px;
        width: 50%;
        color: #FFF;
        text-align: center;
        position: absolute;
        right: 0;
        top: -7px;
        font-size: 12px;
        font-weight: 700;

        @media (max-width: 768px) {
          border-radius: 50%;
          background: #ef0519;
          padding: 4px;
          color: #FFF;
          text-align: center;
          position: absolute;
          right: -5px;
          top: -7px;
          font-size: 12px;
          font-weight: 700;
          width: 25px !important;
          height: 25px !important;
        }
      }
    `}

    & svg {
      width: 50px;
      height: 30px;

      & circle {
        stroke: #FFF;
      }
    }
    
  `}
`