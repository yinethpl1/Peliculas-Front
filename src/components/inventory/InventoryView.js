import React, { useState, useEffect} from 'react'
import { getInventories } from '../../services/inventoryService';
import { InventoryCard } from '../inventory/InventoryCard';
import { InventoryNew } from './InventoryNew';
import Swal from 'sweetalert2';

export const InventoryView = () => {

const [inventories, setInventories ] = useState([]);
const [ openModal, setOpenModal ] = useState(false);

const listInventories = async () => {

  try {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Cargando...'
    });
    Swal.showLoading();
    const { data } = await getInventories();
    Swal.close();
    setInventories(data);
    

  } catch(error) {
    console.log(error);
    Swal.close();
  }
}

useEffect(() => {
  listInventories();
}, []);

const handleOpenModal = () => {
  setOpenModal(!openModal)
}

  return (
    <div className='container'>
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          inventories.map((inventory) => {
            return <InventoryCard key = { inventory._id } inventory = { inventory } />
          })
        }
      </div>
      {
        openModal ? <InventoryNew 
        handleOpenModal = { handleOpenModal } 
        listInventories = { listInventories } />:
        <button className='btn btn-primary newInv' onClick={ handleOpenModal }>
        <i className="fa-solid fa-plus"></i>
        </button>
      }
      
    </div>
  )
}
