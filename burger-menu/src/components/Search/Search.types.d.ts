import { ItemProps } from '../Menu/Menu.types';

export interface SearchProps {
  optionsMessage?: string;
  onItemSelect: (item: ItemProps) => void;
}

export interface OptionType {
  label: string;
  value: number;
  item: MenuItem;
}

export interface MenuItem extends ItemProps{
  id: number;
  name: string;
  slug?: string;
  description: string;
  price: number;
  available: boolean;
}