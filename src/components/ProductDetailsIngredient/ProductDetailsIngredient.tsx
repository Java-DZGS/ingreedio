import React, { useState } from 'react';
import { MdOutlineThumbUp, MdOutlineThumbDown } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import {
  likeIngredient,
  dislikeIngredient,
  undislikeIngredient,
  unlikeIngredient,
} from '../../store/actions';
import './ProductDetailsIngredient.scss';

type ProductDetailsIngredientProps = {
  ingredient: string;
  isLiked?: boolean;
  isDisliked?: boolean;
};

const ProductDetailsIngredient = ({
  ingredient,
  isLiked = false,
  isDisliked = false,
}: ProductDetailsIngredientProps): JSX.Element => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const isAuthenticated = useIsAuthenticated();

  const toggleLike = () => {
    if (isLiked) {
      dispatch(unlikeIngredient(ingredient));
    } else {
      if (isDisliked) {
        dispatch(undislikeIngredient(ingredient));
      }
      dispatch(likeIngredient(ingredient));
    }
  };

  const toggleDislike = () => {
    if (isDisliked) {
      dispatch(undislikeIngredient(ingredient));
    } else {
      if (isLiked) {
        dispatch(unlikeIngredient(ingredient));
      }
      dispatch(dislikeIngredient(ingredient));
    }
  };

  return (
    <div
      // eslint-disable-next-line no-nested-ternary
      className={`product-ingredient-container ${isLiked ? 'liked' : isDisliked ? 'disliked' : ''}`}
      onMouseEnter={() => isAuthenticated && setIsHovered(true)}
      onMouseLeave={() => isAuthenticated && setIsHovered(false)}
    >
      <span>{ingredient}</span>
      {isHovered && (
        <div className="icon-container">
          <MdOutlineThumbUp
            onClick={toggleLike}
            className={`icon ${isLiked ? 'liked' : ''}`}
          />
          <MdOutlineThumbDown
            onClick={toggleDislike}
            className={`icon ${isDisliked ? 'disliked' : ''}`}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetailsIngredient;
