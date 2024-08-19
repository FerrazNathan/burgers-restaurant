import styled from 'styled-components';

export const ContainerSocialMedia = styled.section`
  padding: 0 1rem 2rem 1rem; 

  & h2 {
    text-align:center;
    margin: 0 0 1rem 0;
  }

  @media (max-width: 768px){
   margin-bottom: 4rem;
  }
`;
export const SocialMediaList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0;
  flex-wrap: wrap;
`;

export const SocialMediaItem = styled.li`
  list-style: none;
  padding: 1rem;
  border-radius: ${(props) => props.theme.border.radius.sm};
  box-shadow: ${(props) => props.theme.boxShadow.shadow};
`;

export const SocialMediaLink = styled.a`
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