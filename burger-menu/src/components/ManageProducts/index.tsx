import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { getMenu } from '../../services/menu'
import { Modal } from '../Modal'
import { Loading } from '../Loading'
import { formatPrice } from '../../utils/FormatPrice/formatPrice'
import { MenuTypes, CategoryProps, ProductsProps } from '../../interface/Menu.types'

import * as S from './styles'

function ManageProducts({ setUpdatePage }: { setUpdatePage: React.Dispatch<React.SetStateAction<boolean>> }) {
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
  const [showAllFilteredProducts, setShowAllFilteredProducts] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ProductsProps | CategoryProps | null>(null);

  const hashKey = '-O2wuwtlN6h_ql_cAQK8'
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

  const handleAddProduct = async () => {
    setLoading(true);

    try {
        const newProduct = {
            id: Math.random().toString(36).substr(2, 9),
            name: productName,
            description,
            price: parseFloat(price),
            image: imageProduct
        };

        // Obtém o menu atual da API
        const response = await axios.get(endpoint);
        const currentMenu = response.data;

        // Atualiza a categoria selecionada com o novo produto
        const updatedCategories = currentMenu.categories.map((category: CategoryProps) => {
            if (category.id === selectedCategory) {
                // Verifica se a categoria já tem produtos
                const updatedProducts = category.products ? [...category.products, newProduct] : [newProduct];
                return {
                    ...category,
                    products: updatedProducts
                };
            }
            return category;
        });

        // Atualiza o menu com as categorias modificadas
        const updatedMenu = {
            ...currentMenu,
            categories: updatedCategories
        };

        // Envia o menu atualizado para a API usando PUT
        await axios.put(endpoint, updatedMenu);

        setResponse(updatedMenu);
        setShouldUpdate(true);
        setUpdatePage(true)
        closeModal();
    } catch (error) {
        console.error('Erro ao adicionar produto:');
    } finally {
        setLoading(false);
    }
  };

  const handleEditProduct = async () => {
    setLoading(true);
    try {
        // Prepara os dados com apenas os campos alterados
        const updatedFields = {
            ...(productName && { name: productName }),
            ...(description && { description }),
            ...(price && { price: parseFloat(price) }),
            ...(imageProduct && { image: imageProduct })
        };

        // Obtém o menu atual
        const currentMenu = await getMenu();

        // Atualiza a categoria com o produto modificado
        const updatedCategories = currentMenu.categories.map((category: CategoryProps) => ({
            ...category,
            products: category.products.map(product =>
                product.id === selectedItem!.id ? { ...product, ...updatedFields } : product
            )
        }));

        // Cria o menu atualizado
        const updatedMenu = { ...currentMenu, categories: updatedCategories };

        // Envia as atualizações para a API usando PATCH
        await axios.patch(endpoint, updatedMenu);

        setResponse(updatedMenu);
        setShouldUpdate(true);
        setUpdatePage(true);
        closeModal();
    } catch (error) {
        console.error('Erro ao editar produto:');
    } finally {
        setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    setLoading(true);
    try {
        const currentMenu = await getMenu();
        const updatedCategories = currentMenu.categories.map((category: CategoryProps) => ({
            ...category,
            products: category.products.filter(product => product.id !== selectedItem!.id)
        }));

        const updatedMenu = { ...currentMenu, categories: updatedCategories };
        await axios.put(endpoint, updatedMenu);

        setResponse(updatedMenu);
        setShouldUpdate(true);
        setUpdatePage(true);
        closeModal();
    } catch (error) {
        console.error('Erro ao deletar produto:');
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

  const filteredProducts: any = []

	response && 
  response.categories && 
    response.categories.forEach(category => {
    category.products &&
      category.products.forEach(products => {
        filteredProducts.push({
				id: products.id,
        image: products.image,
				name: products.name,
				description: products.description,
				price: products.price
			})
		})
	})

  return (
    <S.ContainerSection data-testid='ContainerSection'>
      {loading && <Loading description='Carregando ...' />}
      {!loading && (
        <S.ContainerComponent data-testid='ContainerComponent'>
          <h2>Editar Produtos</h2>
            <S.ContainerCards>
              {filteredProducts.slice(0, showAllFilteredProducts ? filteredProducts.length : 10).map((products: ProductsProps) => (
                <S.Card 
                  key={products.id}
                  onClick={() => openModal(products)}
                >
                  <Image 
                    src={products.image} 
                    alt="Imagem do produto" 
                    width={300} 
                    height={200}
                    loading="lazy"
                  />
                  <h3>{products.name}</h3>
                  {('description' in products) && <p>{products.description}</p>}
                  <p>{formatPrice(products.price)}</p>
                </S.Card>
              ))}
            </S.ContainerCards>

            {filteredProducts.length > 10 && (
              <React.Fragment>
                {!showAllFilteredProducts ? (
                  <S.ButtonSeeMore onClick={() => setShowAllFilteredProducts(true)}>Carregar mais produtos</S.ButtonSeeMore>
                ) : (
                  <S.ButtonSeeMore onClick={() => setShowAllFilteredProducts(false)}>Mostrar menos produtos</S.ButtonSeeMore>
                )}
              </React.Fragment>
            )}

            <S.ButtonCreate onClick={() => setBuildNewProduct(true)}>Criar Novo Produto</S.ButtonCreate>
            {buildNewProduct && (
              <Modal
              isOpen={buildNewProduct}
              onClose={closeModal}
            >
              <S.ContainerModal>
                <form onSubmit={handleAddProduct}>
                  <label>
                    <span>Nome do Produto</span>
                    <input
                      type="text"
                      required
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder='Nome do Produto'
                    />
                  </label>
                  <label>
                    <span>Descrição do Produto</span>
                    <textarea
                      value={description}
                      required
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Descrição do Produto"
                    />
                  </label>
                  <label>
                    <span>Preço do Produto</span>
                    <input
                      type="text"
                      value={price}
                      required
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Preço do Produto"
                    />
                  </label>
                  <label>
                    <span>URL da Imagem do Produto</span>
                    <input
                      type="text"
                      value={imageProduct}
                      required
                      onChange={(e) => setImageProduct(e.target.value)}
                      placeholder="URL da Imagem do Produto"
                    />
                  </label>
                  <label>
                    <span>Categoria</span>
                    <select required value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                      <option value="">Selecione uma categoria</option>
                      {response.categories.map((category: CategoryProps) => (
                        <option key={category.id} value={category.id}>{category.category}</option>
                      ))}
                    </select>
                  </label>
                  <S.ContainerButtons>
                    <S.ButtonCreate type='submit'>Criar Produto</S.ButtonCreate>
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
            <S.ContainerModal>
              <Image 
                src={selectedItem && selectedItem?.image && selectedItem?.image}
                alt="menu"
                width={340}
                height={200}
                loading="lazy"
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
                      value={price || selectedItem.price?.toString()}
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
                    <S.ButtonDelete onClick={handleDeleteProduct}>Excluir Produto</S.ButtonDelete>
                    <S.ButtonAdd onClick={handleEditProduct}>Editar Produto</S.ButtonAdd> 
                  </S.ContainerButtons>
                </>
              )}
            </S.ContainerModal>
          )}
        </Modal>
      )}
    </S.ContainerSection>
  )
}

export { ManageProducts } 