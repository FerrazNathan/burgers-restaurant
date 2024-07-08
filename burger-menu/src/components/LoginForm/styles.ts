import styled from "styled-components";

export const ContainerLoginForm = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-align: center;

  & p {
    color: #AAA;
  }

  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }
`

export const ContainerForm = styled.form`
  width: 40%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 90%;
  }
`

export const ContainerEmailPassword = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  & span {
    margin-bottom: 0.3rem;
    font-weight: bold;
    text-align: left;
  }

  & input {
    box-sizing: border-box;
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
  }
`

export const ContainerButtonSubmit = styled.div`
  width: 50%;
  margin: 0 auto;

  & button {
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
  }
`

export const ContainerButtonLogin = styled.div`
  width: 50%;
  margin: 1rem auto;

  & button {
    background: none;
    width: 100%;
    border: none;
    color: #007bff;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #0056b3;
    }
  }
`

export const ContainerButtonLogout = styled.div`
  width: 100px;
  margin: 1rem auto;

  & button {
    width: 100%;
    padding: 0.8rem;
    background: #b50211;
    color: #FFF;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    text-transform: uppercase;
    transition: background 0.3s;
    
    &:hover {
      background: #ef0519;
    }
  }
`