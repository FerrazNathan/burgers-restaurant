import styled from "styled-components";

export const ContainerGeneral = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
`

export const ContainerImage = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  & img {
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }

  @media(max-width: 768px) {
    justify-content: center;

    & img {
      width: 60px;
      height: 60px;
    }
  }
`

export const ContainerCategories = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }

  & button {
    width: 100px;
    position: relative;
    background: transparent;
    border: none;

    &:hover, &:focus, &:active {
      cursor: pointer;

      &:after {
        content: '';
        position: absolute;
        bottom: -1rem;
        width: 100px;
        height: 2px;
        left: 0;
        background: #4F372F;
        transition: width 0.5s ease;
      }
    }

    @media (max-width: 768px) {
      width: 60px;

      &:hover, &:focus, &:active {
      cursor: pointer;

      &:after {
        content: '';
        position: absolute;
        bottom: -1rem;
        width: 60px;
        height: 2px;
        left: 0;
        background: #4F372F;
        transition: width 0.5s ease;
      }
    }
    }
  }

`

export const ContainerListMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  & .MuiAccordion-gutters {
    border-radius: 1rem !important;
    box-shadow: 1px 1px 5px 2px rgba(29, 29, 29, 0.24);

    &::before, &::after {
      display: none !important;
    }
  }
`

export const ContainerAccordionDetails = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

export const ContainerTitleDescriptionAndPrice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const ContainerImageAccordionDetails = styled.figure`
  & span {
    width: 128px !important;

    @media (max-width: 768px) {
      width: 220px !important;
    }
  }

  & img {
    object-fit: cover;
    object-position: center;
  }
`

export const ContainerModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  & h6 {
    text-align: center;
  }

  & img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`

export const ContainerModalQuantity = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  & button {
    background: transparent;
    border: none;  
    cursor: pointer;    
  }

  & span {
    font-size: 1.5rem;
    font-weight: bold;
  }
`

export const ButtonAddTocart = styled.button`
  background: #4F372F;
  color: #fff;
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: background 0.5s ease;
  width: 50%;
  margin: 0 auto;

  &:hover {
    background: #5E4537;
  }
`