import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import { PaymentForm } from '../index';
import { useRouter } from 'next/router';
import { themes } from '../../../configs/themes';
import { ThemeProvider } from 'styled-components';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('PaymentForm Component', () => {
  test('Deve renderizar o formulário de pagamento corretamente', () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.light}>
        <PaymentForm />
      </ThemeProvider>
    );

    expect(getByText('Formulário de Pagamento')).toBeInTheDocument();

  });

  test('Deve enviar o formulário e mostrar a mensagem de sucesso do pagamento', async () => {
    const { getByText } = render(
      <ThemeProvider theme={themes.light}>
        <PaymentForm />
      </ThemeProvider>
    );
 
    const payButton = getByText('Pagar');

    fireEvent.click(payButton);

    waitFor(() => {
      expect(getByText('Pagamento efetuado com sucesso!')).toBeInTheDocument();
    });
  });

  test('Deve redirecionar para a página inicial após sucesso do pagamento', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));

    const { getByText } = render(
      <ThemeProvider theme={themes.light}>
        <PaymentForm />
      </ThemeProvider>
    );
    const payButton = getByText('Pagar');
    fireEvent.click(payButton);

    waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });
});
