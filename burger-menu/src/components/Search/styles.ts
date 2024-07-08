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
      border-radius: 1rem;
      cursor: pointer;
      box-shadow: 1px 1px 5px 2px rgba(29, 29, 29, 0.24);
    }
  }
`