import React from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';

import image404 from '../../assets/images/404.png';

import './Error404.css';

export default function Error404() {
  return (
    <React.Fragment>
      <header>
        <NavBar />
      </header>
      <section className="Error404">
        <img src={image404} alt="404 not found..." />
        <h1>Oooppps! The page you are looking for was not found!</h1>
      </section>
      <Footer />
    </React.Fragment>
  );
}
