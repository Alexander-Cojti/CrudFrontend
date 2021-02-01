import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';


const baseUrl="http://localhost:8083/service/Login/";
const cookies = new Cookies();

class Login extends Component {
    state={
        form:{
            username: '',
            password: ''
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    iniciarSesion=async()=>{
        await axios.get(baseUrl+this.state.form.username+'/'+ md5(this.state.form.password))
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.ID!=null){
                var respuesta=response;
                cookies.set('ID', respuesta.ID, {path: "/"});
                cookies.set('USUARIO', respuesta.USUARIO, {path: "/"});
                cookies.set('ALIAS', respuesta.ALIAS, {path: "/"});
                window.location.href="./menu";
            }else{
                console.log(response);
                alert('Usuario o contraseña no existe');
            }
        })
        .catch(error=>{
            console.log(error);
        })

    }

    componentDidMount() {
        if(cookies.get('USUARIO')){
            window.location.href="./menu";
        }
    }

    render() {
        return (
    <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={this.handleChange}
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange}
            />
            <br />
            <button className="btn btn-primary" onClick={()=> this.iniciarSesion()}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
        );
    }
}

export default Login;