import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import { LoginForm } from '../index';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: mockPush,
});

describe('LoginForm', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    mockPush.mockClear();
  });

  test('renders login form', () => {
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
  

  test('successful login', () => {
    const users = [{ email: 'test@example.com', password: 'password123' }];
    localStorage.setItem('users', JSON.stringify(users));

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('E-mail de usuário'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Insira a senha'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    expect(screen.getByText('Login realizado com sucesso!')).toBeInTheDocument();
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  test('failed login', () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('E-mail de usuário'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Insira a senha'), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    expect(screen.getByText('Email ou senha inválidos.')).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  test('successful sign up', () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole('button', { name: /Criar uma conta/i }));
    fireEvent.change(screen.getByPlaceholderText('E-mail de usuário'), {
      target: { value: 'newuser@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Insira a senha'), {
      target: { value: 'newpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Criar Conta/i }));

    expect(screen.getByText('Conta criada com sucesso!')).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('users')!)).toEqual([
      { email: 'newuser@example.com', password: 'newpassword' },
    ]);
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
});
