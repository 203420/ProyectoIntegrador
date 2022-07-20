import { Component} from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import '../App.css';

class Reporte extends Component {

    constructor(props) {
        super(props)
        this.state = {
            temperatura: [],
            humedad: [],
            tablaData: [],
            media: 0,
            desEst: 0,
            tamMuestra: 0,
            medMuestra: 0,
            datosMuestra: [],
        }
        this.getTemp = this.getTemp.bind(this);
        this.getHum = this.getHum.bind(this);
    }

    verify = (value) => {
        if (value === 1) {
            this.getTemp(value);
            
        } if (value === 2) {
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
                console.log(this.state.temperatura);
                setTimeout(() => { this.calculos(value); }, 100);
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    getHum = (value) => {
        axios.get("http://localhost:8000/django/datos/humedad", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token'),
            },
        })
            .then(res => {
                this.setState({ humedad: res.data });
                console.log(this.state.temperatura);
                setTimeout(() => { this.calculos(value); }, 100);
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    calculos = (value) => {
        let tamP = 0, tamM, error, z1 = 1.96, z2 = 1.645, r, k, a, UV = 0.1, log, aux, nClas;
        let datosOrden = [];

        if (value === 1) {
            tamP = this.state.temperatura.length;
            for (let i = tamP - 1; i >= 0; i--) {
                datosOrden.push(parseFloat(this.state.temperatura[i]["temperatura"]));
            }
        }
        if (value === 2) {
            tamP = this.state.humedad.length;
            for (let i = tamP -1; i >= 0; i--) {
                datosOrden.push(parseFloat(this.state.humedad[i]["humedadS"]));
            }
        }

        datosOrden.sort();
        console.log(datosOrden)


        r = datosOrden[datosOrden.length - 1] - datosOrden[0];
        log = 1 + 3.332 * Math.log10(tamP);
        k = Math.round(log)
        nClas = Math.round(k);
        if (nClas < k){
            nClas = nClas+1;
        }
        a = r / k;

        let aSrtr;

        aSrtr = a.toFixed(1);
        a = parseFloat(aSrtr);
        a = a + 0.1;
        
        let clases = [], limI = [], limS = [], limIE = [], limSE = [], MC = [], frec = [], frecAC = [], frecCMP = [];
        let mcFrec = 0, frecA = 0, acum = 0, limIStr, limIEStr, limSEStr, MCStr;

        limI[0] = datosOrden[0];
        for (let i = 0; i < nClas; i++) {
            let frecc = 0;

            clases[i] = i + 1;
            limS[i] = limI[i] + (a - UV);


            limIE[i] = limI[i] - (UV / 2);
            limIEStr = limIE[i].toFixed(2);
            limIE[i] = parseFloat(limIEStr);

            limSE[i] = limS[i] + (UV / 2);
            limSEStr = limSE[i].toFixed(2);
            limSE[i] = parseFloat(limSEStr);

            MC[i] = (limIE[i] + limSE[i]) / 2;
            MCStr = MC[i].toFixed(2);
            MC[i] = parseFloat(MCStr);

            for (let j = 0; j < datosOrden.length; j++) {
                if (datosOrden[j] >= limI[i] && datosOrden[j] <= limS[i]) {
                    frecc = frecc + 1;
                }
            }

            frec[i] = frecc;
            frecA = frec[i] + frecA;
            frecAC[i] = frecA;
            frecCMP[i] = datosOrden.length - frecAC[i];

            mcFrec = frec[i] * MC[i];
            acum = acum + mcFrec;

            if (i < (datosOrden.length - 1)) {
                limI[i + 1] = limI[i] + a
                limIStr = limI[i+1].toFixed(1);
                limI[i+1] = parseFloat(limIStr);
            }
        }

        let medStr, media = acum / tamP;
        medStr = media.toFixed(2);
        media = parseFloat(medStr); 

        if (isNaN(media) === false){
            this.setState ({media : media});
        }

        let empty = [];
        this.setState({ tablaData: empty})

        let dataVar = 0, data1, data2;

        for (let i = 0; i < clases.length; i++) {
            let arrayDatos = [];
            arrayDatos.push(clases[i]);
            arrayDatos.push(limI[i]);
            arrayDatos.push(limS[i]);
            arrayDatos.push(limIE[i]);
            arrayDatos.push(limSE[i]);
            arrayDatos.push(MC[i]);
            arrayDatos.push(frec[i]);
            arrayDatos.push(frecAC[i]);
            arrayDatos.push(frecCMP[i]);

            this.state.tablaData.push(arrayDatos);

            data1 = (MC[i] - this.state.media);
            data2 = Math.pow(data1, 2);
            dataVar = dataVar + ( data2 * frec[i]);
        }

        let varZ = dataVar/tamP;
        let desE = Math.sqrt(varZ);
        let desEStr = desE.toFixed(2);
        desE = parseFloat(desEStr);

        this.state.desEst = desE;
    
        console.log(this.state.tablaData);

        let z3 = Math.pow(z1, 2);
        error = Math.pow(0.05, 2);
        tamM = ( z3 * 0.5 * 0.5 * tamP)/ ((error * (tamP-1)+ z3 * 0.5 *0.5));
        tamM = Math.round(tamM);

        this.setState ({ tamMuestra: tamM});

        let cantStr, cant;
        cant = tamP/tamM;
        cantStr = cant.toFixed(2);
        cant = parseFloat(cantStr);
        
        console.log(cant);

        for (let i = tamP-1; i >= 0; i = i-cant) {
            if (value === 1) {
                this.state.datosMuestra.push(parseFloat(this.state.temperatura[i]["temperatura"]))
            }if (value === 2) {
                this.state.datosMuestra.push(parseFloat(this.state.humedad[i]["humedadS"]))
            }
        }
        let sum = this.state.datosMuestra.reduce((previous, current) => current += previous);
        let medM = sum/this.state.datosMuestra.length;
        this.setState ({medMuestra : medM});


        if(this.state.temperatura.length !== 0 || this.state.humedad.length !==0){
            this.generarPDF();
        }else{
            alert("Error al generar reporte, intente nuevamente")
        }
        
    }

    generarPDF () {
        var columnas = [["Clase", "L. Inferior", "L.Superior", "L.Inf Exacto", "L.Sup Exacto","Marca Clase", "Frec", "Frec. Ac", "Frec. CMP"]];
        let content = {
            startY: 25,
            theme: 'grid',
            font: 'helvetica',
            pageBreak: 'auto',
            head: columnas,
            body: this.state.tablaData
        };
        const doc = new jsPDF();

        doc.setFontSize(12);
        doc.text("Ultimas 200 mediciones", 15, 18);
        doc.autoTable(content);
        doc.text("Media de los datos: "+ this.state.media.toString(), 15, 90);
        doc.text("Desviación estandar: "+ this.state.desEst.toString(), 15, 100);
        doc.text("Tamaño de muestra calculado: "+ this.state.tamMuestra.toString(), 15, 110);
        doc.text("Media de la muestra: "+ this.state.medMuestra.toString(), 15, 120);
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
