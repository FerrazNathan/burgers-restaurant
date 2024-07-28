import styled from 'styled-components';

export const SectionMenu = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin: 0 auto;
`;

export const ButtonRedirect = styled.button`
  margin 0 auto;
  max-width: 220px;
  text-align: center;
  border: none;
  background: #4F372F;
  color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 700;

  &:hover {
    background: #63453b;
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