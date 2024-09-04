import styled, { css } from 'styled-components';

interface IContainerHeaderProps {
  activePage: boolean;
  contrast?: boolean;
}

interface ConatainerCartProps {
  isLoading: boolean;
  pageCart?: boolean;
  contrast?: boolean;
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
  background: ${(props) => props.theme.colors.primary.standard};

  & img {
    width: 100%;
    object-fit: cover;
    object-position: center;  
  }
`;

export const ListMenuHeader = styled.ul<ILinkMenuHeaderProps>`
  ${({ showIconCart }) => css`
    display: flex;
    justify-content: space-evenly;
    gap: 1rem;
    font-size: 1.25rem;
    font-weight: 400;
    color: ${(props) => props.theme.colors.text.light};
    font-family: 'Roboto', sans-serif;
    align-items: center;
    max-width: 1440px;
    width: 100%;
    margin: 0;
    padding: 0.7rem 1rem;

    @media (max-width: 480px) {
      font-size: 1rem;
    }

    ${showIconCart && css`
      @media (max-width: 400px) {
        margin: 0;
        font-size: 1rem;
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
  ${({ activePage, contrast }) => css`
    width: 232px;
    position: relative;
    color: ${(props) => contrast ? props.theme.colors.base.standard : props.theme.colors.text.light};

    &:hover, &:focus, &:active {
      cursor: pointer;

      &:after {
        content: '';
        position: absolute;
        bottom: -12px;
        width: 150px;
        height: 2px;
        background: ${(props) => contrast ? props.theme.colors.base.standard : props.theme.colors.text.light};
        left: -45px;
        transition: width 0.5s ease;
      }
    }

    ${activePage && css`
      &:after {
        content: '';
        position: absolute;
        bottom: -12px;
        width: 150px;
        height: 2px;
        background: ${(props) => contrast ? props.theme.colors.base.standard : props.theme.colors.text.light};
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

      ${activePage && css`
        &:after {
          display: none;
        }
      `}
    }
  `}
`

export const ContainerCart = styled.div<ConatainerCartProps>`
  ${({ isLoading, pageCart, contrast }) => css`
    display: flex;
    position: relative;
    cursor: ${pageCart ? 'not-allowed' : 'pointer'};

    ${!isLoading && css`
      & span {
        border-radius: 50%;
        background: ${(props) => props.theme.colors.status.error};
        padding: 4px;
        width: 50%;
        color: ${(props) => contrast ? props.theme.colors.background.standard : props.theme.colors.text.light};
        text-align: center;
        position: absolute;
        right: 0;
        top: -7px;
        font-size: 12px;
        font-weight: 700;

        @media (max-width: 768px) {
          border-radius: 50%;
          background: ${(props) => props.theme.colors.status.error};;
          padding: 4px;
          color: ${(props) => contrast ? props.theme.colors.background.standard : props.theme.colors.text.light};
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
        stroke: ${(props) => props.theme.colors.text.light};
      }
    }
    
  `}
`