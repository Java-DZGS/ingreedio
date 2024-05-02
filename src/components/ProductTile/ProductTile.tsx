import React from 'react';
import { FaHeart } from 'react-icons/fa';
import Card from '../Card/Card';
import './ProductTile.scss';
import StarRating from '../StarRating/StarRating';

type ProductTileProps = {
  name: string;
  provider: string;
  shortDescription: string;
  rating: number;
  isLiked: boolean;
  showLike: boolean;
  smallImageUrl: string;
};

const ProductTile = ({
  name,
  provider,
  shortDescription,
  rating,
  isLiked,
  showLike,
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
          {showLike && isLiked && (
            <button aria-label="Liked" type="button" className="heart-icon">
              <FaHeart />
            </button>
          )}
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
