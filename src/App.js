import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import imageApi from './services/imageApi';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from 'react-loader-spinner';
import Modal from './components/Modal';
import Container from './components/Container';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    showButton: false,
    activeImage: '',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;

    if (this.state.query !== prevQuery || prevState.page !== this.state.page) {
      this.fetchImage();
    }
  }

  fetchImage = () => {
    imageApi
      .fetchImage(this.state.query, this.state.page)
      .then(res => {
        const { hits } = res;

        if (!hits.length) {
          toast.error(`По запросу ${this.state.query} ничего нет!`);
        }

        if (!!hits.length) {
          toast.success('Запрос выполнен успешно!');
          this.setState(({ images }) => ({
            images: [...images, ...hits],
            isLoading: false,
            showButton: true,
          }));
        }

        if (hits.length < 12) {
          this.setState({
            showButton: false,
          });
          console.log(hits.length);
        }

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  handleFormSubmit = query => {
    this.setState({
      query,
      images: [],
      page: 1,
      showButton: false,
    });
  };

  handleLoadMore = () => {
    this.setState(({ page }) => ({
      isLoading: true,
      page: (page += 1),
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openModal = ({ target }) => {
    this.setState({
      activeImage: target.dataset,
    });
    this.toggleModal();
  };

  render() {
    const { showModal, images, activeImage, showButton } = this.state;
    return (
      <Container>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={activeImage.largeimageurl} alt="" />
          </Modal>
        )}

        <Searchbar onSubmit={this.handleFormSubmit} />
        {images && <ImageGallery images={images} onClick={this.openModal} />}
        {showButton && (
          <Button onClick={this.handleLoadMore}>
            {this.state.isLoading ? (
              <Loader type="Puff" color="#00BFFF" height={10} width={10} />
            ) : (
              'Load more...'
            )}
          </Button>
        )}
        <ToastContainer />
      </Container>
    );
  }
}

export default App;
