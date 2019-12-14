import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Layout from '../Layout/Layout';
import imageSpinner from '../../assets/images/spinner.gif';

import './AdvertDetail.css';

// algun ejemplo mas de hooks
export default function AdvertDetail({
  loadAdvert,
  match: {
    params: { id },
  },
  loading,
  error,
  advert = {},
}) {
  useEffect(() => {
    loadAdvert(id);
  }, [loadAdvert, id]);

  if (error) return <Redirect to="/notfound" />;
  return (
    <Layout sectionTitle="Detalle del anuncio">
      {loading ? (
        <div className="Home__Loading">
          <img src={imageSpinner} className="Home__Spinner" alt="spinner" />
          <h2>Loading data from API</h2>
        </div>
      ) : (
        <article className="AdvertDetail">
          <div className="AdvertDetail__Main">
            <header className="AdvertDetail__Header">
              <Link to="/" className="AdvertDetail__Back">
                <KeyboardBackspaceIcon />
              </Link>
              <h1>{advert.name}</h1>
              <img className="Caption" src={advert.photo} alt="caption" />
            </header>
            <div className="AdvertDetail__Content">
              <h3 className="AdvertDetail__Type">
                {advert.type === 'buy' ? 'Compro' : 'Vendo'}
              </h3>
              <div className="AdvertDetail__Description">
                <p>{advert.description}</p>
              </div>
              <div className="AdvertDetail__Tags">
                {advert.tags &&
                  advert.tags.map((value, i) => {
                    return (
                      <Chip
                        key={i}
                        size="small"
                        label={value}
                        className={`Ad__Tag Ad__Tag--${value}`}
                      />
                    );
                  })}
              </div>
              <div className="AdvertDetail__Actions">
                <Link to={`/advert/${advert._id}/edit/`}>
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    startIcon={<EditIcon />}
                    className="ButtonWallakeep ButtonWallakeep__Green"
                  >
                    Editar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="AdvertDetail__Footer">
            <div className="AdvertDetail__Price">
              <p className="Text">Precio</p>
              <p className="Price">
                {advert.price} <span>€</span>
              </p>
            </div>
            <Moment className="AdvertDetail__Date" fromNow>
              {advert.createdAt}
            </Moment>
          </div>
        </article>
      )}
    </Layout>
  );
}
