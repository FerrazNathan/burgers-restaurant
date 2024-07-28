import React, { useRef } from 'react';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { MenuCategories } from "../../components/MenuCategories";
import { ProductsProps, MenuTypes, MenuCategoriesRef } from './Menu.types';
import { Search } from '@/components/Search';
import { ShoppingCart } from '@/components/ShoppingCart';

import * as S from './styles'

function SectionMenu({ itemsMenu }: MenuTypes) {    
  const menuCategoriesRef = useRef<MenuCategoriesRef>(null);
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const router = useRouter();
  const handleItemSelect = (item: ProductsProps) => {
    menuCategoriesRef.current?.openModal(item);
  };

  const isAdmin = sessionStorage.getItem('isAdmin');

  return (
    <S.SectionMenu>
      {isAdmin && (
        <S.ButtonRedirect onClick={() => router.push('/edition')}>
          Gerenciar Conteúdos
        </S.ButtonRedirect>
      )}
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
    </S.SectionMenu>
  );
}

export { SectionMenu };
