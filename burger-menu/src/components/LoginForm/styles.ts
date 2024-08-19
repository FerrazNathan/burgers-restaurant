import styled from "styled-components";

export const ContainerSection = styled.section`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  position: relative;

  & svg {
    position: relative;
    margin-top: 21%;
  }
`

export const ContainerLoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-align: center;

  & p {
    color: ${(props) => props.theme.colors.text.medium};
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
    font-weight: 600;
    text-align: left;
  }

  & input {
    box-sizing: border-box;
    border: none;
    border-radius: ${(props) => props.theme.border.radius.sm};
    box-shadow: ${(props) => props.theme.boxShadow.shadow};
    padding: 1rem;
    background: transparent;

    &::placeholder {
      color: ${(props) => props.theme.colors.text.medium};;
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
    background: ${(props) => props.theme.colors.status.alert};
    color: ${(props) => props.theme.colors.text.light};
    border: none;
    border-radius: ${(props) => props.theme.border.radius.sm};
    cursor: pointer;
    text-transform: uppercase;
    transition: background 0.3s;
    
    &:hover {
      background: ${(props) => props.theme.colors.status.alertHover};
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
    color: ${(props) => props.theme.colors.status.alert};
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: ${(props) => props.theme.colors.status.alertHover};
    }
  }
`

export const ContainerButtonLogout = styled.div`
  width: 100px;
  margin: 1rem auto;

  & button {
    width: 100%;
    padding: 0.8rem;
    background: ${(props) => props.theme.colors.status.error};
    color: ${(props) => props.theme.colors.text.light};
    border: none;
    border-radius: ${(props) => props.theme.border.radius.sm};
    cursor: pointer;
    text-transform: uppercase;
    transition: background 0.3s;
    
    &:hover {
      background: ${(props) => props.theme.colors.status.errorHover};
    }
  }
`