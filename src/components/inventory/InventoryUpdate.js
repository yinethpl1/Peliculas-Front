import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getInventoryForId, updateInventory } from '../../services/inventoryService';
import { getBrands } from '../../services/brandService';
import { getStates } from '../../services/stateService';
import { getTypes } from '../../services/typeService';
import { getUsers } from '../../services/userService';
import Swal from 'sweetalert2';

export const InventoryUpdate = () => {

  const { inventoryId = '' } = useParams();
  const [inventory, setInventory] = useState();
  const [ users, setUsers ] = useState([]);
  const [ brands, setBrands ] = useState([]);
  const [ types, setTypes ] = useState([]);
  const [ states, setStates ] = useState([]);
  const [ valoresForm, setValoresForm ] = useState([]);
  const { serial = '', model = '', description = '', color = '', 
    photo = '', purchaseDate = '', price = '', user, brand, equipmentType, equipmentState } = valoresForm

  
  const listUsers = async () => {
      try {
        const { data } = await getUsers();
        setUsers(data);
  
      } catch (error){
        console.log(error);
        
      }
    }
  
    useEffect(() => {
      listUsers();
    }, []);
  
  
    const listBrands = async () => {
      try {
        const { data } = await getBrands();
        setBrands(data);
  
      } catch (error){
        console.log(error);
        
      }
    }
  
    useEffect(() => {
      listBrands();
    }, []);
  
  
    const listTypes = async () => {
      try {
        const { data } = await getTypes();
        setTypes(data);
  
      } catch (error){
        console.log(error);
        
      }
    }
  
    useEffect(() => {
      listTypes();
    }, []);
  
  
  
    const listStates = async () => {
      try {
        const { data } = await getStates();
        setStates(data);
  
      } catch (error){
        console.log(error);
        
      }
    }
  
    useEffect(() => {
      listStates();
    }, []);
  
  
    const getInventory = async () => {
    try {
      const { data } = await getInventoryForId(inventoryId);
      console.log(data);
      
      setInventory(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getInventory();
  }, [inventoryId]);


  useEffect(() => {
    if (inventory) {
      setValoresForm({
        serial: inventory.serial,
        model: inventory.model,
        description: inventory.description,
        color: inventory.color,
        photo: inventory.photo,
        purchaseDate: inventory.purchaseDate,
        price: inventory.price,
        user: inventory.user,
        brand: inventory.brand,
        equipmentType: inventory.equipmentType,
        equipmentState: inventory.equipmentState 
      });
    }
  }, [inventory]);


    
  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  }  

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const inventory = {
      serial, model, description, color, photo, 
      purchaseDate, price,
      user: {
        _id: user
      },
      brand: {
        _id: brand
      },
      equipmentType: {
        _id: equipmentType
      },
      equipmentState: {
        _id: equipmentState
      }
    }
    console.log(inventory);

    try {

      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargado...'
      });
      Swal.showLoading();
      const { data } = await updateInventory(inventoryId, inventory);
      Swal.close();

    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }



  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className='card'>
        <div className='card-header'>
          <h5 className='card-title'>Detalle Producto</h5>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-4'>
              <img src={inventory?.photo} />
            </div>
            <div className='col-md-8'>
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
                      <label className="form-label">Modelo </label>
                      <input type="text" name='model'
                        value={model}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control' />
                    </div>
                  </div>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Descripción </label>
                      <input type="text" name='description'
                        value={description}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control' />
                    </div>
                  </div>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Color </label>
                      <input type="text" name='color'
                        value={color}
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
                      <label className="form-label">Fecha Compra </label>
                      <input type="date" name='purchaseDate'
                        value={purchaseDate}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control' />
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Precio </label>
                      <input type="number" name='price'
                        value={price}
                        onChange={e => handleOnChange(e)}
                        required
                        className='form-control' />
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Usuario </label>
                      <select className='form-select'
                        required
                        name='user'
                        value={user}
                        onChange={e => handleOnChange(e)}>
                        <option value="">--SELECCIONE--</option>
                        {
                          users.map(({ _id, name }) => {
                            return <option key={_id} value={_id}>{name}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Marca </label>
                      <select className='form-select'
                        required
                        name='brand'
                        value={brand}
                        onChange={e => handleOnChange(e)}>
                        <option value="">--SELECCIONE--</option>
                        {
                          brands.map(({ _id, name }) => {
                            return <option key={_id} value={_id}>{name}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Tipo Equipo</label>
                      <select className='form-select'
                        required
                        name='equipmentType'
                        value={equipmentType}
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
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Estado Equipo</label>
                      <select className='form-select'
                        required
                        name='equipmentState'
                        value={equipmentState}
                        onChange={e => handleOnChange(e)}>
                        <option value="">--SELECCIONE--</option>
                        {
                          states.map(({ _id, name }) => {
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
        </div>
      </div>
    </div>
  )
}
