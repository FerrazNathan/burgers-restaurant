import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { HeaderData } from './HeaderData'
import { HeaderProps } from './Header.types'

import ImageHeader from '../../public/header.png'
import { GiShoppingCart } from "react-icons/gi";
import { Loading } from '../Loading'
import { ThemeSwitcher } from './components/SwitchTheme'
 
import { RootState } from '../../store/store';
import { useTheme } from '../../hooks/useTheme';
import { useSelector, useDispatch } from 'react-redux';

import * as S from './styles'

function Header({ activePage }: HeaderProps ) {
  const router = useRouter();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const pageCart = router.pathname === '/cart';
  const showIconCart = totalQuantity > 0;
  const themeContrast = theme === 'contrast'

  return (
    <S.ContainerHeader data-testid='HeaderContainer'>
      <ThemeSwitcher />
      <S.ListMenuHeader showIconCart={showIconCart}>
        {HeaderData && HeaderData.map((item, index) => (
          <S.ItemMenuHeader key={index} data-testid='menu-item'>
            <S.LinkMenuHeader 
              href={item.url}
              contrast={themeContrast}
              activePage={activePage === item.page ? true : false}
            >
              {item.page}
            </S.LinkMenuHeader>
          </S.ItemMenuHeader>
        ))}
        
        {showIconCart && (
        <S.ContainerCart 
          isLoading={loading} 
          pageCart={pageCart}
          contrast={themeContrast}
        >
          {!loading && (
            <React.Fragment>
              <span data-testid='total-quantity'>{totalQuantity}</span>
              <GiShoppingCart 
                color={themeContrast ? '#F5FF00' : '#FFF'}
                size={24}
                data-testid='cart-icon'
                onClick={() => {
                  if(!pageCart) {
                    router.push('/cart')
                    setLoading(true)
                  }
                }}
              />
            </React.Fragment>
          )}

          {loading && <Loading />}
        </S.ContainerCart>
      )} 
      </S.ListMenuHeader>

      <Image 
        src={ImageHeader} 
        alt="Imagem do logotipo do restaurante" 
        objectFit='cover'
        objectPosition='center'
        loading="lazy"
      />

    </S.ContainerHeader>
  )
}

export { Header } 