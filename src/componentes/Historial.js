import { Component } from 'react';
import { NavLink } from "react-router-dom"
import axios from "axios";
import '../App.css';

class Historial extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listaDatos: [],
        }
        this.get = this.get(this)
    }

    get() {
        axios.get("http://localhost:8000/django/datos/lista", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token'),
            },
        })
            .then(res => {
                console.log(res.data)
                this.setState({ listaDatos: res.data })
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    render() {
        return (
            <body id='body'>
                <div>
                    <header>
                        <nav id='nav'>
                            <div><NavLink className="link" to="/datos"><h5>Softness</h5></NavLink></div>
                            <div id='navText'><NavLink className="link" to="/historial">Historial</NavLink></div>
                        </nav>
                    </header>

                    <main>
                        <div className='tableData'>
                            <h1 className="subtitle" id="title-table">Historial de mediciones</h1>
                            <table id="table">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Nivel agua%</th>
                                        <th>Humedad Suelo%</th>
                                        <th>Temperatura°C</th>
                                        <th>Humedad%</th>
                                        <th>Riego</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.listaDatos.map(listaDatos => <tr className="info-table" key={listaDatos.id}>
                                            <td>{listaDatos.fecha}</td>
                                            <td>{listaDatos.nivelA}</td>
                                            <td>{listaDatos.humedadS}</td>
                                            <td>{listaDatos.temperatura}</td>
                                            <td>{listaDatos.humedad}</td>
                                            <td>{listaDatos.riego}</td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                        <p>*Datos se actualizan cada: 5 segundos</p>
                    </main>

                </div>
            </body>
        );
    }

}

export default Historial;
