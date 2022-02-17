/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default async (libraryId) => {
  try {
    const result = await axios.get(`https://jsonkeeper.com/b/T72V`, {});
    if (result.data.errors) {
      return null;
    }

    return {
      apiKey: result.data.BUNNY_API_KEY,
      tokenKey: result.data.TOKEN_AUTH_KEY,
    };
  } catch (e) {
    return null;
  }
};