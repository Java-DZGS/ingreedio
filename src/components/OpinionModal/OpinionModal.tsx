// OpinionModal.tsx

import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
} from '@chakra-ui/react';
import StarRatingInput from '../StarRatingInput/StarRatingInput';
import './OpinionModal.scss';
import FilledButton from '../FilledButton/FilledButton';
import TextButton from '../TextButton/TextButton';

interface OpinionModalProps {
  isOpen: boolean;
  rating: number;
  content: string;
  onClose: () => void;
  onSubmit: (opinionRating: number, opinionContent: string) => void;
}

const OpinionModal: React.FC<OpinionModalProps> = ({
  isOpen,
  rating,
  content,
  onClose,
  onSubmit,
}) => {
  const [opinionContent, setOpinionContent] = useState(content);
  const [opinionRating, setOpinionRating] = useState(rating);

  useEffect(() => {
    setOpinionRating(rating);
    setOpinionContent(content);
  }, [isOpen]);

  const handleSubmitOpinion = () => {
    onSubmit(opinionRating / 2, opinionContent);
    onClose();
  };

  return (
    <div className="modal-container">
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent marginTop="15%">
          <ModalHeader className="modal-header">
            Your opinion about the product
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="modal-body">
            <StarRatingInput
              value={opinionRating / 2}
              onChange={(rating: number) => setOpinionRating(rating * 2)}
            />
            <Textarea
              placeholder="Write your opinion here..."
              value={opinionContent}
              onChange={(e) => setOpinionContent(e.target.value)}
              rows={6}
            />
          </ModalBody>
          <ModalFooter className="modal-footer">
            <FilledButton
              onClick={handleSubmitOpinion}
              isDisabled={opinionRating === 0}
            >
              Submit
            </FilledButton>
            <TextButton onClick={onClose}>Cancel</TextButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default OpinionModal;
