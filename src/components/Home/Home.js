import React, { Component } from 'react';

import SettingsInputHdmiIcon from '@material-ui/icons/SettingsInputHdmi';
import Button from '@material-ui/core/Button';

import SearchPanel from '../SearchPanel/SearchPanel';
import AdvertCard from '../AdvertCard/AdvertCard';
import Paginator from '../Paginator/Paginator';
import Layout from '../Layout/Layout';

import imageError from '../../assets/images/error.png';
import imageSpinner from '../../assets/images/spinner.gif';

import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
    };
  }

  componentDidMount() {
    this.getAdverts();
  }

  setCurrentPage = currentPage => this.setState({ currentPage });

  resetCurrentPage = () => this.setCurrentPage(0);

  errorNotify = () =>
    this.props.enqueueSnackbar('Error conectando con la API', {
      variant: 'error',
    });

  getAdverts = filters => {
    const { loadAdverts, searchAdverts } = this.props;
    const action = filters ? searchAdverts : loadAdverts;
    action(filters)
      .then(this.resetCurrentPage)
      .catch(this.errorNotify);
  };

  handleMovePaginator = increment => {
    const { numPages } = this.props;
    const { currentPage } = this.state;
    const newCurrentPage = currentPage + increment;
    if (newCurrentPage >= 0 && currentPage < numPages) {
      this.setCurrentPage(newCurrentPage);
    }
  };

  render() {
    const { currentPage } = this.state;
    const {
      session,
      tags,
      adverts,
      numAdverts,
      numPages,
      loading,
      error,
    } = this.props;
    const minAdvert = this.state.currentPage * session.maxAdverts;
    const maxAdvert =
      this.state.currentPage * session.maxAdverts + session.maxAdverts;

    return (
      <Layout containerClassName="Container__Fill">
        <SearchPanel handleSearch={this.getAdverts} tags={tags} />
        {loading ? (
          <div className="Home__Loading">
            <img src={imageSpinner} className="Home__Spinner" alt="spinner" />
            <h2 className="Home__Subtitle">Fetching data from API</h2>
          </div>
        ) : error ? (
          <div className="Home__Error">
            <img src={imageError} className="Home__Spinner" alt="spinner" />
            <h2 className="Home__Subtitle">Failed to connect</h2>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<SettingsInputHdmiIcon />}
              className="Home__Reconnect"
              onClick={() => this.getAdverts()}
            >
              Reconnect
            </Button>
          </div>
        ) : (
          <div className="Home__Results">
            <Paginator
              numPages={numPages}
              currentPage={currentPage}
              handleMovePaginator={this.handleMovePaginator}
            />
            <section className="Home__Grid">
              {numAdverts === 0 ? (
                <h2 className="Home__Subtitle">
                  No hay anuncios que cumplan con los criterios de búsqueda
                </h2>
              ) : (
                adverts
                  .slice(minAdvert, maxAdvert)
                  .map(advert => (
                    <AdvertCard
                      key={advert._id}
                      id={advert._id}
                      name={advert.name}
                      description={advert.description}
                      price={advert.price}
                      type={advert.type}
                      photo={advert.photo}
                      tags={advert.tags}
                      createdAt={advert.createdAt}
                    />
                  ))
              )}
              }
            </section>
            <Paginator
              numPages={numPages}
              currentPage={currentPage}
              handleMovePaginator={this.handleMovePaginator}
            />
          </div>
        )}
      </Layout>
    );
  }
}
