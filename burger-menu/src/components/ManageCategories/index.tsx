import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { getMenu } from '../../services/menu';
import { Modal } from '../../components/Modal';
import { Loading } from '../../components/Loading';
import { MenuTypes, CategoryProps, ProductsProps } from '../../interface/Menu.types';
import * as S from './styles';

function ManageCategories({ setUpdatePage }: { setUpdatePage: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageCategory, setImageCategory] = useState('');
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [buildNewCategory, setBuildNewCategory] = useState(false);
  const [response, setResponse] = useState<MenuTypes>({ categories: [] });
  const [selectedItem, setSelectedItem] = useState<ProductsProps | CategoryProps | null>(null);

  const hashKey = '-O2wuwtlN6h_ql_cAQK8';
  const endpoint = `https://burgers-restaurant-af6f2-default-rtdb.firebaseio.com/products/${hashKey}.json`;

  const openModal = (item: CategoryProps | ProductsProps) => {
    setIsModalOpen(true);
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
    setBuildNewCategory(false);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMenu();
        setResponse(response);
      } catch (error) {
        console.error('Error fetching menu:');
      }
    };
    fetchData();
  }, [])

  const handleAddCategory = async () => {
    setLoading(true);
    try {
      const newCategory = {
        category: category,
        id: Math.random().toString(36).substr(2, 9),
        image: imageCategory,
        products: []
      };

      const currentMenu = await getMenu();
      const updatedMenu = {
        ...currentMenu,
        categories: [...currentMenu.categories, newCategory]
      };

      const response = await axios.put(endpoint, updatedMenu);

      setResponse(response.data);
      setShouldUpdate(true);
      setUpdatePage(true);
      closeModal();
    } catch (error) {
      console.error('Erro ao adicionar categoria:');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = async () => {
    setLoading(true);
    try {
      const updatedCategory = {
        ...selectedItem,
        ...(selectedItem && 'category' in selectedItem && { category: category || selectedItem.category }),
        ...(selectedItem && 'image' in selectedItem && { image: imageCategory || selectedItem.image }),
      };

      const currentMenu = await getMenu();
      const updatedCategories = currentMenu.categories.map((cat: { id: string }) =>
        cat.id === selectedItem!.id ? updatedCategory : cat
      );

      const updatedMenu = { ...currentMenu, categories: updatedCategories };

      const response = await axios.put(endpoint, updatedMenu);

      setResponse(response.data);
      setShouldUpdate(true);
      setUpdatePage(true);
      closeModal();
    } catch (error) {
      console.error('Erro ao editar categoria:');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    setLoading(true);
    try {
      const currentMenu = await getMenu();
      const updatedCategories = currentMenu.categories.filter(
        (cat: { id: string }) => cat.id !== selectedItem!.id
      );

      const updatedMenu = { ...currentMenu, categories: updatedCategories };

      const response = await axios.put(endpoint, updatedMenu);

      setResponse(response.data);
      setShouldUpdate(true);
      setUpdatePage(true);
      closeModal();
    } catch (error) {
      console.error('Erro ao deletar categoria:');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const currentMenu = await getMenu();
        setResponse(currentMenu);
        setShouldUpdate(false);
      } catch (error) {
        console.error('Erro ao buscar dados do menu:');
      } finally {
        setLoading(false);
      }
    };

    if (shouldUpdate) {
      fetchData();
    }
  }, [shouldUpdate, response]);

  return (
    <S.ContainerSection data-testid='ContainerSection'>
      {!loading && ( 
        <S.ContainerComponent data-testid='ContainerComponent'>
          <h2>Editar Categorias</h2>
          <S.ContainerCards>
            {response && response.categories && response.categories.map((category: CategoryProps) => (
              <S.Card
                key={category.id}
                onClick={() => openModal(category)}
              >
                <h3>{category.category}</h3>
                <Image
                  src={category.image}
                  alt="Imagem da categoria do produto"
                  width={300}
                  height={200}
                  loading="lazy"
                />
              </S.Card>
            ))}
          </S.ContainerCards>

          <S.ButtonCreate onClick={() => setBuildNewCategory(true)}>Criar Nova Categoria</S.ButtonCreate>
          {buildNewCategory && (
            <Modal
              isOpen={buildNewCategory}
              onClose={closeModal}
            >                        
              <S.ContainerModal>
                <h3>Criar Categoria</h3>
                <form onSubmit={handleAddCategory}>
                  <label>
                    <span>Título da Categoria</span>
                    <input 
                      required
                      type="text" 
                      placeholder='Título da Categoria' 
                      onChange={(e) => setCategory(e.target.value)} 
                    />
                  </label>
                  <label>
                    <span>URL da imagem</span>
                    <input 
                      required
                      type="text" 
                      placeholder="URL da imagem" 
                      onChange={(e) => setImageCategory(e.target.value)} 
                    />
                  </label>
                  <S.ContainerButtons>
                    <S.ButtonCreate type="submit">Criar Categoria</S.ButtonCreate>
                  </S.ContainerButtons>
                </form>
              </S.ContainerModal>              
            </Modal>
          )}
        </S.ContainerComponent>
      )}
      {!loading && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
        >
          {selectedItem && (
            <React.Fragment>              
              <S.ContainerModal>
                <Image
                  src={selectedItem && selectedItem?.image && selectedItem?.image}
                  alt="menu"
                  width={340}
                  height={200}
                  loading="lazy"
                />
                {('category' in selectedItem) && (
                  <React.Fragment>
                    <h4>{selectedItem.category}</h4>
                    <h3>Editar Categoria</h3>
                    <label>
                      <span>Título da Categoria</span>
                      <input
                        type="text"
                        value={category || selectedItem.category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder='Título da Categoria'
                      />
                    </label>
                    <label>
                      <span>URL da imagem</span>
                      <input
                        type="text"
                        value={imageCategory || selectedItem.image}
                        onChange={(e) => setImageCategory(e.target.value)}
                        placeholder="URL da imagem"
                      />
                    </label>
                    <S.ContainerButtons>
                      <S.ButtonDelete onClick={handleDeleteCategory}>Excluir Categoria</S.ButtonDelete>
                      <S.ButtonAdd onClick={handleEditCategory}>Editar Categoria</S.ButtonAdd>
                    </S.ContainerButtons>
                  </React.Fragment>
                )}
              </S.ContainerModal>
            </React.Fragment>
          )}
        </Modal>
      )}
      {loading && <Loading description='Carregando ...' />}
    </S.ContainerSection>
  );
}

export { ManageCategories };
