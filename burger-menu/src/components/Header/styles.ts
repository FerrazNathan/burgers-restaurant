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
    // height: 100%;
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

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0;
    margin: 0.5rem auto;
    gap: 0.5rem;
  }
`;

export const ItemMenuHeader = styled.li`
  list-style: none;
  width: 232px;  
  position: relative;
  text-align: center;
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
        bottom: -23px;
        width: 232px;
        height: 5px;
        background: #FFF;
        left: -85px;
        transition: width 0.5s ease;
      }
    }

    ${isActive && css`
      &:after {
        content: '';
        position: absolute;
        bottom: -23px;
        width: 232px;
        height: 5px;
        background: #FFF;
        left: -85px;
        transition: width 0.5s ease;
      }
    `}

    @media(max-width: 768px) {
      width: 150px;

      &:hover, &:focus, &:active {
        cursor: pointer;

        &:after {
          content: '';
          position: absolute;
          bottom: -10px;
          width: 150px;
          height: 2px;
          background: #FFF;
          left: -50px;
          transition: width 0.5s ease;
        }
      }

      ${isActive && css`
        &:after {
          content: '';
          position: absolute;
          bottom: -10px;
          width: 150px;
          height: 2px;
          background: #FFF;
          left: -50px;
          transition: width 0.5s ease;
        }
      `}
    }
  `}
`