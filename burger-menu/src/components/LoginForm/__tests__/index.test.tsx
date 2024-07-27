import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import { LoginForm } from '../index';
import MockAdapter from 'axios-mock-adapter';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('axios');

const mock = new MockAdapter(axios);

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: mockPush,
});

describe('Componente LoginForm', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    mockPush.mockClear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  test('Renderiza corretamante o componente LoginForm', () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText('E-mail de usuário')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Insira a senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Criar uma conta/i })).toBeInTheDocument();
  });

  test('switches to sign up mode', () => {
    render(<LoginForm />);
  
    fireEvent.click(screen.getByRole('button', { name: /Criar uma conta/i }));

    const submitButton = screen.getByRole('button', { name: /Criar Conta/i });
    expect(submitButton).toBeInTheDocument();
  
    const switchButton = screen.getByRole('button', { name: /Já tem uma conta\? Entrar/i });
    expect(switchButton).toBeInTheDocument();
  });
  
  test('successful login', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        '-O2O-t5dIXNd95la1ksU': {
          email: 'test@example.com',
          password: 'password123',
          isAdmin: false,
          name: 'Test User',
        },
      },
    });
  
    render(<LoginForm />);
  
    fireEvent.change(screen.getByPlaceholderText('E-mail de usuário'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Insira a senha'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));
  
    waitFor(() => {
      expect(screen.getByText((content, element) => 
        content.includes('Login realizado com sucesso!')
      )).toBeInTheDocument();
    });
  });

  test('failed login', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        '-O2O-t5dIXNd95la1ksU': {
          email: 'test@example.com',
          password: 'password123',
          isAdmin: false,
          name: 'Test User',
        },
      },
    });
  
    render(<LoginForm />);
  
    fireEvent.change(screen.getByPlaceholderText('E-mail de usuário'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Insira a senha'), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));
  
    await waitFor(() => {
      expect(screen.getByText('Email ou senha inválidos.')).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  test('successful sign up', async () => {
    mock.onGet('https://burgers-restaurant-af6f2-default-rtdb.firebaseio.com/clients.json').reply(200, {});
    mock.onPost('https://burgers-restaurant-af6f2-default-rtdb.firebaseio.com/clients.json').reply(200, {});
  
    render(<LoginForm />);
  
    fireEvent.click(screen.getByRole('button', { name: /Criar uma conta/i }));
  
    fireEvent.change(screen.getByPlaceholderText('Nome de usuário'), {
      target: { value: 'New User' },
    });
  
    fireEvent.change(screen.getByPlaceholderText('E-mail de usuário'), {
      target: { value: 'newuser@example.com' },
    });
  
    fireEvent.change(screen.getByPlaceholderText('Insira a senha'), {
      target: { value: 'newpassword' },
    });
  
    fireEvent.click(screen.getByRole('button', { name: /Criar Conta/i }));
  
    waitFor(() => {
      expect(screen.getByText((content) => 
        content.includes('Conta criada com sucesso!')
      )).toBeInTheDocument();
    });
    
    waitFor(() => {
      expect(mock.history.post[0].data).toEqual(JSON.stringify({
        email: 'newuser@example.com',
        password: 'newpassword',
        isAdmin: false,
        name: 'New User'
      }));
    });
  });

  test('shows logged in state', () => {
    sessionStorage.setItem('loggedInUser', JSON.stringify({ email: 'test@example.com' }));

    render(<LoginForm />);

    expect(screen.getByText('Você já está logado no sistema')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sair/i })).toBeInTheDocument();
  });

  test('logout', () => {
    sessionStorage.setItem('loggedInUser', JSON.stringify({ email: 'test@example.com' }));

    render(<LoginForm />);

    fireEvent.click(screen.getByRole('button', { name: /Sair/i }));

    expect(screen.getByText('Você saiu do sistema.')).toBeInTheDocument();
    expect(sessionStorage.getItem('loggedInUser')).toBeNull();
  });

  test('failed login due to API error', async () => {
    mock.onGet('https://burgers-restaurant-af6f2-default-rtdb.firebaseio.com/clients.json').networkError();
  
    render(<LoginForm />);
  
    fireEvent.change(screen.getByPlaceholderText('E-mail de usuário'), {
      target: { value: 'test@example.com' },
    });
  
    fireEvent.change(screen.getByPlaceholderText('Insira a senha'), {
      target: { value: 'wrongpassword' },
    });
  
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));
  
    await waitFor(() => {
      expect(screen.getByText('Ocorreu um erro ao fazer login. Tente novamente mais tarde.')).toBeInTheDocument();
    });
  });

  test('failed sign up when user already exists', async () => {
    // Mock da resposta da API com um usuário existente
    mock.onGet('https://burgers-restaurant-af6f2-default-rtdb.firebaseio.com/clients.json').reply(200, {
      '-O2m9h0ltuofIqBIetJD': { email: 'existinguser@example.com', password: 'password123', isAdmin: false, name: 'Existing User' },
    });
  
    render(<LoginForm />);
  
    // Muda para modo de criação de conta
    fireEvent.click(screen.getByRole('button', { name: /Criar uma conta/i }));
  
    // Preenche os campos de cadastro
    fireEvent.change(screen.getByPlaceholderText('Nome de usuário'), {
      target: { value: 'New User' },
    });
  
    fireEvent.change(screen.getByPlaceholderText('E-mail de usuário'), {
      target: { value: 'existinguser@example.com' },
    });
  
    fireEvent.change(screen.getByPlaceholderText('Insira a senha'), {
      target: { value: 'newpassword' },
    });
  
    // Clica no botão de criar conta
    fireEvent.click(screen.getByRole('button', { name: /Criar Conta/i }));
  
    // Espera que a mensagem de usuário já existe apareça
    waitFor(() => {
      expect(screen.getByText('Usuário já existe.')).toBeInTheDocument();
    });
  });

  test('successful sign up when user does not exist', async () => {
    // Mock da resposta da API sem usuários
    mock.onGet('https://burgers-restaurant-af6f2-default-rtdb.firebaseio.com/clients.json').reply(200, {});
  
    // Mock da criação de usuário com sucesso
    mock.onPost('https://burgers-restaurant-af6f2-default-rtdb.firebaseio.com/clients.json').reply(200);
  
    render(<LoginForm />);
  
    // Muda para modo de criação de conta
    fireEvent.click(screen.getByRole('button', { name: /Criar uma conta/i }));
  
    // Preenche os campos de cadastro
    fireEvent.change(screen.getByPlaceholderText('Nome de usuário'), {
      target: { value: 'New User' },
    });
  
    fireEvent.change(screen.getByPlaceholderText('E-mail de usuário'), {
      target: { value: 'newuser@example.com' },
    });
  
    fireEvent.change(screen.getByPlaceholderText('Insira a senha'), {
      target: { value: 'newpassword' },
    });
  
    // Clica no botão de criar conta
    fireEvent.click(screen.getByRole('button', { name: /Criar Conta/i }));
  
    // Espera que a mensagem de conta criada com sucesso apareça
    waitFor(() => {
      expect(screen.getByText('Conta criada com sucesso!')).toBeInTheDocument();
    });
  });
});
