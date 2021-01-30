import React from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import { CSVLink } from "react-csv";

const apiMP_get= process.env.REACT_APP_apiMP_get;
const apiMP_delete= process.env.REACT_APP_apiMP_delete;

export default class Data extends React.Component {
  state = {
    offices: []
  };
  componentDidMount() {
    this.getDocuments();
  }

  getDocuments = async () => {
    await axios.get(apiMP_get, {}).then(res => {
      const offices = res.data;
      this.setState({ offices });
    });
  };

  async deletefn(id) {
    await axios.delete(apiMP_delete+  + id, {})
    .then(function(res) {});
    this.getDocuments(); // recargar el get
  };

  async deleteAll () {
    await axios.delete(apiMP_get, {})
    .then(function(res) {});
    this.getDocuments();
  };

  render() {
    return (
      <div>
        <table className="table table-sm table-bordered table-responsive">
          <thead>
            <tr>
              <th scope="col">CORRELATIVO</th>
              <th scope="col">NOMBRE FISCALÍA</th>
              <th scope="col">UBICACIÓN</th>
              <th scope="col">TELEFONO</th>
              <th scope="col">
              <Popup
                  trigger={
                    <button className="btn btn-danger btn-sm"> DELETE-ALL</button>
                  }
                  modal
                >
                  {close => (
                    <div>
                      <div className="content">
                        {" "}
                        ¿Está seguro de eliminar todos los registros?
                        <br />
                      </div>
                      <div className="actions">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            console.log("modal closed ");
                            close();
                            this.deleteAll();
                          }}
                        >
                          Aceptar
                        </button>

                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            console.log("modal closed ");
                            close();
                          }}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </th>
              <th>
              <CSVLink
          data={this.state.offices}
          separator={";"}
          filename={"BackupFiscalías.csv"}
        >
          <button className="btn btn-success btn-sm">Download File</button>
        </CSVLink>
              </th>
            </tr>
          </thead>
          {this.state.offices.map(office => (
            <tr>
              <td> {office.Id} </td>
              <td> {office.NameOffice} </td>
              <td> {office.Location} </td>
              <td> {office.Phone} </td>
              <td>
                <Popup
                  trigger={
                    <button className="btn btn-info btn-sm"> EDIT</button>
                  }
                  modal
                >
                  {close => (
                    <div>
                      <div className="content">
                        {" "}
                        ¿Quieres Editar el regristro?
                        <br />
                      </div>
                      <div className="actions">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            console.log("modal closed ");
                            close();
                            // this.deletefn(office.Id);
                          }}
                        >
                          Aceptar
                        </button>

                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            console.log("modal closed ");
                            close();
                          }}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              
                <Popup
                  trigger={
                    <button className="btn btn-warning btn-sm"> DELETE </button>
                  }
                  modal
                >
                  {close => (
                    <div>
                      <div className="content">
                        {" "}
                        ¿Quieres eliminar el registro?
                        <br />
                      </div>
                      <div className="actions">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            console.log("modal closed ");
                            close();
                            this.deletefn(office.Id);
                          }}
                        >
                          Aceptar
                        </button>

                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            console.log("modal closed ");
                            close();
                          }}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
