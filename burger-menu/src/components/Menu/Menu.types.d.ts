export interface MenuTypes {
  [key: string]: MenuTypesProps;
}

export interface MenuTypesProps {
  categories: CategoryProps[];
}

export interface CategoryProps {
  category: string;
  id: string;
  image: string;
  products: ProductsProps[];
}

export interface ProductsProps {
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
}
