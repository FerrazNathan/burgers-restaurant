import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Modal } from '../Modal';
import { addItem } from '../../store/cartSlice';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ImageDefault from '../../public/imageDefault.png';
import { MenuTypes, ItemProps } from '../Menu/Menu.types';
import { MdAddCircleOutline } from "react-icons/md";
import { GrSubtractCircle } from "react-icons/gr";
import { formatPrice } from '../../utils/FormatPrice/formatPrice';

import * as S from './styles';

const MenuCategories = forwardRef(({ itemsMenu }: MenuTypes, ref) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();

  const openModal = (item: ItemProps) => {
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
      dispatch(addItem({ ...selectedItem, id: selectedItem.id.toString(), quantity }));
      closeModal();
    }
  };

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  const sizeIcon = 32;

  return (
    <React.Fragment>
      <S.ContainerGeneral>
        <S.ContainerImage>
          {itemsMenu?.map((item, index) => (
            <Image 
              key={index} 
              src={item.images[0].image} 
              alt="menu"
              width={100}
              height={100}
              data-testid='menu-categories-image' 
              onClick={() => handleCategoryClick(index)}
            />
          ))}
        </S.ContainerImage>
      
        <S.ContainerCategories>
          {itemsMenu?.map((item, index) => (
            <button 
              key={item.name || index}
              data-testid='menu-categories-button' 
              onClick={() => handleCategoryClick(index)}
            >
              {item.name}
            </button>
          ))}
        </S.ContainerCategories>

        <S.ContainerListMenu>
          {itemsMenu?.map((item, index) => {
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
                  <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold' }}>
                    {item.name}
                  </Typography>
                </AccordionSummary>
                {item.items.map((subItem: ItemProps, index: number) => (
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
                          src={subItem && subItem?.images && subItem?.images[0]?.image || ImageDefault} 
                          alt="menu"
                          width={128}
                          height={85}
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
          <S.ContainerModal>
            <Image 
              src={selectedItem && selectedItem?.images && selectedItem?.images[0]?.image || ImageDefault}
              alt="menu"
              width={465}
              height={200}
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
                    <GrSubtractCircle size={sizeIcon} />
                  </button>
                  <span>{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <MdAddCircleOutline size={sizeIcon} />
                  </button>
                </S.ContainerModalQuantity>
                <S.ButtonAddTocart onClick={handleAddToCart}>Adicionar ao Carrinho</S.ButtonAddTocart>
              </>
            ) : (
              <>
                <Typography variant="h6" color="error">Você precisa estar logado para adicionar itens ao carrinho.</Typography>
                <S.ButtonAddTocart onClick={() => router.push('/signin')}>Ir para Login</S.ButtonAddTocart>
              </>
            )}
          </S.ContainerModal>
        )}
      </Modal>
    </React.Fragment>
  );
});

export { MenuCategories };
