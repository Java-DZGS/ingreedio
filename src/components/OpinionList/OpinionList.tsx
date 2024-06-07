import React, { useState } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import ScrollBar from '../Scrollbar/ScrollBar';
import Opinion from '../Opinion/Opinion';
import { ReviewResponse } from '../../services/review.service';
import OpinionModal from '../OpinionModal/OpinionModal';
import ReportOpinionModal from '../ReportOpinionModal/ReportOpinionModal';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';

interface OpinionListProps {
  productId: string | undefined;
  productReviews: ReviewResponse[];
  isAuthenticated: boolean;
  canAddOpinion: boolean;
  onOpen: () => void;
  fetchProductReviews: () => void;
  onLikeOpinion: (id: string) => void;
  onUnlikeOpinion: (id: string) => void;
  onDislikeOpinion: (id: string) => void;
  onUndislikeOpinion: (id: string) => void;
  onReportOpinion: (id: string, content: string) => void;
  onEditOpinion: (
    reviewId: string,
    opinionRating: number,
    opinionContent: string,
  ) => void;
  onDeleteOpinion: (reviewId: string) => void;
}

const OpinionList = ({
  productId,
  productReviews,
  isAuthenticated,
  canAddOpinion,
  onOpen,
  fetchProductReviews,
  onLikeOpinion,
  onUnlikeOpinion,
  onDislikeOpinion,
  onUndislikeOpinion,
  onReportOpinion,
  onEditOpinion,
  onDeleteOpinion,
}: OpinionListProps): JSX.Element => {
  const [selectedReview, setSelectedReview] = useState<ReviewResponse | null>(
    null,
  );
  const [modalType, setModalType] = useState<
    'edit' | 'report' | 'delete' | null
  >(null);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const handleLike = (id: string) => onLikeOpinion(id);
  const handleUnlike = (id: string) => onUnlikeOpinion(id);
  const handleDislike = (id: string) => onDislikeOpinion(id);
  const handleUndislike = (id: string) => onUndislikeOpinion(id);
  const handleReport = (review: ReviewResponse) => {
    setSelectedReview(review);
    setModalType('report');
    onModalOpen();
  };
  const handleEdit = (review: ReviewResponse) => {
    setSelectedReview(review);
    setModalType('edit');
    onModalOpen();
  };
  const handleDelete = (review: ReviewResponse) => {
    setSelectedReview(review);
    setModalType('delete');
    onModalOpen();
  };

  const handleEditSubmit = async (
    opinionRating: number,
    opinionContent: string,
  ) => {
    if (selectedReview) {
      await onEditOpinion(
        selectedReview.reviewId,
        opinionRating,
        opinionContent,
      );
      onModalClose();
      fetchProductReviews();
    }
  };

  const handleReportSubmit = async (reportContent: string) => {
    if (selectedReview) {
      await onReportOpinion(selectedReview.reviewId, reportContent);
      onModalClose();
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedReview) {
      await onDeleteOpinion(selectedReview.reviewId);
      onModalClose();
      fetchProductReviews();
    }
  };

  return (
    <div style={{ display: 'flex', flex: 1, width: '100%' }}>
      <ScrollBar>
        {isAuthenticated && canAddOpinion && (
          <Button onClick={onOpen} variant="link">
            Add your opinion
          </Button>
        )}
        <div className="opinions-list">
          <ul>
            {productReviews.map((opinion) => (
              <li key={`${opinion.displayName}-${productId}`}>
                <Opinion
                  reviewId={opinion.reviewId}
                  username={opinion.displayName}
                  rating={opinion.rating}
                  createdAt={opinion.createdAt}
                  content={opinion.content}
                  isLiked={opinion.isLiked}
                  isDisliked={opinion.isDisliked}
                  likesCount={opinion.likesCount}
                  dislikesCount={opinion.dislikesCount}
                  isCurrentUser={opinion.isCurrentUser}
                  onLike={handleLike}
                  onUnlike={handleUnlike}
                  onDislike={handleDislike}
                  onUndislike={handleUndislike}
                  onReport={() => handleReport(opinion)}
                  onEdit={() => handleEdit(opinion)}
                  onDelete={() => handleDelete(opinion)}
                />
              </li>
            ))}
          </ul>
        </div>
      </ScrollBar>
      {isModalOpen && modalType === 'edit' && selectedReview && (
        <OpinionModal
          isOpen={isModalOpen}
          rating={selectedReview.rating}
          content={selectedReview.content}
          onClose={onModalClose}
          onSubmit={handleEditSubmit}
        />
      )}
      {isModalOpen && modalType === 'report' && selectedReview && (
        <ReportOpinionModal
          isOpen={isModalOpen}
          onClose={onModalClose}
          onSubmit={handleReportSubmit}
        />
      )}
      {isModalOpen && modalType === 'delete' && (
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClose={onModalClose}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default OpinionList;
