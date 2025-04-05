//import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaForId, updateMedia } from '../../services/mediaService';
import { getDirector } from '../../services/directorService';
import { getGender } from '../../services/genderService';
import { getProducer} from '../../services/producerService';
import { getType } from '../../services/typeService';
import Swal from 'sweetalert2';
import { useCallback, useEffect, useState } from 'react';

export const MediaUpdate = () => {

  const { mediaId = '' } = useParams();
  const [ media,setMedia] = useState(null);
  const [director, setDirector] = useState([]);
  const [genders, setGenders] = useState([]);
  const [types, setTypes] = useState([]);
  const [producers, setProducers] = useState([]);
  const [formValues, setFormValues] = useState({
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

  const { 
    serial, 
    title, 
    synopsis, 
    url, 
    photo, 
    releaseYear, 
    mainGender, 
    mainDirector, 
    producer, 
    type 
  } = formValues;

  const fetchDirector = useCallback(async () => {
    try {
      const { data } = await getDirector();
      setDirector(data);
    } catch (error) {
      console.error('Error loading directors:', error);
    }
  }, []);
  
  const fetchGenders = useCallback(async () => {
    try {
      const { data } = await getGender();
      setGenders(data);
    } catch (error) {
      console.error('Error loading genders:', error);
    }
  }, []);
  
  const fetchProducers = useCallback(async () => {
    try {
      const { data } = await getProducer();
      setProducers(data);
    } catch (error) {
      console.error('Error loading producers:', error);
    }
  }, []);
  
  const fetchTypes = useCallback(async () => {
    try {
      const { data } = await getType();
      setTypes(data);
    } catch (error) {
      console.error('Error loading types:', error);
    }
  }, []);
  
  const fetchMedia = useCallback(async () => {
    try {
      const { media } = await getMediaForId(mediaId);
      setMedia(media);
      setFormValues({
        serial: media.serial,
        title:media.title,
        //synopsis: media.synopsis,
        url: media.url,
        photo: media.photo,
        releaseYear: media.releaseYear,
        mainGender: media.mainGender?._id || '',
        mainDirector: media.mainDirector?._id || '',
        producer: media.producer?._id || '',
        type: media.type?._id || ''
      });
    } catch (error) {
      console.error('Error loading media:', error?.response?.data || error.message || error);
    }
  }, [mediaId, setMedia, setFormValues]); // Aquí mediaId es la dependencia necesaria
  
  // useEffect para cargar los datos
  useEffect(() => {
   
    fetchDirector();
    fetchGenders();
    fetchProducers();
    fetchTypes();
    if (mediaId) {
      fetchMedia();
    }
  }, [mediaId, fetchDirector, fetchGenders, fetchProducers, fetchTypes, fetchMedia]); 

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mediaData = {
      serial,
      title,
      synopsis,
      url,
      photo,
      releaseYear,
      mainGender: {
        _id: mainGender
      },
      mainDirector: {
        _id: mainDirector
      },
      producer: {
        _id: producer
      },
      type: {
        _id: type
      }
    };

    try {
      Swal.fire({
        title: 'Actualizando...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      await updateMedia(mediaId, mediaData);

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Medio actualizado correctamente'
      });
    } catch (error) {
      console.error('Error updating media:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el medio'
      });
    }
  };

  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title'>Actualizar Medio</h5>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-4'>
              <img src={photo} alt={media} className="img-fluid" />
            </div>
            <div className='col-md-8'>
              <form onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Serial</label>
                      <input 
                        type="text" 
                        name="serial"
                        value={serial}
                        onChange={handleOnChange}
                        required
                        className="form-control" 
                      />
                    </div>
                  </div>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Título</label>
                      <input 
                        type="text" 
                        name="title"
                        value={title}
                        onChange={handleOnChange}
                        required
                        className="form-control" 
                      />
                    </div>
                  </div>
                </div>

      
                <div className='row'>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">URL</label>
                      <input 
                        type="url" 
                        name="url"
                        value={url}
                        onChange={handleOnChange}
                        required
                        className="form-control" 
                      />
                    </div>
                  </div>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Foto</label>
                      <input 
                        type="url" 
                        name="photo"
                        value={photo}
                        onChange={handleOnChange}
                        required
                        className="form-control" 
                      />
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Año de lanzamiento</label>
                      <input 
                        type="number" 
                        name="releaseYear"
                        value={releaseYear}
                        onChange={handleOnChange}
                        required
                        className="form-control" 
                      />
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Género Principal</label>
                      <select
                        name="mainGender"
                        value={mainGender}
                        onChange={handleOnChange}
                        required
                        className="form-select"
                      >
                        <option value="">Seleccione un género</option>
                        {genders.map(gender => (
                          <option key={gender._id} value={gender._id}>
                            {gender.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Director Principal</label>
                      <select
                        name="mainDirector"
                        value={mainDirector}
                        onChange={handleOnChange}
                        required
                        className="form-select"
                      >
                        <option value="">Seleccione un director</option>
                        {director.map(director => (
                          <option key={director._id} value={director._id}>
                            {director.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Productor</label>
                      <select
                        name="producer"
                        value={producer}
                        onChange={handleOnChange}
                        required
                        className="form-select"
                      >
                        <option value="">Seleccione un productor</option>
                        {producers.map(producer => (
                          <option key={producer._id} value={producer._id}>
                            {producer.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Tipo</label>
                      <select
                        name="type"
                        value={type}
                        onChange={handleOnChange}
                        required
                        className="form-select"
                      >
                        <option value="">Seleccione un tipo</option>
                        {types.map(type => (
                          <option key={type._id} value={type._id}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col'>
                    <button type="submit" className="btn btn-primary">
                      Actualizar Medio
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};