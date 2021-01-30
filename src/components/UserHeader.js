import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserHeader';
// import Documents from './components/documents';
import Data from './Data';
import Main from './Main';
import AuthContext from '../services/Auth';


const Header = class UserHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    }
 
    this.changeComponent = this.changeComponent.bind(this);
    this.changeCompMen = this.changeCompMen.bind(this);
  }

  componente() {
    let now = this.state.page;
    if (now === 0) {
      return (<Main />)
    } if (now === 1) {
      return (<Data />)
    }
  }

  changeComponent() {

    this.setState({
      page: 1
    })
  }

  changeCompMen() {

    this.setState({
      page: 0
    })
  }



  render() {
    return (
      <div className="App_nav">
        <nav className="navbar navbar-expand-lg navbar-dark bg-white">
          <button className="btn " onClick={this.changeCompMen} >MP-JES</button>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <button type="button" className="btn btn-white" onClick={this.changeComponent}> Registros </button>
              </li>
              <li>
          <button type="button" className="btn btn-white "   onClick={ () => AuthContext.logOut() }>Logout</button>
        </li>  
       
            </ul>
          </div>
        </nav>
        {this.componente()}
      </div>

    )
  }
}
export default Header;