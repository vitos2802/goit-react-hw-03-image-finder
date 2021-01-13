const key = '18770359-69995c75016210012c9ceb955';

const fetchImage = (inputValue, page) => {
  return fetch(
    `https://pixabay.com/api/?q=${inputValue}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Нет картинки с названием ${inputValue}`));
  });
};

const imageApi = {
  fetchImage,
};

export default imageApi;
