import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { ManageCategories } from '../index';

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
  test('deve renderizar o componente e exibir categorias', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockData });

    render(<ManageCategories />);

    waitFor(() => {
      expect(screen.getByText('Editar Categorias')).toBeInTheDocument();
      expect(screen.getByText('Burgers')).toBeInTheDocument();
    });
  });

  test('deve abrir e fechar o modal ao clicar nos botões', () => {
    render(<ManageCategories />);

    fireEvent.click(screen.getByText('Criar Nova Categoria'));
    expect(screen.getByText('Título da Categoria')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Criar Categoria/i }));
    expect(screen.queryByText('Título da Categoria')).not.toBeInTheDocument();
  });

  test('deve adicionar uma nova categoria', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });
    jest.spyOn(axios, 'put').mockResolvedValue({ data: { 
      ...mockData, 
      categories: [...mockData.categories, 
        { id: '2', category: 'Pizzas', image: '/pizza.jpg', 
          products: [] }] } 
        });
  
    render(<ManageCategories />);
  
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

  test('deve excluir uma categoria', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });
    (axios.put as jest.Mock).mockResolvedValue({ data: { categories: [] } });
  
    render(<ManageCategories />);
  
    fireEvent.click(screen.getByText('Burgers'));
    fireEvent.click(screen.getByRole('button', { name: /Excluir Categoria/i }));
  
    waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        categories: expect.not.arrayContaining([
          expect.objectContaining({ category: 'Burgers' })
        ])
      }));
    });
  });

  test('deve editar uma categoria', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });
    (axios.put as jest.Mock).mockResolvedValue({ data: 
      { ...mockData, categories: [{ id: '1', category: 'Cheeseburgers', image: '/cheeseburger.jpg', products: [] }] } 
    });
  
    render(<ManageCategories />);
  
    fireEvent.click(screen.getByText('Burgers'));
    fireEvent.change(screen.getByPlaceholderText('Título da Categoria'), {
      target: { value: 'Cheeseburgers' }
    });
    fireEvent.change(screen.getByPlaceholderText('URL da imagem'), {
      target: { value: '/cheeseburger.jpg' }
    });
  
    fireEvent.click(screen.getByRole('button', { name: /Editar Categoria/i }));
  
    waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        categories: expect.arrayContaining([
          expect.objectContaining({ category: 'Cheeseburgers' })
        ])
      }));
    });
  });

})
