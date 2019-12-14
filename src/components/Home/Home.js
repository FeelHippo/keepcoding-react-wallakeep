import React, { useState, useEffect, useCallback } from 'react';

import SettingsInputHdmiIcon from '@material-ui/icons/SettingsInputHdmi';
import Button from '@material-ui/core/Button';

import SearchPanel from '../SearchPanel/SearchPanel';
import AdvertCard from '../AdvertCard/AdvertCard';
import Paginator from '../Paginator/Paginator';
import Layout from '../Layout/Layout';

import imageError from '../../assets/images/error.png';
import imageSpinner from '../../assets/images/spinner.gif';

import './Home.css';

// Algunos ejemplos de uso de hooks
export default function Home({
  loadAdverts,
  searchAdverts,
  enqueueSnackbar,
  numPages,
  session,
  tags,
  adverts,
  numAdverts,
  loading,
  error,
}) {
  const [currentPage, setCurrentPage] = useState(0);

  const resetCurrentPage = () => setCurrentPage(0);

  const errorNotify = useCallback(
    () =>
      enqueueSnackbar('Error conectando con la API', {
        variant: 'error',
      }),
    [enqueueSnackbar],
  );

  const getAdverts = useCallback(
    filters => {
      const action = filters ? searchAdverts : loadAdverts;
      action(filters)
        .then(resetCurrentPage)
        .catch(errorNotify);
    },
    [searchAdverts, loadAdverts, errorNotify],
  );

  const handleMovePaginator = increment => {
    const newCurrentPage = currentPage + increment;
    if (newCurrentPage >= 0 && currentPage < numPages) {
      setCurrentPage(newCurrentPage);
    }
  };

  useEffect(() => {
    getAdverts();
  }, [getAdverts]);

  const minAdvert = currentPage * session.maxAdverts;
  const maxAdvert = currentPage * session.maxAdverts + session.maxAdverts;

  return (
    <Layout containerClassName="Container__Fill">
      <SearchPanel handleSearch={getAdverts} tags={tags} />
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
            onClick={() => getAdverts()}
          >
            Reconnect
          </Button>
        </div>
      ) : (
        <div className="Home__Results">
          <Paginator
            numPages={numPages}
            currentPage={currentPage}
            handleMovePaginator={handleMovePaginator}
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
            handleMovePaginator={handleMovePaginator}
          />
        </div>
      )}
    </Layout>
  );
}
