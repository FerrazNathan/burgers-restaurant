import axios from 'axios';

export const getMenu = async () => {

  const endpoint = 'https://burgers-restaurant-af6f2-default-rtdb.firebaseio.com/products.json'

  try {
    const response = await axios.get(endpoint);
    return response.data['-O2wuwtlN6h_ql_cAQK8'];
  } catch (error) {
    console.error('Error in getMenu');
    throw error;
  }
};