import React, { useState, useEffect } from 'react';
import { createType, getType, updateType } from '../../services/typeService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const TypeView = () => {

  const [ valuesForm, setValuesForm ] = useState({});
  const [ type, setType ] = useState([]);
  const { name = '', description = '' } = valuesForm;
  const [ typeSelect, setTypeSelect ] = useState(null);


  const listType = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargado...'
      });
      Swal.showLoading();
      const resp = await getType();
      setType(resp.data);
      Swal.close();
    } catch (error) {
      console.log();
      Swal.close();
    }
  }

  useEffect(() => {
    listType();
  }, [])

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  }

  const handleCreateType = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargado...'
      });
      Swal.showLoading();
      if (typeSelect) {
        await updateType(valuesForm, typeSelect);
        setTypeSelect(null);
      } else {
        await createType(valuesForm);
      }
      setValuesForm({ name: '', state: '' });
      listType();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  const handleUpdateType = async (e, type) => {
    e.preventDefault();
    setValuesForm({ name: type.name, state: type.state});
    setTypeSelect(type._id);
  }

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={(e) => handleCreateType(e)} >
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
              <label className="form-label">Descripcion</label>
              <input required name='description' value={description} type="text" className="form-select" onChange={(e) => handleOnChange(e)} >
              </input>
            </div>
          </div>
        </div>
        <button className="btn btn-primary mb-3">Guardar</button>
      </form>

      <table className='table'>
      <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            type.length > 0 && type.map((type, index) => {
              return <tr>
                <th scope='row'> {index + 1} </th>
                <td> {type.name} </td>
                <td> {type.description} </td>
                <td> {moment(type.createdAt).format('DD-MM-YYYY HH:mm')} </td>
                <td> {moment(type.updatedAt).format('DD-MM-YYYY HH:mm')} </td>
                <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleUpdateType(e, type)}>Actualizar</button>
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