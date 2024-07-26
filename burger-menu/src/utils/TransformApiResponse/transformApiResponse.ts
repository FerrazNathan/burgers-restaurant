import { v4 as uuidv4 } from 'uuid';

interface ApiResponse {
  categories: {
    category: string;
    id: string;
    image: string;
    products: {
      description: string;
      id: string;
      image: string;
      name: string;
      price: number;
    }[];
  }[];
}

interface TransformedResponse {
  categories: {
    category: string;
    id: string;
    image: string;
    products: {
      description: string;
      id: string;
      uuid: string; // Adiciona UUID a cada produto
      image: string;
      name: string;
      price: number;
    }[];
  }[];
}

export const transformApiResponse = (apiResponse: ApiResponse): TransformedResponse => {
  return {
    categories: apiResponse.categories.map(category => ({
      ...category,
      products: category.products.map(product => ({
        ...product,
        uuid: uuidv4(), // Adiciona UUID
      })),
    })),
  };
};
