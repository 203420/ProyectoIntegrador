import { Component, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import '../App.css';

class Reporte extends Component {

    constructor(props) {
        super(props)
        this.state = {
            temperatura: [],
            humedad: [],
            tablaData: [],
            datosExtra: [],
        }
        this.getTemp = this.getTemp(this)
        this.getHum = this.getHum(this)
        this.calculos = this.calculos(this)
        this.generarPDF = this.generarPDF(this)
    }

    verify = (value) =>{
        if (value===1){
            this.getTemp(value);
        } if (value===2){
            this.getHum(value);
        }
    }

    getTemp = (value) => {
        axios.get("http://localhost:8000/django/datos/temperatura", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token'),
            },
        })
            .then(res => {
                this.setState({ temperatura: res.data });
                this.calculos(value);
                
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    getHum = (value) => {
        axios.get("http://localhost:8000/django/datos/humedad", {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                this.setState({ humedad: res.data });
                this.calculos(value);
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    calculos = (value) => {
        let tamP, tamM, error = 0.05, z1 = 1.96, z2 = 1.645, r, k, a, UV = 1, log, aux;
        let datosOrden = []

        if (value === 1) {
            tamP = this.state.temperatura.length;
            datosOrden = this.state.temperatura;
        }
        if (value === 2) {
            tamP = this.state.humedad.length;
            datosOrden = this.state.humedad;
        }
        datosOrden.sort();

        r = datosOrden[datosOrden.length - 1] - datosOrden[0];
        log = 1 + 3.332 * Math.log10(tamP);
        k = Math.round(log)
        a = r / k;
        if (a % 1 === 0) {
            a = a + 1
        } else {
            aux = Math.round(a);
            if (aux < a) {
                a = aux + 1;
            } else { a = aux }
        }

        let clases = [], limI = [], limS = [], limIE = [], limSE = [], MC = [], frec = [], frecAC = [], frecCMP = []

        let linf = datosOrden[0];
        for (let i = 0; i < datosOrden.length; index++) {
            const element = array[index];
            
        }
        
        
        this.setState({tablaData: clases})
        this.setState({tablaData: limI})
        this.setState({tablaData: limS})
        this.setState({tablaData: limIE})
        this.setState({tablaData: limSE})
        this.setState({tablaData: MC})
        this.setState({tablaData: frec})
        this.setState({tablaData: frecAC})
        this.setState({tablaData: frecCMP})
    }

    generarPDF = () => {
        const doc = new jsPDF("portrait", "px", "a4", "false");

        var columnas = ["Clase", "L. Inferior", "L.Superior", "L.Inf Exacto", "L.Sup Exacto", "Frec", "Frec. Ac", "Frec. CMP"];

        doc.text("Ultimas 200 mediciones", 20, 30);
        doc.autoTable(columnas, this.state.tablaData, {margin: {top:45}});
        doc.text("Media: "+this.state)

        doc.save("Reporte.pdf");
    }

    render() {
        return (
            <>
                <h3 className="subtitle">Reportes estadisticos</h3>
                <section className="data">

                    <div className='reporte' id='temp' onClick={() => this.verify(1)}>
                        <section className="textoReporte">Generar reporte de temperatura</section>
                    </div>
                    <div className='reporte' id='hum' onClick={() => this.verify(2)}>
                        <section className="textoReporte">Generar reporte de humedad</section>
                    </div>
                </section>
            </>
        );
    }

}

export default Reporte;
