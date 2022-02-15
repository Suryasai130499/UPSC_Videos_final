/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default async (libraryId) => {
  try {
    const result = await axios.get(`https://jsonkeeper.com/b/QUM3`, {});
    if (result.data.errors) {
      return null;
    }

    return {
      apiKey: result.data.BUNNY_API_KEY,
    };
  } catch (e) {
    return null;
  }
};