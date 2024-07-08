import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { PaymentForm } from '../index';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('PaymentForm Component', () => {
  test('Deve renderizar o formulário de pagamento corretamente', () => {
    const { getByText } = render(<PaymentForm />);

    expect(getByText('Formulário de Pagamento')).toBeInTheDocument();

  });

  test('Deve enviar o formulário e mostrar a mensagem de sucesso do pagamento', async () => {
    const { getByText } = render(<PaymentForm />);
 
    const payButton = getByText('Pagar');

    fireEvent.click(payButton);

    await waitFor(() => {
      expect(getByText('Pagamento efetuado com sucesso!')).toBeInTheDocument();
    });
  });

  test('Deve redirecionar para a página inicial após sucesso do pagamento', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));

    const { getByText } = render(<PaymentForm />);
    const payButton = getByText('Pagar');
    fireEvent.click(payButton);

    waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });
});
