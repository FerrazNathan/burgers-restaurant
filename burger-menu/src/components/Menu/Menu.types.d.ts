export interface MenuTypes {
  [key: string]: any;
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

export interface MenuCategoriesRef {
  openModal: (item: ProductsProps) => void;
}