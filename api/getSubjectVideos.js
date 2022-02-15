/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default async (
  key,
  collectionId,
  libraryId,
) => {
  try {
    const result = await axios.get(`http://video.bunnycdn.com/library/${libraryId}/videos`, {
      params: {
        collection: collectionId,
        orderBy: 'title',
      },
      headers: {
        'AccessKey': key,
      }
    });
    if (result.data.errors) {
      return null;
    }

    return [
      ...result.data.items,
    ];
  } catch (e) {
    return null;
  }
};