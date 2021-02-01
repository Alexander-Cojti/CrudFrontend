import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import App from './App';
import Header from '../components/Header';

const cookies = new Cookies();
class Menu extends Component {
    cerrarSesion=()=>{
        cookies.remove('ID', {path: "/"});
        cookies.remove('USUARIO', {path: "/"});
        cookies.remove('ALIAS', {path: "/"});
        window.location.href='./';
    }
    componentDidMount() {
        if(!cookies.get('USUARIO')){
            window.location.href="./";
        }
    }
    render() {
        console.log('ID: '+ cookies.get('ID'));
        return (
            <div>
                <Header/>
                <App/>
            </div>
        );
    }
}

export default Menu;