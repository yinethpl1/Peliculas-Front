import React, { useState, useEffect} from 'react'
import { getMedia } from '../../services/mediaService';
import { MediaCard } from '../media/MediaCard';
import { MediaNew } from './MediaNew';


export const MediaView = () => {

const [medias, setMedia ] = useState([]);
const [openModal, setOpenModal]= useState(false);

const listMedias = async () => {

  try {

    const { data } = await getMedia();
    console.log(data);
    setMedia(data);

  } catch(error) {
    console.log(error);
    
  }
}

useEffect(() => {
  listMedias();
}, []);

const handleOpenModal = () => {
  setOpenModal (!openModal)
}

  return (
    <div className='container'>
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          medias.map((media) => {
            return <MediaCard key = { media._id } media = { media } />
          })
        }
      </div>
      {
        openModal ? <MediaNew
        handleOpenModal = {handleOpenModal}
        listMedias = {listMedias} /> :
        <button className='btn btn-primary newmedia' onClick={handleOpenModal }>
        <i class="fa-solid fa-plus"></i>
        </button>
      }
    </div>
  )
}
