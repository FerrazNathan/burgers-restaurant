import styled from "styled-components";

export const ContainerGeneral = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
`

export const ContainerImageCategory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

export const ContainerImage = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  flex-wrap: wrap;

  & img {
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }

  & button {
    width: 100%;
    max-width: 100px;
    position: relative;
    background: transparent;
    border: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
    cursor: pointer;
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
    width: 100%;
    max-width: 100px;
    position: relative;
    background: transparent;
    border: none;

    &:hover, &:focus, &:active {
      cursor: pointer;
    }

    @media (max-width: 768px) {
      // width: 60px;

      &:hover, &:focus, &:active {
      cursor: pointer;
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

    @media (max-width: 768px) {
      width: 230px;
      height: 120px;  
    }
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