import styled, { css } from 'styled-components';

interface IContainerHeaderProps {
  isActive: boolean;
}

export const ContainerHeader = styled.header`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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

export const ListMenuHeader = styled.ul`
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