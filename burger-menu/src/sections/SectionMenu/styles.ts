import styled from 'styled-components';

interface ThemeButtonProps {
  contrast: boolean;
}

export const SectionMenu = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin: 0 auto;
`;

export const ButtonRedirect = styled.button<ThemeButtonProps>`
  margin 0 auto;
  max-width: 220px;
  text-align: center;
  border: none;
  font-weight: 600;
  background: ${(props) => props.contrast ? props.theme.colors.base.standard : props.theme.colors.primary.light};
  color: ${(props) => props.contrast ? props.theme.colors.background.standard : props.theme.colors.text.light};
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 700;

  &:hover {
    background: ${(props) => props.contrast ? props.theme.colors.status.alertHover : props.theme.colors.primary.standard};
  }
`

export const ContainerMenu = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 4rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    margin-bottom: 6rem;
    gap: 1rem;
  }
`;

export const ContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;