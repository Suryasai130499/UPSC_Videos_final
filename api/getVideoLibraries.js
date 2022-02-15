/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default async (
  key,
) => {
  try {
    const result = await axios.get('https://api.bunny.net/videolibrary', {
      headers: {
        'AccessKey': key,
      }
    });
    if (result.data.errors) {
      return null;
    }

    return {
      ...result.data,
    };
  } catch (e) {
    return null;
  }
};