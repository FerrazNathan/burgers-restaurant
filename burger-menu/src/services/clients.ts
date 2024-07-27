import axios from 'axios';

export const getLocal = async () => {

  const endpoint = 'https://burgers-restaurant-af6f2-default-rtdb.firebaseio.com/clients.json'

  try {
    const response = await axios.get(endpoint);
    return response;
    
  } catch (error) {
    console.error(error);
  }
};