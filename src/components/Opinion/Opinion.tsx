/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import './Opinion.scss';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaStar,
  FaTrashAlt,
  FaEdit,
} from 'react-icons/fa';
import { useDisclosure } from '@chakra-ui/react';
import OpinionModal from '../OpinionModal/OpinionModal';
import ReportOpinionModal from '../ReportOpinionModal/ReportOpinionModal';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';

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
  onReport: (id: string, content: string) => void;
  onEdit: (opinionRating: number, opinionContent: string) => void;
  onDelete: (reviewId: string) => void;
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

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isReportOpen,
    onOpen: onReportOpen,
    onClose: onReportClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

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

  const handleReport = (content: string) => {
    onReport(reviewId, content);
  };

  const handleEdit = async (opinionRating: number, opinionContent: string) => {
    onEdit(opinionRating, opinionContent);
  };

  const handleDelete = async () => {
    onDelete(reviewId);
    onDeleteClose();
  };

  return (
    <div className="opinion-container">
      <div className="opinion">
        <div className="header">
          <div className="user-info">
            <span className="username">{username}</span>
            <span className="rating">· {rating / 2}/5 </span>
            <FaStar className="star" />
            {isCurrentUser && isCurrentUser === true && (
              <div className="edit-delete-buttons">
                <button
                  type="button"
                  onClick={onEditOpen}
                  className="opinion-edit-button"
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  onClick={onDeleteOpen}
                  className="opinion-delete-button"
                >
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
          <button
            className="report-button"
            type="button"
            onClick={onReportOpen}
          >
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
      {(isEditOpen || isReportOpen || isDeleteOpen) && (
        <div className="modals">
          <OpinionModal
            isOpen={isEditOpen}
            rating={rating}
            content={content}
            onClose={onEditClose}
            onSubmit={handleEdit}
          />
          <ReportOpinionModal
            isOpen={isReportOpen}
            onClose={onReportClose}
            onSubmit={handleReport}
          />
          <DeleteConfirmationModal
            isOpen={isDeleteOpen}
            onClose={onDeleteClose}
            onConfirm={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default Opinion;
