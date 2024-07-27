import styled from 'styled-components';

export const ContainerCart = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: stretch;
  width: 100%;

  & span {
    font-size: 1.125rem;
    font-weight: bold;
  }

  & h2 {
    text-align: center;
    margin: 0 auto;
  }
`;

export const ContainerMessageLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`

export const ProductsList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const ProductsListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  & span {
    width: 100%;
    
    &:first-child {
      text-align: left;
      max-width: 200px;
    }

    &:nth-child(3) {
      text-align: end;
      max-width: 100px;
    }
  }
`

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 75px;
`

export const ButtonRemove = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`

export const ContainerFinally = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;

  & button {
    background: #4F372F;
    color: #fff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;

    &:hover {
      transition: 0.3s;
      background: #71493c;
    }
  }
`

export const SuccessMessage = styled.div`

`;