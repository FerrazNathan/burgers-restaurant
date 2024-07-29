import styled, { css } from 'styled-components';

export const ContainerSection = styled.section`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: relative;

  & svg {
    position: relative;
    margin-top: 10%;
  }
`

export const ContainerComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  margin-bottom: 2rem;

  & h2 {
    text-align: center;
    margin: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

export const ContainerCards = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  gap: 1rem;
`;


export const Card = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 320px;
  cursor: pointer;
  box-shadow: 1px 1px 5px 2px rgba(29, 29, 29, 0.24);

  & img {
    border-radius: 0.5rem;
    object-fit: cover;
    object-position: center;
  }
`;

export const ContainerModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  & h6, h3 {
    text-align: center;
  }

  & img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  & label {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    & span {
      margin-bottom: 0.3rem;
      font-weight: bold;
      text-align: left;
    }

    & input, textarea {
      box-sizing: border-box;
      border: none;
      border-radius: 0.5rem;
      box-shadow: 1px 1px 5px 2px rgba(29, 29, 29, 0.24);
      padding: 1rem;
      background: transparent;

      &::placeholder {
        color: #AAA;
      }

      &:focus, active {
        outline: none;
      }
    }
  }
`

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`

export const ButtonBase = () => css`
  padding: 0.8rem;
  border-radius: 0.3rem;
  width: 100%;
  max-width: 200px;
  border: none;
  color: #FFF;
  cursor: pointer;
  text-transform: uppercase;
  transition: ease 0.3s;
`

export const ButtonCreate = styled.button`
  ${() => css`
    ${ButtonBase}
    background: #4F372F;

    &:hover {
      background: #5E4537;
    }
  `}
`

export const ButtonAdd = styled.button`
  ${() => css`
    ${ButtonBase}
    background: #0056b3;

    &:hover {
      background: #007bff;
    }
  `}
`

export const ButtonDelete = styled.button`
  ${() => css`
    ${ButtonBase}
    background: #b50211;

    &:hover {
      background: #ef0519;
    }
  `}
`
