import React from 'react'
import { Link } from 'react-router-dom';

export const InventoryCard = (props) => {

    const { inventory } = props;

  return (
    <div className="col">
        <div className="card">
            <img src={inventory.photo} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Características</h5>
                <hr/>
                <p className="card-text">{`Serial: ${inventory.serial}`}</p>
                <p className="card-text">{`Marca: ${inventory.brand.name}`}</p>
                <p className="card-text">{`Descripción: ${inventory.description}`}</p>
                <p className="card-text">{`Precio: ${inventory.price}`}</p>
                <p className="card-text">{`Usuario: ${inventory.user.name}`}</p>
                <p className="card-text">
                  <Link to = {`inventories/edit/${inventory._id}`}>Ver mas</Link>
                </p>
            </div>
        </div>
    </div>
  );
};