import styled from 'styled-components';

interface ContainerProps {
  disabled?: boolean;
}

export const ContainerCart = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 800px;
  padding: 1rem;
  margin: 1.5rem auto;
  border-radius: 1.5rem;
  overflow: hidden;
  margin-bottom: 4.5rem;
  box-shadow: 1px 1px 5px 2px rgba(29, 29, 29, 0.24);

  & h2 {
    text-align: center;
    margin: 0 auto;
  }

  & span {
    font-size: 1.125rem;
    font-weight: bold;
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
  border-bottom: 1px solid #DDD;

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

export const ContainerImageTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & img {
    object-fit: cover;
    object-position: center;
    border-radius: 1rem;
    margin-bottom: 0.5rem;
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

export const ContainerFinally = styled.div<ContainerProps>`
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
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};

    &:hover {
      transition: 0.3s;
      background: #71493c;
    }
  }
`

export const SuccessMessage = styled.div`

`;