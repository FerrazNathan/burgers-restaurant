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

  & button {
    color: ${(props) => props.theme.colors.base.standard};
  }
`

export const ContainerImage = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  & img {
    border-radius: ${(props) => props.theme.border.radius.ul};
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
    gap: 1rem;

    & img {
      width: 60px;
      height: 60px;
    }
  }

  @media(max-width: 480px) {
    gap: 0.5rem;
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

  & p {
    color: ${(props) => props.theme.colors.text.standard};
  }

  & .MuiAccordion-gutters {
    border-radius: ${(props) => props.theme.border.radius.md} !important;
    box-shadow: ${(props) => props.theme.boxShadow.shadow};

    &::before, &::after {
      display: none !important;
    }
  }

  & .MuiAccordionSummary-root {
    background: ${(props) => props.theme.colors.background.standard};
    border-radius: ${(props) => props.theme.border.radius.md};
    box-shadow: ${(props) => props.theme.boxShadow.shadow};
  }

  & .MuiSvgIcon-root {
    color: ${(props) => props.theme.colors.base.standard};
  }

  & .MuiCollapse-root {
    background: ${(props) => props.theme.colors.background.standard};
    border-radius: ${(props) => props.theme.border.radius.md};
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
  color: ${(props) => props.theme.colors.text.standard};

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
  background: ${(props) => props.theme.colors.primary.light};
  color: ${(props) => props.theme.colors.text.light};
  padding: 1rem;
  border: none;
  border-radius: ${(props) => props.theme.border.radius.md};
  cursor: pointer;
  transition: background 0.5s ease;
  width: 50%;
  margin: 0 auto;

  &:hover {
    background: ${(props) => props.theme.colors.primary.standard};
  }
`