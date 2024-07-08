import axios from 'axios';

export const getLocal = async () => {

  const endpoint = 'https://cdn-dev.preoday.com/challenge/venue/9'

  try {
    const response = await axios.get(endpoint);
    return response;
    
  } catch (error) {
    console.error(error);
  }
};