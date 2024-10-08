import React, { useState, useImperativeHandle, forwardRef, useEffect, Ref } from 'react';
import Image from 'next/image';
import { Modal } from '../Modal';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { addItem } from '../../store/cartSlice';
import Accordion from '@mui/material/Accordion';
import { GrSubtractCircle } from "react-icons/gr";
import Typography from '@mui/material/Typography';
import { MdAddCircleOutline } from "react-icons/md";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { formatPrice } from '../../utils/FormatPrice/formatPrice';
import { MenuTypes, ProductsProps, MenuCategoriesRef } from '../../interface/Menu.types';

import * as S from './styles';

const MenuCategories = forwardRef<MenuCategoriesRef, MenuTypes>(({ itemsMenu }, ref) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProductsProps | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const router = useRouter();
  const sizeIcon = 32;
  const themeContrast = theme === 'contrast'

  const openModal = (item: ProductsProps) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    setQuantity(1);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCategoryClick = (index: number) => {
    const panelId = `panel${index + 1}`;
    setExpanded(panelId);
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      dispatch(addItem({ ...selectedItem, id: selectedItem.id.toString(), quantity, price: selectedItem.price }));  
      closeModal();
    }
  };

  useImperativeHandle(ref, () => ({
    openModal,
  }), [openModal]);

  return (
    <React.Fragment>
      <S.ContainerGeneral>
        <S.ContainerImage>
          {itemsMenu && itemsMenu?.categories.map((item: any, index: number) => (
            <S.ContainerImageCategory>
              <Image 
                key={index} 
                src={item.image} 
                alt="menu"
                width={100}
                height={100}
                loading="lazy"
                data-testid='menu-categories-image' 
                onClick={() => handleCategoryClick(index)}
              />
              <button 
                key={item.category || index}
                data-testid='menu-categories-button' 
                onClick={() => handleCategoryClick(index)}
              >
                {item.category}
              </button>
            </S.ContainerImageCategory>
          ))}
        </S.ContainerImage>

        <S.ContainerListMenu>
          {itemsMenu?.categories.map((item: any, index: number) => {
            const panelId = `panel${index + 1}`;
            return (
              <Accordion
                key={item.id || index}
                expanded={expanded === panelId}
                onChange={handleChange(panelId)}
                data-testid={`accordion-${index}`}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${panelId}bh-content`}
                  id={`${panelId}bh-header`}
                >
                  <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold', textTransform: 'capitalize' }}>
                    {item.category}
                  </Typography>
                </AccordionSummary>
                {item.products && item.products.map((subItem: ProductsProps, index: number) => (
                  <AccordionDetails 
                    key={subItem.id || index} 
                    data-testid={`accordion-details-${index}`} 
                    onClick={() => openModal(subItem)}
                  >
                    <S.ContainerAccordionDetails>
                      <S.ContainerTitleDescriptionAndPrice>
                        <Typography sx={{ fontWeight: 'bold' }}>
                          {subItem.name}
                        </Typography>
                        <Typography>
                          {subItem.description}
                        </Typography>
                        <Typography>
                          {formatPrice(subItem.price)}
                        </Typography>
                      </S.ContainerTitleDescriptionAndPrice>
                      <S.ContainerImageAccordionDetails>
                        <Image 
                          src={subItem && subItem?.image && subItem?.image} 
                          alt="menu"
                          width={128}
                          height={85}
                          loading="lazy"
                          data-testid={`image-details-${index}`}
                        />
                      </S.ContainerImageAccordionDetails>
                    </S.ContainerAccordionDetails>
                  </AccordionDetails>
                ))}
              </Accordion>
            );
          })}
        </S.ContainerListMenu>
      </S.ContainerGeneral>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedItem && (
          <S.ContainerModal contrast={themeContrast}>
            <Image 
              src={selectedItem && selectedItem?.image && selectedItem?.image}
              alt="menu"
              width={465}
              height={200}
              loading="lazy"
            />
            <Typography variant="h4" component="h2">
              {selectedItem.name}
            </Typography>
            <Typography>
              {selectedItem.description}
            </Typography>
            <Typography>
              {formatPrice(selectedItem.price)}
            </Typography>

            {isLoggedIn ? (
              <>
                <S.ContainerModalQuantity>
                  <button 
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity <= 0}
                  >
                    <GrSubtractCircle 
                      size={sizeIcon} 
                      color={themeContrast ? '#F5FF00' : '#EF0519'} 
                    />
                  </button>
                  <span>{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <MdAddCircleOutline 
                      size={sizeIcon} 
                      color={themeContrast ? '#F5FF00' : '#02F102'} 
                    />
                  </button>
                </S.ContainerModalQuantity>
                <S.ButtonAddTocart 
                  contrast={themeContrast} 
                  onClick={handleAddToCart}
                >
                  Adicionar ao Carrinho
                </S.ButtonAddTocart>
              </>
            ) : (
              <>
                <Typography variant="h6" color="error">Você precisa estar logado para adicionar itens ao carrinho.</Typography>
                <S.ButtonAddTocart contrast={themeContrast}  onClick={() => router.push('/signin')}>Ir para Login</S.ButtonAddTocart>
              </>
            )}
          </S.ContainerModal>
        )}
      </Modal>
    </React.Fragment>
  );
});

export { MenuCategories };
