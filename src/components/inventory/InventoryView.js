import React, { useState, useEffect} from 'react'
import { getInventories } from '../../services/inventoryService';
import { InventoryCard } from '../inventory/InventoryCard';

export const InventoryView = () => {

const [inventories, setInventories ] = useState([]);

const listInventories = async () => {

  try {

    const { data } = await getInventories();
    console.log(data);
    setInventories(data);
    

  } catch(error) {
    console.log(error);
    
  }
}

useEffect(() => {
  listInventories();
}, []);

  return (
    <div className='container-fluid'>
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          inventories.map((inventory) => {
            return <InventoryCard key = { inventory._id } inventory = { inventory } />
          })
        }
      </div>
    </div>
  )
}
