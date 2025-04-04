import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaForId, updateMedia } from '../../services/mediaService';
import { getDirector } from '../../services/directorService';
import { getGender } from '../../services/genderService';
import { getProducer } from '../../services/producerService';
import { getType } from '../../services/typeService';
import Swal from 'sweetalert2';

export const MediaUpdate = () => {
  const { mediaId = '' } = useParams();
  const [media, setMedia] = useState(null);
  const [genders, setGenders] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [producers, setProducers] = useState([]);
  const [types, setTypes] = useState([]);
  const [valoresForm, setValoresForm] = useState({
    serial: '',
    title: '',
    synopsis: '',
    url: '',
    photo: '',
    releaseYear: '',
    mainGender: '',
    mainDirector: '',
    producer: '',
    type: ''
  });

  const { serial, title, synopsis, url, photo, releaseYear, mainGender, mainDirector, producer, type } = valoresForm;

  // Función para manejar errores de forma consistente
  const handleError = (error, message) => {
    console.error(message, error);
    Swal.fire('Error', message, 'error');
  };

  // Listar datos con useCallback para memoización
  const listGenders = useCallback(async () => {
    try {
      const { data } = await getGender();
      setGenders(data);
    } catch (error) {
      handleError(error, 'No se pudieron cargar los géneros');
    }
  }, []);

  const listDirectors = useCallback(async () => {
    try {
      const { data } = await getDirector();
      setDirectors(data);
    } catch (error) {
      handleError(error, 'No se pudieron cargar los directores');
    }
  }, []);

  const listProducers = useCallback(async () => {
    try {
      const { data } = await getProducer();
      setProducers(data);
    } catch (error) {
      handleError(error, 'No se pudieron cargar los productores');
    }
  }, []);

  const listTypes = useCallback(async () => {
    try {
      const { data } = await getType();
      setTypes(data);
    } catch (error) {
      handleError(error, 'No se pudieron cargar los tipos');
    }
  }, []);

  const getMedia = useCallback(async () => {
    try {
      const { data } = await getMediaForId(mediaId);
      setMedia(data);
    } catch (error) {
      handleError(error, 'No se pudo cargar el media');
    }
  }, [mediaId]);

  // Cargar todos los datos iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await Promise.all([
          listGenders(),
          listDirectors(),
          listProducers(),
          listTypes()
        ]);
        await getMedia();
      } catch (error) {
        handleError(error, 'Error al cargar los datos iniciales');
      }
    };

    loadInitialData();
  }, [mediaId, listGenders, listDirectors, listProducers, listTypes, getMedia]);

  // Actualizar formulario cuando media cambia
  useEffect(() => {
    if (media) {
      setValoresForm({
        serial: media.serial || '',
        title: media.title || '',
        synopsis: media.synopsis || '',
        url: media.url || '',
        photo: media.photo || '',
        releaseYear: media.releaseYear || '',
        mainGender: media.mainGender?._id || '',
        mainDirector: media.mainDirector?._id || '',
        producer: media.producer?._id || '',
        type: media.type?._id || ''
      });
    }
  }, [media]);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm(prev => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    const mediaToUpdate = {
      serial,
      title,
      synopsis,
      url,
      photo,
      releaseYear,
      mainGender: mainGender ? { _id: mainGender } : null,
      mainDirector: mainDirector ? { _id: mainDirector } : null,
      producer: producer ? { _id: producer } : null,
      type: type ? { _id: type } : null
    };

    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
        didOpen: () => Swal.showLoading()
      });

      await updateMedia(mediaId, mediaToUpdate);
      
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Media actualizado correctamente'
      });
    } catch (error) {
      console.error('Error updating media:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'No se pudo actualizar el media'
      });
    }
  };

  if (!media) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando datos del media...</p>
      </div>
    );
  }

  return (
    <div className='container-fluid mt-4'>
      <div className='row'>
        <div className='col'>
          <h3 className='mb-4'>Actualizar Media</h3>
        </div>
      </div>
      
      <div className='card'>
        <div className='card-body'>
          <div className='row mb-4'>
            <div className='col-md-4'>
              <img 
                alt='Media' 
                src={photo || 'https://via.placeholder.com/300x450?text=Imagen+no+disponible'} 
                className='img-fluid rounded'
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450?text=Imagen+no+disponible';
                }}
              />
            </div>
            
            <div className='col-md-8'>
              <form onSubmit={handleOnSubmit}>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className="mb-3">
                      <label className="form-label">Serial</label>
                      <input 
                        type="text" 
                        name='serial'
                        value={serial}
                        onChange={handleOnChange}
                        required
                        className='form-control' 
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className="mb-3">
                      <label className="form-label">Título</label>
                      <input 
                        type="text" 
                        name='title'
                        value={title}
                        onChange={handleOnChange}
                        required
                        className='form-control' 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Sinopsis</label>
                  <textarea 
                    name='synopsis'
                    value={synopsis}
                    onChange={handleOnChange}
                    required
                    className='form-control'
                    rows="3"
                  />
                </div>
                
                <div className='row'>
                  <div className='col-md-6'>
                    <div className="mb-3">
                      <label className="form-label">URL</label>
                      <input 
                        type="url" 
                        name='url'
                        value={url}
                        onChange={handleOnChange}
                        required
                        className='form-control' 
                      />
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className="mb-3">
                      <label className="form-label">Imagen (URL)</label>
                      <input 
                        type="url" 
                        name='photo'
                        value={photo}
                        onChange={handleOnChange}
                        required
                        className='form-control' 
                      />
                    </div>
                  </div>
                </div>
                
                <div className='row'>
                  <div className='col-md-3'>
                    <div className="mb-3">
                      <label className="form-label">Año de estreno</label>
                      <input 
                        type="number" 
                        name='releaseYear'
                        value={releaseYear}
                        onChange={handleOnChange}
                        required
                        min="1900"
                        max={new Date().getFullYear()}
                        className='form-control' 
                      />
                    </div>
                  </div>
                  
                  <div className='col-md-3'>
                    <div className="mb-3">
                      <label className="form-label">Género principal</label>
                      <select 
                        className='form-select'
                        required
                        name='mainGender'
                        value={mainGender}
                        onChange={handleOnChange}
                      >
                        <option value="">--SELECCIONE--</option>
                        {genders.map(({ _id, name }) => (
                          <option key={_id} value={_id}>{name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className='col-md-3'>
                    <div className="mb-3">
                      <label className="form-label">Director principal</label>
                      <select 
                        className='form-select'
                        required
                        name='mainDirector'
                        value={mainDirector}
                        onChange={handleOnChange}
                      >
                        <option value="">--SELECCIONE--</option>
                        {directors.map(({ _id, name }) => (
                          <option key={_id} value={_id}>{name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className='col-md-3'>
                    <div className="mb-3">
                      <label className="form-label">Productor</label>
                      <select 
                        className='form-select'
                        required
                        name='producer'
                        value={producer}
                        onChange={handleOnChange}
                      >
                        <option value="">--SELECCIONE--</option>
                        {producers.map(({ _id, name }) => (
                          <option key={_id} value={_id}>{name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className='row'>
                  <div className='col-md-3'>
                    <div className="mb-3">
                      <label className="form-label">Tipo</label>
                      <select 
                        className='form-select'
                        required
                        name='type'
                        value={type}
                        onChange={handleOnChange}
                      >
                        <option value="">--SELECCIONE--</option>
                        {types.map(({ _id, name }) => (
                          <option key={_id} value={_id}>{name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className='d-grid gap-2 d-md-flex justify-content-md-end mt-4'>
                  <button type="submit" className="btn btn-primary">
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};