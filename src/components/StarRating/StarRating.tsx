import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './StarRating.scss';

interface StarRatingProps {
  rating: number; // Input rating from 1 to 10
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  // Map input rating to 1-5 stars
  const roundedRating = Math.round(rating / 2);
  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = roundedRating !== fullStars;

  const starsArray = Array.from({ length: 5 }, (_, index) => {
    if (index < fullStars) {
      return <FaStar key={index} className="star full-star" />;
    }
    if (hasHalfStar && index === fullStars) {
      return (
        <FaStarHalfAlt key={index} className="star half-star" />
      );
    }
    return (
      <FaRegStar key={index} className="star empty-star" />
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
