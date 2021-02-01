import React, {useEffect, useState} from 'react';
// import './App.css';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';
import '../css/Login.css';

const baseUrl='http://localhost:8083/service/Office/'

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function App() {
const styles= useStyles();
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada]=useState({
    ID:'',
    NAMEOFFICE:'',
    LOCATION:'',
    PHONE:'',
    LONGITUD:'0',
    LATITUD:'0'
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(consolaSeleccionada);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
      console.log(response.data)
    })
  }

  const peticionPost=async()=>{
    await axios.post(baseUrl, consolaSeleccionada)
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
    })
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+consolaSeleccionada.ID, consolaSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(consola=>{
        if(consolaSeleccionada.ID===consola.ID){
          consola.NAMEOFFICE=consolaSeleccionada.NAMEOFFICE;
          consola.LOCATION=consolaSeleccionada.LOCATION;
          consola.PHONE=consolaSeleccionada.PHONE;
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+consolaSeleccionada.ID)
    .then(response=>{
      setData(data.filter(consola=>consola.ID!==consolaSeleccionada.ID));
      abrirCerrarModalEliminar();
    })
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarConsola=(consola, caso)=>{
    setConsolaSeleccionada(consola);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  useEffect(async()=>{
    await peticionGet();
  },[])

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nueva Oficina</h3>
      <TextField name="NAMEOFFICE" className={styles.inputMaterial} label="Nombre" onChange={handleChange}/>
      <br />
      <TextField name="LOCATION" className={styles.inputMaterial} label="Direccion" onChange={handleChange}/>
      <br />
      <TextField name="PHONE" className={styles.inputMaterial} label="Telefono" onChange={handleChange}/>
      <br /><br />
      <div align="right">
        <Button color="PRIMARY" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Oficina</h3>
      <TextField name="NAMEOFFICE" className={styles.inputMaterial} label="Oficina" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.NAMEOFFICE}/>
      <br />
      <TextField name="LOCATION" className={styles.inputMaterial} label="Direccion" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.LOCATION}/>
      <br />
      <TextField name="PHONE" className={styles.inputMaterial} label="Telefono" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.PHONE}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
       <h3>Eliminar Oficina</h3>
      <p>Estás seguro que deseas eliminar la Oficina <b>{consolaSeleccionada && consolaSeleccionada.NAMEOFFICE}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  )


  return (
    <div className="App">
      <br />
    <Button variant="outlined" color="primary" onClick={()=>abrirCerrarModalInsertar()}>
      Insertar</Button>
      <br /><br />
     <TableContainer>
       <Table >
         <TableHead>
           <TableRow >
             <TableCell>ID</TableCell>
             <TableCell>OFICINA</TableCell>
             <TableCell>DIRECCION</TableCell>
             <TableCell>TELEFONO</TableCell>
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(consola=>(
             <TableRow key={consola.ID}>
               <TableCell>{consola.ID}</TableCell>
               <TableCell>{consola.NAMEOFFICE}</TableCell>
               <TableCell>{consola.LOCATION}</TableCell>
               <TableCell>{consola.PHONE}</TableCell>
               <TableCell>
                 <Edit className={styles.iconos} onClick={()=>seleccionarConsola(consola, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={styles.iconos} onClick={()=>seleccionarConsola(consola, 'Eliminar')}/>
                 </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     
     <Modal
     open={modalInsertar}
     onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
     </Modal>

     <Modal
     open={modalEditar}
     onClose={abrirCerrarModalEditar}>
        {bodyEditar}
     </Modal>

     <Modal
     open={modalEliminar}
     onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
     </Modal>
    </div>
  );
}

export default App;
