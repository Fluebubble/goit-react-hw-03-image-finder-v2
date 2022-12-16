import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';

const getImages = async (query, page) => {
  const response = await axios.get(`api/`, {
    params: {
      q: query,
      page,
      key: '29576888-5bcf4584c20a5ab12bd038a49',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 15,
    },
  });

  // const response = await axios.get('', {
  //   params: {
  //     q: query,
  //     page,
  //     key: '29576888-5bcf4584c20a5ab12bd038a49',
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     per_page: 15,
  //   },
  // });

  return response.data.hits;
};

export default getImages;
