import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaForId, updateMedia } from '../../services/mediaService';
import { getDirector } from '../../services/directorService';
import { getGender } from '../../services/genderService';
import { getProducer } from '../../services/producerService';
import { getType } from '../../services/typeService';
import Swal from 'sweetalert2';

export const MediaUpdate = ({ handleOpenModal, listMedias }) => {
  const { mediaId = '' } = useParams();
  const [directors, setDirectors] = useState([]);
  const [genders, setGenders] = useState([]);
  const [producers, setProducers] = useState([]);
  const [types, setTypes] = useState([]);
  const [media, setMedia] = useState(); 
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

  const fetchData = async () => {
    try {
      const [directorsData, gendersData, producersData, typesData, mediaData] = await Promise.all([
        getDirector(),
        getGender(),
        getProducer(),
        getType(),
        getMediaForId(mediaId)
      ]);

      setDirectors(directorsData.data);
      setGenders(gendersData.data);
      setProducers(producersData.data);
      setTypes(typesData.data);
      setMedia(mediaData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los datos'
      });
    }
  };

  useEffect(() => {
    if (mediaId) {
      fetchData();
    }
  }, [mediaId]);

  useEffect(() => {
    if (media) {
      setValoresForm({
        serial: media.serial,
        title: media.title,
        synopsis: media.synopsis,
        url: media.url,
        photo: media.photo,
        releaseYear: media.releaseYear,
        mainGender: media.mainGender?._id,
        mainDirector: media.mainDirector?._id,
        producer: media.producer?._id,
        type: media.type?._id,
      });
    }
  }, [media]);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const updateMedia = {
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

    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      await updateMedia(mediaId, updateMedia);
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Media actualizado correctamente'
      });
      handleOpenModal();
      listMedias();
    } catch (error) {
      console.error("Error updating media:", error);
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el media'
      });
    }
  };

  return (
    <div className='sidebar'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <div className='sidebar-header'>
              <h3>Actualizar Media</h3>
              <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <hr />
          </div>
        </div>
        {media ? (
          <form onSubmit={handleOnSubmit}>
            <div className='row'>
              <div className='col'>
                <div className="mb-3">
                  <label className="form-label">Serial</label>
                  <input type="text" name='serial'
                    value={serial}
                    onChange={handleOnChange}
                    required
                    className='form-control' />
                </div>
              </div>
              <div className='col'>
                <div className="mb-3">
                  <label className="form-label">Titulo</label>
                  <input type="text" name='title'
                    value={title}
                    onChange={handleOnChange}
                    required
                    className='form-control' />
                </div>
              </div>
              <div className='col'>
                <div className="mb-3">
                  <label className="form-label">Synopsis</label>
                  <input type="text" name='synopsis'
                    value={synopsis}
                    onChange={handleOnChange}
                    required
                    className='form-control' />
                </div>
              </div>
              <div className='col'>
                <div className="mb-3">
                  <label className="form-label">Url</label>
                  <input type="text" name='url'
                    value={url}
                    onChange={handleOnChange}
                    required
                    className='form-control' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <div className="mb-3">
                  <label className="form-label">Foto</label>
                  <input type="url" name='photo'
                    value={photo}
                    onChange={handleOnChange}
                    required
                    className='form-control' />
                </div>
              </div>
              <div className='col'>
                <div className="mb-3">
                  <label className="form-label">Año de estreno</label>
                  <input type="number" name='releaseYear'
                    value={releaseYear}
                    onChange={handleOnChange}
                    required
                    className='form-control' />
                </div>
              </div>
              <div className='col'>
                <div className="mb-3">
                  <label className="form-label">Genero principal</label>
                  <select className='form-select'
                    required
                    name='mainGender'
                    value={mainGender}
                    onChange={handleOnChange}>
                    <option value="">--SELECCIONE--</option>
                    {genders.map(({ _id, name }) => (
                      <option key={_id} value={_id}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='col'>
                <div className="mb-3">
                  <label className="form-label">Director principal</label>
                  <select className='form-select'
                    required
                    name='mainDirector'
                    value={mainDirector}
                    onChange={handleOnChange}>
                    <option value="">--SELECCIONE--</option>
                    {directors.map(({ _id, name }) => (
                      <option key={_id} value={_id}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='col'>
                <div className="mb-3">
                  <label className="form-label">Productor</label>
                  <select className='form-select'
                    required
                    name='producer'
                    value={producer}
                    onChange={handleOnChange}>
                    <option value="">--SELECCIONE--</option>
                    {producers.map(({ _id, name }) => (
                      <option key={_id} value={_id}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='col'>
                <div className="mb-3">
                  <label className="form-label">Tipo</label>
                  <select className='form-select'
                    required
                    name='type'
                    value={type}
                    onChange={handleOnChange}>
                    <option value="">--SELECCIONE--</option>
                    {types.map(({ _id, name }) => (
                      <option key={_id} value={_id}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <button className="btn btn-primary">Actualizar</button>
              </div>
            </div>
          </form>
        ) : (
          <div>Cargando datos del media...</div>
        )}
      </div>
    </div>
  );
};