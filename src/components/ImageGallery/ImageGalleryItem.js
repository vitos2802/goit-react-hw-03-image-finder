import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, data, onClick }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt=""
        data-largeimageurl={data}
        onClick={e => onClick(e)}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
