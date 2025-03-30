import React, { useState, useEffect } from 'react';
import { getDirector } from '../../services/directorService';
import { getGender } from '../../services/genderService';
import { getProducer } from '../../services/producerService';
import { getType } from '../../services/typeService';
import { createMedia } from '../../services/mediaService';
import Swal from 'sweetalert2';

export const MediaNew = ({ handleOpenModal, listMedias }) => {
  const [directors, setDirectors] = useState([]);
  const [genders, setGenders] = useState([]);
  const [producers, setProducers] = useState([]);
  const [types, setTypes] = useState([]);
  const [valoresForm, setValoresForm] = useState({});
  const { serial = '', title = '', synopsis = '', url = '', photo = '', releaseYear = '', mainGender = '', mainDirector = '', producer = '', type = '' } = valoresForm;

  const listDirectors = async () => {
    try {
      const { data } = await getDirector();
      setDirectors(data);
    } catch (error) {
      console.log(error);
    }
  };

  const listGenders = async () => {
    try {
      const { data } = await getGender();
      setGenders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const listProducers = async () => {
    try {
      const { data } = await getProducer();
      setProducers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const listType = async () => {
    try {
      const { data } = await getType();
      setTypes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listDirectors();
    listGenders();
    listProducers();
    listType();
  }, []);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
  
    const media = {
      serial,
      title,
      synopsis,
      url,
      photo,
      releaseYear,
      mainGender,
      mainDirector,
      producer,
      type,
    };
  
    console.log('Datos a enviar:', media); // Verifica los datos antes de enviarlos
  
    try {
      // Muestra un mensaje de carga
      Swal.fire({
        allowOutsideClick: false,
        text: 'Guardando...',
      });
      Swal.showLoading();
  
      // Envía los datos al backend
      const response = await createMedia(media);
      console.log('Respuesta del backend:', response.media); // Verifica la respuesta
  
      // Cierra el modal y actualiza la lista de medios
      handleOpenModal();
      listMedias();
  
      // Muestra un mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'El medio se ha guardado correctamente.',
      });
    } catch (error) {
      console.error('Error al guardar el medio:', error);
  
      // Muestra un mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar el medio. Por favor, inténtalo de nuevo.',
      });
    }
  };
  return (
    <div className='sidebar'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <div className='sidebar-header'>
              <h3>Nuevo Inventario</h3>
              <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <hr />
          </div>
        </div>
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Serial</label>
                <input type="text" name='serial'
                  value={serial}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Titulo </label>
                <input type="text" name='title'
                  value={title}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Synopsis </label>
                <input type="text" name='synopsis'
                  value={synopsis}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Url </label>
                <input type="text" name='url'
                  value={url}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Foto </label>
                <input type="url" name='photo'
                  value={photo}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Año de estreno </label>
                <input type="number" name='releaseYear'
                  value={releaseYear}
                  onChange={e => handleOnChange(e)}
                  required
                  className='form-control' />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Genero principal </label>
                <select className='form-select'
                  required
                  name='mainGender'
                  value={mainGender}
                  onChange={e => handleOnChange(e)}>
                  <option value="">--SELECCIONE--</option>
                  {
                    genders.map(({ _id, name }) => {
                      return <option key={_id} value={_id}>{name}</option>
                    })
                  }
                </select>
              </div>
            </div>

            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Productor </label>
                <select className='form-select'
                  required
                  name='producer'
                  value={producer}
                  onChange={e => handleOnChange(e)}>
                  <option value="">--SELECCIONE--</option>
                  {
                    producers.map(({ _id, name }) => {
                      return <option key={_id} value={_id}>{name}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Director</label>
                <select className='form-select'
                  required
                  name='mainDirector'
                  value={mainDirector}
                  onChange={e => handleOnChange(e)}>
                  <option value="">--SELECCIONE--</option>
                  {
                    directors.map(({ _id, name }) => {
                      return <option key={_id} value={_id}>{name}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Tipo </label>
                <select className='form-select'
                  required
                  name='type'
                  value={type}
                  onChange={e => handleOnChange(e)}>
                  <option value="">--SELECCIONE--</option>
                  {
                    types.map(({ _id, name }) => {
                      return <option key={_id} value={_id}>{name}</option>
                    })
                  }
                </select>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <button className="btn btn-primary">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};