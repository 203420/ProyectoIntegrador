import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../App.css';

function Login () {
    let navigate = useNavigate();

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const login = () => {
        var postData = {
            username: document.getElementById('user').value,
            password: document.getElementById('passw').value
        }

        axios
            .post("http://192.168.198.18/neotech/login", postData, requestOptions)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user_id', response.data.user_id);
                navigate('/datos',{replace:true});
            })
            .catch((error) => {
                console.log(error.response.data)
                if (error.response.data.username || error.response.data.password) {
                    alert("No puedes dejar campos vacios");
                }
                if (error.response.data.non_field_errors) {
                    alert("No puedes iniciar sesión con las credenciales proporcionadas")
                }
            });
    };

    return (
        <body>
            <div className="form-boxUser">
                <h1 id="title-user">Softness Plants</h1>
                <div className="form-user">
                    <label className="labelUser">Usuario:</label> 
                    <input className="inputUser" id="user" type="text" name= "usuario" placeholder="Usuario"/> 
                    <label className="labelUser">Contraseña:</label> 
                    <input className="inputUser" id="passw" type="password" name= "password" placeholder="Contraseña"/>
                    <br/><button className="buttonUser" onClick={login}>Ingresar</button>
                </div>
            </div>
        </body>
    );
}

export default Login;