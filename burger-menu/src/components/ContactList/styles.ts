import styled from 'styled-components';

export const ContainerContactList = styled.section`
  padding: 2rem 1rem;

  & h2 {
    text-align:center;
    margin: 0 0 1rem 0;
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
  box-shadow: 1px 1px 5px 2px rgba(29, 29, 29, 0.24);
  padding: 1rem;
  border-radius: 0.5rem;
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
  }  
`