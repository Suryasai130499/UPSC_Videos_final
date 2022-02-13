/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default async (
  libraryId,
  AccessKey
) => {
  try {
    const result = await axios.get(`http://video.bunnycdn.com/library/${libraryId}/collections`, {
      headers: {
        'AccessKey': AccessKey,
      }
    });
    if (result.data.errors) {
      return null;
    }

    return {
      Collections: result.data.items,
    };
  } catch (e) {
    return null;
  }
};