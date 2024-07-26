import styled from 'styled-components';

export const ContainerMenu = styled.div`
  padding: 1rem;
  display: flex;
  gap: 2rem;
  margin-bottom: 4rem;

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
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 1px 1px 5px 2px rgba(29, 29, 29, 0.24);
`;

export const ContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 1px 1px 5px 2px rgba(29, 29, 29, 0.24);

  @media (max-width: 768px) {
    width: 100%;
  }
`;