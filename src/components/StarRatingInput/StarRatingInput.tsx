/* eslint-disable react/no-array-index-key */
// StarRatingInput.tsx

import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './StarRatingInput.scss';

interface StarRatingInputProps {
  value: number | null,
  onChange: (rating: number) => void;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({ onChange, value }) => {
  const [hover, setHover] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(value ?? 0);

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
    onChange(rating);
  };

  return (
    <div className="star-container">
      {[...Array(5)].map((_, index) => {
        const rating = index + 1;
        return (
          <FaStar
            key={`star-${index}`}
            size={24}
            color={rating <= (hover || selectedRating) ? '#ffc107' : '#e4e5e9'}
            style={{ marginRight: 10, cursor: 'pointer' }}
            onMouseEnter={() => setHover(rating)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleStarClick(rating)}
          />
        );
      })}
    </div>
  );
};

export default StarRatingInput;
