import styled from 'styled-components';

export const ContainerContactList = styled.section`
  padding: 2rem 1rem;

  & h2 {
    text-align:center;
    margin: 0 0 1rem 0;
    color: ${(props) => props.theme.colors.text.standard};
  }

  @media (max-width: 768px){
    padding: 1rem;
  }
`;

export const ContactListList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0;
  flex-wrap: wrap;
`;

export const ContactListItem = styled.li`
  list-style: none;
  box-shadow: ${(props) => props.theme.boxShadow.shadow};
  padding: 1rem;
  border-radius: ${(props) => props.theme.border.radius.sm};
`;

export const ContactListLink = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 140px;
  gap: 1rem;

  & p {
    margin: 0;
    color: ${(props) => props.theme.colors.base.standard};
  }  

  & svg {
    & path {
      fill: ${(props) => props.theme.colors.base.standard};
      stroke: ${(props) => props.theme.colors.base.standard};
    }
  }
`