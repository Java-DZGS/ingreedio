/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import './Opinion.scss';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaStar,
  FaTrashAlt,
  FaEdit,
} from 'react-icons/fa';

interface OpinionProps {
  reviewId: string;
  username: string;
  rating: number;
  createdAt: string;
  content: string;
  likesCount: number;
  dislikesCount: number;
  isLiked: boolean | null;
  isDisliked: boolean | null;
  isCurrentUser: boolean | null;
  onLike: (id: string) => void;
  onUnlike: (id: string) => void;
  onDislike: (id: string) => void;
  onUndislike: (id: string) => void;
  onReport: () => void;
  onEdit: () => void;
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
  const [likes, setLikes] = useState<number>(likesCount);
  const [dislikes, setDislikes] = useState<number>(likesCount);

  useEffect(() => {
    setLiked(isLiked);
    setDisliked(isDisliked);
  }, [isLiked, isDisliked]);

  useEffect(() => {
    setLikes(likesCount);
    setDislikes(dislikesCount);
  }, [likesCount, dislikesCount]);

  const toggleLike = () => {
    if (liked == null) return;
    if (liked === false) {
      setLikes((prev) => prev + 1);
      setLiked(true);
      if (disliked) {
        setDislikes((prev) => (prev > 0 ? prev - 1 : 0));
        setDisliked(false);
      }
      onLike(reviewId);
    } else {
      setLikes((prev) => (prev > 0 ? prev - 1 : 0));
      setLiked(false);
      onUnlike(reviewId);
    }
  };

  const toggleDislike = () => {
    if (disliked == null) return;
    if (disliked === false) {
      setDislikes((prev) => prev + 1);
      setDisliked(true);
      if (liked) {
        setLikes((prev) => (prev > 0 ? prev - 1 : 0));
        setLiked(false);
      }
      onDislike(reviewId);
    } else {
      setDislikes((prev) => (prev > 0 ? prev - 1 : 0));
      setDisliked(false);
      onUndislike(reviewId);
    }
  };

  return (
    <div className="opinion-container">
      <div className="opinion">
        <div className="header">
          <div className="user-info">
            <span className="username">{username}</span>
            <span className="rating">
              {rating / 2}
              /5
            </span>
            <FaStar className="star" />
            {isCurrentUser && isCurrentUser === true && (
              <div className="edit-delete-buttons">
                <button
                  type="button"
                  onClick={onEdit}
                  className="opinion-edit-button"
                >
                  {
                    // eslint-disable-next-linejsx - a11y / control - has - associated - label
                  }
                  <FaEdit />
                </button>
                <button
                  type="button"
                  onClick={onDelete}
                  className="opinion-delete-button"
                >
                  {
                    // eslint-disable-next-linejsx - a11y / control - has - associated - label
                  }
                  <FaTrashAlt />
                </button>
              </div>
            )}
          </div>
          <span className="date">
            {new Date(createdAt).toLocaleDateString('sv-SE')}
          </span>
        </div>
        <div className="content">
          {content.split('\n').map((par) => (
            <p key={Math.random()}>{par}</p>
          ))}
        </div>
        <div className="footer">
          <button className="report-button" type="button" onClick={onReport}>
            Report
          </button>

          <div className="icons">
            <FaThumbsUp
              className={`icon ${liked ? 'liked' : ''}`}
              onClick={toggleLike}
            />
            <span className="likes-count">{likes}</span>
            <FaThumbsDown
              className={`icon ${disliked ? 'disliked' : ''}`}
              onClick={toggleDislike}
            />
            <span className="dislikes-count">{dislikes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opinion;
