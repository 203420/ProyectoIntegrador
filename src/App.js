import { Component } from 'react';
import axios from "axios";
import './App.css';

import reload from './img/reload.png';
import tempImg from './img/temp.jpg';
import humImg from './img/hum.jpg';

import Slider from './componentes/Slider';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      datos: [],
      temperatura: [],
      humedad: [],
    }
    this.get = this.get(this)
    this.getTemp = this.getTemp(this) 
    this.getHum = this.getHum(this)
    this.exportDocument = this.exportDocument(this)
  }

  get() {
    axios.get("http://localhost:8000/django/datos/actual", {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        this.setState({ datos: res.data })
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  getTemp() {
    axios.get("http://localhost:8000/django/datos/temperatura", {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        this.setState({ temperatura: res.data })
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  getHum() {
    axios.get("http://localhost:8000/django/datos/humedad", {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        this.setState({ humedad: res.data })
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  exportDocument() {

  }

  render() {
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
                <img src={reload} alt="error" id="reload" onClick={this.get}/>
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
                <Slider></Slider>
              </div>
              <div id="infoSlider">
                <h3 className="subtitle">Crecimiento de la planta</h3>
              </div>
            </div>
            <div id="bottom3">
              <h3 className="subtitle">Reportes estadisticos</h3>
              <section className="data">
                  <div className='reporte' id='temp'>
                    <section className="textoReporte">Generar reporte de temperatura</section>
                  </div>
                  <div className='reporte' id='hum'>
                    <section className="textoReporte">Generar reporte de humedad</section>
                  </div>
              </section>
            </div>
          </section>

          <footer>
            <p>203420 - 203721 - 191287</p>
            <br />
            <h4>Proyecto Integrador 6° Cuatrimestre</h4>
          </footer>
        </div>
      </body>
    );
  }

}

export default App;
