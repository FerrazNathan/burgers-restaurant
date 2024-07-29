import styled, { css } from 'styled-components';

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
