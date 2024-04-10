import React from 'react';
import './StarRating.scss';

interface StarRatingProps {
  rating: number; // Input rating from 1 to 10
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  // Map input rating to 1-5 stars
  const roundedRating = Math.round(rating / 2);
  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = roundedRating !== fullStars;

  // Create an array of stars
  const starsArray = Array.from({ length: 5 }, (_, index) => {
    if (index < fullStars) {
      return (
        <span key={index} className="star full-star">
          &#9733;
        </span>
      ); // Full star
    }
    if (hasHalfStar && index === fullStars) {
      return (
        <span key={index} className="star half-star">
          &#9733;
        </span>
      ); // Half star
    }
    return (
      <span key={index} className="star">
        &#9734;
      </span>
    ); // Empty star
  });

  return (
    <div className="star-rating">
      <div className="stars">{starsArray}</div>
      <div className="rating-text">{`${rating / 2}/5`}</div>
    </div>
  );
};

export default StarRating;
