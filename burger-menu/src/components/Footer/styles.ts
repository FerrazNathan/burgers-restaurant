import styled from 'styled-components';

export const ContainerFooter = styled.footer`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.colors.primary.standard};
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

export const CopyrightText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text.light};
  text-align: center;
  padding: 0.5rem 1rem;
  margin: 0;
`

