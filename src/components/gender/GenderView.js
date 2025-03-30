import React, { useState, useEffect } from 'react';
import { createGender, getGender, updateGender } from '../../services/genderService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const GenderView = () => {

  const [ valuesForm, setValuesForm ] = useState({});
  const [ gender, setGender ] = useState([]);
  const { name = '', state = '' } = valuesForm;
  const [ genderSelect, setGenderSelect ] = useState(null);


  const listGender = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargado...'
      });
      Swal.showLoading();
      const resp = await getGender();
      setGender(resp.data);
      Swal.close();
    } catch (error) {
      console.log();
      Swal.close();
    }
  }

  useEffect(() => {
    listGender();
  }, [])

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  }

  const handleCreateGender = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargado...'
      });
      Swal.showLoading();
      if (genderSelect) {
        await updateGender(valuesForm, genderSelect);
        setGenderSelect(null);
      } else {
        await createGender(valuesForm);
      }
      setValuesForm({ name: '', state: '' });
      listGender();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  const handleUpdateGender = async (e, gender) => {
    e.preventDefault();
    setValuesForm({ name: gender.name, state: gender.state});
    setGenderSelect(gender._id);
  }

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={(e) => handleCreateGender(e)} >
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
        <button className="btn btn-primary mb-3">Guardar</button>
      </form>

      <table className='table'>
      <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Descripcion</th>
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            gender.length > 0 && gender.map((gender, index) => {
              return <tr>
                <th scope='row'> {index + 1} </th>
                <td> {gender.name} </td>
                <td> {gender.state} </td>
                <td>{gender.description}</td>
                <td> {moment(gender.createdAt).format('DD-MM-YYYY HH:mm')} </td>
                <td> {moment(gender.updatedAt).format('DD-MM-YYYY HH:mm')} </td>
                <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleUpdateGender(e, gender)}>Actualizar</button>
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