import './App.css';
import reload from './img/reload.png';
import slider from './img/slider.jpg';

function App() {
  return (
    <body>
      <div className="img">
        <header>
          <nav>
            <h5>(logo) Softness</h5>
          </nav>
        </header>

        <main>
          <div id="top">
            <h2>Monitoreo de Lechuga</h2>
            <div id="details">
              <a href="#info-plant"><button className="main-button">Ver datos de la planta</button></a>
              <img src={reload} alt="error" id="reload"/>
            </div>
            <div id="img2">
              <div className="circle" id="c1"></div>
              <div className="infoHide" id="info1">Temperatura del suelo: 22°C</div>
              <div className="circle" id="c2"></div>
              <div className="infoHide" id="info2">Humedad del suelo: 50%</div>
              <div className="circle" id="c3"></div>
              <div className="infoHide" id="info3">Temperatura ambiente: 28°C</div>
              <div className="circle" id="c4"></div>
              <div className="infoHide" id="info4">Humedad del aire: 46%</div>
            </div>
          </div>
        </main>

        <section id="info-plant">
          <div id="bottom">
            <h3 className="subtitle">Datos de la planta</h3>
            <section className="data">
              <div className="info">
                <h5>Temperatura suelo</h5>
                <h2>22°C</h2>
              </div>
              <div className="info">
                <h5>Humedad del suelo</h5>
                <h2>50%</h2>
              </div>
              <div className="info">
                <h5>Temperatura ambiente</h5>
                <h2>28°C</h2>
              </div>
              <div className="info">
                <h5>Humedad del aire</h5>
                <h2>46%</h2>
              </div>
            </section>
          </div>
          <div id="bottom2">
            <div id="slider">
              <img src={slider} alt="error" />
            </div>
            <div id="infoSlider">
              <h3 className="subtitle">Crecimiento de la planta</h3>
            </div>
          </div>
          <div id="bottom3">
            <h3 className="subtitle">Mas información</h3>
            <section className="data">
              <div className="info">
                <h5>Media de temperatura</h5>
                <h2>23.5°C</h2>
              </div>
              <div className="info">
                <h5>Media de humedad</h5>
                <h2>46%</h2>
              </div>
              <div className="info">
                <h5>Mediana de temperatura</h5>
                <h2>23.5°C</h2>
              </div>
              <div className="info">
                <h5>Mediana de humedad</h5>
                <h2>46%</h2>
              </div>
              <div className="info">
                <h5>Moda de temperatura</h5>
                <h2>22°C</h2>
              </div>
              <div className="info">
                <h5>Moda de humedad</h5>
                <h2>37%</h2>
              </div>
              <div className="info">
                <h5>Moda de humedad</h5>
                <h2>37%</h2>
              </div>
              <div className="info">
                <h5>Moda de humedad</h5>
                <h2>37%</h2>
              </div>
            </section>
          </div>
        </section>

        <footer>
          <p>203420 - 203721 - 191287</p>
          <br/>
            <h4>Proyecto Integrador 6° Cuatrimestre</h4>
        </footer>
      </div>
    </body>
  );
}

export default App;
