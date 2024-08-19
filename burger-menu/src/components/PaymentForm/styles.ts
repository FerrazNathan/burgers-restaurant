import styled from "styled-components";

export const PaymentFormContainer = styled.section`
  max-width: 800px;
  margin: 1rem auto;
  padding: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 5rem;
  }
`;

export const ContainerMessageLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`

export const PaymentSuccess = styled.h2`
  text-align: center;
  margin-top: 0;
`

export const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  box-shadow: ${(props) => props.theme.boxShadow.shadow};
  border-radius: ${(props) => props.theme.border.radius.sm};
`;

export const FormField = styled.div`
  margin-bottom: 1rem;

  & .input-mask {
    box-sizing: border-box;
    width: 100%;
    border: none;
    border-radius: ${(props) => props.theme.border.radius.sm};
    box-shadow: ${(props) => props.theme.boxShadow.shadow};;
    padding: 1rem;
    background: transparent;

    &::placeholder {
      color: ${(props) => props.theme.colors.text.medium};
    }

    &:focus, active {
      outline: none;
    }
  }
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  border: none;
  border-radius: ${(props) => props.theme.border.radius.sm};
  box-shadow: ${(props) => props.theme.boxShadow.shadow};
  padding: 1rem;
  background: transparent;

  &::placeholder {
    color: ${(props) => props.theme.colors.text.medium};
  }

  &:focus, active {
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: ${(props) => props.theme.colors.status.alert};
  color: ${(props) => props.theme.colors.text.light};
  border: none;
  border-radius: ${(props) => props.theme.border.radius.sm};
  cursor: pointer;
  text-transform: uppercase;
  transition: background 0.5s;
  
  &:hover {
    background: ${(props) => props.theme.colors.status.alertHover};
  }
`;

export const ErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.status.error};
  font-size: 12px;
  margin-top: 4px;
  display: block;
  font-weight: 600;
`;
