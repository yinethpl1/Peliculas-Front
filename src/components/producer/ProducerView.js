import React, { useState, useEffect } from 'react';
import { createProducer, getProducer, updateProducer } from '../../services/producerService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const ProducerView = () => {

  const [ valuesForm, setValuesForm ] = useState({});
  const [ producer, setProducer ] = useState([]);
  const { name = '', state = '', slogan = '', description = '' } = valuesForm;
  const [ producerSelect, setProducerSelect ] = useState(null);


  const listProducer = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargado...'
      });
      Swal.showLoading();
      const resp = await getProducer();
      setProducer(resp.data);
      Swal.close();
    } catch (error) {
      console.log();
      Swal.close();
    }
  }

  useEffect(() => {
    listProducer();
  }, [])

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  }

  const handleCreateProducer = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargado...'
      });
      Swal.showLoading();
      if (producerSelect) {
        await updateProducer(valuesForm, producerSelect);
        setProducerSelect(null);
      } else {
        await createProducer(valuesForm);
      }
      setValuesForm({ name: '', state: '' });
      listProducer();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  const handleUpdateProducer = async (e, producer) => {
    e.preventDefault();
    setValuesForm({ name:producer.name, state: producer.state});
    setProducerSelect(producer._id);
  }

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={(e) => handleCreateProducer(e)} >
        <div className="row">
          <div className="col-lg-8">
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='name' value={name} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select required name='state' value={state} className="form-select" onChange={(e) => handleOnChange(e)} >
                <option selected>--SELECCIONE--</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div> 
                   
          </div>
          
        </div>
        <div className="col-lg-8">
            <div className="mb-3">
              <label className="form-label">Slogan</label>
              <input required name='slogan' value={slogan} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
            </div>
            <div className="col-lg-8">
            <div className="mb-3">
              <label className="form-label">Descripcion</label>
              <input required name='description' value={description} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
            </div>
        <button className="btn btn-primary mb-3">Guardar</button>
      </form>

      <table className='table'>
      <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            producer.length > 0 && producer.map((producer, index) => {
              return <tr>
                <th scope='row'> {index + 1} </th>
                <td> {producer.name} </td>
                <td> {producer.state} </td>
                <td> {moment(producer.createdAt).format('DD-MM-YYYY HH:mm')} </td>
                <td> {moment(producer.updatedAt).format('DD-MM-YYYY HH:mm')} </td>
                <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleUpdateProducer(e, producer)}>Actualizar</button>
                  <button className='btn btn-danger btn-sm'>Eliminar</button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>

    </div>
  )
}