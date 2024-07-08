import React, { useRef } from 'react';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

import { MenuCategories } from "../MenuCategories";
import { ItemProps, MenuTypes } from './Menu.types';
import { Search } from '@/components/Search';
import { ShoppingCart } from '@/components/ShoppingCart';

import * as S from './styles'

function Menu({ itemsMenu }: MenuTypes) {    
  const menuCategoriesRef = useRef<{ openModal: (item: ItemProps) => void }>(null);
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);

  const handleItemSelect = (item: ItemProps) => {
    menuCategoriesRef.current?.openModal(item);
  };

  return (
    <S.ContainerMenu data-testid='menu-container'>
      <S.ContainerLeft>
        <Search onItemSelect={handleItemSelect} />
        <MenuCategories 
          ref={menuCategoriesRef}
          itemsMenu={itemsMenu}
        />
      </S.ContainerLeft>
      
      {totalQuantity > 0 && (
        <S.ContainerRight>
          <ShoppingCart />
        </S.ContainerRight>
      )}
    </S.ContainerMenu>
  );
}

export { Menu };
