import styled from "styled-components";

export const PaymentFormContainer = styled.section`
  max-width: 800px;
  margin: 1rem auto;
  padding: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 5rem;
  }
`;

export const PaymentSuccess = styled.h2`
  text-align: center;
  margin-top: 0;
`

export const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  box-shadow: 1px 1px 5px 2px rgba(29, 29, 29, 0.24);
  border-radius: 0.5rem;


`;

export const FormField = styled.div`
  margin-bottom: 1rem;
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
  border-radius: 0.5rem;
  box-shadow: 1px 1px 5px 2px rgba(29, 29, 29, 0.24);
  padding: 1rem;
  background: transparent;

    &::placeholder {
      color: #AAA;
    }

    &:focus, active {
      outline: none;
    }
`;

export const Button = styled.button`
  width: 100%;
    padding: 0.8rem;
    background: #007bff;
    color: #FFF;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    text-transform: uppercase;
    transition: background 0.3s;
    
    &:hover {
      background: #0056b3;
    }
`;