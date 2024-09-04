import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { increaseItemQuantity, decreaseItemQuantity, clearCart } from '../../store/cartSlice';
import { formatPrice } from '../../utils/FormatPrice/formatPrice';
import { MdAddCircleOutline } from "react-icons/md";
import { GrSubtractCircle } from "react-icons/gr";
import { useTheme } from '../../hooks/useTheme';
import { Loading } from '../Loading';
import Image from 'next/image';

import * as S from './styles';

const ShoppingCart: React.FC = () => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const items = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const router = useRouter();
  const { theme } = useTheme();
  const disabledClickButton = totalQuantity < 1;

  const themeContrast = theme === 'contrast'

  const handleCheckout = () => {
    setCheckoutSuccess(true);

    setTimeout(() => {
      dispatch(clearCart());
      setCheckoutSuccess(false);
      router.push('/payment');
    }, 2000);
  };

  const sizeIcon = 20;
  
  return (
    <S.ContainerCart data-testid='container-cart'>
      {!checkoutSuccess && !disabledClickButton && <h2>Carrinho</h2>}
      {checkoutSuccess && (
        <S.ContainerMessageLoading>
          <h2>Você será redirecionado para a página de pagamentos!</h2>
          <Loading description='Carregando ...' />
        </S.ContainerMessageLoading>
      )}
      {!checkoutSuccess && !disabledClickButton && (
        <S.ProductsList>
          {items.map(item => (
            <S.ProductsListItem key={item.id}>
              <S.ContainerImageTitle>
                <span>{item.name}</span>
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  width={100}
                  height={70}
                  loading="lazy"
                />
              </S.ContainerImageTitle>
              <S.ContainerButtons>
                <S.ButtonRemove 
                  onClick={() => dispatch(decreaseItemQuantity(item.id))}
                >
                  <GrSubtractCircle 
                    size={sizeIcon} 
                    color={themeContrast ? '#F5FF00' : '#EF0519'}
                  />
                </S.ButtonRemove>
                <span>{item.quantity}</span>
                <S.ButtonRemove 
                  onClick={() => dispatch(increaseItemQuantity(item.id))}
                >
                  <MdAddCircleOutline 
                    size={sizeIcon} 
                    color={themeContrast ? '#F5FF00' : '#02F102'} 
                  />
                </S.ButtonRemove>
              </S.ContainerButtons>
              <span>{formatPrice(item.price)}</span>
            </S.ProductsListItem>
          ))}
        </S.ProductsList>
      )}

      {!checkoutSuccess && !disabledClickButton && (
        <S.ContainerFinally 
          disabled={disabledClickButton} 
          contrast={themeContrast}
        >
          {!disabledClickButton && <span>Total: {formatPrice(totalPrice)}</span>}
          <button disabled={disabledClickButton} onClick={handleCheckout}>
            Finalizar Compra
          </button>
        </S.ContainerFinally>
      )}

      {disabledClickButton && (
        <S.ContainerFinally contrast={themeContrast}>
          <span>Seu carrinho está vazio, voltar para a página de Menu?</span>
          <button onClick={() => router.push('/')}>
            Voltar
          </button>
        </S.ContainerFinally>
      )}
    </S.ContainerCart>
  );
};

export { ShoppingCart };

