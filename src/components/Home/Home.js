import React, { Component } from 'react';

import SettingsInputHdmiIcon from '@material-ui/icons/SettingsInputHdmi';
import Button from '@material-ui/core/Button';

import SearchPanel from '../SearchPanel/SearchPanel';
import NodepopAPI from '../../services/NodepopAPI';
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
      numPages: 0,
      currentPage: 0,
    };
  }

  render() {
    // Variables para el paginado
    const { numPages, currentPage } = this.state;
    const { session, tags, loading, error } = this.props;
    const minAdvert = this.state.currentPage * session.maxAdverts;
    const maxAdvert =
      this.state.currentPage * session.maxAdverts + session.maxAdverts;

    return (
      <Layout containerClassName="Container__Fill">
        {loading && (
          <div className="Home__Loading">
            <img src={imageSpinner} className="Home__Spinner" alt="spinner" />
            <h2 className="Home__Subtitle">Fetching data from API</h2>
          </div>
        )}
        {!loading && this.state.adverts && (
          <div className="Home__Results">
            <SearchPanel handleSearch={this.handleSearch} tags={tags} />
            <Paginator
              numPages={numPages}
              currentPage={currentPage}
              handleMovePaginator={this.handleMovePaginator}
            />
            <section className="Home__Grid">
              {this.state.adverts.length > 0 &&
                this.state.adverts
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
                  ))}
              {this.state.adverts.length === 0 && (
                <h2 className="Home__Subtitle">
                  No hay anuncios que cumplan con los criterios de búsqueda
                </h2>
              )}
            </section>
            <Paginator
              numPages={numPages}
              currentPage={currentPage}
              handleMovePaginator={this.handleMovePaginator}
            />
          </div>
        )}
        {error && (
          <div className="Home__Error">
            <img src={imageError} className="Home__Spinner" alt="spinner" />
            <h2 className="Home__Subtitle">Failed to connect</h2>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<SettingsInputHdmiIcon />}
              className="Home__Reconnect"
              onClick={this.getAdverts}
            >
              Reconnect
            </Button>
          </div>
        )}
      </Layout>
    );
  }

  componentDidMount() {
    this.props.loadTags().then(this.getAdverts);
  }

  getAdverts = () => {
    const { session, enqueueSnackbar } = this.props;
    const { getAdverts } = NodepopAPI(session.apiUrl);
    getAdverts()
      .then(res => {
        const numPages = Math.ceil(res.length / session.maxAdverts);
        this.setState({
          adverts: res,
          currentPage: 0,
          numPages: numPages,
        });
      })
      .catch(() => {
        enqueueSnackbar('Error conectando con la API', {
          variant: 'error',
        });
      });
  };

  handleSearch = filters => {
    const { session, enqueueSnackbar } = this.props;
    // Llamo a la API con los filtros recibido
    const { searchAdvert } = NodepopAPI(session.apiUrl);
    searchAdvert(filters)
      .then(res => {
        const numPages = Math.ceil(res.length / session.maxAdverts);
        this.setState({
          adverts: res,
          currentPage: 0,
          numPages: numPages,
        });
      })
      .catch(() => {
        enqueueSnackbar('Error conectando con la API', {
          variant: 'error',
        });
      });
  };

  handleMovePaginator = increment => {
    // Actualizo la pagina actual
    let { currentPage, numPages } = this.state;
    currentPage += increment;
    // Actualizo el state sólo si sigue dentro de los limites (realmente este chequeo también lo hace el componete paginator)
    if (currentPage >= 0 && currentPage < numPages) {
      this.setState({
        currentPage,
      });
    }
  };
}
