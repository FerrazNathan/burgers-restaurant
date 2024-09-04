import styled, { css } from 'styled-components';

interface HeaderSwitchProps {
  contrast: boolean
}

interface HeaderSwitchSliderProps {
  contrast: boolean
  active: boolean
  onClick: () => void
}

export const SwitchMainComponent = styled.nav<HeaderSwitchProps>`
  ${() => css`
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
  `}
`;

export const SwitchComponent = styled.ul`
  ${() => css`
    display: flex;
    padding: 0;
    margin: 0;
    align-items: center;
    list-style: none;
  `}
`;

export const SwitchItemsComponent = styled.li`
  display: flex;
  align-items: center;
`;

export const SwitchSliderWrapper = styled.li<HeaderSwitchProps>`
  ${() => css`
    display: flex;
    align-items: center;
    & > button {
      background-color: transparent;
      border: none;
      padding: 0;
      & > div {
        @media (min-width: 992px) {
          cursor: pointer;
        }
      }
    }
  `}
`;

export const SwitchSlider = styled.button<HeaderSwitchSliderProps>`
  ${({
    active, contrast,
  }) => css`
    transition: 0.3s;
    display: flex;
    align-items: center;
    padding: 0;
    width: 44px;
    border-radius: 2rem;
    cursor: pointer;
    color: #ccc;
    margin: 0 5px;
    position: relative;

    &::before{
      position: absolute;
      content: '';
      display: flex;
      width: 40px;
      height: 16px;
      border-radius: 28px;
      background: ${(props) => props.theme.colors.text.medium};

    }

    &::after {
      transform: ${active ? 'translateX(20px)' : 'translateX(0)'};
      transition: 0.3s;
      content: '';
      display: flex;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: ${(props) => contrast ? props.theme.colors.base.standard : active ? props.theme.colors.status.alert : props.theme.colors.text.light};
      box-shadow: ${(props) => props.theme.boxShadow.shadow};
    }

  `}
`;
