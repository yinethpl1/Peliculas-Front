import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaForId, updateMedia } from '../../services/mediaService';
import { getDirector } from '../../services/directorService';
import { getGender } from '../../services/genderService';
import { getProducer } from '../../services/producerService';
import { getTypes } from '../../services/typeService';
import Swal from 'sweetalert2';

export const MediaUpdate = ({ handleOpenModal, listMedias }) => {
    const { mediaId = '' } = useParams();
    const [directors, setDirectors] = useState([]);
    const [genders, setGenders] = useState([]);
    const [producers, setProducers] = useState([]);
    const [types, setTypes] = useState([]);
    const [media, setMedia] = useState(null); // Estado para almacenar los datos del media
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

    const listTypes = async () => {
        try {
            const { data } = await getTypes();
            setTypes(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getMedia = async () => {
        try {
            const { data } = await getMediaForId(mediaId);
            setMedia(data);
            // Actualizar valoresForm con los datos obtenidos
            setValoresForm({
                serial: data.serial,
                title: data.title,
                synopsis: data.synopsis,
                url: data.url,
                photo: data.photo,
                releaseYear: data.releaseYear,
                mainGender: data.mainGender?._id || '',
                mainDirector: data.mainDirector?._id || '',
                producer: data.producer?._id || '',
                type: data.type?._id || ''
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listDirectors();
        listGenders();
        listProducers();
        listTypes();
        if (mediaId) {
            getMedia();
        }
    }, [mediaId]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const mediaToUpdate = {
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
        }

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            await updateMedia(mediaId, mediaToUpdate);
            Swal.close();
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Media actualizado correctamente'
            });
        } catch (error) {
            console.log(error);
            Swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el media'
            });
        }

        handleOpenModal();
        listMedias();
    }

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
                                    <label className="form-label">Director principal </label>
                                    <select className='form-select'
                                        required
                                        name='mainDirector'
                                        value={mainDirector}
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
                                        name='director'
                                        value={director}
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