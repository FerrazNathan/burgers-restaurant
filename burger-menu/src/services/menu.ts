import axios from 'axios';

export const getMenu = async () => {

  const endpoint = 'https://burgers-restaurant-af6f2-default-rtdb.firebaseio.com/products.json'

  try {
    const response = await axios.get(endpoint);
    console.log('RESPONSE =>', response.data['-O2Sy_EEcx09kCRzfeAh']);
    return response.data['-O2Sy_EEcx09kCRzfeAh'];
  } catch (error) {
    console.error('Error in getMenu');
    throw error;
  }
};