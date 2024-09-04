import styled, { css } from 'styled-components';

interface ThemeContrastProps {
  contrast: boolean;
}

export const ContainerSection = styled.section`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: relative;
  color: ${(props) => props.theme.colors.text.standard};

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
  border-radius: ${(props) => props.theme.border.radius.sm};
  width: 100%;
  max-width: 320px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: ${(props) => props.theme.boxShadow.shadow};

  & img {
    border-radius: ${(props) => props.theme.border.radius.sm};
    object-fit: cover;
    object-position: center;
  }

  & h3 {
    max-width: 280px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
  }
`;

export const ContainerModal = styled.div<ThemeContrastProps>`
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

    & input, textarea, select {
      box-sizing: border-box;
      border: none;
      color: ${(props) => props.theme.colors.text.standard};
      border-radius: ${(props) => props.theme.border.radius.sm};
      box-shadow: ${(props) => props.theme.boxShadow.shadow};;
      padding: 1rem;
      background: transparent;

      &::placeholder {
        color: ${(props) => props.theme.colors.text.medium};
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
  border-radius: ${(props) => props.theme.border.radius.sm};
  width: 100%;
  font-weight: 600;
  max-width: 200px;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  transition: ease 0.5s;
`

export const ButtonCreate = styled.button<ThemeContrastProps>`
  ${({ contrast }) => css`
    ${ButtonBase}
    color: ${(props) => contrast ? props.theme.colors.background.standard : props.theme.colors.text.light};
    background: ${(props) => contrast ? props.theme.colors.base.standard : props.theme.colors.primary.light};

    &:hover {
      background: ${(props) => contrast ? props.theme.colors.status.alertHover : props.theme.colors.primary.standard};
    }
  `}
`

export const ButtonAdd = styled.button<ThemeContrastProps>`
  ${({ contrast }) => css`
    ${ButtonBase}
    color: ${(props) => contrast ? props.theme.colors.background.standard : props.theme.colors.text.light};
    background: ${(props) => contrast ? props.theme.colors.base.standard : props.theme.colors.status.alert};

    &:hover {
      background: ${(props) => contrast ? props.theme.colors.status.alertHover : props.theme.colors.status.alertHover};
    }
  `}
`

export const ButtonDelete = styled.button<ThemeContrastProps>`
  ${({ contrast }) => css`
    ${ButtonBase}
    color: ${(props) => contrast ? props.theme.colors.background.standard : props.theme.colors.text.light};
    background: ${(props) => contrast ? props.theme.colors.base.standard : props.theme.colors.status.error};

    &:hover {
      background: ${(props) => contrast ? props.theme.colors.status.alertHover : props.theme.colors.status.errorHover};
    }
  `}
`

export const ButtonSeeMore = styled.button<ThemeContrastProps>`
  ${({ contrast }) => css`
    ${ButtonBase}
    color: ${(props) => contrast ? props.theme.colors.background.standard : props.theme.colors.text.light};
    background: ${(props) => contrast ? props.theme.colors.base.standard : props.theme.colors.status.alert};

    &:hover {
      background: ${(props) => props.theme.colors.status.alertHover};
    }
  `}
`
