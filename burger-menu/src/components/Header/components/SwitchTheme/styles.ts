import styled from "styled-components";

interface ThemeProps {
  contrast?: boolean;
}

export const ContainerComponent = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;

  border-bottom: 1px solid ${(props) => props.theme.colors.base.light};
  width: 90%;
  margin: 0 auto;
  padding: 0.5rem 0;
`

export const Divider = styled.span`
  color: ${(props) => props.theme.colors.text.light};
`

export const ButtonChangeTheme = styled.button<ThemeProps>`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  & svg {
    & path {
      fill: ${(props) => props.contrast ? props.theme.colors.base.standard : props.theme.colors.text.light};
    }
  }

  @media (max-width: 768px) {
    & svg {
      width: 20px;
      height: 20px;
    }

    &.button-dark-mode svg {        
      width: 16px;
      height: 16px;
    }
  }
`
