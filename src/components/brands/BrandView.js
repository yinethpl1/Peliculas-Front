import React, { useState, useEffect } from 'react';
import { createBrand, getBrands, updateBrand } from '../../services/brandService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const BrandView = () => {

  const [ valuesForm, setValuesForm ] = useState({});
  const [ brands, setBrands ] = useState([]);
  const { name = '', state = '' } = valuesForm;
  const [ brandSelect, setBrandSelect ] = useState(null);


  const listBrands = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargado...'
      });
      Swal.showLoading();
      const resp = await getBrands();
      setBrands(resp.data);
      Swal.close();
    } catch (error) {
      console.log();
      Swal.close();
    }
  }

  useEffect(() => {
    listBrands();
  }, [])

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  }

  const handleCreateBrand = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargado...'
      });
      Swal.showLoading();
      if (brandSelect) {
        await updateBrand(valuesForm, brandSelect);
        setBrandSelect(null);
      } else {
        await createBrand(valuesForm);
      }
      setValuesForm({ name: '', state: '' });
      listBrands();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  const handleUpdateBrand = async (e, brand) => {
    e.preventDefault();
    setValuesForm({ name: brand.name, state: brand.state});
    setBrandSelect(brand._id);
  }

  return (
    <div className='container-fluid mt-4'>
      <form onSubmit={(e) => handleCreateBrand(e)} >
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
            <th scope='col'>Fecha Creación</th>
            <th scope='col'>Fecha Actualización</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            brands.length > 0 && brands.map((brand, index) => {
              return <tr>
                <th scope='row'> {index + 1} </th>
                <td> {brand.name} </td>
                <td> {brand.state} </td>
                <td> {moment(brand.createdAt).format('DD-MM-YYYY HH:mm')} </td>
                <td> {moment(brand.updatedAt).format('DD-MM-YYYY HH:mm')} </td>
                <td><button className='btn btn-success btn-sm me-2' onClick={(e) => handleUpdateBrand(e, brand)}>Actualizar</button>
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