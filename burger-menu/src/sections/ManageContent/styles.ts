import styled from 'styled-components';

export const ContainerComponent = styled.section`
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
  border-radius: 0.5rem;
  width: 100%;
  max-width: 320px;
  cursor: pointer;
  box-shadow: 1px 1px 5px 2px rgba(29, 29, 29, 0.24);

  & img {
    border-radius: 0.5rem;
    object-fit: cover;
    object-position: center;
  }
`;

export const ContainerModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  & h6 {
    text-align: center;
  }

  & img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`
