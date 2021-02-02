/*eslint-disable no-unused-vars*/
import React from 'react';
import { Container } from 'react-bootstrap';
/*eslint-enable no-unused-vars*/
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <main>
      <Container fluid className="homepage-container">
        <Container className="slogan-container">
          <div className="float-right home-content">
            <h1>
              Welcome to ShipCare
              <br />
              Onestop delivery solution
            </h1>
            <h4>
              We make it simple to keep track of your deliveries.
              <br />
              We provide the latest update for every package.
              <br />
              It is safe to let ShipCare take care of your shipments.
            </h4>
          </div>
        </Container>
      </Container>
    </main>
  );
};

export default HomePage;
