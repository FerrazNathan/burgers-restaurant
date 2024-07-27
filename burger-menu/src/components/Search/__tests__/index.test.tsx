import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Search } from '../index';
import { getMenu } from '../../../services/menu';

jest.mock('../../../services/menu', () => ({
  getMenu: jest.fn().mockResolvedValue({
    sections: [
      {
        items: [
          { id: 1, name: 'Pizza Margherita' },
          { id: 2, name: 'Pizza Pepperoni' },
          { id: 3, name: 'Salada Caesar' },
        ]
      }
    ]
  })
}));

describe('Search Component', () => {
  test('Renderiza o componente Search corretamente', () => {
    const { getByTestId } = render(<Search onItemSelect={() => {}} />);
    const searchInput = getByTestId('search-component');

    expect(searchInput).toBeInTheDocument();
  });

  test('Chama loadOptions ao digitar no campo de pesquisa', async () => {
    const { getByTestId } = render(<Search onItemSelect={() => {}} />);
    const searchInput = getByTestId('search-component').querySelector('input');

    fireEvent.change(searchInput!, { target: { value: 'pizza' } });

    waitFor(() => {
      expect(getMenu).toHaveBeenCalledTimes(1);

      const pizzaMargherita = screen.getByText('Pizza Margherita');
      expect(pizzaMargherita).toBeInTheDocument();
    });
  });

  test('Chama onItemSelect ao selecionar um item na busca', async () => {
    const mockOnItemSelect = jest.fn();
    const { getByTestId, getByText } = render(<Search onItemSelect={mockOnItemSelect} />);
  
    const searchInput = getByTestId('search-component').querySelector('input');
    
    fireEvent.change(searchInput!, { target: { value: 'salada' } });
  
    waitFor(() => {
      const saladOption = getByText('Salada Caesar');
      expect(saladOption).toBeInTheDocument();
  
      fireEvent.click(saladOption);
    });
  
    waitFor(() => {
      expect(mockOnItemSelect).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Salada Caesar' })
      );
    });
  });
});

describe('Search Component - Error Message', () => {
  test('Exibe mensagem de erro ao digitar menos de 4 caracteres', async () => {
    const { getByTestId, getByText } = render(<Search onItemSelect={() => {}} />);
  
    const searchInput = getByTestId('search-component').querySelector('input');
    fireEvent.change(searchInput!, { target: { value: 'pi' } });
  
    await waitFor(() => {
      const errorMessage = getByText('Digite pelo menos 4 caracteres');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('Exibe mensagem de erro ao não encontrar resultados', async () => {
    const { getByTestId, getByText } = render(<Search onItemSelect={() => {}} />);

    const searchInput = getByTestId('search-component').querySelector('input');;
    fireEvent.change(searchInput!, { target: { value: 'xyz' } });

    waitFor(() => {
      const errorMessage = getByText('Nenhum resultado encontrado');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});

