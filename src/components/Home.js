import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos del carrusel
import '../styles/home.css'; // Importa tus estilos personalizados

function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to the Video Game Store</h1>
        <p>Discover the finest collection of video games and accessories designed to bring endless fun and excitement.</p>
      </div>
      <div className="featured-products">
        <h2>Epic Adventures Await</h2>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          dynamicHeight={true}
          stopOnHover={true}
          interval={500} // Cambia el intervalo a 5 segundos
          className="carousel"
        >
          <div className="carousel-item">
            <img src="/images/game1.jpg" alt="Game 1" />
            <div className="carousel-caption">
              <h3>Epic Adventure Awaits</h3>
              <p>Join our hero in a quest through mystical lands and epic battles.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/images/game2.jpg" alt="Game 2" />
            <div className="carousel-caption">
              <h3>Unleash Your Creativity</h3>
              <p>Build, create, and explore in a sandbox world with endless possibilities.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/images/game3.jpg" alt="Game 3" />
            <div className="carousel-caption">
              <h3>Action-Packed Thrills</h3>
              <p>Experience high-octane action and adrenaline-pumping gameplay.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/images/accessory1.jpg" alt="Accessory 1" />
            <div className="carousel-caption">
              <h3>Enhance Your Gaming</h3>
              <p>Upgrade your gear with the latest gaming accessories for the ultimate experience.</p>
            </div>
          </div>
        </Carousel>
      </div>
      <div className="home-footer">
        <p>© 2024 Video Game Store. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Home;

