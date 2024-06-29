import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export async function getImages(query, currentPage) {
  const params = {
    key: '44649525-fae4a92093e5fa87b7d67167e',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: 15,
  };

  const res = await axios.get('/api/', { params });
  return res.data;
}
