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
      background: ${(props) => props.theme.colors.background.standard};

      & svg {
        & path {
          fill: ${(props) => props.theme.colors.base.standard};
        }
      }
    }

    & .select__placeholder {
      color: ${(props) => props.theme.colors.base.standard};
    }

    & .select__menu {
      background: ${(props) => props.theme.colors.background.standard};
      box-shadow: ${(props) => props.theme.boxShadow.shadow};
      border-radius: ${(props) => props.theme.border.radius.md};
    }

    & .select__option {
      color: ${(props) => props.theme.colors.base.standard};
    }

    & .select__option--is-focused {
      background: ${(props) => props.theme.colors.background.light};
    }

    & .select__option--is-selected {
      background: ${(props) => props.theme.colors.background.light};
    }

    & .select__single-value {
      color: ${(props) => props.theme.colors.base.standard};
    }

    & .select__input {
      color: ${(props) => props.theme.colors.base.standard};
    }

    & .select__input-container {
      color: ${(props) => props.theme.colors.base.standard};
    }
`