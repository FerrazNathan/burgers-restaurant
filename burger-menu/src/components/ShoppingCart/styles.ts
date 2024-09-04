import styled from 'styled-components';

interface ContainerProps {
  disabled?: boolean;
  contrast?: boolean;
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
  border-radius: ${(props) => props.theme.border.radius.lg};
  overflow: hidden;
  margin-bottom: 4.5rem;
  box-shadow: ${(props) => props.theme.boxShadow.shadow};
  color: ${(props) => props.theme.colors.text.standard};

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
  border-bottom: 1px solid ${(props) => props.theme.colors.background.medium};

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
    border-radius: ${(props) => props.theme.border.radius.sm};
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
    background: ${(props) => props.contrast ? props.theme.colors.base.standard : props.theme.colors.primary.light};
    color: ${(props) => props.contrast ? props.theme.colors.background.standard : props.theme.colors.text.light};
    font-weight: 600;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: ${(props) => props.theme.border.radius.xs};
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};

    &:hover {
      transition: ease 0.3s;
      background: ${(props) => props.contrast ? props.theme.colors.status.alertHover : props.theme.colors.primary.standard};
    }
  }
`

export const SuccessMessage = styled.div`

`;