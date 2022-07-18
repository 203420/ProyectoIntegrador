import { Component } from 'react';
import { NavLink } from "react-router-dom"
import axios from "axios";
import '../App.css';

import reload from '../img/reload.png';
import Slider from './Slider';

class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      datos: [],
      temperatura: [],
      humedad: [],
    }
    this.get = this.get(this)
    //this.getTemp = this.getTemp(this) 
    //this.getHum = this.getHum(this)
    //this.exportDocument = this.exportDocument(this)
  }

  

  get() {
    axios.get("http://localhost:8000/django/datos/actual", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token'),
      },
    })
      .then(res => {
        console.log(res.data[0])
        this.setState({ datos: res.data })
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  getHist() {
    axios.get("http://localhost:8000/django/datos/temperatura", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token'),
      },
    })
      .then(res => {
        this.setState({ temperatura: res.data })
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  getTemp() {
    axios.get("http://localhost:8000/django/datos/temperatura", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token'),
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

  calculos = (value) => {
    let tamP, tamM, error = 0.05, z1 = 1.96, z2 = 1.645, r, k, a, UV, log, aux;
    let datosOrden = []
    if (value === 1){
        tamP = this.state.temperatura.length;
        datosOrden = this.state.temperatura;
    }
    if (value === 2){
        tamP = this.state.humedad.length;
        datosOrden = this.state.humedad;
    }
    datosOrden.sort();
      
  }


  render() {
    return (
      <body id='body'>
        <div className="img">
          <header>
            <nav id='nav'>
              <div><NavLink className="link" to="/datos"><h5>(logo) Softness</h5></NavLink></div>
              <div id='navText'><NavLink className="link" to="/historial">Historial</NavLink></div>
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
                <div className="infoHide" id="info1">Nivel de agua: {this.state.datos.nivelA}%</div>
                <div className="circle" id="c2"></div>
                <div className="infoHide" id="info2">Humedad del suelo: {this.state.datos.humedadS}%</div>
                <div className="circle" id="c3"></div>
                <div className="infoHide" id="info3">Temperatura: {this.state.datos.temperatura}°C</div>
                <div className="circle" id="c4"></div>
                <div className="infoHide" id="info4">Humedad: {this.state.datos.humedad}%</div>
              </div>
            </div>
          </main>

          <section id="info-plant">
            <div id="bottom">
              <h3 className="subtitle">Datos de la planta</h3>
              <section className="data">
                <div className="info">
                  <h5>Nivel de agua</h5>
                  <h2>{this.state.datos.nivelA}%</h2>
                </div>
                <div className="info">
                  <h5>Humedad del suelo</h5>
                  <h2>{this.state.datos.humedadS}%</h2>
                </div>
                <div className="info">
                  <h5>Temperatura</h5>
                  <h2>{this.state.datos.temperatura}°C</h2>
                </div>
                <div className="info">
                  <h5>Humedad</h5>
                  <h2>{this.state.datos.humedad}%</h2>
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
                  <div className='reporte' id='temp' onClick={() => this.calculos(1)}>
                    <section className="textoReporte">Generar reporte de temperatura</section>
                  </div>
                  <div className='reporte' id='hum' onClick={() => this.calculos(2)}>
                    <section className="textoReporte">Generar reporte de humedad</section>
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

}

export default Main;
