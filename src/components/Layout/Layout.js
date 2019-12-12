import React from 'react';
import Container from '@material-ui/core/Container';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';

export default function Layout({ containerClassName, children, sectionTitle }) {
  return (
    <React.Fragment>
      <header>
        <NavBar />
      </header>
      <Container className={containerClassName}>
        <main className="Main__Section">
          {sectionTitle && (
            <div className="Section__Title">
              <h2>{sectionTitle}</h2>
            </div>
          )}
          {children}
        </main>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
