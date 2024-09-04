import React, { useRef } from 'react';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useTheme } from '../../hooks/useTheme';

import { MenuCategories } from "../../components/MenuCategories";
import { ProductsProps, MenuTypes, MenuCategoriesRef } from '../../interface/Menu.types';
import { Search } from '@/components/Search';

import * as S from './styles'

function SectionMenu({ itemsMenu }: MenuTypes) {    
  const menuCategoriesRef = useRef<MenuCategoriesRef>(null);
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const router = useRouter();
  const { theme } = useTheme();
  const themeContrast = theme === 'contrast'

  const handleItemSelect = (item: ProductsProps) => {
    menuCategoriesRef.current?.openModal(item);
  };

  const isAdmin = sessionStorage.getItem('isAdmin');

  return (
    <S.SectionMenu>
      {isAdmin && (
        <S.ButtonRedirect 
          contrast={themeContrast}
          onClick={() => router.push('/edition')}
        >
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
      </S.ContainerMenu>
    </S.SectionMenu>
  );
}

export { SectionMenu };
