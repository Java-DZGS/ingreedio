/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import './Opinion.scss';
import { FaThumbsUp, FaThumbsDown, FaStar } from 'react-icons/fa';

interface OpinionProps {
  reviewId: string,
  username: string;
  rating: number;
  createdAt: string;
  content: string;
  likesCount: number;
  dislikesCount: number;
  isLiked: boolean | null;
  isDisliked: boolean | null;
  isCurrentUser: boolean;
  onLike: (id: string) => void;
  onUnlike: (id: string) => void;
  onDislike: (id: string) => void;
  onUndislike: (id: string) => void;
  onReport: (id: string) => void;
  onEdit: (opinionRating: number, opinionContent: string) => void;
  onDelete: () => void;
}

const Opinion = ({
  reviewId,
  username,
  rating,
  createdAt,
  content,
  likesCount,
  dislikesCount,
  isLiked,
  isDisliked,
  isCurrentUser,
  onLike,
  onUnlike,
  onDislike,
  onUndislike,
  onReport,
  onEdit,
  onDelete,
}: OpinionProps): JSX.Element => {
  const [liked, setLiked] = useState<boolean | null>(isLiked);
  const [disliked, setDisliked] = useState<boolean | null>(isDisliked);

  const toggleLike = () => {
    console.log(liked);
    if (liked == null) return;
    if (liked === false) {
      // onLike(reviewId);
      // setLiked(true);
      // setDisliked(false);
      onLike(reviewId);
    } else {
      // onUnlike(reviewId);
      // setLiked(false);
      // setDisliked(true);
      onUnlike(reviewId);
    }
  };

  const toggleDislike = () => {
    console.log(disliked);
    if (disliked == null) return;
    if (disliked === false) {
      // onDislike(reviewId);
      // setDisliked(true);
      // setLiked(false);
      onDislike(reviewId);
    } else {
      // onUndislike(reviewId);
      // setDisliked(false);
      // setLiked(true);
      onUndislike(reviewId);
    }
  };

  const handleReport = () => {
    onReport(reviewId);
  };

  return (
    <div className="opinion">
      <div className="header">
        <div className="user-info">
          <span className="username">{username}</span>
          <span className="rating">· {rating / 2}/5 </span>
          <FaStar className="star" />
        </div>
        <span className="date">
          {new Date(createdAt).toLocaleDateString('sv-SE')}
        </span>
      </div>
      <div className="content">{content}</div>
      <div className="footer">
        <button className="report-button" type="button" onClick={handleReport}>
          Report
        </button>
        <div className="icons">
          <FaThumbsUp className="icon" onClick={toggleLike} />
          <span className="likes-count">{likesCount}</span>
          <FaThumbsDown className="icon" onClick={toggleDislike} />
          <span className="dislikes-count">{dislikesCount}</span>
        </div>
      </div>
    </div>
  );
};

export default Opinion;
