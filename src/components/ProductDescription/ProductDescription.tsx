import React from 'react';
import './ProductDescription.scss';
import StarRating from '../StarRating/StarRating';
import HeartComponent from '../HeartComponent/HeartComponent';

type ProductDescriptionProps = {
  name: string;
  provider: string;
  shortDescription: string;
  volume: number;
  brand: string;
  rating: number;
  isLiked: boolean | null;
  largeImageUrl: string;
  showLike: boolean;
  handleLike: () => void;
  handleUnlike: () => void;
  handleRatingClick: () => void;
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
  showLike,
  handleLike,
  handleUnlike,
  handleRatingClick,
}: ProductDescriptionProps): JSX.Element => (
  <div className="product-description-container">
    <div className="product-image-container">
      {showLike && (
        <HeartComponent
          isLiked={isLiked}
          className="heart-button"
          onLike={handleLike}
          onUnlike={handleUnlike}
        />
      )}
      <img src={largeImageUrl} alt={name} className="product-image" />
    </div>
    <div className="product-details">
      <h2 className="product-name">{name}</h2>
      <p className="product-brand">{brand}</p>
      <p className="product-distributor">{provider}</p>

      <p className="product-short-description">{shortDescription}</p>
      <p className="product-volume">{volume}</p>
      <div
        className="star-rating-container"
        onClick={handleRatingClick}
        role="button"
        tabIndex={0}
        aria-label="rating"
      >
        <StarRating rating={rating} />
      </div>
    </div>
  </div>
);

export default ProductDescription;
