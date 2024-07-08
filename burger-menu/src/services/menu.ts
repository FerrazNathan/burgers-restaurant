import axios from 'axios';

export const getMenu = async () => {

  const endpoint = 'https://cdn-dev.preoday.com/challenge/menu'

  try {
    const response = await axios.get(endpoint);
    return response.data;

  } catch (error) {
    console.error('Error in getMenu');
    throw error;
  }
};