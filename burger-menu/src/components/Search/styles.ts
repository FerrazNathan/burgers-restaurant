import styled from "styled-components";

export const ContainerSearch = styled.div`
  cursor: pointer;

  & .select {
    & .select__indicators {
      padding: 0 1rem;
    }
    
    & .select__value-container {
      padding: 0.5rem 1rem;
    }

    & .select__control {
      border-radius: ${(props) => props.theme.border.radius.md};
      cursor: pointer;
      box-shadow: ${(props) => props.theme.boxShadow.shadow};
    }
  }
`