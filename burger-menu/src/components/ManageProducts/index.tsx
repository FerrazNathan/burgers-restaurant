import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import InputMask from 'react-input-mask'
import { getMenu } from '../../services/menu'
import { Modal } from '../Modal'
import { Loading } from '../Loading'
import { formatPrice } from '../../utils/FormatPrice/formatPrice'
import { MenuTypes, CategoryProps, ProductsProps } from '../../interface/Menu.types'

import * as S from './styles'

function ManageProducts() {
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [imageProduct, setImageProduct] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [buildNewProduct, setBuildNewProduct] = useState(false)
  const [response, setResponse] = useState<MenuTypes>({ categories: [] })
  const [selectedItem, setSelectedItem] = useState<ProductsProps | CategoryProps | null>(null);

  const hashKey = '-O2Sy_EEcx09kCRzfeAh'
  const endpoint = `https://burgers-restaurant-af6f2-default-rtdb.firebaseio.com/products/${hashKey}.json`

  const openModal = (item: CategoryProps | ProductsProps) => {
    setIsModalOpen(true);
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
    setBuildNewProduct(false);
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

  console.log('SELECTEDITEM =>', selectedItem)

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
    <React.Fragment>
      <S.ContainerComponent data-testid='ContainerComponent'>
        <h2>Editar Produtos</h2>
          <S.ContainerCards>
            {response && response.categories && response.categories.map((category: CategoryProps) => (category.products && category.products.map((products) => (
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
          <S.ButtonCreate onClick={() => setBuildNewProduct(true)}>Criar Novo Produto</S.ButtonCreate>
            {buildNewProduct && (
              <Modal
              isOpen={buildNewProduct}
              onClose={closeModal}
            >
              <S.ContainerModal>
                <label>
                  <span>Nome do Produto</span>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder='Nome do Produto'
                  />
                </label>
                <label>
                  <span>Descrição do Produto</span>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrição do Produto"
                  />
                </label>
                <label>
                  <span>Preço do Produto</span>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Preço do Produto"
                  />
                </label>
                <label>
                  <span>URL da Imagem do Produto</span>
                  <input
                    type="text"
                    value={imageProduct}
                    onChange={(e) => setImageProduct(e.target.value)}
                    placeholder="URL da Imagem do Produto"
                  />
                </label>
                <label>
                  <span>Categoria</span>
                  <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">Selecione uma categoria</option>
                    {response.categories.map((category: CategoryProps) => (
                      <option key={category.id} value={category.id}>{category.category}</option>
                    ))}
                  </select>
                </label>
                <S.ContainerButtons>
                  <S.ButtonCreate>Criar Produto</S.ButtonCreate>
                </S.ContainerButtons>
              </S.ContainerModal>
            </Modal>
            
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

              {('name' in selectedItem) && (
                <>
                  <h4>{selectedItem.name}</h4>
                  <h3>Editar Produto</h3>
                  <label>
                    <span>Nome do Produto</span>
                    <input
                      type="text"
                      value={productName || selectedItem.name}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder='Nome do Produto'
                    />
                  </label>
                  <label>
                    <span>Descrição do Produto</span>
                    <textarea
                      value={description || selectedItem.description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Descrição do Produto"
                    />
                  </label>
                  <label>
                    <span>Preço do Produto</span>
                    <input
                      type="text"
                      value={price || selectedItem.price.toString()}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Preço do Produto"
                    />
                  </label>
                  <label>
                    <span>URL da Imagem do Produto</span>
                    <input
                      type="text"
                      value={imageProduct || selectedItem.image}
                      onChange={(e) => setImageProduct(e.target.value)}
                      placeholder="URL da Imagem do Produto"
                    />
                  </label>
                  <S.ContainerButtons>
                    <S.ButtonAdd>Editar Produto</S.ButtonAdd>
                    <S.ButtonDelete>Excluir Produto</S.ButtonDelete>
                  </S.ContainerButtons>
                </>
              )}
            </S.ContainerModal>
          )}
        </Modal>
    </React.Fragment>
  )
}

export { ManageProducts } 