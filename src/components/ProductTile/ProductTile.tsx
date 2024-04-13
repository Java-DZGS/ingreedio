import React from 'react';
import Card from '../Card/Card';
import './ProductTile.scss';
import StarRating from '../StarRating/StarRating';
import heart from '../../assets/icons/heart.svg';

type ProductTileProps = {
  id: number,
  name: string;
  provider: string;
  shortDescription: string;
  rating: number;
  isLiked: boolean;
  smallImageUrl: string;
};

const ProductTile = ({
  name,
  provider,
  shortDescription,
  rating,
  isLiked,
  smallImageUrl,
}: ProductTileProps): JSX.Element => (
  <Card>
    <div className="product-tile">
      <div className="product-image-container">
        <img src={smallImageUrl} alt={name} className="product-image" />
      </div>
      <div className="product-details">
        <div className="product-name-container">
          <h2 className="product-name">{name}</h2>
          {isLiked && <img src={heart} alt="Liked" className="heart-icon" />}
        </div>

        <p className="product-distributor">{provider}</p>

        <p className="product-description">{shortDescription}</p>
        <div className="star-rating-container">
          <StarRating rating={rating} />
        </div>
      </div>
    </div>
  </Card>
);

export default ProductTile;
