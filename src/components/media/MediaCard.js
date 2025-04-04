import React from 'react'
import { Link } from 'react-router-dom';

export const MediaCard = (props) => {

    const { media } = props;

  return (
    <div className="col">
        <div className="card">
            <img src={media.photo} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Características</h5>
                <hr/>
                <p className="card-text">{`Serial: ${media.serial}`}</p>
                <p className="card-text">{`Titulo ${media.title}`}</p>
                <p className="card-text">{`Synopsis: ${media.synopsis}`}</p>
                <p className="card-text">{`Url: ${media.url}`}</p>
                <p className="card-text">{`foto: ${media.photo}`}</p>
                <p className="card-text">{`Año de estreno: ${media.releaseYear}`}</p>
                <p className="card-text">{`Genero principal: ${media.mainGender.name}`}</p>
                <p className="card-text">{`Director principal: ${media.mainDirector.name}`}</p>
                <p className="card-text">{`Productora: ${media.producer.name}`}</p>
                <p className="card-text">{`Tipo: ${media.type.name}`}</p>
                <p className="card-text">
                  <Link to = {`media/${media._id}`}>Ver mas</Link>
                </p>


            </div>
        </div>
    </div>
  );
};