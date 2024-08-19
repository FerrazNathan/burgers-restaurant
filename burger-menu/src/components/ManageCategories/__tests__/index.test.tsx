import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { ManageCategories } from '../index';
import { themes } from '../../../configs/themes';
import { ThemeProvider } from 'styled-components';
import { SetStateAction } from 'react';


jest.mock('axios');

const mockData = {
  categories: [
    {
      id: '1',
      category: 'Burgers',
      image: '/burger.jpg',
      products: []
    }
  ]
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Componente ManageCategories', () => {
  test('Deve renderizar o componente e exibir categorias', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });
    render(
      <ThemeProvider theme={themes.light}>
        <ManageCategories setUpdatePage={function (value: SetStateAction<boolean>): void {
          throw new Error('Function not implemented.');
        } } />
      </ThemeProvider>
    );
    waitFor(() => {
      expect(screen.getByText('Editar Categorias')).toBeInTheDocument();
      expect(screen.getByText('Burgers')).toBeInTheDocument();
    });
  });

  test('Deve abrir e fechar o modal ao clicar nos botões', () => {
    render(
      <ThemeProvider theme={themes.light}>
        <ManageCategories setUpdatePage={function (value: SetStateAction<boolean>): void {
          throw new Error('Function not implemented.');
        } } />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Criar Nova Categoria'));
    expect(screen.getByText('Título da Categoria')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Criar Categoria/i }));
    expect(screen.queryByText('Título da Categoria')).toBeInTheDocument();
  });

  test('Deve adicionar uma nova categoria', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });
    jest.spyOn(axios, 'put').mockResolvedValue({ data: { 
      ...mockData, 
      categories: [...mockData.categories, 
        { id: '2', category: 'Pizzas', image: '/pizza.jpg', 
          products: [] }] } 
        });
  
    render(
      <ThemeProvider theme={themes.light}>
        <ManageCategories setUpdatePage={function (value: SetStateAction<boolean>): void {
          throw new Error('Function not implemented.');
        } } />
      </ThemeProvider>
    );
  
    fireEvent.click(screen.getByText('Criar Nova Categoria'));
  
    fireEvent.change(screen.getByPlaceholderText('Título da Categoria'), {
      target: { value: 'Pizzas' }
    });
    fireEvent.change(screen.getByPlaceholderText('URL da imagem'), {
      target: { value: '/pizza.jpg' }
    });
  
    fireEvent.click(screen.getByRole('button', { name: /Criar Categoria/i }));
  
    waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        categories: expect.arrayContaining([
          expect.objectContaining({ category: 'Pizzas' })
        ])
      }));
    });
  });

})
