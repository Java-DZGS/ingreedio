import React from 'react';
import './ProductDescription.scss';
import StarRating from '../StarRating/StarRating';
import heart from '../../assets/icons/heart.svg';

type ProductDescriptionProps = {
  name: string;
  provider: string;
  shortDescription: string;
  volume: number;
  brand: string;
  rating: number;
  isLiked: boolean;
  largeImageUrl: string;
};

const ProductDescription = ({
  name,
  provider,
  shortDescription,
  rating,
  isLiked,
  largeImageUrl,
  volume,
  brand,
}: ProductDescriptionProps): JSX.Element => (
  <div className="product-description-container">
    <div className="product-image-container">
      {isLiked && (
        <img
          src={heart}
          alt="Liked"
          className="heart-icon"
        />
      )}
      <img src={largeImageUrl} alt={name} className="product-image" />
    </div>
    <div className="product-details">
      <h2 className="product-name">{name}</h2>
      <p className="product-brand">{brand}</p>
      <p className="product-distributor">{provider}</p>

      <p className="product-short-description">{shortDescription}</p>
      <p className="product-volume">
        {volume}
        ml
      </p>
      <div className="star-rating-container">
        <StarRating rating={rating} />
      </div>
    </div>
  </div>
);

export default ProductDescription;
