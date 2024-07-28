import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import InputMask from 'react-input-mask'
import { getMenu } from '../../services/menu'
import { Modal } from '../../components/Modal'
import { Loading } from '../../components/Loading'

import { formatPrice } from 'utils/FormatPrice/formatPrice'
import { MenuTypes, CategoryProps, ProductsProps } from './ManageContent.types'

import * as S from './styles'

function ManageContent({ data }: MenuTypes) {
  const [category, setCategory] = useState('')
  const [imageCategory, setImageCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageProduct, setImageProduct] = useState('')
  const [productName, setProductName] = useState('')
  const [buildNewItem, setBuildNewItem] = useState(false)
  const [response, setResponse] = useState<MenuTypes>({ categories: [] })
  const [selectedItem, setSelectedItem] = useState<ProductsProps | CategoryProps | null>(null);

  const hashKey = '-O2Sy_EEcx09kCRzfeAh'
  const endpoint = `https://burgers-restaurant-af6f2-default-rtdb.firebaseio.com/products/${hashKey}.json`

  const isAdmin = sessionStorage.getItem('isAdmin');
  console.log('isAdmin =>', isAdmin)

  const openModal = (item: CategoryProps | ProductsProps) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  const handleAddCategory = async () => {
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
  
      const response = await axios.put(
        endpoint,
        updatedMenu
      );
  
      setResponse(response.data);
      setBuildNewItem(false);
    } catch (error) {
      console.log('error =>');
    }
  };

  const handleEditCategory = async () => {
    try {
      const updatedCategory = {
        ...selectedItem,
        ...(selectedItem && 'category' in selectedItem && { category: category || selectedItem.category }),
        ...(selectedItem && 'image' in selectedItem && { image: imageCategory || selectedItem.image }),
      };
  
      const currentMenu = await getMenu();
      const updatedCategories = currentMenu.categories.map(cat =>
        cat.id === selectedItem!.id ? updatedCategory : cat
      );
  
      const updatedMenu = { ...currentMenu, categories: updatedCategories };
  
      const response = await axios.put(
        endpoint,
        updatedMenu
      );
  
      console.log('response =>', response);
      setResponse(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.log('error =>');
    }
  };
  
  const handleDeleteCategory = async () => {
    try {
      const currentMenu = await getMenu();
      const updatedCategories = currentMenu.categories.filter(
        cat => cat.id !== selectedItem!.id
      );
  
      const updatedMenu = { ...currentMenu, categories: updatedCategories };
  
      const response = await axios.put(
        endpoint,
        updatedMenu
      );
  
      console.log('response =>', response);
      setResponse(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.log('error =>');
    }
  };

  const handleAddProduct = async () => {
    try {
      const newProduct = {
        name: productName,
        id: Math.random().toString(36).substr(2, 9),
        description: description,
        price: parseFloat(price),
        image: imageProduct
      };

      const currentMenu = await getMenu();

      const updatedCategories = currentMenu.categories.map(cat => {
        if (cat.id === selectedItem!.id) {
          return {
            ...cat,
            products: [...cat.products, newProduct]
          };
        }
        return cat;
      });

      const updatedMenu = { ...currentMenu, categories: updatedCategories };

      const response = await axios.put(endpoint, updatedMenu);

      setResponse(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.log('error =>', error);
    }
  };

  const handleEditProduct = async () => {
    try {
      const updatedProduct = {
        ...selectedItem,
        ...(selectedItem && 'name' in selectedItem && { name: productName || selectedItem.name }),
        ...(selectedItem && 'description' in selectedItem && { description: description || selectedItem.description }),
        ...(selectedItem && 'price' in selectedItem && { price: parseFloat(price) || selectedItem.price }),
        ...(selectedItem && 'image' in selectedItem && { image: imageProduct || selectedItem.image })
      };

      const currentMenu = await getMenu();

      const updatedCategories = currentMenu.categories.map(cat => {
        if (cat.id === selectedItem!.categoryId) {
          return {
            ...cat,
            products: cat.products.map(prod =>
              prod.id === selectedItem!.id ? updatedProduct : prod
            )
          };
        }
        return cat;
      });

      const updatedMenu = { ...currentMenu, categories: updatedCategories };

      const response = await axios.put(endpoint, updatedMenu);

      setResponse(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.log('error =>', error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const currentMenu = await getMenu();

      const updatedCategories = currentMenu.categories.map(cat => {
        if (cat.id === selectedItem!.categoryId) {
          return {
            ...cat,
            products: cat.products.filter(prod => prod.id !== selectedItem!.id)
          };
        }
        return cat;
      });

      const updatedMenu = { ...currentMenu, categories: updatedCategories };

      const response = await axios.put(endpoint, updatedMenu);

      setResponse(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.log('error =>', error);
    }
  };

  // useEffect(() => {
  //   if (response.categories.length > 0) {
  //     setData(response);
  //   }
  // }, [response]);
  
  return (
    <React.Fragment>
      {isAdmin && (
        <React.Fragment>
          <S.ContainerComponent data-testid='ContainerComponent'>
            <h2>Editar Categorias</h2>
            <S.ContainerCards>
              {data && data.categories && data.categories.map((category: CategoryProps) => (
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
                  />
                </S.Card>
              ))}
            </S.ContainerCards>
              <button onClick={() => setBuildNewItem(true)}>Criar Nova Categoria</button>
              {buildNewItem && (
                <>
                  <label>
                    <input type="text" onChange={(e) => setCategory(e.target.value)} placeholder='Título da Categoria'/>
                  </label>
                  <label>
                    <input type="text" onChange={(e) => setImageCategory(e.target.value)} placeholder="URL da imagem" />
                  </label>
                   <button onClick={handleAddCategory}>Criar Categoria</button>
                </>
              )}

            <h2>Editar Produtos</h2>
            <S.ContainerCards>
              {data && data.categories && data.categories.map((category: CategoryProps) => (category.products && category.products.map((products) => (
                <S.Card 
                  key={products.id}
                  onClick={() => openModal(products)}
                >
                  <Image 
                    src={products.image} 
                    alt="Imagem do produto" 
                    width={300} 
                    height={200}
                  />
                  <h3>{products.name}</h3>
                  {('description' in products) && <p>{products.description}</p>}
                  <p>{formatPrice(products.price)}</p>
                </S.Card>
              ))))}
            </S.ContainerCards>
            <button onClick={() => setBuildNewItem(true)}>Criar Novo Produto</button>
              {buildNewItem && (
                <>
                  <label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder='Nome do Produto'
                    />
                  </label>
                  <label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Descrição do Produto"
                    />
                  </label>
                  <label>
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Preço do Produto"
                    />
                  </label>
                  <label>
                    <input
                      type="text"
                      value={imageProduct}
                      onChange={(e) => setImageProduct(e.target.value)}
                      placeholder="URL da Imagem do Produto"
                    />
                  </label>
                  <button onClick={handleAddProduct}>Criar Produto</button>
                </>
              )}

          </S.ContainerComponent>
          <Modal 
            isOpen={isModalOpen} 
            onClose={closeModal}
          >
            {selectedItem && (
              <S.ContainerModal>
              <Image 
                src={selectedItem && selectedItem?.image && selectedItem?.image}
                alt="menu"
                width={340}
                height={200}
              />
              {('category' in selectedItem) && (
                <>
                  <h4>{selectedItem.category}</h4>
                  <label>
                    <input
                      type="text"
                      value={category || selectedItem.category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder='Título da Categoria'
                    />
                  </label>
                  <label>
                    <input
                      type="text"
                      value={imageCategory || selectedItem.image}
                      onChange={(e) => setImageCategory(e.target.value)}
                      placeholder="URL da imagem"
                    />
                  </label>
                  <button onClick={handleEditCategory}>Editar Categoria</button>
                  <button onClick={handleDeleteCategory}>Excluir Categoria</button>
                </>
              )}
              {('name' in selectedItem) && (
                <>
                  <h4>{selectedItem.name}</h4>
                  <label>
                    <input
                      type="text"
                      value={productName || selectedItem.name}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder='Nome do Produto'
                    />
                  </label>
                  <label>
                    <input
                      type="text"
                      value={description || selectedItem.description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Descrição do Produto"
                    />
                  </label>
                  <label>
                    <input
                      type="text"
                      value={price || selectedItem.price.toString()}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Preço do Produto"
                    />
                  </label>
                  <label>
                    <input
                      type="text"
                      value={imageProduct || selectedItem.image}
                      onChange={(e) => setImageProduct(e.target.value)}
                      placeholder="URL da Imagem do Produto"
                    />
                  </label>
                  <button onClick={handleEditProduct}>Editar Produto</button>
                  <button onClick={handleDeleteProduct}>Excluir Produto</button>
                </>
              )}
            </S.ContainerModal>
            )}
          </Modal>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export { ManageContent } 